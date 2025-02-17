import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import DateSelector from "../components/DateSelector";
import PlayerDetails from "../components/PlayerDetails";
import { fetchPlayerProfile, fetchPlayerStats, fetchPlayerGames } from "../api/chessAPI";

const Root = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, "0"));

  const handleSearch = async (username) => {
    try {
      setError("");
      const profileResponse = await fetchPlayerProfile(username);
      const statsResponse = await fetchPlayerStats(username);
      const gamesResponse = await fetchPlayerGames(username, year, month);

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
      <SearchBar onSearch={handleSearch} />
      <DateSelector year={year} month={month} setYear={setYear} setMonth={setMonth} />
      <PlayerDetails profile={profile} stats={stats} games={games} error={error} />
    </div>
  );
};

export default Root;