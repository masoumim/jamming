// Playlist.js - This component will display the playlists created by the user.
// It will show a list of playlists (if any exist) and if clicked, will display the tracks in the list.

function Playlist({ onInputChange, userInput, onSubmitHandler, playlists }) {
    return (
        <div className="Playlist">
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="playlistname">Playlist name:</label>
                <input id="playlistname" name="playlistname" type="text" value={userInput} onChange={onInputChange} />
                <button type="submit">Create Playlist</button>
            </form>
            <h2>Your playlists:</h2>
            <p>{playlists}</p>
        </div>
    );
}

export default Playlist;