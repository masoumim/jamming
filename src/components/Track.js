// Track.js - This component will display information about a track: Name, Artist, Album
function Track({ track, buttonType, onAddTrack, onRemoveTrack }) {
    return (
        <div className="track">
            <div className="trackinfo">
                <p><b>Track:</b> {track.name}</p>
                <p><b>Artist:</b> {track.artist}</p>
                <p><b>Album:</b> {track.album}</p>
            </div>
            <button onClick={buttonType === "add" ? () => onAddTrack(track) : () => onRemoveTrack(track)}>{buttonType === "add" ? "+" : "-"}</button>
        </div>
    );
}

export default Track;