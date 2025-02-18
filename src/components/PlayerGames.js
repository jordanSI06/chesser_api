import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";

import "../styles/PlayerGames.css";

const PlayerGames = ({ games, searchedPlayer }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h3" sx={{textAlign: "Center"}}>Parties jouées: {games.length}</Typography>
      <Typography sx={{textAlign: "Center"}}>Victoire: {wins}, Défaite: {losses}, Nulle: {draws}</Typography>
      <Typography sx={{textAlign: "Center"}}>Winrate: {winrate}%</Typography>
      <TableContainer component={Paper} sx={{ maxWidth: "80%", margin: "auto", backgroundColor: "rgb(83, 83, 83)"}} >
        <Table sx={{ minWidth: 650}} size="small">
          <TableHead>
            <TableRow >
              <TableCell sx={{ color:"white"}}>Date</TableCell>
              <TableCell sx={{ color:"white"}}>Blancs</TableCell>
              <TableCell sx={{ color:"white"}}>Noirs</TableCell>
              <TableCell sx={{ color:"white"}}>Type de Partie</TableCell>
              <TableCell sx={{ color:"white"}}>Lien</TableCell>
            </TableRow>
          </TableHead>
          <TableBody  >
            {games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((game, index) => (
              <TableRow  key={index} >
                <TableCell sx={{ color:"white"}}>{new Date(game.end_time * 1000).toLocaleDateString()}</TableCell>
                <TableCell>{renderPlayerResult(game.white.username, game.white.result)}</TableCell>
                <TableCell>{renderPlayerResult(game.black.username, game.black.result)}</TableCell>
                <TableCell sx={{ color:"white"}}>{game.time_class}</TableCell>
                <TableCell>
                  <a href={game.url} target="_blank" rel="noopener noreferrer">
                    Voir la partie
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination sx={{ color:"white"}}
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={games.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default PlayerGames;