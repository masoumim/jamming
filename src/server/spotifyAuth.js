// spotifyAuth - This function handles user authorization on Spotify
export function spotifyAuth() {

    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID; // The Jamming App client ID

    // Spotify Boilerplate: Uses the built-in URLSearchParams object to set the query string. 
    // The query string will be used to request permission from a user to allow the Jamming app to access their Spotify profile info
    async function authorizeApp(clientId) {

        // Generate PKCE verifier and challenge data which is used to verify that our request is authentic. 
        // We use local storage to store the verifier data, which works like a password for the token exchange process.
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", clientId); // The Jamming App client ID
        params.append("response_type", "code");
        params.append("redirect_uri", "https://jamming-sigma.vercel.app"); // The URI a user is redirected to after authorizing on Spotify
        params.append("scope", "user-read-private user-read-email playlist-modify-public"); // We are requesting 3 scopes which allow fetching the user's profile data. searching for items and create / modify public playlists.
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    // Generates and returns a random code
    function generateCodeVerifier(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    // Generates and returns a code challenge using the random code verifier
    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    authorizeApp(clientId);
}