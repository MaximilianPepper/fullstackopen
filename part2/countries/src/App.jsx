import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const searchUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";

const Countries = (props) => {
  const countries = props.countries;
  if (countries.length === 0) return null;
  else if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  else if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => (
          <div key={country.name.official}>
            <p>{country.name.common}</p>
            <button onClick={() => props.displayCountry(country.name.common)}>
              show
            </button>
          </div>
        ))}
      </>
    );
  } else if (countries.length === 1) {
    const languages = Object.values(countries[0].languages);
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>capital {countries[0].capital}</p>
        <p>area {countries[0].area}</p>
        <h2>Languages:</h2>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <p>{countries[0].flag}</p>
      </div>
    );
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => setAllCountries(response.data));
  }, []);
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    if (value !== "") {
      setCountries(
        allCountries.filter((country) =>
          country.name.common.toLowerCase().includes(value)
        )
      );
    } else setCountries([]);
  };
  const displayCountry = (country) => {
    axios.get(`${searchUrl}${country.toLowerCase()}`).then((response) => {
      setCountries([response.data]);
    });
  };
  return (
    <>
      <div>
        find countries <input onChange={handleChange} value={input} />
      </div>
      <Countries countries={countries} displayCountry={displayCountry} />
    </>
  );
}

export default App;
