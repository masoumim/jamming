// Playlist.js - This component handles presentation of the playlists. When a playlist title is clicked, 
// the tracks are displayed and the user can edit the name of the playlist

import Tracklist from "./Tracklist";

function Playlist({ playlist, isActive, onShow, onRemoveTrack }) {

  return (
    <>
      <input style={isActive ? { color: "green" } : {}} onClick={onShow} className="playlistname" name="playlistname" type="text" defaultValue={playlist.playlistName} />
      {isActive && playlist.tracks ? (<Tracklist tracks={playlist.tracks} onRemoveTrack={onRemoveTrack} />) : ("")}
    </>
  );
};

export default Playlist;