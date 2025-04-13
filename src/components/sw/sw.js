'use strict';
import React, { useEffect, useState } from 'react';

import './sw.scss';

export default () => {
    const [swPerson, setSwPerson] = useState([]);
    const [filmsByPerson, setFilmsForPerson] = useState({});
    const [starshipsByPerson, setStarshipsForPerson] = useState({});
    const [loading, setLoading] = useState(false);
    const [homeworlds, setHomeworlds] = useState({});

    async function fetchPersons() {
        setLoading(true);
        const resp = await fetch('https://swapi.dev/api/people/');
        const data = await resp.json();
        setSwPerson(data);
        setLoading(false);
    }

    async function filmsForPerson(name, filmUrls) {
        const filmData = await Promise.all(
            filmUrls.map(async (url) => {
                const resp = await fetch(url);
                return await resp.json();
            })
        );
        
        setFilmsForPerson((prev) => ({
            ...prev,
            [name]: filmData
        }));

    }

    async function starshipsForPerson(name, starshipUrls) {
        const starshipData = await Promise.all(
            starshipUrls.map(async (url) => {
                const resp = await fetch(url);
                return await resp.json();
            })
        );

        setStarshipsForPerson((prev) => ({
            ...prev,
            [name]: starshipData
        }))
    }

    async function fetchHomeworld(url) {
    
        const resp = await fetch(url);
        const data = await resp.json();
    
        setHomeworlds(prev => ({
            ...prev,
            [url]: data.name,
        }));
    }

    useEffect(() => {
        if (swPerson.results) {
            swPerson.results.forEach(person => {
                if (!homeworlds[person.homeworld]) {
                    fetchHomeworld(person.homeworld);
                }
            });
        }
    }, [swPerson]); 

    useEffect(() => {
        fetchPersons()
    }, []);

    return (
        <div>
            {swPerson.results && (
                <div className='sw-block'>
                    <h3>Characters (first page):</h3>
                    <ul className='sw-list'>
                        {swPerson.results.map(({name, gender, height, mass, birth_year, homeworld, films, starships}) => (
                            <li key={name}>
                                <div>Name: {name}</div>
                                <div>Gender: {gender}</div>
                                <div>Height: {height}</div>
                                <div>Mass: {mass}</div>
                                <div>Birth Year: {birth_year}</div>
                                <div>Homeworld: {homeworlds[homeworld] || 'Загрузка...'}</div>

                                {films.length > 0 && (
                                    <div>Films: 
                                        {!filmsByPerson[name] && (
                                            <button onClick={() => filmsForPerson(name, films)}>Download films</button>
                                        )}

                                        {filmsByPerson[name] && (
                                            <ul>
                                                {filmsByPerson[name].map(({title, release_date}) => (
                                                    <li key={title}>
                                                        <strong>{title}</strong> ({release_date})
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}

                                {starships.length > 0 && (
                                    <div>Starships: 
                                        {!starshipsByPerson[name] && (
                                            <button onClick={() => starshipsForPerson(name, starships)}>Load ships</button>
                                        )}

                                        {starshipsByPerson[name] && (
                                            <ul>
                                                {starshipsByPerson[name].map(({model, manufacturer, cost_in_credits, starship_class }) => (
                                                    <li key={model}>
                                                        <div><strong>Model: </strong> {model}</div>
                                                        <ul>
                                                            <li>
                                                            <div><strong>Manufacturer: </strong> {manufacturer}</div>
                                                                <div><strong>Cost: </strong> {cost_in_credits}</div>
                                                                <div><strong>Starship Class: </strong> {starship_class}</div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <p>Всего персонажей: {swPerson.count}</p>
                </div>
            )}
        </div>
    );
};