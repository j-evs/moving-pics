import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  loadFeed,
  updateFeed,
  feedStatuses,
  FeedStatusesType
} from "../../state/feed";
import { updateURL, getParam } from "../Router";
import { GifsType } from "../../domain/feed";

import FeedControls from "./FeedControls";
import FeedList from "./FeedList";
import FeedSpinner from "./FeedSpinner";
import FeedError from "./FeedError";
import FeedStatusMessage from "./FeedStatusMessage";

import { useStyletron } from "baseui";
import { string, func, shape } from "prop-types";

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

  const isFeedLoading = feed.status === feedStatuses.isLoading;
  const isFeedEmpty = feed.gifs.length === 0;
  const renderFeed = () => {
    if (isFeedLoading && isFeedEmpty) {
      return <FeedSpinner />;
    }

    if (feed.error) {
      return <FeedError>Something went wrong: {feed.error}</FeedError>;
    }

    if (feed.status === feedStatuses.INIT) {
      return <FeedStatusMessage>Search above for cool gifs!</FeedStatusMessage>;
    }

    if (isFeedEmpty && feed.status === feedStatuses.SUCCESS) {
      return (
        <FeedStatusMessage>Sorry, couldn't find anything</FeedStatusMessage>
      );
    }

    return (
      <FeedList
        gifs={feed.gifs}
        updateFeed={() => updateFeed(searchQuery)}
        searchQuery={searchQuery}
        isLoading={isFeedLoading}
        className={css({ flexGrow: 1 })}
      />
    );
  };

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
      {renderFeed()}
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
    gifs: GifsType.isRequired,
    status: FeedStatusesType.isRequired,
    error: string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
