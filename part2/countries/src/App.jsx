import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const searchUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";
const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=7edfe25e23534a9a9e482919242505&q=`;

const Weather = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const weatherData = async (country) => {
      try {
        const response = await axios.get(`${weatherUrl}${country}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    weatherData(props.country);
  }, [props.country]);

  if (!data) return null;
  return (
    <div>
      <h2>Weather in {data.location.name}</h2>
      <p>temperature {data.current.temp_c} Celsius</p>
      <img src={data.current.condition.icon}></img>
      <p>wind {data.current.wind_kph} k/h</p>
    </div>
  );
};

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
        <Weather country={countries[0].capital} />
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
