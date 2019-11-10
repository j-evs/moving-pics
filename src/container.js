import * as feedApiService from "./infra/feed/feedApiService";
import makeFeedRepository from "./infra/feed/feedRepository";
import makeGetFeed from "./app/feed/getFeed";

// Infra
const feedRepository = makeFeedRepository({
  feedApiService
});

//App
const getFeed = makeGetFeed({
  feedRepository
});

export { getFeed };
