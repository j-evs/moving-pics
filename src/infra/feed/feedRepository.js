export default ({ feedApiService }) => ({
  async getFeed({
    searchQuery,
    offset = 0,
    limit = 10,
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
      gifs: data.map(this.coerceGif)
    };
  },
  coerceGif(rawGif) {
    return {
      src: rawGif.images.original.url,
      title: rawGif.title,
      height: rawGif.images.original.height
    };
  }
});
