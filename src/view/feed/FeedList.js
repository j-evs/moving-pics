import React, { useEffect, useRef } from "react";
import { VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useWindowSize } from "../helpers";
import FeedGif from "./FeedGif";

import { GifsType } from "../../domain/feed";
import { func } from "prop-types";

const Row = ({ index, style, data }) => {
  return (
    <div style={style}>
      <FeedGif gif={data[index]} />
    </div>
  );
};

const FeedList = ({ gifs, updateFeed, isLoading, searchQuery, ...rest }) => {
  const { width: windowWidth } = useWindowSize();

  // Check if last item is in view and update feed
  const handleRenderedItemsChange = ({ visibleStopIndex }) => {
    const isLastItemVisible = visibleStopIndex === gifs.length - 1;
    if (!isLoading && isLastItemVisible) {
      updateFeed();
    }
  };

  // Clear react-window style cache on gifs reset for correct gif positioning
  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [gifs]);

  // Scroll to top on search query change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(0);
    }
  }, [searchQuery]);

  // Calculate react-window list item size for proper responsive gif height
  const calculateVirtualListItemSize = i => {
    const width = Number(gifs[i].width);
    const height = Number(gifs[i].height);

    if (width > windowWidth) {
      const ratio = windowWidth / width;
      return height * ratio;
    }
    return height;
  };

  return (
    <div {...rest}>
      <AutoSizer>
        {({ width, height }) => (
          <VariableSizeList
            height={height}
            width={width}
            itemCount={gifs.length}
            itemSize={calculateVirtualListItemSize}
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
