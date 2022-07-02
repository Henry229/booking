import React, { useState } from 'react';
import styles from './app.module.css';
import { BookContext } from './context/bookContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Booking from './components/booking/booking';
import DateBox from './components/dateBox/dateBox';
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
    // openFirst : null,
    // openSecond : null,
    // value : null,
    addClient : null,
    clientRepository: null,
  });
  

  

  return  (
    <BookContext.Provider value={{states, setStates}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Booking clientRepository={clientRepository}/>} />
          {/* <Route path="/dateBox" exact element={<DateBox clientRepository={clientRepository}/>} /> */}
          <Route path="/bookingContents" exact 
            element={
              <BookingContents 
                // value={states.value}
                // value={states.value}
                // oneClient={oneClient}
                // clients={clients} 
                // onOpenSecond={onOpenSecond}
                clientRepository={clientRepository}
              />}
          />
          {/* <Route path="/addBooking" exact 
            element={
              <AddBooking 
                // value={value}
                // oneClient={oneClient}
                // clients={clients}
                // addClient={onaddClient}
                // onAdd={onAdd}
              />}
          /> */}

        </Routes>
      </BrowserRouter>
    </BookContext.Provider>
  )
}

export default App;




