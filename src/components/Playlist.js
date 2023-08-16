// Playlist.js - This component will display the playlists created by the user.
// It will show a list of playlists (if any exist) and if clicked, will display the tracks in the list.

import Tracklist from "./Tracklist";

function Playlist({ onInputChange, userInput, onSubmitHandler, playlists, onClickPlaylist }) {
    return (
        <div className="Playlist">
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="playlistname">Playlist name:</label>
                <input id="playlistname" name="playlistname" type="text" value={userInput} onChange={onInputChange} />
                <button type="submit">Create Playlist</button>
            </form>
            <h2>Your playlists:</h2>
            <ul style={{ listStyleType: "none" }}>
                {playlists.map((playlist) => (
                    <li key={playlist.playlistId} id={playlist.playlistName} className={playlist.playlistName} onClick={onClickPlaylist}>                        
                        {playlist.playlistName}                  
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Playlist;