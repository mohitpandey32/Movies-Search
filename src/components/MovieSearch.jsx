import { useEffect, useState } from "react"
import './MovieSearch.css'

export default function MovieSearch() {
const[movies, setMovies] = useState([]);
const[query, setquery] = useState("Harry Potter");
const[loading, setLoading] = useState(false);


let url = `https://www.omdbapi.com/?apikey=c1dc516d&s=${query}`;

const FetchMovies = async () => {
    setLoading(true);
let res = await fetch(url);
let data = await res.json();
console.log(data);
if(data.Search) {
    setMovies(data.Search);
}
else {
    setMovies([]);
}
setLoading(false);

}

const handlequery = (evt) => {
    console.log(evt.target.value);
    setquery(evt.target.value);
}

const handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
        FetchMovies();
    }
}

useEffect(() => {
    FetchMovies();
  }, []);

    return(
        <div className="movie-search-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="main-title">
                        <span className="title-gradient">Discover</span> Movies
                    </h1>
                    <p className="subtitle">Search through millions of movies and find your next favorite film</p>
                    
                    <div className="search-container">
                        <div className="search-box">
                            <input 
                                value={query}
                                type="text"
                                placeholder="Search for movies..."
                                onChange={handlequery}
                                onKeyPress={handleKeyPress}
                                className="search-input"
                            />
                            <button onClick={FetchMovies} className="search-button">
                                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="floating-elements">
                    <div className="floating-circle circle-1"></div>
                    <div className="floating-circle circle-2"></div>
                    <div className="floating-circle circle-3"></div>
                </div>
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                    <p className="loading-text">Searching for amazing movies...</p>
                </div>
            )}

            {!loading && movies.length > 0 && (
                <div className="results-section">
                    <h2 className="results-title">Search Results</h2>
                    <div className="movies-grid">
                        {movies.map((movie, index) => {
                            return (
                                <div key={movie.imdbID} className="movie-card" style={{'--delay': `${index * 0.1}s`}}>
                                    <div className="movie-poster-container">
                                        <img 
                                            src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'} 
                                            alt={movie.Title}
                                            className="movie-poster"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/300/450';
                                            }}
                                        />
                                        <div className="movie-overlay">
                                            <div className="movie-info">
                                                <h3 className="movie-title">{movie.Title}</h3>
                                                <p className="movie-year">{movie.Year}</p>
                                                <p className="movie-type">{movie.Type}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {!loading && movies.length === 0 && query && (
                <div className="no-results">
                    <div className="no-results-icon">🎬</div>
                    <h3>No movies found</h3>
                    <p>Try searching with different keywords</p>
                </div>
            )}
        </div>
    )
}