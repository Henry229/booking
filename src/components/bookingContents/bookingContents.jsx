import React, { useContext, useState } from 'react';
import { BookContext } from '../../context/bookContext';
import styles from './bookingContents.module.css';
import {DaySwitch, MonthSwitch} from '../../calendar/switch';
import AddBooking from '../addBooking/addBooking';

const BookingContents = () => {
  const {states, setStates} = useContext(BookContext);
  const [openAddBooking, setOpenAddBooking] = useState(false)
  console.log(' value in BookingContents : ', states);
  const daySwitch = DaySwitch(states.value);
  const monthSwitch = MonthSwitch(states.value);

  const onAddBooking = () => setOpenAddBooking(true);

  return (
    <div className={styles.bookContents}>
      <header className={styles.header}>
        <h1 className={styles.day}>{daySwitch}</h1>
        <div className={styles.dateBox}>
          <p className={styles.date}>{states.value.date}</p>
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
        <button className={styles.scheduleButton} onClick={onAddBooking}>
          <img className={styles.addSchedule} src="/images/calendar-plus-solid.png" alt="booking" />
        </button>
        { openAddBooking && 
          < AddBooking />
            // value={value} 
            // onAdd={onAdd}
            // clientRepository={clientRepository}
          // />
        }
      </section>
    </div>
  )
}

export default BookingContents
