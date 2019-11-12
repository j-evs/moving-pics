import React, { useState, useEffect } from "react";

import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

import { string, func } from "prop-types";

const FeedContols = ({ searchQuery, handleSearchQueryChange }) => {
  const [css] = useStyletron();

  // input view state
  const [viewSearchQuery, setViewSearchQuery] = useState(searchQuery);
  useEffect(() => {
    if (searchQuery) {
      setViewSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  // empty input error handling
  const [inputError, setInputError] = useState(false);
  const validateInput = () => {
    if (viewSearchQuery === "") {
      setInputError(true);
      return false;
    }
    setInputError(false);
    return true;
  };

  const changeSearchQuery = () => {
    if (validateInput()) {
      handleSearchQueryChange(viewSearchQuery);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      changeSearchQuery();
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
        error={inputError}
      />
      <Button onClick={changeSearchQuery}>Search</Button>
    </div>
  );
};

FeedContols.propTypes = {
  searchQuery: string,
  handleSearchQueryChange: func
};

export default FeedContols;
