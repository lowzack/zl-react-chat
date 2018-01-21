import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'reactstrap';
import Message from './Message';
import Navigation from './Navigation';
import Chatbox from './Chatbox';
import './App.css';

class App extends Component {
  componentDidMount() {
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
          <Chatbox/>
        </footer>
      </div>
    );

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

export default graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery'})(App);
