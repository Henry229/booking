import React, { useContext, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './editBook.module.css';
import {DaySwitch, MonthSwitch, ChangeDate} from '../../calendar/switch';
import { BookContext } from '../../context/bookContext';

const EditBook = ({selectedCustom, bookingInfo, index, onEditCancel}) => {
  const {states, setStates} = useContext(BookContext);
  const [beDate,inputDate] = ChangeDate(bookingInfo.bookDate);

  const formRef = useRef();
  const dateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const careRef = useRef();
  const messageRef = useRef();

  const daySwitch = DaySwitch(states.value);
  const monthSwitch = MonthSwitch(states.value);

  console.log('*****!!! inpuDate : ', inputDate);
  const [ showDate, setShowDate] = useState(inputDate);
  const [ inputs, setInputs] = useState({
    bookDate: bookingInfo.bookDate,
    care: bookingInfo.care,
    endTime: bookingInfo.endTime,
    message: bookingInfo.message,
    startTime: bookingInfo.startTime,
  })
  const {bookDate, care, endTime, message, startTime} = inputs;
  // const fetchDate = new Date(detail.bookDate).toISOString().substring(0,10);toISOString().substring(0, 10)
  // console.log('???? ',fetchDate);

  console.log('////> client : ', selectedCustom, '/ detail : ', bookingInfo, '/', index );
  console.log('====',inputs);

  const onSubmit = event => {
    event.preventDefault();
    // const edit = {
      //     bookDate: beDate,
      //     startTime: startTimeRef.current.value || '',
      //     endTime: endTimeRef.current.value || '',
      //     care: careRef.current.value || '',
      //     message: messageRef.current.value || '',
      // }
      formRef.current.reset();
      // alterBook(states.oneClient, edit);
    };
    
    const alterBook = (inputs) => {
      console.log("//// detail : ", inputs)
      const chDate = bookDate;
      const beDate = `${chDate.slice(8,10)}-${chDate.slice(5,7)}-${chDate.slice(0,4)}}`
      setInputs({...inputs, bookDate: beDate})
      setShowDate(bookDate)
    
      let bookUpdate = [];
    // setStates( prevStates => {
      const updated = {...states};
      bookUpdate = [...updated.clients[selectedCustom.id].bookDetail]
      bookUpdate[index] = {...inputs};
      // updated.clients[selectedCustom.id].bookDetail[index] = {...bookinginfo};
      console.log('----====> bookUpdate ', bookUpdate);
      console.log('//////// updated ', updated);
      // return updated;
    // });
      states.clientRepository.saveBookingDate(selectedCustom,bookUpdate);

  };

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
    
    // const updated = {...states};
    // let bookUpdate = [...updated.clients[selectedCustom.id].bookDetail]
    // updateBook({
    //   ...bookUpdate[index],
    //   [event.currentTarget.name] : event.currentTarget.value,
    // })
  };

    
    
    // setStates( prevClients => {
    //   ...prevClients,
    //   clients: {
    //     ...prevClients.clients,
    //     clients[selectedCustom.id] :
    //   },
    // })
    // const updated = {...states}
    // let bookUpdate = [];
    // bookUpdate = [...updated.clients[selectedCustom.id].bookDetail];
    // bookUpdate[index] = [...bookingInfo];

    // setStates({
    //   ...states,
    //   [event.currentTarget.name]: event.currentTarget.value,
    // })


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
      <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
        <input className={styles.input} onChange={onChange} type="date" ref={dateRef} name="bookDate" value={showDate}/>
        <input className={styles.input} onChange={onChange} type="time" ref={startTimeRef} name="startTime" value={startTime}/>
        <input className={styles.input} onChange={onChange} type="time" ref={endTimeRef} name="endTime" value={endTime}/>
        <select className={styles.select} onChange={onChange} type="text" ref={careRef} name="care" value={care} >
          <option value="emmode">emmode</option>
          <option value="emmmode light">emmmode light</option>
          <option value="emmode strong">emmode strong</option>
        </select>
        <textarea className={styles.textarea} onChange={onChange} name="message" ref={messageRef} value={message}/>
        <button className={styles.bookButton} type="submit"></button>
      </form>
    </div>
  )
}

export default EditBook
