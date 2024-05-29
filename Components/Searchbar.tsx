"use client";

import Link from "next/link";
import { useState } from "react";

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 mt-12">
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Search"
        className="searchbar-input"
      />

      <Link className="searchbar-btn" href={searchPrompt}>
        {isLoading ? "Searching..." : "Search"}
      </Link>
    </div>
  );
};

export default Searchbar;
