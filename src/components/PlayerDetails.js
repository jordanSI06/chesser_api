import React from "react";
import PlayerProfile from "./PlayerProfile";
import PlayerStats from "./PlayerStats";
import PlayerGames from "./PlayerGames";

const PlayerDetails = ({ profile, stats, games, error }) => {
  return (
    <div>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {profile && <PlayerProfile profile={profile} />}
      {stats && <PlayerStats stats={stats} />}
      {games.length > 0 && <PlayerGames games={games} searchedPlayer={profile.username}/>}
    </div>
  );
};

export default PlayerDetails;