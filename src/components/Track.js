// Track.js - This component will display information about a track: Name, Artist, Album
function Track({ track, buttonType, onAddTrack, onRemoveTrack }) {
    return (
        <li className="track">
            <p>Name:{track.name}</p>
            <p>Artist:{track.artist}</p>
            <p>Album:{track.album}</p>
            <button onClick={buttonType === "add" ? () => onAddTrack(track) : () => onRemoveTrack(track)}>{buttonType === "add" ? "+" : "-"}</button>
        </li>
    );
}

export default Track;