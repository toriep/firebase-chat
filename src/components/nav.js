import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <div>
                <nav style={{padding: '0 12px'}} className="red darken-2">
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">Fire Chat</Link>
                        <ul className="right">
                            <li>
                                <Link to ="/">Home</Link>
                                </li>
                            <li>
                                <Link to="/rooms">Chat Lobby</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;
