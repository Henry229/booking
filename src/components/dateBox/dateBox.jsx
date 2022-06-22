import React from 'react';
import styles from './dateBox.module.css';
import { useState } from 'react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import BookingContents from '../bookingContents/bookingContents';
import AddBooking from '../addBooking/addBooking';

const DateBox = ({value}) => {
  const [onBooking, setOnBooking] = useState(false);
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const onOpenFirst = () => setOpenFirst(true);
  const onOpenSecond = () => setOpenSecond(true);
  const onCloseFirst = () => setOpenFirst(false);
  const onCloseSecond = () => setOpenSecond(false);
  const info = () => console.log('updated booking info');
  return (
    <div className={styles.container}>
      <li className={styles.dateBox} >
        <p className={styles.day}>{value.day}</p>
        <p className={styles.date}>{value.date}</p>
      </li>
      <div className={styles.contents} onClick={onOpenFirst}>
        {/* <button onClick={onOpenModal}></button> */}
        <div className={styles.modalBox}>
          <Modal open={openFirst} onClose={onCloseFirst} center>
            <BookingContents value={value} onOpenSecond={onOpenSecond}/>
          </Modal>
        </div>
        <div className={styles.dragModalBox}>
          <Modal open={openSecond} onClose={onCloseSecond} center>
            <AddBooking value={value} setCloseDragModal={info}/>
          </Modal>
        </div>

        {/* { onBooking  
          : null //예약 내용 표시
        } */}
      </div>
    </div>
  )
}

export default DateBox
