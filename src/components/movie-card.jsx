import { useContext } from "react";
import { MovieContext } from "../context/GlobalState";

function MovieCard({ movieItem }) {
  const { handleAddMovieToWatchList, handleAddMovieToWatched, state } =
    useContext(MovieContext);

  return (
    <div className="movie-card">
      <div className="img">
        {movieItem?.Poster ? (
          <img src={movieItem.Poster} alt="" />
        ) : (
          <div className="fill-image">no image</div>
        )}
      </div>
      <div className="movie-info">
        <h3>{movieItem.Title}</h3>
        <h4>{movieItem.Year}</h4>
      </div>
      <div className="buttons-wrapper">
        <button
          disabled={
            state.watchlist.findIndex(
              (item) => item.imdbID === movieItem.imdbID
            ) > -1
              ? true
              : false
          }
          onClick={() => handleAddMovieToWatchList(movieItem)}
        >
          Add to watchlist
        </button>
        <button
          disabled={state.watched.findIndex(
            (item) => item.imdbID === movieItem.imdbID
          ) > -1 ? true : false}
          onClick={() => handleAddMovieToWatched(movieItem)}
        >
          Add to watched
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
