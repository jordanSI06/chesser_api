import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import DateSelector from "../components/DateSelector";
import PlayerDetails from "../components/PlayerDetails";
import { fetchPlayerProfile, fetchPlayerStats, fetchPlayerGames } from "../api/chessAPI";
import Loader from "../components/Loader";
import Header from "../components/Header";



const Root = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, "0"));

  const handleSearch = async (username) => {
    setLoading(true);
    setError(""); // Réinitialiser les erreurs

    try {
      const profileResponse = await fetchPlayerProfile(username);
      const statsResponse = await fetchPlayerStats(username);
      const gamesResponse = await fetchPlayerGames(username, year, month);

      setProfile(profileResponse.data);
      setStats(statsResponse.data);
      setGames(gamesResponse.data.games);
    } catch (err) {
      setError("❌ Une erreur est survenue lors de la récupération des données.");
      if (err.response) {
        // Erreur HTTP (ex: 404, 500)
        setError(`Erreur ${err.response.status} : ${err.response.data}`);
      } else if (err.request) {
        // Pas de réponse du serveur
        setError("⚠️ Aucune réponse du serveur. Vérifie ta connexion.");
      } else {
        // Autre erreur (ex: problème de syntaxe)
        setError("🚨 Une erreur interne s'est produite.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header/>
      <SearchBar onSearch={handleSearch} />
      <DateSelector year={year} month={month} setYear={setYear} setMonth={setMonth} />
  
      {error && <p style={{ color: "red" }}>{error}</p>}
  
      {loading ? <Loader /> : (!error && <PlayerDetails profile={profile} stats={stats} games={games} />)}
    </div>
  );
};

export default Root;