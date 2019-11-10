const API_URL = process.env.REACT_APP_API_URL || "https://api.giphy.com/v1/";
const API_KEY = "CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6";

const createUrl = (url, params) => {
  var searchParams = new URLSearchParams();
  for (let param in params) {
    searchParams.append(param, params[param]);
  }
  searchParams.append("api_key", API_KEY);

  return `${API_URL}${url}?${searchParams.toString()}`;
};

export const get = (url, params) => {
  return fetch(createUrl(url, params));
};
