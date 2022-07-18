import React, {useContext, useState} from 'react';
import styles from './dateBox.module.css';
import { format } from "date-fns";
import { MonthSwitch, WorkingDate} from '../../calendar/switch';
import { BookContext } from '../../context/bookContext';

import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import { values } from 'lodash';

const DateBox = ({ value, clientRepository}) => {
  const navigate = useNavigate();
  const {states, setStates} = useContext(BookContext);

  const monthSwitch = MonthSwitch(value);
  const bookingDate = WorkingDate(value);
  const today = new Date();
  const todate = format(today, "MM-dd-yyyy");
  let moveScroll = '';
  // console.log('=====///// today : ',todate);

  useEffect(() => {
    // const location = document.querySelector('.move').offsetTop
    // console.log('////', location);
    // window.scrollTo({top:location, behavior: 'smooth'}) 
    document.querySelector('.move').scrollIntoView({behavior: 'smooth'});
    moveScroll = false
  },[moveScroll]);

  // const MoveToday = ({moveRef}) => {
  //   moveRef = useRef<HTMLElement>(null);
  //   const scrollToElement = () => moveRef.current.scrollIntoView();
  // }

  const onBookingContents = () => {
    setStates({
      ...states,
      value: value,
      clientRepository: clientRepository,
    })
    navigate('/bookingContents'); 
  }
  return (
    <>
    
    <div className={styles.container} >
      <div className={styles.listBox} >
        <li className={styles.dateBox} >
          <p className={styles.day}>{value.day}</p>
          <p className={styles.date}>{value.date}</p>
          { value.date == 1 
            ? <div className={styles.monthYear}>{value.year} {monthSwitch}</div>
            : null 
          }
          { todate == bookingDate  
            ? ( moveScroll = true,
                (<div className="move"></div>)
              ) 
            : null
          }
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
    </>
  )
}

export default DateBox
