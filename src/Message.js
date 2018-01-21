import React, { Component } from 'react';
import { Card, Media } from 'reactstrap';
import './Message.css';

export default class Message extends Component {
  render() {
    return (
      <Card className="chat-message mb-1">
      <Media className="p-3">
        <Media left href="#" className="p-1">
          <Media object src="http://via.placeholder.com/64x64" alt="Generic placeholder image" className="rounded-circle"/>
        </Media>
        <Media body className="ml-3">
          <Media heading>
            {this.props.message.from}
            </Media>
            {this.props.message.content}
          </Media>
        </Media>
      </Card>
    )
  }
}
