import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

const loginAction = (user) => {
  console.log('loggin in as', user)
  return {
    type: 'LOGIN',
    user
  }
};

const mapStateToProps = (state) => ({
  username: state.user
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: bindActionCreators(loginAction, dispatch)
  }
}

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
    this.props.setUser(username);
  }
  render() {
    const username = this.props.username;
    return (
      <Container fluid className='fixed-bottom'>
        <h1>{username}</h1>
        <InputGroup>
          <Input
            placeholder="Enter your message here"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="text"
            onKeyPress={this._checkKey.bind(this)}
          />
          <InputGroupAddon addonType="append">
            <Button color="success" onClick={this._createChat.bind(this)}>Send</Button>
          </InputGroupAddon>
        </InputGroup>
      </Container>
    )
  }
  async _createChat() {
    const { content } = this.state;
    await this.props.createChatMutation({
      variables: { content, from: this.props.username }
    });
    this.setState({ content: '' });
  }
  _checkKey(e) {
    if (e.key === 'Enter') {
      this._createChat()
    }
  }
}

const ReduxChatbox = connect(mapStateToProps, mapDispatchToProps)(Chatbox)

export default graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation'})(ReduxChatbox);
