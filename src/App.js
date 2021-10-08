import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [loading, setLoading] = useState()
  const [list, setList] = useState([])
  const [detail, setDetail] = useState()
  const [layout, setLayout] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading('loading..')
      await fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then(async (response) => {
          const results = await response.json()
          setLayout('list')
          setList(results)
          setLoading()
        })
        .catch(function (error) {})
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchDetail(url) {
    try {
      setLoading('loading..')
      await fetch(url)
        .then(async (response) => {
          const results = await response.json()
          setLayout('detail')
          setDetail(results)
          setLoading()
        })
        .catch(function (error) {})
    } catch (err) {
      console.log(err)
    }
  }

  function onClickDetail(e) {
    fetchDetail(e.currentTarget.id)
  }

  function onClickBack() {
    setLayout('list')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Poke List</h1>
        <p>{loading}</p>
      </header>
      <main className="App-main">
        {layout === 'list' ? (
          <ul
            style={{ textAlign: 'left', textTransform: 'capitalize' }}
            className="poke-list"
          >
            {list &&
              list.results &&
              list.results.length > 0 &&
              list.results.map((li) => {
                return (
                  <li key={li.name} onClick={onClickDetail} id={li.url}>
                    {li.name} - {li.url}
                  </li>
                )
              })}
          </ul>
        ) : (
          <div style={{ textAlign: 'left', textTransform: 'capitalize' }}>
            <span
              onClick={onClickBack}
              dangerouslySetInnerHTML={{ __html: '&laquo; Back' }}
            ></span>
            {detail && detail.name && (
              <div>
                <h3>[{detail.name}]</h3>
                <div>
                  <img
                    src={detail.sprites?.front_default}
                    alt={detail.name}
                    width="200"
                  />
                  <h4>Abilities:</h4>
                  {detail.abilities &&
                    detail.abilities.length > 0 &&
                    detail.abilities.map((poke, i) => {
                      return <div key={i}>{poke.ability.name}</div>
                    })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <footer></footer>
    </div>
  )
}

export default App
