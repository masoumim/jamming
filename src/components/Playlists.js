// Playlist.js - This component will display the playlists created by the user as well as an input field with a button for adding new playlists

import Playlist from "./Playlist";

function Playlists({ onNewPlaylistInputChange, newPlaylistInput, onSubmitNewPlaylist, playlists, activeIndex, setActiveIndex, onRemoveTrack, onSavePlaylist, updateCurrentPlaylistName, saveButtonMsg }) {
    return (
        <div className="playlists">
            <h2>Your playlists:</h2>
            <form onSubmit={onSubmitNewPlaylist}>                
                <input required type="text" value={newPlaylistInput} onChange={onNewPlaylistInputChange} />
                <button type="submit">Create Playlist</button>
            </form>            
            <div id="playlists">                
                {playlists.map((playlist) => (
                    <Playlist key={playlist.playlistId} playlist={playlist} isActive={activeIndex === playlist.playlistId} onShow={() => setActiveIndex(playlist.playlistId)} onRemoveTrack={onRemoveTrack} updateCurrentPlaylistName={updateCurrentPlaylistName} />
                ))}
            </div>                                          
                <button onClick={onSavePlaylist}>Save Playlist</button>
                <b>{saveButtonMsg}</b>                         
        </div>
    );
}

export default Playlists;