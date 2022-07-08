import React, {useContext, useState} from 'react';
import styles from './dateBox.module.css';
import { BookContext } from '../../context/bookContext';

// import BookingContents from '../bookingContents/bookingContents';
// import AddBooking from '../addBooking/addBooking';
import { useNavigate } from 'react-router-dom';

const DateBox = ({ value, onAdd, onAddBooking, oneClient, clients, clientRepository}) => {
  const [addClient, setAddClient] = useState(false);
  const navigate = useNavigate();
  const {states, setStates} = useContext(BookContext);
  const [bookingContents, setBookingContents] = useState(false);
  const [guys, setGuys] = useState({});
  const [person, setPerson] = useState([]);

  const dateBook = new Date(value.year, value.month-1, value.date);
  const bookYear = dateBook.getFullYear();
  const bookMonth = ( '0' + (dateBook.getMonth() + 1)).slice(-2);
  const bookdate = ('0' + dateBook.getDate()).slice(-2);
  const bookingDate = bookdate + '-' + bookMonth + '-'  + bookYear;
  
  
  // const info = () => console.log('updated booking info');
  // console.log('}}} states', states);
  // Object.keys(states).map( key => {
  //   if ( states[key].hasOwnProperty('bookDetail')) {
  //      console.log('>>>>+++ states[key]', states[key]);
      //  return
    //  } 
     // } else {
     //   if ( bookingDate == states.clients.detail.bookDate) (
     //   <li>
     //     {states.clients[key]}
     //   </li>
     //   )
     // }
  //  }
  // ) 
  const onBookingContents = () => {
    setStates({
      ...states,
      value: value,
      clientRepository: clientRepository,
    })
    navigate('/bookingContents'); 
  }
  // console.log('====== clients : ', states)
  return (
    <div className={styles.container} >
      <div className={styles.listBox} >
        <li className={styles.dateBox} >
          <p className={styles.day}>{value.day}</p>
          <p className={styles.date}>{value.date}</p>
        </li>
        <div className={styles.contents} onClick={onBookingContents} >
          {   states.hasOwnProperty('bookClient') &&  
              states.bookClient.length > 0
              ? ( states.bookClient.map( (value,key) => (
                  // console.log('===> bookClient: ', states.bookClient[index].bookDetail.bookDate);
                  // console.log('===> bookClient: ', bookingDate, '/',states.bookClient[key].bookDetail.bookDate);
                  bookingDate == states.bookClient[key].bookDetail.bookDate 
                  ? (<div key={key}>
                      <span>{states.bookClient[key].name}</span>
                      <span>{`${states.bookClient[key].bookDetail.startTime}
                               - ${states.bookClient[key].bookDetail.endTime}`}
                      </span>
                    </div>)
                  : null
              )))
              : null                
          }
        </div>

          {/* <button onClick={onOpenModal}></button> */}
              {/* { onBooking  
                : null //예약 내용 표시
              } */}
          {/* <div className={styles.modalBox}>
            { openFirst && 
              <BookingContents 
              value={value}
              oneClient={oneClient}
              clients={clients} 
              onOpenSecond={onOpenSecond}
              />
            }
            { openSecond && 
              <AddBooking 
              value={value}
              oneClient={oneClient}
              clients={clients}
              addClient={onaddClient}
              onAdd={onAdd}
              />
            }
          </div> */}
        </div>
      {/* <div> */}
          {/* <Modal open={states.openFirst} onClose={onCloseFirst} center>
            <BookingContents 
              value={value}
              oneClient={oneClient}
              clients={clients} 
              onOpenSecond={onOpenSecond}
              />
          </Modal> */}
      </div>
      // {/* <section>
      //   { bookingContents && 
      //     <BookingContents 
      //       value={value}
      //       // oneClient={oneClient}
      //       // clients={clients} 
      //       // onOpenSecond={onOpenSecond}
      //       clientRepository={clientRepository}
      //       // onAdd={onAdd}
      //     />
      //   } 
      // </section> */}
      //   {/* <div className={styles.dragModalBox}>
      //     <Modal open={states.openSecond} onClose={onCloseSecond} center>
      //       <AddBooking 
      //         value={value} 
      //         oneClient={oneClient}
      //         clients={clients}
      //         onAdd={onAdd}
      //         onAddBooking={onAddBooking}
      //         setCloseDragModal={info} 
      //         /> 
      //     </Modal>
      //   </div> */}
      // {/* </div> */}

  )
}

export default DateBox
