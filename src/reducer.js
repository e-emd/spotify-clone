export const initialState = {
  user: null,
  playlists: [],
  item: null,
  ///TODO
  top_artists: null,
  discover_weekly: null,
  playing: false,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_SPOTIFY':
      return {
        ...state,
        spotify: action.spotify,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_ITEM':
      return {
        ...state,
        item: action.item,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.playing,
      };
    case 'SET_TOP_ARTIST':
      return {
        ...state,
        top_artists: action.top_artists,
      };
    default:
      return state;
  }
};

export default reducer;
