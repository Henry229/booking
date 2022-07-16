import React, { useContext, useRef } from 'react';
import { BookContext } from '../../context/bookContext';
import styles from './addClient.module.css';

const AddClient = () => {
  const {states, setStates} = useContext(BookContext);

  const formRef = useRef ();
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();

  const onSubmit = event => {
    event.preventDefault();
    const client = {
      id: Date.now(),
      name: nameRef.current.value || '',
      email: emailRef.current.value || '',
      mobile: mobileRef.current.value || '',
    }
    formRef.current.reset();
    updateClients(client);
    onAddClient();
  };

  const updateClients = (client) => {
    setStates( states => {
      const updated = {...states};
      updated.clients[client.id] = client;
      updated.oneClient[0] = {...client};
      return updated;
    })
    states.clientRepository.saveClient(client);
  };

  const onAddClient = () => {
    return setStates({
      ...states,
      addClient: true,
    })
  };

  return (
    <div className={styles.wrapBox}>
      <h1 className={styles.loginTitle}> Register New Client</h1>
      <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
        <input className={styles.input} type="text" ref={nameRef} name="name" placeholder='name'/>
        <input className={styles.input} type="email" ref={emailRef} name="email" placeholder='email'/>
        <input className={styles.input} type="mobile" ref={mobileRef} name="mobile" placeholder='mobile'/>
        <button className={styles.rgtButton} type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddClient;