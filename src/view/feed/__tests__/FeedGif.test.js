import React from "react";
import FeedGif from "../FeedGif";
import { render } from "@testing-library/react";

let utils;
beforeEach(() => {
  utils = render(
    <FeedGif
      gif={{
        src: "http://example.com/",
        title: "example title",
        height: "100"
      }}
    />
  );
});
describe("View :: Feed :: FeedGif", () => {
  test("it renders an image with correct src and alt attributes", () => {
    const image = utils.getByRole("img");
    expect(image.src).toBe("http://example.com/");
    expect(image.alt).toBe("example title");
  });
});
