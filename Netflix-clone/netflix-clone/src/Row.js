import React, { useState, useEffect } from 'react';
import axios from './axios';  // Import the configured axios instance
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      console.log('Fetching data from:', fetchUrl);  // Log the fetchUrl to verify it's correct
      try {
        const request = await axios.get(fetchUrl);
        console.log('Data fetched:', request.data.results);  // Log the fetched data
        setMovies(request.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);  // Log any errors
        setError(error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log('Fetching trailer for movie:', movie?.name || movie?.title || movie?.original_name || movie?.original_title || "");  // Log the movie name
      movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title || "")
        .then(url => {
          console.log('Trailer URL:', url);  // Log the trailer URL
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch(error => {
          console.error('Error fetching trailer:', error);
          setTrailerUrl("");
        });
    }
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map(movie => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}  
            alt={movie.name || movie.title || movie.original_name || movie.original_title}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
