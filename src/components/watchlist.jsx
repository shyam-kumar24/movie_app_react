import { useContext } from "react";
import { MovieContext } from "../context/GlobalState";

function MovieWatchList() {
  const { state,handleRemoveFromWatchlist,handleMoveToWatched } = useContext(MovieContext);

  return (
    <div className="movie-watchlist">
      <h1>Watch List</h1>
      <div className="watch-list-wrapper">
        {state.watchlist && state.watchlist.length > 0 ? (
          state.watchlist.map((movieItem) => (
            
              <div className="movie-card" key={movieItem.imdbID}>
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
                    
                    onClick={() => handleRemoveFromWatchlist(movieItem.imdbID)}
                  >
                    Remove from watchlist
                  </button>
                  <button onClick={() => handleMoveToWatched(movieItem)}>Move to watched</button>
                
                </div>
              
            </div>

          ))
        ) : (
          <h1>NO movie added in watchlist</h1>
        )}
      </div>
    </div>
  );
}

export default MovieWatchList;
