import { set } from 'firebase/database';
import React, { useContext, useRef, useState } from 'react'
import { BookContext } from '../../context/bookContext';
import styles from './addBookDay.module.css';

const AddBookDay = ({bookingDate}) => {
  const {states, setStates} = useContext(BookContext);

  const formRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const careRef = useRef();
  const messageRef = useRef();

  const onSubmit = event => {
    event.preventDefault();
    const detail = {
        bookDate: bookingDate,
        startTime: startTimeRef.current.value || '',
        endTime: endTimeRef.current.value || '',
        care: careRef.current.value || '',
        message: messageRef.current.value || '',
    }
    formRef.current.reset();
    updateBook(states.oneClient, detail);
    onAddClient();
  };

  const updateBook =(oneClient, detail) => {
    const updated = {...states};
    let bookUpdate = [];  
    if (!updated.clients[oneClient.id].bookDetail) {
      bookUpdate[0] = {...detail}
    } else {
      bookUpdate =[...updated.clients[oneClient.id].bookDetail]
      bookUpdate.push({...detail})
    }
    states.clientRepository.saveBookingDate(oneClient,bookUpdate);
  }; 

  const onAddClient = () => {
    return setStates({
      ...states,
      addClient: false,
    })
  };

  return (
    <div className={styles.container}>
      <section className={styles.selectedClient}>
        <p className={styles.clientName}>{states.oneClient && states.oneClient.name}</p>
        <div className={styles.rightPart}>
          <p>{states.oneClient && states.oneClient.mobile}</p>
          <p>{states.oneClient && states.oneClient.email}</p>
        </div>
      </section>
      <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
        <input className={styles.input} type="time" ref={startTimeRef} name="starttime" placeholder='stime'/>
        <input className={styles.input} type="time" ref={endTimeRef} name="endtime" placeholder='etime'/>
        <select className={styles.select} type="text" ref={careRef} name="theme" placeholder='care' >
          <option value="emmode">emmode</option>
          <option value="emmmode light">emmmode light</option>
          <option value="emmode strong">emmode strong</option>
        </select>
        <textarea className={styles.textarea} name="message" ref={messageRef} placeholder='message'/>
        <button className={styles.bookButton} type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddBookDay
