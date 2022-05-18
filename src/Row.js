import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import instance from './axios';
import './Row.css';

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className={`rowPosters `}>
                {movies.map(movie => (
                    <img className={`poster ${isLargeRow && "posterLarge"}`} key={movie.id} src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            <YouTube videoId={trailerUrl} opts={opts} />
        </div>
    )
}

export default Row