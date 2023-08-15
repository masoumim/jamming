// App.js - this component will assemble and display all of the sub components. 
// It will then export the assembled components to be rendered by /pages/index.js

// Import the Presentational Components
import SearchBar from "./SearchBar";
import SearchResultsContainer from "@/containers/SearchResultsContainer";
import PlaylistContainer from "@/containers/PlaylistContainer";

function App() {
    return (
        <div>
            <SearchBar />
            <SearchResultsContainer />
            <PlaylistContainer />
        </div>
    );
}

export default App;