// Gets the Spotify user's profile
// In this function, a call is made to https://api.spotify.com/v1/me using the browser's Fetch API 
// to get the profile data. The Authorization header is set to Bearer ${token}, where token is the 
// access token that we got from the https://accounts.spotify.com/api/token endpoint.
export async function fetchProfile(token) {
    
        // console.log(`inside fetchProfile - token: ${token}`);
    
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();    
}