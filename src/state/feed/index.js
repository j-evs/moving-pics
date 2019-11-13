import { FEED } from "../actionTypes";
import { oneOf } from "prop-types";

export const feedStatuses = {
  INIT: "INIT",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};
export const FeedStatusesType = oneOf(Object.values(feedStatuses));

const initialState = {
  gifs: [],
  status: feedStatuses.INIT,
  error: null
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED.LOAD_GIFS_REQUEST:
      return {
        ...state,
        status: feedStatuses.LOADING,
        error: null
      };

    case FEED.LOAD_GIFS_SUCCESS:
      return {
        ...state,
        status: feedStatuses.SUCCESS,
        gifs: action.payload.gifs
      };

    case FEED.UPDATE_GIFS_SUCCESS:
      return {
        ...state,
        status: feedStatuses.SUCCESS,
        gifs: [...state.gifs, ...action.payload.gifs]
      };
    case FEED.LOAD_GIFS_ERROR:
      return {
        ...state,
        status: feedStatuses.ERROR,
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
