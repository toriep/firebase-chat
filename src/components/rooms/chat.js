import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getMessages, getRoomInfo, sendMessage } from '../../actions';
import Input from '../general/input';

class Chat extends Component {

    roomRef = null;
    chatRef = null;

    componentDidMount() {
        const {getRoomInfo, match: {params} } = this.props;
        console.log('Room ID :', params.room_id);
        this.roomRef = getRoomInfo(params.room_id);
        console.log('this.logRef :', this.logRef);//a way to make a reference to a specific element on the screen
    }

    componentDidUpdate(prevProps){
        const { chatId, getMessages } = this.props;
        if(chatId && prevProps.chatId !== chatId){//if chatId exists and the previous chat id is not the current chatid
            this.chatRef = getMessages(chatId);
        }

        this.scrollToBottom();
    }

    scrollToBottom=()=>{
        this.logRef.scrollTop = this.logRef.scrollHeight;
    }

    componentWillUnmount() {
        if(this.roomRef){
            this.roomRef.off()
        }
        if(this.chatRef){
            this.chatRef.off()
        }
    }

    handleSendMessage = (values) => {
        const {message} = values;
        // console.log('Send Message:', message);
        const {chatId, sendMessage, reset} = this.props;

        if(chatId){
            // console.log('chatId :', chatId);
            sendMessage(chatId, message);
            reset();
        }
        console.log('chatId :', chatId);
    }

    render() {
        const { description, handleSubmit, messages, title, topic } = this.props;

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
                <ul ref={e => this.logRef = e} className="collection chat-log">
                    {messageElement}
                </ul>
                <form className="row" onSubmit={handleSubmit(this.handleSendMessage)}>
                    <div className="col s10">
                        <Field name="message" label="Message" component={Input} />
                    </div>
                    <div className="col s2 right-align">
                        <button className="btn blue darken-1 send-button">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

Chat = reduxForm({
    form: 'chat-message'
})(Chat);

function mapStateToProps(state) {
    // console.log(state);
    return { ...state.chat };
}

export default connect(mapStateToProps, {
    getMessages, getRoomInfo, sendMessage
})(Chat);