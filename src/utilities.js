// Creates an ID and returns it
// TODO: Reset nextId back to 0 when using Spotify API as I will no longer have hard-coded mock data with id: 1 and id: 2
let nextId = 3;
export function generateId() {
  const result = nextId;
  nextId += 1;
  return result;
}

// This function accepts an object returned by the API call that contains tracks
// It returns a clean array of track objects with basic info for each
export function searchResultsToArray(searchResults){

  // TODO: For each of the 5 max items in search results, parse the data...
  console.log(`searchResultsToArray: ${searchResults.tracks.items[0].name}`);

  return searchResults;
  
}