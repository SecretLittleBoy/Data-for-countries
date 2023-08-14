import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {
  Routes, Route, useNavigate
} from 'react-router-dom'
import DetailPage from './detailPage'
import {usePage} from './Page'

const App = () => {
  const Page = usePage()
  const navigate = useNavigate()

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

  const handleInputChange = (event) => {
    const search = event.target.value
    console.log('search', search)
    navigate('/')
    const new_countriesToShow = conturies.filter(country => country.toLowerCase().includes(search.toLowerCase()))
    Page.setCountriesToShow(new_countriesToShow)
  }

  if (conturies_result.isLoading) {
    return <div>Loading...</div>
  }
  const conturies = conturies_result.data
  return (
    <div>
      <h1>Find countries</h1>
      <input  onChange={handleInputChange} />
      <Routes>
        <Route path="/" element={Page.Page()} />
        <Route path="/:countryname" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;