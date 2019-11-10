import React from "react";
import { connect } from "react-redux";
import { loadFeed } from "../../state/feed";

const Feed = ({ loadFeed }) => {
  return (
    <div>
      <input placeholder="Which gifs do you want to find?"></input>
      <button onClick={() => loadFeed("kittens")}>Search</button>
    </div>
  );
};

const mapStateToProps = ({ isLoading, feed }) => ({
  isLoading,
  feed
});

const mapDispatchToProps = {
  loadFeed
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
