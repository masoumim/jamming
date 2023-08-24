// User.js - This component displays the users Spotify profile info
function User({ profileData }) {        
    
    if(profileData){        
        return (
            <>
                <section id="profile">
                    <b>Logged in as <span id="displayName">{profileData.display_name}</span></b>
                </section>
            </>
        );
    }
}

export default User;