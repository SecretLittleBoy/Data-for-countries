import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMatch } from 'react-router-dom';

const DetailPage = () => {
  const match = useMatch('/:countryname');
  const [countryInfo, setCountryInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    if (match) {
      const countryname = match.params.countryname;
      const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryname}`;
      axios
      .get(url)
      .then(response => {
        const new_countryInfo = response.data
        setCountryInfo(new_countryInfo)
        const weather_url = `https://samples.openweathermap.org/data/2.5/weather?q=${new_countryInfo.capital}&appid=b1b15e88fa797225412429c1c50c122a1`
        axios.get(weather_url).then(response => {
          const new_weather = response.data
          console.log('new_weather', new_weather)
          setWeather(new_weather)
        }).catch(error => {
          console.log('error', error)
          console.log('weather_url', weather_url)
          setWeather("weather service not available")
        })
      })
    }
  }, [match]);

  if (countryInfo !== null) {
    return (
      <div>
        <h2>{countryInfo.name.official}</h2>
        <p>capital {countryInfo.capital}</p>
        <p>population {countryInfo.population}</p>
        <img src={countryInfo.flags.png} svg={countryInfo.flags.svg} alt={countryInfo.flags.alt} width="100" height="100" />
        <h2>weather in {countryInfo.capital }</h2>
        {weather}
      </div>
    )
  } else {
    return (
      <div>
        <p>Loading country info...</p>
      </div>
    );
  }
};

export default DetailPage;
