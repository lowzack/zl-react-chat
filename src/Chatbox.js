import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon
  } from 'reactstrap';

export default class Chatbox extends Component {
  render() {
    return (
      <Container fluid className='fixed-bottom'>
        <Form>
          <InputGroup>
            <Input placeholder="Enter your message here" />
            <InputGroupAddon addonType="append">
              <Button color="success">Send</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </Container>
    )
  }
}
