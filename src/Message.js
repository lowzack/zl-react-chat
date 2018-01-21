import React, { Component } from 'react';
import { Card, Media } from 'reactstrap';
import './Message.css';

export default class Message extends Component {
  render() {
    return (
      <Card className="chat-message">
      <Media className="p-3">
        <Media left href="#" className="p-2">
          <Media object src="http://via.placeholder.com/64x64" alt="Generic placeholder image" className="circle-image"/>
        </Media>
        <Media body className="ml-2">
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
