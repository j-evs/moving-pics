import React from "react";
import { Spinner } from "baseui/spinner";
import { useStyletron } from "baseui";

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
