import movieTrailer from 'movie-trailer';
import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import instance from './axios';
import './Row.css';

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

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

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    console.log(movie?.name);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className={`rowPosters `}>
                {movies.map(movie => (
                    <img
                        className={`poster ${isLargeRow && "posterLarge"}`}
                        onClick={() => handleClick(movie)}
                        key={movie.id} src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row