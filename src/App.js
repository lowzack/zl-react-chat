import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    from: 'anonymous',
    content: ''
  };
  componentDidMount() {
    const from = window.prompt('username');
    from && this.setState({ from })
  }
  render() {
    const allChats = this.props.allChatsQuery.allChats || [];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <h2> Chats </h2>
          {allChats.map(message => (
            <Button color="danger">Message</Button>
          ))}
        </p>
      </div>
    );
  }
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
