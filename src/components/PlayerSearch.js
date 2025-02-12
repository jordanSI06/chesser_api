import React, { useState } from "react";

const PlayerSearch = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", margin: "20px" }}>
      <input
        type="text"
        placeholder="Nom d'utilisateur Chess.com"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
      />
      <button type="submit" style={{ padding: "8px 16px", borderRadius: "5px", background: "#1976d2", color: "white", border: "none" }}>
        Rechercher
      </button>
    </form>
  );
};

export default PlayerSearch;
