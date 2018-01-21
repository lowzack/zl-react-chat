import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'reactstrap';
import Message from './Message';
import Navigation from './Navigation';
import Chatbox from './Chatbox';
import './App.css';

class App extends Component {
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
    this._subscribeToNewChats();
  }
  render() {
    const allChats = this.props.allChatsQuery.allChats || [];
    return (
      <div className="App">
        <header>
          <Navigation/>
        </header>
        <div className="chat-area container mt-3">
          {allChats.map(message => (
            <Message message={message}/>
          ))}
        </div>
        <footer>
          <input
              value={this.state.content}
              onChange={e => this.setState({ content: e.target.value })}
              type="text"
              placeholder="Start typing"
              onKeyPress={this._createChat}
          />
          <Chatbox/>
        </footer>
      </div>
    );
  }
  _createChat = async e => {
    if (e.key === 'Enter') {
      const { content, from } = this.state;
      await this.props.createChatMutation({
        variables: { content, from }
      });
      this.setState({ content: '' });
    }
  }
  _subscribeToNewChats = () => {
      this.props.allChatsQuery.subscribeToMore({
          document: gql`
            subscription {
              Chat(filter: { mutation_in: [CREATED] }) {
                node {
                  id
                  from
                  content
                  createdAt
                }
              }
            }
          `,
          updateQuery: (previous, { subscriptionData }) => {
            const newChatLinks = [
              ...previous.allChats,
              subscriptionData.data.Chat.node
            ];
            const result = {
              ...previous,
              allChats: newChatLinks
            };
            return result;
          }
        });
      };
}

const ALL_CHATS_QUERY = gql`
  query AllChatsQuery {
    allChats {
      id
      createdAt
      from
      content
    }
  }
`;

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

export default compose(
  graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery'}),
  graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation'})
)(App);
