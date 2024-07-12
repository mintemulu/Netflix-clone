import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from './axios'; // Assuming you have a configured axios instance
import requests from './requests';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        // Fetch movie data from API
        const response = await axios.get(requests.fetchNetflixOriginals);
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        setMovie(response.data.results[randomIndex]);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError(error);
      }
    }

    fetchMovie();
  }, []); // Empty dependency array to ensure useEffect runs only once

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="banner">
      {movie && (
        <>
          <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className="banner__image" />
          <div className="banner__content">
            <h1 className="banner__title">{movie.title}</h1>
            <p className="banner__description">{movie.overview}</p>
            <div className="banner__buttons">
              <button className="banner__button">Play</button>
              <button className="banner__button">My List</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Banner;
