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
    return (
        <>
            <h1>{country.name['common']}</h1>
            <div>capital {country['capital']}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key, value], index) => {
                    return <li key={index}>{value}</li>
                })}
            </ul>
            <img src={country.flags['png']} alt={`${country.name['common']} flag`} />
            <div>
                <button onClick={handleShowAll}>show all</button>
            </div>
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
