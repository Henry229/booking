import React, { useState } from 'react';
import styles from './app.module.css';
import { BookContext } from './context/bookContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Booking from './components/booking/booking';
import BookingContents from './components/bookingContents/bookingContents';



function App({clientRepository}) {
  const [states, setStates] = useState({
    value: {
      id: null,
      year: null,
      month: null,
      date: null,
    },
    clients : {},
    oneClient : [],
    bookClient : [],
    addClient : null,
    clientRepository: null,
    backRoot: null,
  });
  
  return  (
    <BookContext.Provider value={{states, setStates}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Booking clientRepository={clientRepository}/>} />
          <Route path="/bookingContents" exact 
            element={
              <BookingContents 
                clientRepository={clientRepository}
              />}
          />
        </Routes>
      </BrowserRouter>
    </BookContext.Provider>
  )
}

export default App;




