import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon
  } from 'reactstrap';

const CREATE_CHAT_MUTATION = gql`
  mutation CreateChatMutation($content: String!, $from: String!) {
    createChat(content: $content, from: $from) {
      id
      createdAt
      from
      content
    }
  }
`;

class Chatbox extends Component {
  state = {
    from: 'anonymous',
    content: ''
  };
  componentDidMount() {
    let username = window.localStorage.getItem('username');
    if(!username) {
      const promptInput = window.prompt('username');
      username = promptInput;
      window.localStorage.setItem('username', username);
    }
    username && this.setState({ from: username });
  }
  render() {
    return (
        <InputGroup className='fixed-bottom'>
          <Input
            placeholder="Enter your message here"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="text"
            onKeyPress={this._key}
          />
          <InputGroupAddon addonType="append">
            <Button color="success" onClick={this._createChat}>Send</Button>
          </InputGroupAddon>
        </InputGroup>
    )
  }
  _createChat = async e => {
    const { content, from } = this.state;
    await this.props.createChatMutation({
      variables: { content, from }
    });
    this.setState({ content: '' });
  }
  _keyCheck(e) {
    if (e.key === 'Enter') {
      this._createChat();
    }
  }
}

export default graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation '})(Chatbox);
