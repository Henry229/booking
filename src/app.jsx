import React from 'react';
import { useState } from 'react';
import styles from './app.module.css';
import { calendarInit } from './calendar/calendar';
import DateBox from './components/dateBox/dateBox';

function App() {
  const values = calendarInit();

  
  return  (
    <ul className={styles.daylist}>
      { values.map( value => (
        <DateBox key={value.id} value={value} />
      ))}
    </ul>
  )
}

export default App;



