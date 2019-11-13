## Installation

Install dependencies via yarn or npm:

###### `yarn install`

## Scripts

This project was built with [Create React App](<[https://create-react-app.dev/](https://create-react-app.dev/)>), so the usual CRA scripts work:

###### `yarn start`

Runs the app in the development mode.

###### `yarn test`

Launches the test runner in the interactive watch mode

###### `yarn build`

Builds the app for production to the `build` folder.

###### `yarn eject`

Removes the single build dependency from the project and copies all the configuration files and the transitive dependencies into the project. (Should do this for a more complicated build process, which almost always happens with complex apps)

## Docs

### TLDR:

- used gif file extension to match the problem statement. For production environment should use MPEG4 + `<video>` for performance

- used `react-window` for infinite list virtualization

- implemented a sort of ddd style architecture

### Decisions, trade-offs & improvements suggestions

#### General

A lot of stuff I did is definitely overkill for an app with one use-case. However, the tools and approach should make some sense if one would plan to add new features & scale this type of app.

##### UI architecture

I've went for ddd-style for ui architecture because it proved to be highly maintainable and testable. Also it is easy to reason about where to add code for new features.

##### Rendering approach

I chose SPA given the time constraints. For production it might be beneficial to adopt SSR + rehydration:

1. If a user visits an url with a search query param we would save them a RTT for the initial view data fetch

2. Faster First Paint and First Contentful Paint because point #1

##### System design

Since we use an api key to fetch data, we should not expose it to client app. That's why there should be a backend app that would store the key, make API calls and proxy the response back to the client.

Having a dedicated server app also could give us benefits like:

- caching hot searches to save API rates(limits)

- acting as a Backend-For-Frontend to abstract away different API calls (if there would be such), exposing a GraphQL endopoint, etc.

- serve data compressed with Brotli

- serve the client only the exact data they need

- SSR

- etc...

Also should consider to adopt a micro-frontend approach from the get-go if we plan our UI to rapidly grow&scale

#### Performance

- Used `react-window` efficiently renders large (infinite) gif list

- Suggestion: Large GIFs are inefficient for delivering animated content. In production should use MPEG4/WebM videos for animations instead of GIF to save network bytes.

- Suggestion: serve content best suited to a user's device and network (i.e. smaller gifs/videos for users withlow-end mobile devices & 3G network) using tools like [this](https://github.com/GoogleChromeLabs/react-adaptive-hooks)
- Suggestion: introduce performance(JS) budget to improve and sustain user-experience and allow us to meet would-be performance goals.

#### UI

- Toggling between 1-3 column view not done due to the time constraints :(

- Suggestion: [manage redux boilerplate](<[https://redux.js.org/recipes/reducing-boilerplate](https://redux.js.org/recipes/reducing-boilerplate)>)

- Suggestion: track individual gif loading status & show a placeholder instead of blank box

- Suggestion: pick a i18n tool if app would support users within different locales

#### Testing

I've added tests for repository, use-case & some UI-components. I've used [react-testing-library](<[https://github.com/testing-library/react-testing-library](https://github.com/testing-library/react-testing-library)>) for it's intuitive and straight-forward API.

In order for UI to be more tolerable to changes, I would adopt Flow/Typescript for static type checks and focus more on integration and end-to-end tests as they bring much more confidence in our code than unit tests.

I haven't added any integration/e2e tests given the time constraints, because they require some initial boilerplate to get up and running.

#### Product

No "product" tools have been added, but production-ready solution would definitely include some sort of analytics tool to track user behavior for insights, A/B testing etc.

Also should consider SEO if we want organic-traffic. This could be done for example by introducing [Lighthouse CI](<[https://github.com/GoogleChrome/lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci)>) --seo check as a part of delivery/deploy pipeline

### Deployment
