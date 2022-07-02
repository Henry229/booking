import { set } from 'firebase/database';
import React, { useContext, useRef, useState } from 'react'
import { BookContext } from '../../context/bookContext';
import styles from './addBookDay.module.css';

const AddBookDay = ({addClient, oneClient, bookingDate, onAddBooking}) => {
  const {states, setStates} = useContext(BookContext);
  const [clients, setClients] = useState({});

  const formRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const careRef = useRef();
  const messageRef = useRef();

  // const { id, name, email, mobile } = states.oneClient;
  // oneClient = {
  //   // ...oneClient,
  //   id:states.oneClient.id,
  //   name:states.oneClient.name, 
  //   email:states.oneClient.email, 
  //   mobile:states.oneClient.mobile,
  // };
  console.log('//// client in addBookDay: ', states.oneClient);

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
    console.log("//// oneClient : ", oneClient)
    setStates( states => {
      const updated = {...states}
      updated.oneClient.bookDetail = detail;
      return updated;
      // const selectedClient = {
      // ...clients,
      // bookdate: {
      //   ...detail
      // };
      // selectedClient[oneClient.id].detail[bookDate] = detail;

    })
    console.log('//////updateDetail : ', states);
    states.clientRepository.saveBookingDate(oneClient,detail);
    
    // setClients ( clients => {
    //   clients.detail.push(detail);
      // return {...clients, oneClient : detail }
    }; 
    //   return selectedClient;
    // })

  const onAddClient = () => {
    return setStates({
      ...states,
      addClient: false,
    })
  };

  console.log('+++ oneClient in addBookDay: ', states);

  return (
    <div className={styles.container}>
      <section>
        <p>name:{states.oneClient && states.oneClient.name}</p>
        <p>mobile:{states.oneClient && states.oneClient.mobile}</p>
        <p>email:{states.oneClient && states.oneClient.email}</p>
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
        <button className={styles.button} type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddBookDay
