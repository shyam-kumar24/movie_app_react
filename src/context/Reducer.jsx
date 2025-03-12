import {ADD_MOVIE_TO_WATCHED, ADD_MOVIE_TO_WATCHLIST, MOVE_TO_WATCHED, REMOVE_MOVIE_FROM_WATCHED, REMOVE_MOVIE_FROM_WATCHLIST} from '../types'

export default function Reducer(state,action){
    switch(action.type){
        case ADD_MOVIE_TO_WATCHLIST: 

            if (state.watchlist.find(movie => movie.imdbID === action.payload.imdbID)) {
                return state;  // ✅ Prevent duplicate entries
            }

            console.log(action);
            return {
                ...state,
                watchlist: [action.payload, ...state.watchlist]
            }

        case ADD_MOVIE_TO_WATCHED:

            if (state.watched.find(movie => movie.imdbID === action.payload.imdbID)) {
                return state;  // ✅ Prevent duplicate entries
            }

            return {
                ...state,
                watched: [action.payload, ...state.watched]
            }

        case REMOVE_MOVIE_FROM_WATCHLIST: 
            return {
                ...state, watchlist: state.watchlist.filter((movieItem)  => movieItem.imdbID !== action.payload )
            }

        case REMOVE_MOVIE_FROM_WATCHED: 
            return {
                ...state, watched: state.watched.filter((movieItem)  => movieItem.imdbID !== action.payload)
            }

        case MOVE_TO_WATCHED: 
            return {
                ...state, watchlist: state.watchlist.filter(movieItem => movieItem.imdbID !== action.payload.imdbID),
                watched: [action.payload, ...state.watched]
            }
            
        default : 
            return state
            
    }
}