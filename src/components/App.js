// App.js - this component will assemble and display all of the sub components. 
// It will then export the assembled components to be rendered by /pages/index.js

// Import the Presentational Components
import SearchBar from "./SearchBar";
import Playlist from "./Playlist";
import Tracklist from "./Tracklist";

function App() {
    return (
        <div>
            <SearchBar />
            <Tracklist/>                
            <Playlist/>                    
        </div>
    );
}

export default App;