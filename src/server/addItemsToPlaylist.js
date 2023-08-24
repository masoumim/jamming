// This function adds tracks to a playlist. Tracks are represented by a URI. The trackURIs param is an array of all URIs for each track in the playlist.
export async function addItemsToPlaylist(playlistId, accessToken, trackURIs) {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ uris: trackURIs })
    });

    return await result.json();
}