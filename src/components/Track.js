// Track.js - This component will display information about a track: Name, Artist, Album
function Track({name, artist, album, buttonType, onAddSong }){
        
    return (
        <li className="track">
            <p>Name:{name}</p>
            <p>Artist:{artist}</p>
            <p>Album:{album}</p>
            <button onClick={onAddSong}>{buttonType === "add" ? "+" : "-"}</button>
        </li>
    );
}

export default Track;