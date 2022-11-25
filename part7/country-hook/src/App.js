import { useState, useEffect } from "react";
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

const useCountry = () => {
    const [country, setCountry] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(result => setCountry(result.data[0]))
            .catch(e => console.log(e))
    }, [name]);

    const updateCountry = (newCountry) => setName(newCountry);

    return {
        country,
        updateCountry
    };
};

const Country = ({ country }) => {
    if (!country) {
        return <div>not found...</div>;
    }

    return (
        <div>
            <h3>{country.name.common}</h3>
            <div>population {country.population}</div>
            <div>capital {country.capital}</div>
            <img src={country.flags.png} height="100" alt={`flag of ${country.name.common}`} />
        </div>
    );
};

const App = () => {
    const nameInput = useField("text");
    const country = useCountry();

    const fetch = (e) => {
        e.preventDefault();
        country.updateCountry(nameInput.value);
    };

    return (
        <div>
            <form onSubmit={fetch}>
                <input {...nameInput} />
                <button>find</button>
            </form>

            <Country country={country.country} />
        </div>
    );
};

export default App;
