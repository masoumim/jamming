// Playlist.js - This component handles click events on a playlist name. When clicked the playlist opens
// When clicked again, the playlist closes.
import Tracklist from "./Tracklist";

function Playlist({ playlist, isActive, onShow }) {
  return (
    <div>
      <h2>
        <span onClick={onShow}>{playlist.playlistName}</span>
      </h2>
      {isActive ? (<Tracklist tracks={playlist.tracks} />) : ("")}
    </div>
  );
};

export default Playlist;