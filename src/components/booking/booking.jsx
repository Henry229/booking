import React, {useContext, useEffect, useState} from 'react'
import styles from './booking.module.css';
import { BookContext } from '../../context/bookContext';
import { calendarInit } from '../../calendar/calendar';
import DateBox from '../dateBox/dateBox';

const Booking = ({clientRepository}) => {
  const {states, setStates} = useContext(BookContext);
  
  const values = calendarInit();
  
  
  const [customers, setCustomers] = useState({});
  // const [oneClient, setOneClient] = useState({});
  // const [second, setSecond] = useState(false);

  useEffect(() => {
    const stopSync = clientRepository.syncClients(clients => {
      setCustomers(clients);
    })
    // console.log('---- clients : ', customers);
    setStates({
      ...states,
      clients : customers,
    })
    return () => stopSync();
  }, [])
  
  console.log('====== clients : ', states)
  
  // console.log(']]] yogida1: ', states.openFirst, '/', states.openSecond);

  // const createOrUpdateClient = (client) => {
  //   console.log(">>>>Client in onAdd :", client)
  //   setStates ({ 
  //     ...states,       
  //     clients : client,
  //     oneClient :client,
  //   });
  //   // openFirst(() => true);
  //   // openSecond(() => true);
  //   console.log('>>oneClient : ', states.client);
  //   clientRepository.saveClient(client);
  //   return states;
  // };
  
  // const updateBook =(oneClient, detail) => {
  //   setClients ( client => {
  //     const selectedClient = {
  //       ...client,
  //       bookDetail: {
  //         ...detail
  //       }
  //     } 
  //     selectedClient[oneClient.id].detail[detail.bookDate] = detail;
  //     openFirst(() => true);
  //     openSecond(() => true);
  //     console.log('//////updateDetail : ', selectedClient);
  //     return selectedClient;
  //   })
  //   clientRepository.saveBookingDate(oneClient,detail);
  // };

  // console.log('#### client in App : ',clients)

  return (
    <ul className={styles.daylist}>
      {/* { Object.keys(values).map( key => ( */}
      { values.map( value => ( 
        <DateBox 
          // key={key} 
          key={value.id}
          // value={values[key]}
          value={value}
          // oneClient={states.oneClient}
          // clients={clients}
          clientRepository={clientRepository}
          // onAdd={createOrUpdateClient}
          // onAddBooking={updateBook} 
        />
      ))}
    </ul>
  )
}

export default Booking;
