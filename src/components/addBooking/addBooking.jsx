import React from 'react';
import styles from './addBooking.module.css';
import {DaySwitch, MonthSwitch} from '../../calendar/switch';
import { useRef } from 'react';

const AddBooking = ({value, setCloseDragModal}) => {
  const daySwitch = DaySwitch(value);
  const monthSwitch = MonthSwitch(value);

  const inputRef = useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    // search(value);
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const onSearch = () => {
    handleSearch();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Booking</h1>
        <div className={styles.dateBox}>
          <p className={styles.date}>{value.date}</p>
          <p className={styles.month}>{monthSwitch}</p>
          <p className={styles.day}>{daySwitch}</p>
        </div>
      </header>
      <section className={styles.searchSection}>  {/* 있으면 데이타 가져오고 없으면 신규등록 */}
        <input 
          className={styles.searchInput}          
          type="search" 
          placeholder="Name..."    
          ref={inputRef}
          onKeyPress={onKeyPress}
        />
        <button className={styles.searchButton} onClick={onSearch}>
          <img className={styles.imgButton} src="/images/search.png" alt="search" />
        </button>  
      </section>
    </div>

  )
}

export default AddBooking
