// This function creates a playlist on the users Spotify account
export async function createPlaylist(user, playlistName, accessToken) {
    const result = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
        method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ name: playlistName, description: playlistName, public: true })
    });

    return await result.json();
}