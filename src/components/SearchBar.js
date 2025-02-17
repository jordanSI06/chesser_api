import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
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
      />
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchBar;