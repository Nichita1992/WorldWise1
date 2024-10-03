/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";

const CitiesContext = createContext();

const BASE_URL = `http://localhost:8000`;

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (err) {
        alert(`There was an error ${err} loading the data`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
    /*clean-up function */
    return function () {};
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (err) {
      alert(`There was an error ${err} loading the data`);
    } finally {
      setIsLoading(false);
    }
  }

  /*POST request or send data to an API*/

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      /*keep UI in synch with the remote state*/
      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert(`There was an error ${err} creating the city`);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities(cities.filter((city) => city.id !== id));
    } catch (err) {
      alert(`There was an error ${err} deleting the data`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

//custom hook used as a API instead of useContext(PostContext);
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the CitiesProvider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
