import React from "react";
import { Paragraph1 } from "baseui/typography";
import { node } from "prop-types";

const FeedStatusMessage = ({ children }) => (
  <Paragraph1 paddingLeft="16px">{children}</Paragraph1>
);

FeedStatusMessage.propTypes = {
  children: node.isRequired
};

export default FeedStatusMessage;
