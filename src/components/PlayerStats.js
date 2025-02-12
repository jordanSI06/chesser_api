import React from "react";

const PlayerStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h3>📊 Classements Elo</h3>
      <p>⚡ Blitz : {stats.chess_blitz?.last.rating || "N/A"}</p>
      <p>🐢 Rapide : {stats.chess_rapid?.last.rating || "N/A"}</p>
      <p>🕰️ Bullet : {stats.chess_bullet?.last.rating || "N/A"}</p>
    </div>
  );
};

export default PlayerStats;
