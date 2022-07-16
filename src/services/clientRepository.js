import {
  getDatabase, 
  ref, 
  set, 
  remove, 
  onValue, 
  off, 
  update,
  child,
  push
} from 'firebase/database';

class ClientRepository {
  constructor() {
    this.db = getDatabase();
  }

  syncClients(onUpdate) {
    const query = ref(this.db, 'clients/');
    onValue(query,(snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => off(query);
  }

  saveClient(client) {
    set(ref(this.db,`clients/${client.id}`), client);
  };

  saveBookingDate(client, detail) {
    const newKey = push(child(ref(this.db),'clients')).key
    console.log('%%%% detail- ', detail)

    const updates = {};
    updates[`/clients/${client.id}/bookDetail`] = detail;

    return update(ref(this.db), updates);
  };

}

export default ClientRepository;
