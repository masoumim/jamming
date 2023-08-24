// Creates an ID and returns it
let nextId = 0;
export function generateId() {
  const result = nextId;
  nextId += 1;
  return result;
}

// This function accepts an object returned by the API call that contains tracks
// It returns a clean array of track objects with basic info for each
export function searchResultsToArray(searchResults){
  // For each of the items in search results, parse the data and create a new obj for each item  
  let searchResultsArray = [];

  for (let result in searchResults.tracks.items){
    const trackObject = {};
    trackObject.id = generateId();
    trackObject.uri = searchResults.tracks.items[result].uri;
    trackObject.name = searchResults.tracks.items[result].name;
    trackObject.artist = searchResults.tracks.items[result].artists[0].name;
    trackObject.album = searchResults.tracks.items[result].album.name;
    searchResultsArray.push(trackObject);    
  }
  
  return searchResultsArray;
}