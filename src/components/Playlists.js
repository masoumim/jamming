// Playlist.js - This component will display the playlists created by the user.

import Playlist from "./Playlist";

function Playlists({ onInputChange, userInput, onSubmitHandler, playlists, activeIndex, setActiveIndex}) {                
    return (
        <div className="Playlist">
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="playlistname">Playlist name:</label>
                <input id="playlistname" name="playlistname" type="text" value={userInput} onChange={onInputChange} />
                <button type="submit">Create Playlist</button>
            </form>
            <h2>Your playlists:</h2>
            <div id="playlists">
                {playlists.map((playlist) => (
                    <Playlist key={playlist.playlistId} playlist={playlist} isActive={activeIndex === playlist.playlistId} onShow={() => setActiveIndex(playlist.playlistId)}/>                               
                ))}                
            </div>
        </div>
    );
}

export default Playlists;