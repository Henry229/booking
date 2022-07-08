import React, { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { BookContext } from '../../context/bookContext';
import styles from './addClient.module.css';

const AddClient = () => {
  const {states, setStates} = useContext(BookContext);

  const formRef = useRef ();
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const careRef = useRef();
  const messageRef = useRef();

  const onSubmit = event => {
    event.preventDefault();
    const client = {
      id: Date.now(),
      name: nameRef.current.value || '',
      email: emailRef.current.value || '',
      mobile: mobileRef.current.value || '',
      // bookingDate: {
      //   bookdate: '',
      //   startTime: '',
      //   endTime: '',
      //   care: '',
      //   message: '',
      // }
    }
    // setStates ({ 
    //   ...states,       
    //   const updated = {...states.clients, ...client }, 
    //   // oneClient :client,
    // });
    // console.log("###Client in onSubmit :", client)
    formRef.current.reset();
    updateClients(client);
    updateOneClient(client);
    onAddClient();
  };

  const updateClients = (client) => {
    setStates( states => {
      const updated = {...states};
      // console.log("!!!Client in function :", states,'/', client);
      updated.clients[client.id] = client;
      updated.oneClient.push(client);
      // updated[states.oneClient] = client;
      return updated;
    })
    // console.log("!!!!Client in updateClients :", states)
    states.clientRepository.saveClient(client);
    
    // openFirst(() => true);
    // openSecond(() => true);
    // console.log('>>oneClient : ', states.oneClient);
    // console.log('####clientRepository:', states.clientRepository);
    // return states;
  };

  const updateOneClient = (client) => {

    // setStates( (states) => {
    //   const update = {...states};
    //   update.oneClient = client;
    //   return update;
    //   })
      // const updated = {...states};
      // console.log('111 updated: ', updated, '/', client);
      // updated["oneClient"] = client;
      // console.log('222 updated: ', updated, '/', client);
      // return updated;
      // updated[states.oneClient] = client;
    console.log("@@@@ Client in oneClient :", states, '/', states.oneClient);
    
    // openFirst(() => true);
    // openSecond(() => true);
    // console.log('>>oneClient : ', states.oneClient);
    // console.log('####clientRepository:', states.clientRepository);
    // return states;
  };

  const onAddClient = () => {
    return setStates({
      ...states,
      addClient: true,
    })
  };

  return (
    <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
      <input className={styles.input} type="text" ref={nameRef} name="name" placeholder='name'/>
      <input className={styles.input} type="email" ref={emailRef} name="email" placeholder='email'/>
      <input className={styles.input} type="mobile" ref={mobileRef} name="mobile" placeholder='mobile'/>
      <button className={styles.button} type="submit">Add</button>
    </form>
  )
}

export default AddClient;