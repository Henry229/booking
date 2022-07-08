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

  const dateBook = new Date(states.value.year, states.value.month-1, states.value.date);
  const bookYear = dateBook.getFullYear();
  const bookMonth = ( '0' + (dateBook.getMonth() + 1)).slice(-2);
  const bookdate = ('0' + dateBook.getDate()).slice(-2);
  const bookingDate = bookdate + '-' + bookMonth + '-'  + bookYear;

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
        { states.hasOwnProperty('bookClient') &&  
          states.bookClient.length > 0
          ? ( states.bookClient.map( (value,key) => (
                  // console.log('===> bookClient: ', states.bookClient[index].bookDetail.bookDate);
                  // console.log('===> bookClient: ', bookingDate, '/',states.bookClient[key].bookDetail.bookDate);
                  bookingDate == states.bookClient[key].bookDetail.bookDate 
                  ? (<div key={key}>
                      <h3>{states.bookClient[key].name}</h3>
                      <p>{states.bookClient[key].bookDetail.care}</p>
                      <p>{`${states.bookClient[key].bookDetail.startTime}
                               - ${states.bookClient[key].bookDetail.endTime}`}
                      </p>
                    </div>)
                  : null
              )))
              : null                
          }
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
