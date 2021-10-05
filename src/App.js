import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState();
  const [layout, setLayout] = useState();

  async function fetchData() {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then(async (response) => {
          const results = await response.json();
          setLayout("list");
          setList(results);
        })
        .catch(function (error) {});
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchDetail(url) {
    try {
      await fetch(url)
        .then(async (response) => {
          const results = await response.json();
          setLayout("detail");
          setDetail(results);
        })
        .catch(function (error) {});
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onClickDetail(e) {
    fetchDetail(e.currentTarget.id);
  }

  function onClickBack() {
    setLayout("list");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {layout === "list" ? (
          <ul style={{ textAlign: "left", textTransform: "capitalize" }}>
            {list &&
              list.results &&
              list.results.length > 0 &&
              list.results.map((li) => {
                return (
                  <li key={li.name} onClick={onClickDetail} id={li.url}>
                    {li.name} - {li.url}
                  </li>
                );
              })}
          </ul>
        ) : (
          <div style={{ textAlign: "left", textTransform: "capitalize" }}>
            <span
              onClick={onClickBack}
              dangerouslySetInnerHTML={{ __html: "&laquo; Back" }}
            ></span>
            {detail && detail.name && (
              <p>
                <h3>[{detail.name}]</h3>
                <img
                  src={detail.sprites?.front_default}
                  alt={detail.name}
                  width="200"
                />
                <h4>Abilities:</h4>
                {detail.abilities &&
                  detail.abilities.length > 0 &&
                  detail.abilities.map((poke, i) => {
                    return <div key={i}>{poke.ability.name}</div>;
                  })}
              </p>
            )}
          </div>
        )}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
