// App.js - this component will assemble and display all of the sub components. 
// It will then export the assembled components to be rendered by /pages/index.js

// Import the Presentational Components
import SearchBar from "./SearchBar";
import Playlist from "./Playlist";
import SearchResultsContainer from "@/containers/SearchResultsContainer";

function App() {
    return (
        <div>
            <SearchBar />
            <SearchResultsContainer/>            
            <Playlist/>                    
        </div>
    );
}

export default App;