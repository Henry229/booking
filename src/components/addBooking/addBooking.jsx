import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import styles from './addBooking.module.css';
import {DaySwitch, MonthSwitch, WorkingDate} from '../../calendar/switch';
import { BookContext } from '../../context/bookContext';
import AddClient from '../addClient/addClient';
import AddBookDay from '../addBookDay/addBookDay';
import ClientList from '../clientList/clientList';

let searchedPeople = [];
let showSearched = false;

const AddBooking = ({onCancel}) => {
  const {states, setStates} = useContext(BookContext);
  const [guys, setGuys] = useState({});
  const [person, setPerson] = useState([]);
  const daySwitch = DaySwitch(states.value);
  const monthSwitch = MonthSwitch(states.value);
  const bookingDate = WorkingDate(states.value)
  const inputRef = useRef();

  useEffect(() => {
    const stopSync = states.clientRepository.syncClients(clients => {
      setGuys(clients);
    })
    return () => stopSync();
  }, []);

  const handleSearch = () => {
    const searchClient = inputRef.current.value;
    search(searchClient);
    inputRef.current.value = '';
  }
  
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const onSearch = () => {
    handleSearch();
  }
  const search = (searchClient) => {
    searchedPeople=[];
    setPerson('');    // let tempPerson={};
    showSearched = false;
    guys && Object.keys(guys).map( key => {
      if ( guys[key].name === searchClient ) {
          searchedPeople.push(guys[key]);
          console.log('😀😀😀😀😀', guys[key], '/ searchedPeople : ', searchedPeople );
      }
    });
    setPerson( prev => {return [...prev, ...searchedPeople]});
    setStates(states => {
      const updated={...states};
      updated.clients = guys;
      return updated;
    })

    searchedPeople.length > 0 ? showSearched = true : showSearched = false;
    return;
  };
  
  const onMoveAddBookDay = (selectedClient) => {
    console.log('=== person in Move : ', selectedClient);
    setStates(states => {
      const updated = {...states};
      updated.addClient = true;
      updated.oneClient = selectedClient;
      return updated;
    });
  };
  
  useEffect(() => {
    console.log('useEffect States updated');
  }, [states])
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.h1Title}>Booking</h1>
        <button className={styles.cancelButton} onClick={() => onCancel()}>
          <img className={styles.cancelImg} src="/images/xmark-solid.png" alt="cancelButton" />
        </button>
        <div className={styles.dateBox}>
          <span className={styles.day}>{daySwitch}  </span>
          <span className={styles.date}>{states.value.date}  </span>
          <span className={styles.month}>{monthSwitch}</span>
        </div>
      </header>
      <section className={styles.searchSection}>  {/* 있으면 데이타 가져오고 없으면 신규등록 */}
        <input 
          className={styles.searchInput}          
          type="search" 
          placeholder="Enter Client Name..."    
          ref={inputRef}
          onKeyPress={onKeyPress}
        />
        <button className={styles.searchButton} onClick={onSearch}>
          <img className={styles.imgButton} src="/images/search.png" alt="search" />
        </button>  
      </section>
      <section className={styles.clientList}>
        { showSearched 
          // ? Object.keys(person).map( key => 
          ? person.map( client => 
            (<ul>
              <ClientList key={client.id} client={client} onMoveAddBookDay={onMoveAddBookDay}/>
            </ul>
          ))
          : ( <span>No Client</span> )
        }
      </section>
      <section className={styles.embeded}>
        { states.addClient
          ? (<AddBookDay 
            bookingDate={bookingDate}/> )
          : ( <AddClient /> )
        }
      </section>
    </div>

  )
}

export default AddBooking
