// Nav.js - This component contains the nav / header which includes user's Spotify username

import User from "@/components/User";

function Nav({profileData}){
return(
<div className="nav">
    <User profileData={profileData}/>
    <h2>JAMMING</h2>
</div>
);

}

export default Nav;