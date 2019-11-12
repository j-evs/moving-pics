import makeFeedRepository from "./feedRepository";

describe("Infra :: Feed :: feedRepository", () => {
  let feedRepository;
  let feedApiService;

  const successResponse = Promise.resolve({
    data: [
      {
        images: {
          original: {
            url: "http://example.com",
            height: "100"
          }
        },
        title: "some title"
      }
    ]
  });
  const failedResponse = Promise.reject({
    errors: ["error"]
  });

  describe("getFeed", () => {
    it("uses feedApiService to make the request", async () => {
      feedApiService = {
        get: jest.fn().mockReturnValue(successResponse)
      };

      feedRepository = makeFeedRepository({ feedApiService });

      await feedRepository.getFeed({ searchQuery: "example", offset: "10" });

      expect(feedApiService.get).toBeCalledWith("gifs/search", {
        lang: "en",
        limit: 10,
        offset: "10",
        q: "example",
        rating: "G"
      });
    });

    describe("when request succeeds", () => {
      beforeEach(() => {
        feedApiService = {
          get: jest.fn().mockReturnValue(successResponse)
        };

        feedRepository = makeFeedRepository({ feedApiService });
      });

      it("resolves with gif data", () => {
        expect(
          feedRepository.getFeed({
            searchQuery: "example",
            offset: "10"
          })
        ).resolves.toEqual({
          gifs: [
            { height: "100", src: "http://example.com", title: "some title" }
          ]
        });
      });
    });

    describe("when request fails", () => {
      beforeEach(() => {
        feedApiService = {
          get: jest.fn().mockReturnValue(failedResponse)
        };

        feedRepository = makeFeedRepository({ feedApiService });
      });

      it("rejects with errors", () => {
        expect(
          feedRepository.getFeed({
            searchQuery: "example",
            offset: "10"
          })
        ).rejects.toMatchObject({
          errors: ["error"]
        });
      });
    });
  });
});
