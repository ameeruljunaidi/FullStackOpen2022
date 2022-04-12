import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchForm = ({onChange}) => <form>
    find countries
    <input onChange={onChange} />
</form>

const CountryItem = ({country, handleShow}) => {
    return (
        <div>
            {country.name['common']}
            <button onClick={handleShow(country)}>show</button>
        </div>
    )
}

const CountryList = ({countries, searchKey, handleShow}) => (
    <>
        {countries.filter(country => {
            const countryName = country.name['common'].toLowerCase()
            const searchName = searchKey.toLowerCase()
            return countryName.includes(searchName)
        }).map(country => {
            const countryName = country.name['common']
            return <CountryItem key={countryName.toString()} country={country} handleShow={handleShow} />
        })}
    </>
)

const CountryDetails = ({country, handleShowAll}) => {
    const [temperature, setTemperature] = useState(0.0)
    const [windSpeed, setWindSpeed] = useState(0.0)
    const [iconUrl, setIconUrl] = useState('')

    const apiKey = process.env.REACT_APP_API_KEY

    const countryName = country.name['common']
    const countryLat = country['latlng'][0]
    const countryLon = country['latlng'][1]

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryLat}&lon=${countryLon}&appid=${apiKey}`)
            .then(result => {
                const weatherInfo = result.data

                setTemperature((parseFloat(weatherInfo.main['temp']) - 32) * 5 / 9)
                setWindSpeed(parseFloat(weatherInfo['wind']['speed']))
                setIconUrl(`https://openweathermap.org/img/wn/${weatherInfo['weather']['icon']}`)
            })
        console.log('requested')
    }, [apiKey, countryLat, countryLon])


    return (
        <>
            <h1>{countryName}</h1>
            <div>capital {country['capital']}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key, value], index) => {
                    return <li key={index}>{value}</li>
                })}
            </ul>
            <img src={country.flags['png']} alt={`${countryName} flag`} />
            <div>
                <button onClick={handleShowAll}>show all</button>
            </div>
            <div>
                <h2>Weather in {countryName}</h2>
            </div>
            <div>temperature {temperature.toFixed(2)} Celsius</div>
            <img src={iconUrl} alt="weather icon" />
            <div>wind {windSpeed.toFixed(2)} m/s</div>
        </>
    )
}

const CountryDisplay = ({countries, searchKey, handleShow, showCountry, handleShowAll}) => {
    const filtered = countries.filter(country => {
        const countryName = country.name['common'].toLowerCase()
        const searchName = searchKey.toLowerCase()
        return countryName.includes(searchName)
    })

    const findFirst = filtered.findIndex(country => {
        const countryName = country.name['common'].toLowerCase()
        const searchName = searchKey.toLowerCase()
        return countryName === searchName
    })

    if (showCountry) {
        return <CountryDetails country={showCountry} handleShowAll={handleShowAll} />
    } else if (findFirst !== -1) {
        return <CountryDetails country={filtered[findFirst]} handleShowAll={handleShowAll} />
    } else if (filtered.length === 1) {
        return <CountryDetails country={filtered[0]} handleShowAll={handleShowAll} />
    } else {
        return <CountryList countries={countries} searchKey={searchKey} handleShow={handleShow} />
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [showCountry, setShowCountry] = useState(undefined)

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(result => {
                setCountries(result.data)
            })
    }, [])

    const handleShow = countryName => event => {
        setShowCountry(countryName)
    }

    const handleSearchChange = event => {
        setShowCountry(undefined)
        setSearchKey(event.target.value)
    }

    const handleShowAll = () => {
        setShowCountry(undefined)
    }

    const countryName = 'temp'
    const temperature = 3.7

    return (
        <>
            <SearchForm onChange={handleSearchChange} />
            <CountryDisplay countries={countries}
                            searchKey={searchKey}
                            handleShow={handleShow}
                            showCountry={showCountry}
                            handleShowAll={handleShowAll} />
        </>
    )
}

export default App;
