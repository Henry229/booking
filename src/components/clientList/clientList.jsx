import styles from './clientList.module.css';

const ClientList = ({client, onMoveAddBookDay}) => {
  return (
    <li className={styles.clientList} onClick={() => onMoveAddBookDay(client)}>
      <span>name: {client.name} | </span>
      <span>email: {client.email} | </span>
      <span>mobile: {client.mobile} | </span>
    </li>
  )
}

export default ClientList
