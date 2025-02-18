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

  const calculateStats = (games) => {
    let wins = 0;
    let losses = 0;
    let draws = 0;

    games.forEach((game) => {
      console.log(game.white.result);
      if ((game.white.result === "win" && game.white.username === searchedPlayer) || 
          (game.black.result === "win" && game.black.username === searchedPlayer)) {
        wins++;
      }  else if (game.white.result !== "win" && game.black.result !== "win") {
        draws++;
      } else{
        losses++;
      }
    });
    return { wins, losses, draws };
  };

  const { wins, losses, draws } = calculateStats(games);

  return (
    <div>
      <Typography variant="h3">Parties jouées: {games.length}</Typography>
      <Typography>Victoire: {wins} , Défaite: {losses}, Nulle: {draws} </Typography>
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
                <TableCell>
                  {game.white.result === "win" ? (
                    <strong id="winner">{game.white.username} 👑 </strong>
                  ) : (
                    <p id="looser">{game.white.username} ({game.white.result})</p>
                  )}
                </TableCell>
                <TableCell>
                  {game.white.result === "win" ? (
                    <p id="looser">{game.black.username} ({game.black.result})</p>
                  ) : (
                    <strong id="winner">{game.black.username} 👑</strong>
                  )}
                </TableCell>
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
