# Jamming
A web app that lets users quickly find tracks and build custom [Spotify](https://www.spotify.com) playlists.

App Link: https://jamming-sigma.vercel.app

# Project technical details:

**Language:** Node.js / JavaScript

**Framework:** [Next.js](https://nextjs.org)

**Styling:** Flexbox / CSS Grid

**Deployment platform:** [Vercel](https://vercel.com)


# Project info:
JAMMING is a React / Next.js Single-page application that lets users quickly search for tracks, create playlists and save them to thier Spotify account. The app uses the [Spotify API](https://developer.spotify.com/documentation/web-api) for fetching tracks, creating playlists and adding tracks to them. If you don't have a Spotify account you can [create one for free]([https://duckduckgo.com](https://www.spotify.com/ca-en/signup))


# Container / Presentational design pattern:
For this project, I used the [container component / presentational component design pattern](https://www.freecodecamp.org/news/separation-of-concerns-react-container-and-presentational-components/). This pattern ensures a [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) whereby container components control state variables and the logic that changes them while the presentational components contain only the JSX code to be rendered. In this pattern, props are passed to the presentational child components which in turn use those props to render the page. As the state of props change in the container components, the presentational components are automatically updated.
