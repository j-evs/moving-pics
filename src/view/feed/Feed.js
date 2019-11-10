import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadFeed } from "../../state/feed";

import { updateURL, getParam } from "../Router";

import { Button } from "baseui/button";
import { Input } from "baseui/input";

import styles from "./Feed.module.css";

const SEARCH_QUERY_PARAM = "search";

const Gif = ({ src }) => <img className={styles.gif} src={src} />;

const Feed = ({ loadFeed, feed, searchQuery, updateURL }) => {
  const [viewSearch, setViewSearch] = useState(searchQuery);

  useEffect(() => {
    if (searchQuery) {
      setViewSearch(searchQuery);
      loadFeed(searchQuery);
    }
  }, [searchQuery, loadFeed]);

  const areGifsLoaded = Boolean(feed.gifs.length);

  return (
    <div>
      <div className={styles.controls}>
        <Input
          value={viewSearch}
          onChange={e => {
            setViewSearch(e.target.value);
          }}
          placeholder="Which gifs do you want to find?"
        />
        <Button onClick={() => updateURL(viewSearch)}>Search</Button>
      </div>
      {areGifsLoaded && feed.gifs.map(({ src }) => <Gif key={src} src={src} />)}
    </div>
  );
};

const mapStateToProps = ({ isLoading, feed }, { location, history }) => {
  return {
    isLoading,
    feed,
    searchQuery: getParam(location, SEARCH_QUERY_PARAM),
    updateURL: searchQuery =>
      updateURL(history, { [SEARCH_QUERY_PARAM]: searchQuery })
  };
};

const mapDispatchToProps = {
  loadFeed
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
