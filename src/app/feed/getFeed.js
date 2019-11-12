export default ({ feedRepository }) => {
  return async ({ searchQuery, offset }, { onSuccess, onError }) => {
    try {
      const gifs = await feedRepository.getFeed({ searchQuery, offset });
      onSuccess(gifs);
    } catch (error) {
      onError(error);
    }
  };
};
