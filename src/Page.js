import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const usePage = () => {
    const [conturiesToShow, setCountriesToShow] = useState([])
    const Page = () => {
        // if (conturiesToShow.length > 10) {
        //   return (
        //     <div>
        //       <p>Too many matches, specify another filter</p>
        //     </div>
        //   )
        // } else {
          return (
            <div>
              {conturiesToShow.map(country =>
                <div key={country}>
                  {country}
                  {"   "}
                  <Link to={`/${country}`}>details</Link>
                </div>
              )}
            </div>
          )
        }
    // }

    return { Page , setCountriesToShow }
};