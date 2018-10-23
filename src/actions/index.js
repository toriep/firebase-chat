// import types from './types';
// import { db } from '../firebase';

// export const getMessages = () => dispatch => {
//     const dbRef = db.ref('/chat-messages');//created a reference for a point for your database

//     dbRef.on('/chat-messages').on('value',(snapshot) => {
//         console.log('DB Snapshot:', snapshot.val());
//         dispatch({
//             type: types.GET_CHAT_MESSAGES,
//             messages: snapshot.val()
//         })

//     });
//     return dbRef;
// }

import types from './types';
import { db } from '../firebase';

export const getMessages = () => dispatch => {
    const dbRef = db.ref('/chat-messages');

    dbRef.on('value', (snapshot) =>{
        console.log('DB Snapshot :', snapshot.val());

        dispatch({
            type: types.GET_CHAT_MESSAGES,
            messages: snapshot.val()
        });
    });
    return dbRef;
}