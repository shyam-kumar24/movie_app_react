import { useContext } from "react"
import { MovieContext } from "../context/GlobalState"


function MovieAlreadyWatched(){

    const {state, handleRemoveFromWatched} = useContext(MovieContext)

    return (
        <div className="movie-watchlist">
            <h1>Movie watched</h1>
            <div className="watched-wrapper">
                {state.watched && state.watched.length > 0 ? (
                state.watched.map((movieItem) => (
                    
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
                            
                            onClick={() => handleRemoveFromWatched(movieItem.imdbID)}
                        >
                            Remove from watched
                        </button>
                        
                        </div>
                    
                    </div>

                ))
                ) : (
                <h1>NO movie added in the watched</h1>
                )}
            </div>
        </div>
    )
}

export default MovieAlreadyWatched