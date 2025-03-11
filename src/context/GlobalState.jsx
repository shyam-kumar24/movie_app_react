import { createContext, useEffect, useReducer, useState } from "react";
import Reducer from "./Reducer";
import { ADD_MOVIE_TO_WATCHED, ADD_MOVIE_TO_WATCHLIST, MOVE_TO_WATCHED, REMOVE_MOVIE_FROM_WATCHED, REMOVE_MOVIE_FROM_WATCHLIST } from "../types";


export const MovieContext = createContext(null);

const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

const GlobalState = ({ children }) => {
  const [searchMovieParam, setSearchMovieParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieSearchResult, setMovieSearchResult] = useState([]);

  const [state, dispatch] = useReducer(Reducer, initialState);

  async function fetchListOfMovies() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=bac279&s=${searchMovieParam}`
      );
      const result = await apiResponse.json();
      console.log(result);

      if (result && result.Search && result.Search.length > 0) {

        const detailedMovies = await Promise.all(
            result.Search.map(async (movie) => {
                const detailsResponse = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=bac279`)
                return detailsResponse.json()
            })
        )
        setMovieSearchResult(detailedMovies);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchMovieParam.trim() !== "") {
        fetchListOfMovies();
        console.log(searchMovieParam);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchMovieParam]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
    localStorage.setItem('watched', JSON.stringify(state.watched))
  },[state])


  function handleAddMovieToWatchList(movie) {
    console.log(movie);
    dispatch({
        type: ADD_MOVIE_TO_WATCHLIST,
        payload: movie
    })
  }

  function handleAddMovieToWatched(movie) {
    console.log(movie);
    dispatch({
        type: ADD_MOVIE_TO_WATCHED,
        payload: movie
    })
  }

  function handleRemoveFromWatchlist(imdbID){
    dispatch({
      type: REMOVE_MOVIE_FROM_WATCHLIST,
      payload: imdbID
    })
  }

  function handleRemoveFromWatched(imdbID){
    dispatch({
      type: REMOVE_MOVIE_FROM_WATCHED,
      payload: imdbID
    })
  }

  function handleMoveToWatched(movie){
    dispatch({
      type: MOVE_TO_WATCHED,
      payload: movie
    })
  }

  console.log(state, 'state');

  return (
    <MovieContext.Provider
      value={{
        searchMovieParam,
        setSearchMovieParam,
        loading,
        movieSearchResult,
        handleAddMovieToWatchList,
        handleAddMovieToWatched,
        state,
        handleRemoveFromWatchlist,
        handleRemoveFromWatched,
        handleMoveToWatched
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default GlobalState;

// manually done : to clear the catched data . 

// localStorage.removeItem("watchlist");
// localStorage.removeItem("watched");