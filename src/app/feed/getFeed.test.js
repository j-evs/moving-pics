import makeGetFeed from "./getFeed";

describe("App :: Feed :: getFeed", () => {
  let getFeed;
  let mockFeedRepository;

  it("passes the search query and offset to the repository", async () => {
    mockFeedRepository = {
      getFeed: jest.fn()
    };

    getFeed = makeGetFeed({
      feedRepository: mockFeedRepository
    });

    const onSuccess = () => {};
    const onError = () => {};

    await getFeed(
      { searchQuery: "example", offset: "10" },
      { onSuccess, onError }
    );

    expect(mockFeedRepository.getFeed).toBeCalledWith({
      searchQuery: "example",
      offset: "10"
    });
  });

  describe("when it succeeds", () => {
    beforeEach(() => {
      mockFeedRepository = {
        getFeed: jest.fn().mockReturnValue([{ src: "http://example.com" }])
      };

      getFeed = makeGetFeed({
        feedRepository: mockFeedRepository
      });
    });

    it("calls onSuccess with gifs", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      await getFeed(
        { searchQuery: "example", offset: "10" },
        { onSuccess, onError }
      );

      expect(onSuccess).toBeCalledWith([{ src: "http://example.com" }]);
      expect(onError).not.toBeCalled();
    });
  });

  describe("when it fails", () => {
    beforeEach(() => {
      mockFeedRepository = {
        getFeed: jest.fn().mockImplementation(() => {
          throw new Error("Err");
        })
      };

      getFeed = makeGetFeed({
        feedRepository: mockFeedRepository
      });
    });

    it("calls onError with error", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      await getFeed(
        { searchQuery: "example", offset: "10" },
        { onSuccess, onError }
      );

      expect(onError).toBeCalledWith(new Error("Err"));
      expect(onSuccess).not.toBeCalled();
    });
  });
});
