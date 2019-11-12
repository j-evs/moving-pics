import React, { useEffect, useLayoutEffect, useRef } from "react";
import { VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useStyletron } from "baseui";

import FeedGif from "./FeedGif";

import { GifsType } from "../../domain/feed";
import { func } from "prop-types";

const FeedList = ({ gifs, updateFeed, isLoading, searchQuery, ...rest }) => {
  const [css] = useStyletron();

  const Row = ({ index, style, data }) => {
    return (
      <div style={style}>
        <FeedGif gif={data[index]} />
      </div>
    );
  };

  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [gifs]);

  const handleRenderedItemsChange = ({ visibleStopIndex }) => {
    const isLastItemVisible = visibleStopIndex === gifs.length - 1;
    if (!isLoading && isLastItemVisible) {
      updateFeed();
    }
  };

  return (
    <div {...rest}>
      <AutoSizer>
        {({ width, height }) => (
          <VariableSizeList
            height={height}
            width={width}
            itemCount={gifs.length}
            itemSize={i => Number(gifs[i].height)}
            itemData={gifs}
            itemKey={(index, data) => data[index].src}
            onItemsRendered={handleRenderedItemsChange}
            ref={listRef}
          >
            {Row}
          </VariableSizeList>
        )}
      </AutoSizer>
    </div>
  );
};

FeedList.propTypes = {
  gifs: GifsType,
  updateFeed: func
};

export default FeedList;
