import React, { useContext, useState } from 'react';
import { BookContext } from '../../context/bookContext';
import styles from './bookingContents.module.css';
import {DaySwitch, MonthSwitch, WorkingDate} from '../../calendar/switch';
import AddBooking from '../addBooking/addBooking';
import EditBook from '../editBook/editBook';
import { useNavigate } from 'react-router-dom';


const BookingContents = () => {
  const {states, setStates} = useContext(BookContext);
  const navigate = useNavigate();
  const [openAddBooking, setOpenAddBooking] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedCustom, setSelectedCustom] = useState();
  const [bookingInfo, setBookingInfo] = useState();
  const [index, setIndex] = useState();
  const daySwitch = DaySwitch(states.value);
  const monthSwitch = MonthSwitch(states.value);
  const bookingDate = WorkingDate(states.value);

  const onAddBooking = () => setOpenAddBooking(true);

  const onCancel = () => setOpenAddBooking(false);
  const onEditCancel = () => setOpenEdit(false); 

  const moveRoot = () => {
    setStates({
      ...states,
      backRoot: true,
    })
    navigate('/');
  };

  const onEdit = (guy, info, idx) => {
    setOpenEdit(true);
    setSelectedCustom(guy);
    setBookingInfo(info);
    setIndex(idx);
    setStates({
      ...states,
      oneClient: guy,
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookContents}>
        <header className={styles.header}>
          <button className={styles.backButton} onClick={moveRoot}>
            <img className={styles.backArrow} src="/images/arrow-left-solid.png" alt="moveBack" />
          </button>
          <div className={styles.topHead} >
            <h1 className={styles.day}>{daySwitch}</h1>
          </div>
          <div className={styles.dateBox}>
            <p className={styles.date}>{states.value.date}</p>
            <p className={styles.month}>{monthSwitch}</p>
          </div>
        </header>
        <section className={styles.schedule}>
          <h4>SCHEDULE</h4>
          <div>
            { ( states.hasOwnProperty('bookClient') &&  
                states.bookClient.length > 0 )
              ? ( states.bookClient.map( (client,index) => (
                    <div key={index}>
                      { client.bookDetail.map(( detail, idx) =>
                        ( bookingDate == detail.bookDate 
                          ? (<div className={styles.scheduleBox} key={idx} onClick={() => onEdit(client, detail,idx)}>
                              <h3>{client.name}</h3>
                              <p>{detail.care}</p>
                              <p>{`${detail.startTime}
                                  - ${detail.endTime}`}
                              </p>
                            </div>
                            )
                          : null
                        ))}  
                    </div>)
                  ))
                  : null                
              }
          </div>
          <button className={styles.scheduleButton} onClick={onAddBooking}>
            <img className={styles.addSchedule} src="/images/calendar-plus-solid.png" alt="booking" />
          </button>
          <div>
            { openAddBooking && 
              < AddBooking
                onCancel={onCancel}
              />
            }
          </div>
          <div>
            { openEdit &&
              <EditBook
                selectedCustom={selectedCustom}
                bookingInfo={bookingInfo} 
                index={index}
                onEditCancel={onEditCancel} 
              />
            }
          </div>
        </section>
      </div>

    </div>
  )
}

export default BookingContents
