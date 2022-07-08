import React, {useContext, useEffect, useState} from 'react'
import _ from 'lodash';
import styles from './booking.module.css';
import { BookContext } from '../../context/bookContext';
import { calendarInit } from '../../calendar/calendar';
import DateBox from '../dateBox/dateBox';
// import {DaySwitch, MonthSwitch} from '../../calendar/switch';

const Booking = ({clientRepository}) => {
  const {states, setStates} = useContext(BookContext);
  var bookPerson = {};
  
  const values = calendarInit();
  
  
  const [customers, setCustomers] = useState({});
  
  // const [oneClient, setOneClient] = useState({});
  // const [second, setSecond] = useState(false);
  const coverDate = value => {
    // const daySwitch = DaySwitch(value);
    // const monthSwitch = MonthSwitch(value);
    const dateBook = new Date(value.year, value.month-1, value.date);
    const bookYear = dateBook.getFullYear();
    const bookMonth = ( '0' + (dateBook.getMonth() + 1)).slice(-2);
    const bookdate = ('0' + dateBook.getDate()).slice(-2);
    const bookingDate = bookdate + '-' + bookMonth + '-'  + bookYear;
    return bookingDate;
  };

   
  useEffect(() => {
    // const stopSync = clientRepository.syncClients(clients => {
      // setStates(states => {return {...states, clients}});
      // bookPerson = {...clients}
      // setStates(clients);
    //   const syncClient = new Promise((resolve, reject) => {
    //     const stopSync = clientRepository.syncClients(clients => {
    //       const copyClients = _.cloneDeep(clients);
    //       console.log('===== client: ', copyClients);
    //       setStates(states =>({...states, clients:copyClients}));
    //     });
    //     resolve();
    // })

    const stopSync = () => {
      return new Promise((resolve, reject) => {
        clientRepository.syncClients(clients => {
          const copyClients = _.cloneDeep(clients);
          resolve(copyClients);
        })
      })
    }

    const settingState = (copyClients) => {
      console.log('===== copyClients: ', copyClients);
      return new Promise((resolve, reject) => {
        setStates(states =>({...states, clients:copyClients}));
        resolve(copyClients);
      })
    }
    
    const reBookClient = (copyClients) => { 
      return new Promise((resolve, reject) => {
        console.log('*** copyCLients in reBookClient: ', copyClients);
        console.log('===== states in reBookClient: ', states);
        Object.keys(copyClients).map( key => {
        if ( copyClients[key].hasOwnProperty('bookDetail')) {
          values.map( value => {
            const workingDate = coverDate(value);
            if ( workingDate == copyClients[key].bookDetail.bookDate) {
              console.log('@@@ matched: ', copyClients[key])
              setStates( prev => {
                const updated = {...prev};
                const updatedbook = prev.bookClient.concat(copyClients[key]);
                updated.bookClient = updatedbook;
                // updated.bookClient.push(copyClients[key]);
                console.log('@@@ updated: ', updated);
                return updated;
              });
          //     // bookPerson.push(states.clients[key]);
              console.log('&&& Yogida : states ', states);
            }
          })
        }
        })
        resolve("find matched? ")
      })
    }; 

    const syncClient = async () => {
      const result1 = await stopSync();
      const result2 = await settingState(result1);
      const result3 = await reBookClient(result2);
      console.log('=== Evoke useEffect ==', result3);
    }
  // await stopSync };
  
    syncClient(); 
      // .then ( () => { stopSync});
      // .then ( () => { return stopSync()})
      // .then ( () => { reBookClient()})
    
      // .then ( () => console.log('=== Evoke useEffect ==', states));
    // const stopSync = clientRepository.syncClients(clients => {
      // reBookClient();
      // })
    return () => stopSync();
  }, [clientRepository])

    // const stopSync = clientRepository.syncClients(clients => {
    //   const copyClients = _.cloneDeep(clients);
    //   setStates(states =>({...states, clients:copyClients}));
    //   // const stopSync = clientRepository.syncClients(clients => {
    //     // setStates(states => {return {...states, clients}});
    //     // bookPerson = {...clients}
    //     // setStates(clients);
    //   });
    // const syncClient = async () => { await stopSync };
      
    //   syncClient();
    //   console.log('=== Evoke useEffect ==', states, '/ bookPerson : ',bookPerson);
    // // const stopSync = clientRepository.syncClients(clients => {
    //   reBookClient();
    //   // })
    //   return () => stopSync();
  // }, [clientRepository, bookPerson, states.bookclient])
    
    //   setCustomers(clients);
  // setStates( states => {...states, clients: {...customers}});
  // console.log('???? states : ', states);
  // const sbookClient = client => {
  //   setStates( states => { 
  //   const updated = {...states};
  //   updated.bookClient.concat(client);
  //   // return updated;
  //   })
  // };

  
  
  // console.log('=========', states);
  
  
  // bookPerson && sbookClient(bookPerson);
  console.log('!!! Yogida2 :  states ', states);
  // setPerson( prev => {return [...prev, ...searchedPeople]});
  
  

  // console.log('======> bookClient : ', states);
  // setStates({
  //   ...states,
  //   clients : customers,
  // })
  // console.log('====== onUPdate : ', states);
  
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
      {/* { Object.keys().map( key => ( */}
      { values.map( value => ( 
        <DateBox 
          key={value.id}
          value={value}
          clientRepository={clientRepository}
        />
      ))}
    </ul>
  )
}

export default Booking;
