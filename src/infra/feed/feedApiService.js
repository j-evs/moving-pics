const API_URL = process.env.REACT_APP_API_URL || "https://api.giphy.com/v1/";

// For demo purposes only.
// API_KEY shouldn't be exposed to client.
const API_KEY = "CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6";

const createUrl = (url, params) => {
  var searchParams = new URLSearchParams();
  for (let param in params) {
    searchParams.append(param, params[param]);
  }
  searchParams.append("api_key", API_KEY);

  return `${API_URL}${url}?${searchParams.toString()}`;
};

export const get = (url, params) =>
  fetch(createUrl(url, params))
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res;
    })
    .then(res => res.json());
