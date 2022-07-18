import React, {useContext, useEffect, useState} from 'react'
import _ from 'lodash';
import styles from './booking.module.css';
import { BookContext } from '../../context/bookContext';
import { calendarInit } from '../../calendar/calendar';
import DateBox from '../dateBox/dateBox';

const Booking = ({clientRepository}) => {
  const {states, setStates} = useContext(BookContext);
  var bookPerson = {};
  
  const values = calendarInit();
  
  useEffect( () => {
    console.log(' ==== states : ', states);
  },[states]);

  useEffect(() => {
    const stopSync = () => {
      return new Promise((resolve, reject) => {
        clientRepository.syncClients(clients => {
          const copyClients = _.cloneDeep(clients);
          resolve(copyClients);
        })
      })
    }

    const settingState = (copyClients) => {
      return new Promise((resolve, reject) => {
        let upClient = [];
        Object.keys(copyClients).map( key => {
          if ( copyClients[key].hasOwnProperty('bookDetail')) {
            upClient.push({...copyClients[key]})
          }
        })
        setStates(states =>{return {
          ...states, 
          clients:{...copyClients},
          bookClient: [...upClient],
        }});
        resolve(states);
      })
    }
    

    const syncClient = async () => {
      const result1 = await stopSync();
      const result2 = await settingState(result1);
    }
    syncClient(); 
    return () => stopSync();
  }, [clientRepository])


  return (
    <ul className={styles.daylist}>
      { values.map( value => ( 
        <DateBox 
          key={value.id}
          value={value}
          clientRepository={clientRepository}
        />
      ))}
    </ul>
  )
}

export default Booking;
