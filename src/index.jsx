import { useContext } from "react";
import { MovieContext } from "./context/GlobalState";
import MovieCard from "./components/movie-card.jsx";
import './movie.css'
import MovieWatchList from "./components/watchlist.jsx";
import MovieAlreadyWatched from "./components/watched.jsx";

export default function MovieApp() {
  const { searchMovieParam ,setSearchMovieParam,loading , movieSearchResult} = useContext(MovieContext);

  return (
    <div className="movie-app">
      <h1>Movie app</h1>

      <div className="watch-list-details-container">
        <MovieWatchList/>
        <MovieAlreadyWatched/>
      </div>

      <div className="search-container">
        <input
          type="text"
          name="searchMovieParam"
          value={searchMovieParam}
          onChange={(event) => setSearchMovieParam(event.target.value)}
          placeholder="search for a movie"
        />
      </div>
      {
        loading ? <h1>Fetching list of movies . Please wait. </h1> : null
      }
      <div className="movie-search-results-container">
            {
                movieSearchResult && movieSearchResult.length > 0 && !loading? 
                movieSearchResult.map((movieItem) => <MovieCard key={movieItem.imdbID} movieItem={movieItem}/>)
                : (<h1>No movie result found ! please search something other.</h1>)
            }
      </div>
    </div>
  );
}
