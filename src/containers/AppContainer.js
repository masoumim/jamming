// AppContainer.js - This top-level component handles user authorization on Spotify
// and fetching an access token to be passed as a prop to the App Component

import App from "@/containers/App";
import { useEffect } from "react";
import { spotifyAuth } from "@/server/spotifyAuth";

let params = "";
let code = "";

function AppContainer() {

    // window can only be accessed in the browser, node has no 'window' definition.
    useEffect(() => {        
        // We check to see if the url has a param named "code". If it does, it signifies the authorization / login to Spotify was successful
        params = new URLSearchParams(window.location.search);
        code = params.get("code");          
    },[]);
        
    // If URL does not contain 'code', render the button that authorizes the Jamming app on Spotify
    if(!code){
        return(
            <div className="login">            
                <h1>JAMMING</h1>
                <h2>Quickly create Spotify playlists</h2>
                <button className="connectbtn" onClick={spotifyAuth}>Connect your Spotify account</button>            
            </div>
        );
    }
    // Otherwise, render the AppContainer Component and pass it the access token as a prop
    else{
              
        return(<App urlCode={code}/>);
    }
}

export default AppContainer;