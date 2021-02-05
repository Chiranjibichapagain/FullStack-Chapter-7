import React from "react";

import {useCountry, useField} from './hook/index'
  
const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (country.found === false) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div style={{ marginBottom: 20 }}>
        population {country.data[0].population}
      </div>
      <img
        src={country.data[0].flag}
        height="150"
        alt={`flag of ${country.data[0].name}`}
      />
    </div>
  );
};



const App = () => {
  const [country, setCountry, handleChange] = useField()
  const [countryData, fetch]=useCountry()

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(country)
    setCountry('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id="country"
          value={country}
          onChange={handleChange}
        />
        <button>find</button>
      </form>

      <Country country={countryData} />
    </div>
  );
};

export default App;
