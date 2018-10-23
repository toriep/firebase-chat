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


export const getMessages = (chatId) => dispatch => {//get message data
    const dbRef = db.ref(`/chat-logs/${chatId}`);

    dbRef.on('value', (snapshot) =>{
        console.log('DB Snapshot :', snapshot.val());

        dispatch({
            type: types.GET_CHAT_MESSAGES,
            messages: snapshot.val()
        });
    });
    return dbRef;
}

export const getRoomInfo = roomId => dispatch => {//get room data
    const dbRef = db.ref(`/chat-rooms/${roomId}`);

    dbRef.on('value', snapshot => {
        console.log('Room  snapshot :', snapshot.val());

        dispatch({
            type: types.GET_ROOM_INFORMATION,
            roomInfo: snapshot.val()
        });
    });

    return dbRef;
}

export const createChatRoom = roomDetails => async dispatch => {
    const botMessage = {
        message: `Welcome to ${roomDetails.title}`,
        name: 'Chat-Bot'
    }
    const logKey = db.ref('/chat-logs').push().key;

    roomDetails.chatId = logKey;//add key data to room data
    const roomRef = await db.ref('/chat-rooms').push(roomDetails);

    console.log('roomRef.key :', roomRef.key);
    console.log('logKey :', logKey);

    await db.ref(`/chat-logs/${logKey}`).push(botMessage);//add first welcome message to chat log

    return roomRef.key;
}