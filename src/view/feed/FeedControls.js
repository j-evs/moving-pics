import React, { useState, useEffect } from "react";

import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { string, func } from "prop-types";

const FeedContols = ({ searchQuery, handleSearchQueryChange, isLoading }) => {
  const [css] = useStyletron();

  const [viewSearchQuery, setViewSearchQuery] = useState(searchQuery);
  useEffect(() => {
    if (searchQuery) {
      setViewSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSearchQueryChange(viewSearchQuery);
    }
  };

  return (
    <div className={css({ display: "flex" })}>
      <Input
        value={viewSearchQuery}
        onChange={e => {
          setViewSearchQuery(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        placeholder="Which gifs do you want to find?"
      />
      <Button onClick={() => handleSearchQueryChange(viewSearchQuery)}>
        Search
      </Button>
    </div>
  );
};

FeedContols.propTypes = {
  searchQuery: string,
  handleSearchQueryChange: func
};

export default FeedContols;
