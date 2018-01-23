import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Message from './Message';

const mapStateToProps = (state) => ({
  messages: state.messages
});

class MessageList extends Component {
  render() {
    const allChats = this.props.allChats;
    const messages = this.props.messages;
    console.log('Messages', messages);
    return (
      <Row>
        <Col sm="6">
          <h1>Server Chats</h1>
          {allChats.map(message => (
            <Message message={message}/>
          ))}
        </Col>
        <Col sm="6">
          <h1>State Chats</h1>
          {messages.map(message => (
            <Message message={message}/>
          ))}
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps)(MessageList);
