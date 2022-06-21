import React from 'react';
import styles from './bookingContents.module.css';
import {DaySwitch, MonthSwitch} from './switch';

const BookingContents = ({value}) => {
  const daySwitch = DaySwitch(value);
  const monthSwitch = MonthSwitch(value);


  return (
    <div className={styles.bookContents}>
      <header className={styles.header}>
        <h1 className={styles.day}>{daySwitch}</h1>
        <div className={styles.dateBox}>
          <p className={styles.date}>{value.date}</p>
          <p className={styles.month}>{monthSwitch}</p>
        </div>
      </header>
      <section className={styles.schedule}>
        <h4>SCHEDULE</h4>
        <div className={styles.scheduleBox}>
          <h3>Michell Song</h3>
          <p>Emode</p>
          <p>11:00 AM - 2:00 PM</p>
        </div>
        <div className={styles.scheduleBox}>
        <h3>Amy Kim</h3>
          <p>Emode</p>
          <p>2:00 PM - 4:00 PM</p>
        </div>
      </section>
    </div>
  )
}

export default BookingContents
