import React from "react";

import { useStyletron } from "baseui";
import { Spinner } from "baseui/spinner";

const FeedSpinner = () => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      })}
    >
      <Spinner />
    </div>
  );
};

export default FeedSpinner;
