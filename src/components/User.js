// User.js - This component displays the users Spotify profile info
function User({ profileData }) {        
    
    if(profileData){        
        return (
            <>
                <section id="profile">
                    <h2>Logged in as <span id="displayName">{profileData.display_name}</span></h2>
                </section>
            </>
        );
    }
}

export default User;