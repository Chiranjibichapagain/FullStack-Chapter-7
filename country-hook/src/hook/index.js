import {useState, useEffect} from 'react'
import axios from "axios";

export const useField = () => {
  const [country, setCountry] = useState("");

    const handleChange = (event) => {
      
    setCountry(event.target.value);
  };

  return [
      country,
      setCountry,
      handleChange,
  ];
};


export const useCountry = () => {
    const [countryData, setCountryData] = useState(null);

    useEffect(() => {
        fetch('Finland')
    }, [])
      
    const fetch = async(country) => {
      const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
      await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setCountryData(response);
        }
      })
      .catch((error) => {
        setCountryData({ found: false });
      });
    }
  return [countryData, fetch];
};

