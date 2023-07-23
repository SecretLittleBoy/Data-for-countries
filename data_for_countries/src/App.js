import React, { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const [conturies, setCountries] = useState([])
  const [conturiesToShow, setCountriesToShow] = useState([])
  const [countryInfo, setCountryInfo] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const all_countries = response.data.map(country => country.name.official)
        setCountries(all_countries)
        console.log('effect')
      }
      )
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    console.log('search', search)
    const new_countriesToShow = conturies.filter(country => country.toLowerCase().includes(search.toLowerCase()))
    setCountriesToShow(new_countriesToShow)
    if (new_countriesToShow.length === 1) { 
      console.log('new_countriesToShow.length === 1', new_countriesToShow)
      const country = new_countriesToShow[0]
      const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
      axios
        .get(url)
        .then(response => {
          const new_countryInfo = response.data
          console.log('new_countryInfo', new_countryInfo)
          setCountryInfo(new_countryInfo)
        })
    }
  }

  const showdetails = (country) => { 
    console.log('showdetails', country)
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
    axios
      .get(url)
      .then(response => {
        const new_countryInfo = response.data
        console.log('new_countryInfo', new_countryInfo)
        setCountriesToShow([country])
        setCountryInfo(new_countryInfo)
      })
  }

  const Page = () => {
    if (conturiesToShow.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    } else if (conturiesToShow.length === 1&&countryInfo.length!==0) {
      console.log('conturiesToShow.length === 1,countryInfo', countryInfo)
      return (
        <div>
          <h2>{countryInfo.name.official}</h2>
          <p>capital {countryInfo.capital}</p>
          <p>population {countryInfo.population}</p>
          <img src={countryInfo.flags.png} svg={countryInfo.flags.svg} alt={countryInfo.flags.alt} width="100" height="100" />
          </div>
      )
    }
    else {
      return (
        <div>
          {conturiesToShow.map(country =>
            <div key={country}>
              {country}
              <button onClick={() => {showdetails(country) }}>show details</button>
            </div>
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <h1>Find countries</h1>
      <form onSubmit={handleSearch}>
        <input value={search} onChange={event => setSearch(event.target.value)} />
        <button type="submit">search</button>
      </form>
      <Page />
    </div>
  );
}

export default App;