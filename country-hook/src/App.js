import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log("rrr", response);
        if (response.status === 200) {
          setCountry(response);
        }
      })
      .catch((error) => {
        setCountry({ found: false });
      });
  }, [name]);

  console.log("ccccc---", country);

  return country;
};

const Country = ({ country }) => {
  console.log("in country", country);
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
  const input = useField("text");
  const [name, setName] = useState("Finland");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(input.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input
          type={input.type}
          value={input.value}
          onChange={input.onChange}
          name="input"
        />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
