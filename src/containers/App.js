// App.js - This component handles the logic, data and state for all of the Presentational components

import React, { useState, useEffect } from "react";
import Playlists from "@/components/Playlists";
import SearchResults from "@/components/SearchResults";
import User from "@/components/User";
import { generateId } from "@/utilities";
import { getAccessToken } from "@/server/getAccessToken";
import { fetchProfile } from "@/server/getProfileData";

function App({ urlCode }) {
    // State variables to store the Spotify API Access Code
    const [accessToken, setAccessToken] = useState();

    // State variables to store the user profile data
    const [profileData, setProfileData] = useState();

    // Get the API access code and set the state variable
    useEffect(() => {
        getAccessToken(process.env.NEXT_PUBLIC_CLIENT_ID, urlCode)
            .then(token => {
                setAccessToken(token);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

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

    // Mock data for playlists
    const playlistsArray = [
        {
            playlistName: "playlist1",
            playlistId: 1,
            tracks: [
                {
                    id: 4,
                    name: "Song 4",
                    artist: "Artist 4",
                    album: "Album 4"
                },
                {
                    id: 5,
                    name: "Song 5",
                    artist: "Artist 5",
                    album: "Album 5"
                },
                {
                    id: 6,
                    name: "Song 6",
                    artist: "Artist 6",
                    album: "Album 6"
                }
            ]
        },
        {
            playlistName: "playlist2",
            playlistId: 2,
            tracks: [
                {
                    id: 7,
                    name: "Song 7",
                    artist: "Artist 7",
                    album: "Album 7"
                },
                {
                    id: 8,
                    name: "Song 8",
                    artist: "Artist 8",
                    album: "Album 8"
                },
                {
                    id: 9,
                    name: "Song 9",
                    artist: "Artist 9",
                    album: "Album 9"
                }
            ]
        }
    ];

    // Create a temporary hardcoded array of tracks to mock data returned by API
    const tracks = [
        {
            id: 1,
            name: "Song 1",
            artist: "Artist 1",
            album: "Album 1"
        },
        {
            id: 2,
            name: "Song 2",
            artist: "Artist 2",
            album: "Album 2"
        },
        {
            id: 3,
            name: "Song 3",
            artist: "Artist 3",
            album: "Album 3"
        }
    ];

    // State variables for user input of new playlist name
    const [newPlaylistInput, setNewPlaylistInput] = useState("");

    // State variables for playlists
    const [playlists, setPlaylists] = useState(playlistsArray);

    // State variables for the list of tracks returned by API
    const [fetchedTracks, setFetchedTracks] = useState(tracks);

    // State variables to store the playlistId of currently open playlist
    const [activeIndex, setActiveIndex] = useState();

    // State variables to store the name of the current playlist
    const [currentPlaylistName, setCurrentPlaylistName] = useState("");

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
        setPlaylists((playlists) => [...playlists, newPlaylist]);
    }

    // Updates the name of the current / open playlist
    function updateCurrentPlaylistName(event) {
        setCurrentPlaylistName(event.target.value);
    }

    // Handle saving / exporting a playlist to user's Spotify account
    function handleSavePlaylist() {
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

        // TODO: Export the playlist to Spotify (add check to only export if currentPlaylist != {})
    }

    return (
        <>
            <User profileData={profileData}/>
            <SearchResults tracks={fetchedTracks} onAddTrack={addTrackHandler} />
            <Playlists onNewPlaylistInputChange={handleNewPlaylistInput} newPlaylistInput={newPlaylistInput} onSubmitNewPlaylist={handleNewPlaylistSubmit} playlists={playlists} activeIndex={activeIndex} setActiveIndex={setActiveIndex} onRemoveTrack={removeTrackHandler} onSavePlaylist={handleSavePlaylist} updateCurrentPlaylistName={updateCurrentPlaylistName} />
        </>
    );
}

export default App