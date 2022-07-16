import React, { useContext, useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import styles from './editBook.module.css';
import {DaySwitch, MonthSwitch, ChangeDate} from '../../calendar/switch';
import { BookContext } from '../../context/bookContext';

const EditBook = ({selectedCustom, bookingInfo, index, onEditCancel}) => {
  const {states, setStates} = useContext(BookContext);

  const formRef = useRef();
  const dateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const careRef = useRef();
  const messageRef = useRef();

  const daySwitch = DaySwitch(states.value);
  const monthSwitch = MonthSwitch(states.value);

  const [ alterDate, setAlterDate] = useState(new Date(bookingInfo.bookDate));
  const [ inputs, setInputs] = useState({
    bookDate: bookingInfo.bookDate,
    care: bookingInfo.care,
    endTime: bookingInfo.endTime,
    message: bookingInfo.message,
    startTime: bookingInfo.startTime,
  });

  const {bookDate, care, endTime, message, startTime} = inputs;

  useEffect( () => {
    console.log(' ++++> inputs : ', inputs);
    console.log('++++> alterDate : ', alterDate);
  },[inputs, alterDate]);


  const onSubmit = event => {
    event.preventDefault();
    formRef.current.reset();
  };
    
  const alterBook = (inputs) => {
    setInputs({...inputs});
    
    let bookUpdate = [];
    const updated = {...states};
    bookUpdate = [...updated.clients[selectedCustom.id].bookDetail]
    bookUpdate[index] = {...inputs};

    states.clientRepository.saveBookingDate(selectedCustom,bookUpdate);
  };

  
    
  const alterBookDate = (date) => {
    const formatDate = format(date,"MM-dd-yyyy");
    setAlterDate(()=>{return date});
    const fixDate = {...inputs, bookDate: formatDate}
    setInputs(() => ({...inputs, bookDate: formatDate}));
    let bookUpdate = [];
    const updated = {...states};
    bookUpdate = [...updated.clients[selectedCustom.id].bookDetail]
    bookUpdate[index] = {...fixDate}

    states.clientRepository.saveBookingDate(selectedCustom,bookUpdate);
  }

  const onChange = event => {
    if (event.currentTarget == null) {
      return;
    }
    console.log('====///>> event ---', event.currentTarget)
    event.preventDefault();
    alterBook({
      ...inputs,
      [event.currentTarget.name] : event.currentTarget.value,
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.h1Title}>Edit Booking</h1>
        <button className={styles.cancelButton} onClick={() => onEditCancel()}>
          <img className={styles.cancelImg} src="/images/xmark-solid.png" alt="cancelButton" />
        </button>
        <div className={styles.dateBox}>
          <span className={styles.day}>{daySwitch}  </span>
          <span className={styles.date}>{states.value.date}  </span>
          <span className={styles.month}>{monthSwitch}</span>
        </div>
      </header>
        <div>
          <DatePicker dateFormat="dd/MM/yyyy" selected={alterDate} onChange={alterBookDate} /> 
        </div>
      <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
        <input className={styles.input} onChange={onChange} type="time" ref={startTimeRef} name="startTime" value={startTime}/>
        <input className={styles.input} onChange={onChange} type="time" ref={endTimeRef} name="endTime" value={endTime}/>
        <select className={styles.select} onChange={onChange} type="text" ref={careRef} name="care" value={care} >
          <option value="emmode">emmode</option>
          <option value="emmmode light">emmmode light</option>
          <option value="emmode strong">emmode strong</option>
        </select>
        <textarea className={styles.textarea} onChange={onChange} type="text" name="message" ref={messageRef} value={message}/>
        <button className={styles.bookButton} type="submit"></button>
      </form>
    </div>
  )
}

export default EditBook
