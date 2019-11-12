import { FEED } from "../actionTypes";

const initialState = {
  gifs: [],
  isLoading: false,
  error: null
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED.LOAD_GIFS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FEED.LOAD_GIFS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        gifs: action.payload.gifs
      };

    case FEED.UPDATE_GIFS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        gifs: [...state.gifs, ...action.payload.gifs]
      };
    case FEED.LOAD_GIFS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const loadFeed = searchQuery => (dispatch, getState, container) => {
  dispatch(loadFeedRequest);

  container.getFeed(
    { searchQuery },
    {
      onSuccess: ({ gifs }) => dispatch(loadFeedSuccess(gifs)),
      onError: error => dispatch(loadFeedError(error))
    }
  );
};

export const updateFeed = searchQuery => (dispatch, getState, container) => {
  dispatch(loadFeedRequest);
  const currentGifCount = getState().feed.gifs.length;

  container.getFeed(
    { searchQuery, offset: currentGifCount },
    {
      onSuccess: ({ gifs }) => dispatch(updateFeedSuccess(gifs)),
      onError: error => dispatch(loadFeedError(error))
    }
  );
};

const loadFeedRequest = {
  type: FEED.LOAD_GIFS_REQUEST
};

const loadFeedSuccess = gifs => ({
  type: FEED.LOAD_GIFS_SUCCESS,
  payload: { gifs }
});

const updateFeedSuccess = gifs => ({
  type: FEED.UPDATE_GIFS_SUCCESS,
  payload: { gifs }
});

const loadFeedError = error => ({
  type: FEED.LOAD_GIFS_ERROR,
  error
});
