import React, { useEffect, useState } from 'react'
import { FaArrowsAltH } from "react-icons/fa";
import Dropdown from './Dropdown';

export const Currency = () => {

    const [currencies,setCurrencies] = useState([]);

    const [amount, setAmount] = useState(1);

    const [fromCurrency, setFromCurrency] = useState("USD");

    const [toCurrency,setToCurrency] = useState("INR");

    const [convert, setConvert] = useState(null);

    const [converting, setConverting] = useState(false);
    
    

    const fetchCurrency=async ()=>{
        try {
            const res= await fetch("https://api.frankfurter.app/currencies");
            const data=await res.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        fetchCurrency();
    },[])

    //Conversion-> 'https://api.frankfurter.app/latest?amount=1&from=USD&to=INR';
    const currencyConverter=async ()=>{
        if(!amount)
        {
            return ;
        }
        setConverting(true);
        try {
            const res= await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data=await res.json();
            setConvert(data.rates[toCurrency]+" " + toCurrency)
        } catch (error) {
            console.log(error.message);
        } finally{
            setConverting(false);
        }
    }

    console.log(currencies);

    const handleFavourite=(currency)=>{
        //add to favourite
    }

    const swapcurrency=()=>{
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }
  //Currencies->  'https://api.frankfurter.app/currencies';


  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h1 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h1>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
            <Dropdown currencies={currencies} title='From' currency={fromCurrency} setCurrency={setFromCurrency} handleFavourite={handleFavourite} />
            {/* swap button */}
            <div className='flex justify-center mb-3 sm:mb-0'>
                <button onClick={swapcurrency} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                    <FaArrowsAltH className='text-xl text-gray-700'/>
                </button>
            </div>
            <Dropdown currencies={currencies} title='To' currency={toCurrency} setCurrency={setToCurrency} handleFavourite={handleFavourite}/>
        </div>
        <div className='mt-4 '>
            <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>Amount</label>
            <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}} className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'/>
        </div>
        <div className='flex justify-end mt-6 '>
            <button onClick={currencyConverter} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting?"animate-pulse":" "}`}>Convert</button>
        </div>
        {convert && <div className='mt-4 text-lg font-medium text-right text-green-600'>
            Converted Amount : {convert}
        </div>}
    </div>
  )
}
