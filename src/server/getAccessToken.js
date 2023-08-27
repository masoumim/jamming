    // Spotify Boilerplate: Returns an access token
    // In this function, we load the verifier from local storage and using both the code returned 
    // from the callback and the verifier to perform a POST to the Spotify token API. 
    // The API uses these two values to verify our request and it returns an access token.
   export async function getAccessToken(clientId, code) {
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "https://jamming-sigma.vercel.app");
        params.append("code_verifier", verifier);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const { access_token } = await result.json();        
        return access_token;
    }