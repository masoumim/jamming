// This functions calls the Spotify API to search for a track
// The endpoint format: 'https://api.spotify.com/v1/search?q=thriller&type=track&limit=5'
export async function getSearchResults(searchBarInput, accessToken) {    
    const result = await fetch(`https://api.spotify.com/v1/search?q=${searchBarInput}&type=track&limit=6`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });

    return await result.json();    
}