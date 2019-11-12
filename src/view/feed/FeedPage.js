import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadFeed, updateFeed } from "../../state/feed";
import { updateURL, getParam } from "../Router";

import FeedControls from "./FeedControls";
import FeedList from "./FeedList";
import FeedSpinner from "./FeedSpinner";
import FeedError from "./FeedError";

import { GifsType } from "../../domain/feed";
import { string, func, bool, shape } from "prop-types";
import { useStyletron } from "baseui";

const SEARCH_QUERY_PARAM = "search";

const FeedPage = ({
  searchQuery,
  updateSearchQuery,
  feed,
  loadFeed,
  updateFeed
}) => {
  const [css] = useStyletron();

  // Trigger load on search query change
  useEffect(() => {
    if (searchQuery) {
      loadFeed(searchQuery);
    }
  }, [searchQuery, loadFeed]);
  return (
    <div
      className={css({
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      })}
    >
      <FeedControls
        searchQuery={searchQuery}
        handleSearchQueryChange={updateSearchQuery}
      />
      <FeedList
        gifs={feed.gifs}
        updateFeed={() => updateFeed(searchQuery)}
        searchQuery={searchQuery}
        isLoading={feed.isLoading}
        className={css({ flexGrow: 1 })}
      />
      {feed.isLoading && <FeedSpinner />}
      {feed.error && <FeedError>Something went wrong: {feed.error}</FeedError>}
    </div>
  );
};

const mapStateToProps = ({ feed }, { location, history }) => {
  return {
    feed,
    searchQuery: getParam(location, SEARCH_QUERY_PARAM),
    updateSearchQuery: searchQuery =>
      updateURL(history, { [SEARCH_QUERY_PARAM]: searchQuery })
  };
};

const mapDispatchToProps = {
  loadFeed,
  updateFeed
};

FeedPage.propTypes = {
  searchQuery: string,
  updateSearchQuery: func,
  loadFeed: func,
  feed: shape({
    gifs: GifsType,
    isLoading: bool,
    error: string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
