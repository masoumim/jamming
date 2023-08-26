// Playlist.js - This component handles presentation of the playlists. When a playlist title is clicked, 
// the tracks are displayed and the user can edit the name of the playlist

import Tracklist from "./Tracklist";

function Playlist({ playlist, isActive, onShow, onRemoveTrack, updateCurrentPlaylistName }) {  
  
  return (
    <>
      <input style={isActive ? { color: "#C84B31" } : {}} onClick={(e) => {onShow(), updateCurrentPlaylistName(e)}} onChange={updateCurrentPlaylistName} className="playlistname" name="playlistname" type="text" maxLength={17} defaultValue={playlist.playlistName}/>
      {isActive && playlist.tracks ? (<Tracklist tracks={playlist.tracks} onRemoveTrack={onRemoveTrack} />) : ("")}
    </>
  );
};

export default Playlist;