import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {
  Routes, Route, Link
} from 'react-router-dom'
import DetailPage from './detailPage'

const App = () => {
  const [conturiesToShow, setCountriesToShow] = useState([])
  const [countryInfo, setCountryInfo] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState([])

  const conturies_result = useQuery('conturies',
    () => axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      console.log('useQuery')
      const result_data = response.data.map(country => country.name.official)
      console.log('result_data', result_data)
      return result_data
    })
    ,
    { refetchOnWindowFocus: false }
  )

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

  const Page = () => {
    if (conturiesToShow.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    } else {
      return (
        <div>
          {conturiesToShow.map(country =>
            <div key={country}>
              {country}
              <Link to={`/${country}`}>details</Link>
            </div>
          )}
        </div>
      )
    }
  }

  if (conturies_result.isLoading) {
    return <div>Loading...</div>
  }
  const conturies = conturies_result.data
  return (
    <div>
      <h1>Find countries</h1>
      <form onSubmit={handleSearch}>
        <input value={search} onChange={event => setSearch(event.target.value)} />
        <button type="submit">search</button>
      </form>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/:countryname" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;