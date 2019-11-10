export default ({ feedApiService }) => ({
  async getFeed({
    searchQuery,
    offset = 0,
    limit = 5,
    rating = "G",
    lang = "en"
  }) {
    const params = {
      q: searchQuery,
      limit,
      offset,
      rating,
      lang
    };

    const { data } = await feedApiService.get("gifs/search", params);

    return {
      ...data,
      gifs: data.gifs.map(this.coerceGif)
    };
  },
  coerceGif(rawGif) {
    return {
      ...rawGif
    };
  }
});
