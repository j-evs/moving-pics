import React from "react";

import { GifType } from "../../domain/feed";

import { useStyletron } from "baseui";

const Gif = ({ gif: { src, title }, ...rest }) => {
  const [css] = useStyletron();
  return (
    <img
      className={css({ display: "block", margin: "0 auto", maxWidth: "100vw" })}
      src={src}
      alt={title}
      {...rest}
    />
  );
};

Gif.propTypes = {
  gif: GifType.isRequired
};

export default Gif;
