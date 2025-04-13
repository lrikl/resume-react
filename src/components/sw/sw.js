'use strict';
import React, { useEffect, useState } from 'react';

import './sw.scss';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default () => {
    const [swPerson, setSwPerson] = useState({ results: [], count: 0 });
    const [filmsByPerson, setFilmsForPerson] = useState({});
    const [starshipsByPerson, setStarshipsForPerson] = useState({});
    const [homeworlds, setHomeworlds] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [autoLoadMode, setAutoLoadMode] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    

    async function fetchPersons(page = 1) {
        setIsLoading(true);

        const resp = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        const data = await resp.json();

        setSwPerson(prev => {
            const newResults = page === 1 || !autoLoadMode
                ? data.results
                : [...prev.results, ...data.results];

            return {
                ...data,
                results: newResults
            };
        });

        if(!data.next) {
            setAutoLoadMode(false);
        }

        setHasMore(Boolean(data.next));

        setIsLoading(false);
    }

    useEffect(() => {
        fetchPersons(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (swPerson.results.length > 0) {
            swPerson.results.forEach(person => {
                if (!homeworlds[person.homeworld]) {
                    fetchHomeworld(person.homeworld);
                }
            });
        }
    }, [swPerson]);

    async function fetchHomeworld(url) {
        const resp = await fetch(url);
        const data = await resp.json();

        setHomeworlds(prev => ({
            ...prev,
            [url]: data.name,
        }));
    }

    async function filmsForPerson(name, filmUrls) {
        const filmData = await Promise.all(filmUrls.map(async (url) => {
            const resp = await fetch(url);
            return await resp.json();
        }));

        setFilmsForPerson(prev => ({
            ...prev,
            [name]: filmData
        }));
    }

    async function starshipsForPerson(name, starshipUrls) {
        const starshipData = await Promise.all(starshipUrls.map(async (url) => {
            const resp = await fetch(url);
            return await resp.json();
        }));

        setStarshipsForPerson(prev => ({
            ...prev,
            [name]: starshipData
        }));
    }

    useEffect(() => {
        if (!autoLoadMode) {
            return;
        }

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && hasMore) {
                setCurrentPage(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        setTimeout(() => {
            window.scrollBy(0, 1);
        }, 1000);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [autoLoadMode, isLoading, hasMore]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };



    return (
        <div className='sw-block'>


            {swPerson.results.length > 0 && (
                <div className='sw-characters'>
                    <h2 className='sw-title'>Star Wars Characters</h2>
                    <ul className='sw-list'>
                        {swPerson.results.map(({ name, gender, height, mass, hair_color, skin_color, eye_color, birth_year, homeworld, films, starships }) => (
                            <li key={name}>
                                <img src='./static/images/sw-person.webp' />
                                <div>Name: {name}</div>
                                <div>Gender: {gender}</div>
                                <div>Height: {height}</div>
                                <div>Mass: {mass}</div>
                                <div>Hair Color: {hair_color}</div>
                                <div>Skin Color: {skin_color}</div>
                                <div>Eye Color: {eye_color}</div>
                                <div>Birth Year: {birth_year}</div>
                                <div>Homeworld: {homeworlds[homeworld] || 'Загрузка...'}</div>

                                {films.length > 0 && (
                                    <div>Films:
                                        {!filmsByPerson[name] && (
                                            <button onClick={() => filmsForPerson(name, films)}>Load films</button>
                                        )}
                                        {filmsByPerson[name] && (
                                            <ul>
                                                {filmsByPerson[name].map(({ title, release_date }) => (
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
                                                {starshipsByPerson[name].map(({ model, manufacturer, cost_in_credits, starship_class }) => (
                                                    <li key={model}>
                                                        <div><strong>Model:</strong> {model}</div>
                                                        <ul>
                                                            <li>
                                                                <div><strong>Manufacturer:</strong> {manufacturer}</div>
                                                                <div><strong>Cost:</strong> {cost_in_credits}</div>
                                                                <div><strong>Class:</strong> {starship_class}</div>
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
                </div>
            )}

            {isLoading && <div>Загрузка...</div>}

            {hasMore && !isLoading && !autoLoadMode &&
                <button 
                    onClick={() => {
                        setAutoLoadMode(true);
                    }}>
                    Автопрокрутка
                </button>
            }
            
            
            {!autoLoadMode && <div className='pagination'>
                {Array.from({ length: Math.ceil(swPerson.count / 10) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => {
                            setAutoLoadMode(false);
                            handlePageClick(i + 1); 
                        }}
                        className={currentPage === i + 1 ? 'active' : ''}
                        
                    >
                        {i + 1}
                    </button>
                ))}
            </div>}

        </div>
    );
};