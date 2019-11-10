export default ({ feedRepository }) => {
  return async (searchQuery, { onSuccess, onError }) => {
    try {
      const gifs = await feedRepository.getFeed({ searchQuery });
      onSuccess(gifs);
    } catch (error) {
      onError(error);
    }
  };
};
