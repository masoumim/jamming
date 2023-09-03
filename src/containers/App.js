// App.js - This component handles the logic, data and state for all of the Presentational components

import React, { useState, useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import Playlists from "@/components/Playlists";
import { generateId, searchResultsToArray } from "@/utilities";
import { getAccessToken } from "@/server/getAccessToken";
import { fetchProfile } from "@/server/getProfileData";
import { getSearchResults } from "@/server/getSearchResults";
import { createPlaylist } from "@/server/createPlaylist";
import { addItemsToPlaylist } from "@/server/addItemsToPlaylist";

function App({ urlCode }) {
    // State variables to store the Spotify API Access Code
    const [accessToken, setAccessToken] = useState();

    // State variables to store the user profile data
    const [profileData, setProfileData] = useState();

    // The useRef Hook allows you to persist values between renders.
    // It can be used to store a mutable value that does not cause a re-render when updated.
    // It is used here to prevent calling 'getAccessToken' twice which results in an empty token value on re-render
    const accessTokenRef = useRef(false);

    // Get the API access code and set the state variable
    useEffect(() => {
        // If we have already fetched the access token, return.
        if (accessTokenRef.current) return;

        // Otherwise, set accessTokenRef to true and get access token
        accessTokenRef.current = true;

        getAccessToken(process.env.NEXT_PUBLIC_CLIENT_ID, urlCode)
            .then(token => {
                setAccessToken(token);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // Call API to get user profile data
    useEffect(() => {
        if (accessToken) {
            fetchProfile(accessToken)
                .then(data => {
                    setProfileData(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [accessToken]);

    // State variables for user input of new playlist name
    const [newPlaylistInput, setNewPlaylistInput] = useState("");

    // State variables for playlists
    const [playlists, setPlaylists] = useState([]);

    // State variables for the Search Bar input
    const [searchBarInput, setSearchBarInput] = useState("");

    // State variables for the list of tracks returned by API
    const [fetchedTracks, setFetchedTracks] = useState([]);

    // State variables to store the playlistId of currently open playlist
    const [activeIndex, setActiveIndex] = useState();

    // State variables to store the name of the current playlist
    const [currentPlaylistName, setCurrentPlaylistName] = useState("");

    // State variable to store the Save Playlist button message
    const [saveButtonMsg, setSaveButtonMsg] = useState("");

    // Erases the save button message after 3 seconds
    useEffect(() => {
        setTimeout(() => {
            setSaveButtonMsg("");
        }, 3000);
    }, [saveButtonMsg]);

    // Handle adding track from SearchResults Tracklist to current Playlist Tracklist    
    function addTrackHandler(addTrack) {

        // Map over the playlists state array
        const updatedArray = playlists.map(playlist => {

            // If playlist in the state array matches currently open playlist      
            // AND that playlist doesn't already contain the track      
            if (playlist.playlistId === activeIndex && !playlist.tracks.some(e => e.id === addTrack.id)) {

                // Create new playlist object with updated tracks array
                const updatedPlaylist = {
                    playlistName: playlist.playlistName,
                    playlistId: playlist.playlistId,
                    tracks: [...playlist.tracks, addTrack]
                }
                return updatedPlaylist;
            }
            else {
                return playlist;
            }
        });

        setPlaylists(updatedArray);
    }

    // Handle removing track from current Playlist Tracklist
    function removeTrackHandler(removeTrack) {

        // Map over the playlists state array
        const updatedArray = playlists.map(playlist => {

            // If playlist in the state array matches currently open playlist      
            // AND that playlist contains the track      
            if (playlist.playlistId === activeIndex && playlist.tracks.some(e => e.id === removeTrack.id)) {

                // Create new playlist object with updated tracks array
                const updatedPlaylist = {
                    playlistName: playlist.playlistName,
                    playlistId: playlist.playlistId,
                    tracks: playlist.tracks.filter((track) => track.id !== removeTrack.id)
                }
                return updatedPlaylist;
            }
            else {
                return playlist;
            }
        });

        setPlaylists(updatedArray);
    }

    // Updates the newPlaylistName state on every change to the input field
    function handleNewPlaylistInput(event) {
        // Set the state variable
        setNewPlaylistInput(event.target.value);
    }

    // Handle new playlist form submission
    function handleNewPlaylistSubmit(event) {
        event.preventDefault(); // Prevents the page from reloading on submit               
        const newPlaylist = {
            playlistName: newPlaylistInput,
            playlistId: generateId(),
            tracks: []
        }
        
        // When a new playlist is created, make it the currently selected / active playlist
        setActiveIndex(newPlaylist.playlistId);
        setCurrentPlaylistName(newPlaylist.playlistName);
        
        // Update the playlists array
        setPlaylists((playlists) => [...playlists, newPlaylist]);
    }

    // Updates the searchBarInput state on every change to the input field
    function handleSearchBarInput(event) {
        // Set the state variable
        setSearchBarInput(event.target.value);
    }

    // Handle search form submit
    async function handleSearchSubmit(event) {
        event.preventDefault(); // Prevents the page from reloading on submit

        // Call the API
        let searchResults = await getSearchResults(searchBarInput, accessToken);

        // Process JSON response data into array of tracks
        const searchResultsArray = searchResultsToArray(searchResults);

        // Update the array state variable 'fetchedTracks'
        setFetchedTracks(searchResultsArray);
    }

    // Updates the name of the current / open playlist
    function updateCurrentPlaylistName(event) {
        setCurrentPlaylistName(event.target.value);
    }

    // Handle saving / exporting a playlist to user's Spotify account
    async function handleSavePlaylist() {
        let currentPlaylist = {};

        // Set the current name for the playlist using the playlist name's input field        
        const updatedArray = playlists.map(playlist => {

            // If playlist in the state array matches currently open playlist                     
            if (playlist.playlistId === activeIndex) {

                // Set the current playlist object with current playlist name
                currentPlaylist = {
                    playlistName: currentPlaylistName,
                    playlistId: playlist.playlistId,
                    tracks: playlist.tracks
                }                
                return currentPlaylist;
            }
            else {
                return playlist;
            }
        });

        // Update the playlists state array variable
        setPlaylists(updatedArray);

        // Export the playlist to Spotify if a playlist is selected and it has at least 1 track   
        if (currentPlaylist.tracks) {
            if (currentPlaylist.tracks.length === 0) {
                setSaveButtonMsg("add at least 1 track to the playlist before saving to Spotify");
            }
            else {
                // Saving playlist to Spotify
                let trackURIs = [];
                // Create an array of track URI's from each track in the playlist
                for (let trackURI in currentPlaylist.tracks) {
                    trackURIs.push(currentPlaylist.tracks[trackURI].uri)
                }

                // Before submitting playlist to API, make sure the playlist name isn't empty
                if (currentPlaylist.playlistName.length > 0) {
                    // POST new playlist to API
                    const createPlaylistResponse = await createPlaylist(profileData.display_name, currentPlaylistName, accessToken);

                    // POST track URI's to playlist
                    const playlistId = createPlaylistResponse.id;

                    const addSongsResponse = await addItemsToPlaylist(playlistId, accessToken, trackURIs);
                    setSaveButtonMsg("playlist saved to Spotify!");
                }
                else {
                    setSaveButtonMsg("Playlist name can't be blank!");
                }
            }
        }
        else {
            setSaveButtonMsg("Select a playlist to save to Spotify");
        }
    }

    return (
        <>
            <Nav profileData={profileData} />
            <SearchForm handleSearchSubmit={handleSearchSubmit} searchBarInput={searchBarInput} handleSearchBarInput={handleSearchBarInput} />
            <div className="main">
                <SearchResults onSearchBarInputChange={handleSearchBarInput} searchBarInput={searchBarInput} onSubmitSearch={handleSearchSubmit} tracks={fetchedTracks} onAddTrack={addTrackHandler} />
                <Playlists onNewPlaylistInputChange={handleNewPlaylistInput} newPlaylistInput={newPlaylistInput} onSubmitNewPlaylist={handleNewPlaylistSubmit} playlists={playlists} activeIndex={activeIndex} setActiveIndex={setActiveIndex} onRemoveTrack={removeTrackHandler} onSavePlaylist={handleSavePlaylist} updateCurrentPlaylistName={updateCurrentPlaylistName} saveButtonMsg={saveButtonMsg} />
            </div>
        </>
    );
}

export default App