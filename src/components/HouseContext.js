import React, { useState, useEffect, createContext} from 'react';

//import data
import {housesData} from '../data';

//create context
export const HouseContext = createContext();

const HouseContextProvider = ({children}) => {
  const [houses,setHouses] = useState(housesData);
  const [country,setCountry] = useState('Location(any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type(any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Pricr range(any)');
  const [loading, setLoading] = useState(false);

  //return all properties
  useEffect(()=>{
  const allProperties = houses.map((house) =>{
    return house.type;
  });
  //remove dupllicate
  const uniqueProperties = ['Location (any)',...
new Set(allProperties)]

// set country state
setProperties(uniqueProperties);
},[]);

 //return all country
 useEffect(()=>{
  const allCountries = houses.map((house) =>{
    return house.country;
  });
  //remove dupllicate
  const uniqueCountries = ['Location (any)',...
new Set(allCountries)]

// set country state
setCountries(uniqueCountries);
},[]);

const handleClick = ()=>{

  //create a function that check if the string include any
  const isDefault = (str) => {
    return str.split(' ').includes('(any)');
    
  };
  

//get first value of price and parse it to number
const minPrice = parseInt(price.split(' ')[0]);
//get second value of price which is the maximum price & parse it to number
const maxPrice = parseInt(price.split(' ')[2]);
const newHouses = housesData.filter((house)=>{
  const housePrice = parseInt(house.price);

  //if all value are selected
  if(
    house.country === country &&
    house.type === property &&
    housePrice >= minPrice &&
    housePrice <= maxPrice
    ) {
      return house;
    }

    if (isDefault(country)&& isDefault(property)&& isDefault(price)){
      return house;
    }

});
console.log(newHouses);
};

  return (
    <HouseContext.Provider value={{
      country,
      setCountry,
      countries,
      property,
      setProperty,
      properties,
      price,
      setPrice,
      houses,
      loading,
      handleClick,
    }}>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
