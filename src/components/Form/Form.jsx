/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import { useUrlPosition } from "../../../hooks/UseUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../../contexts/citiescontext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate("");

  const [isLoadingGeo, setIsLoadingGeo] = useState();
  const [geoError, setGeoError] = useState("");
  const emoji = convertToEmoji(countryCode);

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeo(true);
          setGeoError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Select a city from the map."
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setCountryCode(data.countryCode || "");
        } catch (err) {
          setGeoError(err.message);
        } finally {
          setIsLoadingGeo(false);
        }
      }
      fetchCityData();
      /*clean-up function */
      return function () {};
    },
    [lat, lng]
  );
  /*Submiting the form and adding reverse geo - new city to our list using a fake API which will handle the form*/
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName && !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
  }

  if (isLoadingGeo) return <Spinner />;
  if (geoError) return <Message message={geoError} />;
  if (!lat && !lng)
    return <Message message={"Start by selecting a city on the map"} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.isLoading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          onClickOutside
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
