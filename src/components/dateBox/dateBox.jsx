import React, {useContext, useState} from 'react';
import styles from './dateBox.module.css';
import {WorkingDate} from '../../calendar/switch';
import { BookContext } from '../../context/bookContext';

import { useNavigate } from 'react-router-dom';

const DateBox = ({ value, clientRepository}) => {
  const navigate = useNavigate();
  const {states, setStates} = useContext(BookContext);

  const bookingDate = WorkingDate(value);

  const onBookingContents = () => {
    setStates({
      ...states,
      value: value,
      clientRepository: clientRepository,
    })
    navigate('/bookingContents'); 
  }
  return (
    <div className={styles.container} >
      <div className={styles.listBox} >
        <li className={styles.dateBox} >
          <p className={styles.day}>{value.day}</p>
          <p className={styles.date}>{value.date}</p>
        </li>
        <div className={styles.contents} onClick={onBookingContents} >
          {   
              ( states.hasOwnProperty('bookClient') &&  
              states.bookClient.length > 0 )
              ? ( states.bookClient.map( (client,index) => 
                  (<div key={index}>
                    { client.bookDetail.map( (detail, idx) => 
                   ( bookingDate == detail.bookDate 
                    ? (<div className={styles.schedule} key={idx}>
                        <span className={styles.scheduleName}>⏱ {client.name} </span>
                        <span className={styles.scheduleTime}>{`${detail.startTime}
                                 - ${detail.endTime}`}
                        </span>
                      </div>)
                    : null
                   ))}
                  </div>)
              ))
              : null                
          }
        </div>
      </div>
    </div>
  )
}

export default DateBox
