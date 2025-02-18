import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import "../styles/PlayerGames.css";

const PlayerGames = ({ games, searchedPlayer }) => {
  if (!games || games.length === 0) return <Typography>Aucune partie trouvée.</Typography>;

  const drawConditions = ["agreed", "repetition", "stalemate", "insufficient", "50move"];

  //Calcul des statistiques de parties
  const calculateStats = (games) => {
    let wins = 0;
    let losses = 0;
    let draws = 0;

    games.forEach((game) => {
      if ((game.white.result === "win" && game.white.username.toLowerCase() === searchedPlayer) || 
          (game.black.result === "win" && game.black.username.toLowerCase() === searchedPlayer)) {
        wins++;
      }  else if (drawConditions.includes(game.white.result) && drawConditions.includes(game.black.result)) {
        draws++;
      } else{
        losses++;
      }
    });
    return { wins, losses, draws };
  };

  const { wins, losses, draws } = calculateStats(games);
  const totalGames = wins + losses + draws;
  const winrate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : 0;

  // Afficher le résultat de la partie
  const renderPlayerResult = (player, result) => {
    if (result === "win") {
      return <p id="winner">{player} 👑 </p>;
    } else if (drawConditions.includes(result)) {
      return <p id="draw">{player} ({result})</p>;
    } else {
      return <p id="looser">{player}</p>;
    }
  };

  return (
    <div>
      <Typography variant="h3">Parties jouées: {games.length}</Typography>
      <Typography>Victoire: {wins}, Défaite: {losses}, Nulle: {draws}</Typography>
      <Typography>Winrate: {winrate}%</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Blancs</TableCell>
              <TableCell>Noirs</TableCell>
              <TableCell>Type de Partie</TableCell>
              <TableCell>Lien</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(game.end_time * 1000).toLocaleDateString()}</TableCell>
                <TableCell>{renderPlayerResult(game.white.username, game.white.result)}</TableCell>
                <TableCell>{renderPlayerResult(game.black.username, game.black.result)}</TableCell>
                <TableCell>{game.time_class}</TableCell>
                <TableCell>
                  <a href={game.url} target="_blank" rel="noopener noreferrer">
                    Voir la partie
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayerGames;