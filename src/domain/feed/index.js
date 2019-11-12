import { string, arrayOf, shape } from "prop-types";

// Typescript (or Flow) interfaces & types would be defined here

export const GifType = shape({
  src: string.isRequired,
  title: string.isRequired,
  height: string.isRequired
});

export const GifsType = arrayOf(GifType);
