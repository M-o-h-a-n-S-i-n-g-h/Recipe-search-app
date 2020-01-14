import React, { useEffect, useState } from "react";
import Recipe from "./recipe";
import "./App.css";

const App = () => {
  const APP_ID = "ffd71077";
  const APP_KEY = "22722f89476fef02b24b32ac9d1cd3d5	";
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("Apple");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="seach-button" type="submit">
          search
        </button>
      </form>
      {recipes.map(recipes => (
        <Recipe
          key={recipes.recipe.label}
          title={recipes.recipe.label}
          calories={recipes.recipe.calories}
          image={recipes.recipe.image}
        />
      ))}
    </div>
  );
};

export default App;
