import React from "react";
import FeedControls from "../FeedControls";
import { render, fireEvent } from "@testing-library/react";

let utils;
let handleChange;
beforeEach(() => {
  handleChange = jest.fn();
  utils = render(
    <FeedControls
      type="checkbox"
      searchQuery="example"
      handleSearchQueryChange={handleChange}
    />
  );
});
describe("View :: Feed :: FeedControls", () => {
  test("it renders search query in the input", () => {
    const input = utils.getByPlaceholderText("Which gifs do you want to find?");
    expect(input.value).toBe("example");
  });

  test("it calls handleSearchQueryChange on search button click", () => {
    const button = utils.getByText("Search");
    fireEvent.click(button);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("it calls handleSearchQueryChange with updated search query", () => {
    const input = utils.getByPlaceholderText("Which gifs do you want to find?");
    const button = utils.getByText("Search");
    fireEvent.change(input, { target: { value: "kittens" } });
    fireEvent.click(button);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("kittens");
  });
});
