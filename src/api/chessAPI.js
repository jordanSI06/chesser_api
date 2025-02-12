import axios from "axios";

const API_BASE_URL = "https://api.chess.com/pub/player";

// Récupérer le profil d'un joueur
export const fetchPlayerProfile = (username) => {
  return axios.get(`${API_BASE_URL}/${username}`);
};

// Récupérer les statistiques Elo d'un joueur
export const fetchPlayerStats = (username) => {
  return axios.get(`${API_BASE_URL}/${username}/stats`);
};

// Récupérer les parties récentes d'un joueur
export const fetchPlayerGames = (username, year, month) => {
  return axios.get(`${API_BASE_URL}/${username}/games/${year}/${month}`);
};
