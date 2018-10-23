import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages, getRoomInfo } from '../../actions';

class Chat extends Component {

    roomRef = null;
    chatRef = null;

    componentDidMount() {
        const {getRoomInfo, match: {params}} = this.props;
        console.log('Room ID :', params.room_id);
        this.roomRef = getRoomInfo(params.room_id);
    }

    componentDidUpdate(prevProps){
        const { chatId, getMessages } = this.props;
        if(chatId && prevProps.chatId !== chatId){//if chatId exists and the previous chat id is not the current chatid
            this.chatRef = getMessages(chatId);
        }
    }

    componentWillUnmount() {
        if(this.roomRef){
            this.roomRef.off()
        }
        if(this.chatRef){
            this.chatRef.off()
        }
    }

    render() {
        const { description, messages, title, topic } = this.props;
        const messageElement = Object.keys(messages).map(key => {
            const { name, message } = messages[key]
            return (
                    <li key={key} className="collection-item">
                        <b>{name}: </b>{message}
                    </li>

            )
        })
        return (
            <div>
                <div className="center">
                    <h1>{title || 'Chat Room'}</h1>{/* before it loads, it says chatroom, after it loads, you see the chat room name */}
                    <h5 className="grey-text">{topic}</h5>
                    <p className="grey-text">{description}</p>
                </div>
                <ul className="collection">
                    {messageElement}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return { ...state.chat };
}

export default connect(mapStateToProps, {
    getMessages, getRoomInfo
})(Chat);