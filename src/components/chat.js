import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../actions';

class Chat extends Component {
    componentDidMount() {
        this.dbRef = this.props.getMessages();

        console.log('DB Ref:', this.dbRef);
    }

    componentWillUnmount() {
        this.dbRef.off();
    }
    render() {
        const { messages } = this.props;
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
                <h1 className="center">Chat Room</h1>
                <ul className="collection">
                    {messageElement}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        messages: state.chat.messages
    }
}

export default connect(mapStateToProps, {
    getMessages: getMessages
})(Chat);