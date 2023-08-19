// Track.js - This component will display information about a track: Name, Artist, Album
function Track({ id, name, artist, album, buttonType, onAddSong }) {
    return (
        <li className="track">
            <p>Name:{name}</p>
            <p>Artist:{artist}</p>
            <p>Album:{album}</p>
            {/* <button onClick={() => onAddSong(id, name, artist, album)}>{buttonType === "add" ? "+" : "-"}</button> */}
            <button onClick={buttonType === "add" ? () => onAddSong(id, name, artist, album) : () => console.log("remove track")}>{buttonType === "add" ? "+" : "-"}</button>
        </li>
    );
}

export default Track;