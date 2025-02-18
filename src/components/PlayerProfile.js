import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "../styles/PlayerProfile.css";

const PlayerProfile = ({ profile }) => {
  if (!profile) return null;

  return (
    <Card id="card" style={{ maxWidth: 345, margin: "20px auto", textAlign: "center" }}>
      <CardMedia
        component="img"
        alt="Avatar"
        height="140"
        image={profile.avatar || "https://via.placeholder.com/100"}
        style={{ borderRadius: "50%", width: "100px", height: "100px", margin: "20px auto" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profile.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pays : {profile.country.replace("https://api.chess.com/pub/country/", "")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date de création : {new Date(profile.joined * 1000).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerProfile;