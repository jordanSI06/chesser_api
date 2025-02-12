import React from "react";

const PlayerGames = ({ games }) => {
  if (!games || games.length === 0) return <p>Aucune partie trouvée.</p>;

  return (
    <div>
      <h3>📅 Parties récentes</h3>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <p>⏳ {new Date(game.end_time * 1000).toLocaleDateString()}</p>
            <p>♔ Blancs : {game.white.username}</p>
            <p>♚ Noirs : {game.black.username}</p>
            <a href={game.url} target="_blank" rel="noopener noreferrer">Voir la partie</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerGames;
