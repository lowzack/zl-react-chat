import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Button } from 'reactstrap';
import MessageList from './MessageList';
import Navigation from './Navigation';
import Chatbox from './Chatbox';
import './App.css';

const fetchAction = (messages) => {
  return {
    type: 'FETCH_MESSAGES',
    messages
  }
};

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
          <MessageList allChats={allChats}/>
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
            this.props.updateMessages(result.allChats);
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: bindActionCreators(fetchAction, dispatch)
  }
}

const ReduxApp = connect(() => {}, mapDispatchToProps)(App)

export default graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery'})(ReduxApp);
