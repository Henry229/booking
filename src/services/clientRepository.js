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

    const updates = {};
    updates[`/clients/${client.id}/bookDetail`] = detail;

    return update(ref(this.db), updates);
  };

}

export default ClientRepository;

// import { getDatabase, ref, child, push, update } from "firebase/database";

// function writeNewPost(uid, username, picture, title, body) {
//   const db = getDatabase();

//   // A post entry.
//   const postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     title: title,
//     starCount: 0,
//     authorPic: picture
//   };

//   // Get a key for a new Post.
//   const newPostKey = push(child(ref(db), 'posts')).key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   const updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//   return update(ref(db), updates);
// }

// let updates = {}
// const newTransactionKey = docRef.child('transactions').push().key;
// updates[`${ticker}/transactions/${newTransactionKey}`] ={
//     date: new Date().toString(),
//     transaction: `${Number(values.shares)} shares added @ $${perShare} ea`
// }
// updates[`${ticker}/category`] = values.category;
// updates[`${ticker}/shares`] = newShares;
// updates[`${ticker}/cost`] = newCost;

