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

const PlayerGames = ({ games }) => {
  if (!games || games.length === 0) return <Typography>Aucune partie trouvée.</Typography>;

  return (
    <div>
      <Typography variant="h3">📅 Parties récentes</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Blancs</TableCell>
              <TableCell>Noirs</TableCell>
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
