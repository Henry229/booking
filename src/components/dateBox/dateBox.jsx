import React from 'react';
import styles from './dateBox.module.css';
import { useState } from 'react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import BookingContents from '../bookingContents/bookingContents';

const DateBox = ({value}) => {
  const [onBooking, setOnBooking] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onClickBooking = () => {
    setOnBooking(true)
  };

  return (
    <div className={styles.container}>
      <li className={styles.dateBox} >
        <p className={styles.day}>{value.day}</p>
        <p className={styles.date}>{value.date}</p>
      </li>
      <div className={styles.contents} onClick={onOpenModal}>
        {/* <button onClick={onOpenModal}></button> */}
        <div className={styles.modal}>
          <Modal open={open} onClose={onCloseModal} center>
            <BookingContents value={value} />
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
