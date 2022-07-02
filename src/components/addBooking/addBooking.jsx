import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import styles from './addBooking.module.css';
import {DaySwitch, MonthSwitch} from '../../calendar/switch';
import { BookContext } from '../../context/bookContext';
import AddClient from '../addClient/addClient';
import AddBookDay from '../addBookDay/addBookDay';
import ClientList from '../clientList/clientList';

let searchedPeople = [];
let showSearched = false;

const AddBooking = ({oneClient, clients, onAdd, onAddBooking}) => {
  const {states, setStates} = useContext(BookContext);
  const [guys, setGuys] = useState({});
  const [person, setPerson] = useState([]);
  const daySwitch = DaySwitch(states.value);
  const monthSwitch = MonthSwitch(states.value);
  const dateBook = new Date(states.value.year, states.value.month-1, states.value.date);
  const bookYear = dateBook.getFullYear();
  const bookMonth = ( '0' + (dateBook.getMonth() + 1)).slice(-2);
  const bookdate = ('0' + dateBook.getDate()).slice(-2);
  const bookingDate = bookdate + '-' + bookMonth + '-'  + bookYear;
  console.log('++ dateBook: ', bookingDate);

  const inputRef = useRef();

  useEffect(() => {
    const stopSync = states.clientRepository.syncClients(clients => {
      setGuys(clients);
    })
    // console.log('---- clients : ', customers);
    // setStates({
    //   ...states,
    //   clients : guys,
    // })
    return () => stopSync();
  }, []);

  const handleSearch = () => {
    const searchClient = inputRef.current.value;
    console.log('========= searchWord:', searchClient, '/', states);
    search(searchClient);
    // if (Object.keys(person).length > 0) {
    //   setShowSearched(() => true)
    //   console.log(':::if ',showSearched);
    // } else {
    //   setShowSearched(() => false);
    //   console.log(':::else ',showSearched);
    // }
    inputRef.current.value = '';
    // processSearch(searchClient);
  }
  
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const onSearch = () => {
    handleSearch();
  }
  // useEffect(() => {
    //   const stopSync = clientRepository.syncClients( clients => {
      //     setGuys(clients);
      //   })
      //   setStates({
        //     ...states,
        //     clients : {...guys},
        //   })
        //   return () => stopSync();
        // }, [clientRepository])
        
        
  const search = (searchClient) => {
          // const stopSync = await states.clientRepository.syncClients( clients => {
            //   setGuys(() => clients);
            //   console.log('!!!! Searching sync : ', clients);
            // })
    searchedPeople=[];
    setPerson('');    // let tempPerson={};
    // let matchedGuys={};
    showSearched = false;
    guys && Object.keys(guys).map( key => {
      if ( guys[key].name === searchClient ) {
        // setPerson( prev => { 
          //   const upgled = {...prev};
          //   upgled[key] = guys[key];
          //   return upgled;
          // });
          searchedPeople.push(guys[key]);
          // person[key] = {...person[key], ...guys[key]};
          // console.log('|||||||', guys[key], '/ tempPerson : ', tempPerson );
          console.log('😀😀😀😀😀', guys[key], '/ searchedPeople : ', searchedPeople );
          // setSearched( () => person.push(states.clients[key]))
      }
    });
    setPerson( prev => {return [...prev, ...searchedPeople]});
    setStates(states => {
      const updated={...states};
      updated.clients = guys;
      return updated;
    })

    searchedPeople.length > 0 ? showSearched = true : showSearched = false;
    console.log('??? searchedPeople : ', searchedPeople,'/ length', searchedPeople.length, '/ switch :', showSearched); 
    // console.log('??? searchedPeople : ', searchedPeople,'/ length', Object.keys(searchedPeople).length, '/ switch :', showSearched); 
    console.log('!!!! person : ', person);
    return;
  };
  
  const onMoveAddBookDay = (selectedClient) => {
    console.log('=== person in Move : ', selectedClient);
    setStates(states => {
      const updated = {...states};
      updated.addClient = true;
      updated.oneClient = selectedClient;
      return updated;
    });
  };
  
  console.log('>>** search states : ', states, '/ person : ', person);

  useEffect(() => {
    console.log('useEffect States updated');
  }, [states])
  
  // const processSearch = (searchClient) => {
    // Object.keys(states.clients).map( key => {
  // };
  // const processSearch = (searchClient) => {
  //   const person = [];
  //   console.log('&&&&& Searching guys : ', guys);
  //   // Object.keys(states.clients).map( key => {
  //   Object.keys(guys).map( key => {
  //     if ( guys[key].name === searchClient ) {
  //       setSearched( () => person.push(states.clients[key]))
  //     }
  //     console.log('>>** search client', searched);
  //   });
  // };

    // setStates(clients => {
      // setStates({
      //   ...states,
      //   clients : clients
      // });
    //   const updated ={...states};
    //   updated.push(guys);
    // })
    // console.log('!!** search client', states);


  // const onOpenSecond = () => setOpenSecond(true);
  
    // console.log('+++ addCLient in addBooking: ',addClient)
    // setAddClient(() =>!addClient);
    // console.log('@@@ addCLient in addBooking: ',addClient)
  // };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Booking</h1>
        <div className={styles.dateBox}>
          <p className={styles.date}>{states.value.date}</p>
          <p className={styles.month}>{monthSwitch}</p>
          <p className={styles.day}>{daySwitch}</p>
        </div>
      </header>
      <section className={styles.searchSection}>  {/* 있으면 데이타 가져오고 없으면 신규등록 */}
        <input 
          className={styles.searchInput}          
          type="search" 
          placeholder="Enter Client Name..."    
          ref={inputRef}
          onKeyPress={onKeyPress}
        />
        <button className={styles.searchButton} onClick={onSearch}>
          <img className={styles.imgButton} src="/images/search.png" alt="search" />
        </button>  
      </section>
      <section>
        { showSearched 
          // ? Object.keys(person).map( key => 
          ? person.map( client => 
            (<ul>
              <ClientList key={client.id} client={client} onMoveAddBookDay={onMoveAddBookDay}/>
            </ul>
          ))
          : ( <span>No Client</span> )
        }
      </section>
      { states.addClient
        ? (<AddBookDay 
          // addClient={addClient} 
          // oneClient={oneClient} 
          // onAddBooking={onAddBooking}
          // clientRepository={clientRepository}
          bookingDate={bookingDate}/> )
        : ( <AddClient /> )
        }
    </div>

  )
}

export default AddBooking
