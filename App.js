import React, {useEffect, useState} from "react";
import Header from "./header";
import Country from "./Country";

export default function App(){

    const [countryData, setCountryData] = useState()
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [q, setQ] = useState("")

   

    useEffect(()=> {
        fetchData()
    }, [])

    function fetchData(){
        fetch("https://restcountries.com/v2/all")

        .then((response)=> {
            if (!response.ok) {
                throw new Error(`this is an HTTP error: the status is ${response.status}`)
            }
            return response.json()
        })

        .then((data)=> createObjectArray(data))
        .then((objArray)=> {
            setIsLoaded(true)
            setCountryData(objArray)    

        },
        
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    }

    

    function createObjectArray(array){
        return (
            array && array.map((items)=> {
                return {
                    ...items,
                    name: items.name,
                    flag: items.flags.svg,
                    capital: items.capital,
                    languages: items.languages[0].name,
                    population: items.population,
                    currency: (items.currencies),
                    id: items.alpha3code
                }
            })
        )
    }



    // console.log(countryData && countryData)

  
  // eslint-disable-next-line array-callback-return
  const filteredData =  countryData && countryData.filter(item => {
        if (q === "") {
            return item
        }  if (item.capital && item.capital.toLowerCase().includes(q.toLowerCase())) {
            return item
        }  if(item.name && item.name.toLowerCase().includes(q.toLowerCase())) {
            return item
        }  
    })

 let countryElement 
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div className="spinner"><div className="lds-dual-ring"></div></div>
        }else 
 
    countryElement =  filteredData && filteredData.map((item)=> {
        return (
            
            <Country 
                key = {item.id}
                id = {item.id}
                name = {item.name}
                flag = {item.flag}
                capital = {item.capital}
                languages = {item.languages}
                population = {item.population}
                currency = {item.currencies? item.currencies[0].symbol : ""}
            />
            
        )
    })
    


    return (
        <div>


            <Header num={countryData && countryData.length}/>

            <div className="search-container">
                <label className="search-box" htmlFor="search-form">
                    <input type="search"
                           name="search-form"
                           className="search-form"
                           id = "search-form"
                           placeholder="search countries by name and city"
                           value={q} 
                           onChange={(e)=> setQ(e.target.value)}
                           />
                           
                </label>
            </div>
        <div className="country-grid">
          {countryElement}
        </div>


        </div>
    )
}