// Creates an ID and returns it
// TODO: Reset nextId back to 0 when using Spotify API as I will no longer have hard-coded mock data with id: 1 and id: 2
let nextId = 3;
export function generateId() {
  const result = nextId;
  nextId += 1;
  return result;
}