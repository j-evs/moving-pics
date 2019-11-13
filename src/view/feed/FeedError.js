import React from "react";

import { Toast, KIND } from "baseui/toast";
import { useStyletron } from "baseui";

import { node } from "prop-types";

const FeedError = ({ children }) => {
  const [css] = useStyletron();

  return (
    <div className={css({ position: "fixed", bottom: 0, right: "20px" })}>
      <Toast kind={KIND.negative}>{children}</Toast>
    </div>
  );
};

FeedError.propTypes = {
  children: node.isRequired
};

export default FeedError;
