import React, { useState } from "react";
import PlayerSearch from "../components/PlayerSearch";
import PlayerProfile from "../components/PlayerProfile";
import PlayerStats from "../components/PlayerStats";
import PlayerGames from "../components/PlayerGames";
import { fetchPlayerProfile, fetchPlayerStats, fetchPlayerGames } from "../api/chessAPI";

const Root = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    try {
      setError("");
      const profileResponse = await fetchPlayerProfile(username);
      const statsResponse = await fetchPlayerStats(username);
      const gamesResponse = await fetchPlayerGames(username, 2024, '01');

      setProfile(profileResponse.data);
      setStats(statsResponse.data);
      setGames(gamesResponse.data.games);
    } catch (err) {
      setError("Erreur lors de la récupération des données !");
      setProfile(null);
      setStats(null);
      setGames([]);
    }
  };

  return (
    <div>
      <PlayerSearch onSearch={handleSearch} />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {profile && <PlayerProfile profile={profile} />}
      {stats && <PlayerStats stats={stats} />}
      {games.length > 0 && <PlayerGames games={games} />}
    </div>
  );
};

export default Root;
