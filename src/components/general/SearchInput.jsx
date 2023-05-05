import React from "react";
import { Icon } from "@iconify/react";

function SearchInput({ search, setSearch }) {
  return (
    <div className="admin-search-input">
      <input
        type="text"
        value={search}
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="admin-search-input--icon">
      <Icon icon="ic:round-search" />
      </div>
    </div>
  );
}

export default SearchInput;
