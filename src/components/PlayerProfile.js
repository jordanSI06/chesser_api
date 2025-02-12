import React from "react";

const PlayerProfile = ({ profile }) => {
  if (!profile) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src={profile.avatar || "https://via.placeholder.com/100"}
        alt="Avatar"
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
      />
      <h2>{profile.username}</h2>
      <p>Pays : {profile.country.replace("https://api.chess.com/pub/country/", "")}</p>
      <p>Date de création : {new Date(profile.joined * 1000).toLocaleDateString()}</p>
    </div>
  );
};

export default PlayerProfile;
