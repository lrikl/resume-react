'use strict';
import React, { useEffect, useState } from 'react';
import './sw.scss';

import {
    Pagination,
    Button,
    CardMedia,
    CardContent,
    Card,
    Box,
    Grid,
    CircularProgress,
} from '@mui/material';

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
        try {
            let resp = null;

            try {
                resp = await fetch(`https://swapi.dev/api/people/?page=${page}`);

            } catch (error) {
                console.warn(`Main mirror failed: ${error.message}`);

                resp = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
    
                if (!resp.ok) {
                    console.warn(`Backup mirror failed: ${resp.status}`);
                    setHasMore(false);
                    return;
                }
            }

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
    
            setHasMore(Boolean(data.next));
    
            if (!data.next) {
                setAutoLoadMode(false);
            }
            
        } catch (error) {
            console.error('error fetch data:', error);
        } finally {
            setIsLoading(false);
        }
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

    async function fetchHomeworld(url) {
        setIsLoading(true);
        const resp = await fetch(url);
        const data = await resp.json();

        setHomeworlds(prev => ({
            ...prev,
            [url]: data.name,
        }));
        setIsLoading(false);
    }

    useEffect(() => {
        if (swPerson.results.length > 0) {
            swPerson.results.forEach(person => {
                if (!homeworlds[person.homeworld]) {
                    fetchHomeworld(person.homeworld);
                }
            });
        }
    }, [swPerson]);

    useEffect(() => {
        fetchPersons(currentPage);
    }, [currentPage]);

    function debounce(func, delay) { // фільтрує частотні запити func спрацює тільки після паузи в delay
        let timeout;
        
        return (...args) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => { 
                func(...args); // викликаємо функцію передаючи рестом усі аргументи вхідної функції
            }, delay);
        }; 
    }

    useEffect(() => {
        if (!autoLoadMode) {
            return;
        }

        const debounceHandleScroll = debounce(() => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!isLoading && hasMore) {
                    setCurrentPage(currentPage + 1); // повторні виклики: setCurrentPage(currentPage  => prev + 1) збільшать сторінку кілька разів, повторні виклики setCurrentPage(currentPage + 1) збільшать один раз
                }
            }
        }, 200);

        window.addEventListener('scroll', debounceHandleScroll);
        return () => window.removeEventListener('scroll', debounceHandleScroll);
    }, [autoLoadMode, isLoading, hasMore]);

    return (
        <div className='sw-block'>

            {swPerson.results.length > 0 && (
                <div className='sw-characters'>
                    <h2 className='sw-title'>Star Wars Characters</h2>
                    <div className='sw-list'>
                        {swPerson.results.map(({ name, gender, height, mass, hair_color, skin_color, eye_color, birth_year, homeworld, films, starships }) => (
                            <Card key={name} className='sw-list-item'>
                                <CardMedia
                                    component="img"
                                    alt="sw-img"
                                    image="./static/images/sw-person.webp"
                                />
                                <CardContent className='sw-list-content'>
                                    <div><strong>Name:</strong> {name}</div>
                                    <div><strong>Gender:</strong> {gender}</div>
                                    <div><strong>Height:</strong> {height}</div>
                                    <div><strong>Mass:</strong> {mass}</div>
                                    <div><strong>Hair Color:</strong> {hair_color}</div>
                                    <div><strong>Skin Color:</strong> {skin_color}</div>
                                    <div><strong>Eye Color:</strong> {eye_color}</div>
                                    <div><strong>Birth Year:</strong> {birth_year}</div>
                                    <div><strong>Homeworld:</strong> {homeworlds[homeworld] || 'Loading...'}</div>

                                    {films.length > 0 && (
                                        <div><strong> Films:</strong> 
                                            {!filmsByPerson[name] && (
                                                <Button size="small" sx={{ p: "4px", lineHeight: 1, fontSize: '12px' }} onClick={() => filmsForPerson(name, films)}>Load films</Button>
                                            )}
                                            {filmsByPerson[name] && (
                                                <ul className='sw-films'>
                                                    {filmsByPerson[name].map(({ title }) => (
                                                        <li key={title}>
                                                            <strong>{title}</strong>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}

                                    {starships.length > 0 && (
                                        <div><strong> Starships:</strong> 
                                            {!starshipsByPerson[name] && (
                                                <Button size="small" sx={{ p: "4px", lineHeight: 1, fontSize: '12px' }} onClick={() => starshipsForPerson(name, starships)}>Load ships</Button>
                                            )}
                                            {starshipsByPerson[name] && (
                                                <ul className='sw-starship'>
                                                    {starshipsByPerson[name].map(({ model, manufacturer, cost_in_credits, starship_class }) => (
                                                        <li key={model} >
                                                            <div><strong>Model:</strong> {model}</div>
                                                            <ul>
                                                                <li>
                                                                    <div><strong>Manufacturer:</strong> {manufacturer}</div>
                                                                    <div><strong>Cost:</strong> {cost_in_credits}$</div>
                                                                    <div><strong>Class:</strong> {starship_class}</div>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {isLoading && (
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <CircularProgress />
                </Grid>
            )}

            {!autoLoadMode && hasMore && !isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={() => setAutoLoadMode(true)}
                        >
                        Upload
                    </Button>
                </Box>
            )}
            
            {!autoLoadMode && swPerson.count > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                    <Pagination
                        count={Math.ceil(swPerson.count / 10)}
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        color="primary"
                        disabled={isLoading}
                        showFirstButton
                        showLastButton
                        shape="rounded" 
                        size="small" 
                    />
                </Box>
            )}
        </div>
    );
};