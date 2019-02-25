import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Col'
import FeedServices from './services/FeedServices'
import Alert from 'react-bootstrap/Alert'
import FeedComponent from './components/FeedComponent'
import './App.css'

class App extends Component {
  state = {
    feed: [ ],
    URL: '',
    interval: 0,
    numberOfItems: 0,
    timer: [ ],
    error: false,
    errorMessage: ''
  }

  componentDidMount = ( ) => {
    this._feedServices = new FeedServices( )
  }

  isInt = ( value ) => {
    var er = /^-?[0-9]+$/
    return er.test( value )
  }

  Submit = ( ) => {
    const { interval, URL, numberOfItems } = this.state

    if ( !interval || !URL || !numberOfItems )
      return this.setState({ errorMessage: 'All the fields above are mandatory.', error: true })



    if ( !this.isInt( interval ) || !this.isInt( numberOfItems ) ) {
      return this.setState({ errorMessage: 'The number of items and the interval fields must be positive integers', error: true })
    } else {
      if ( Number( interval ) < 1 || Number( numberOfItems ) < 1 )
        return this.setState({ errorMessage: 'The number of items and the interval fields must be positive integers', error: true })
    }

    this.setState({ error: false })
    this.GetFeed( URL, numberOfItems )

    if ( this.state.timer)
      clearInterval( this.state.timer )
    
    const timer = setInterval( ( ) => this.GetFeed( URL, numberOfItems ), interval * 1000 )
    this.setState({ timer })
  }

  GetFeed = ( URL, numberOfItems ) => {
    this._feedServices.Feed( URL )
    .then( response => response.json( ) )
    .then( feedResponse => {
      const feed = feedResponse.slice( 0, numberOfItems )
      this.setState({ feed }) 
    })
    .catch( error => {
      clearInterval( this.state.timer )
      this.setState({ errorMessage: 'An error ocurred fetching the data. Try with antoher URL', error: true })
      console.log( error ) 
    })
  }

  render() {
    return (
        <Container>
          <Form>
            <Form.Row style={{ marginTop: 20 }}>
              <Col>
                <Form.Label>URL</Form.Label>
                <Form.Control onChange={( URL ) => this.setState({ URL: URL.target.value })} placeholder="Enter a feed URL" />
              </Col>
              <Col>
                <Form.Label>Items</Form.Label>
                <Form.Control onChange={( numberOfItems ) => this.setState({ numberOfItems: numberOfItems.target.value })} placeholder="Enter a number of items" />
              </Col>
              <Col>
                <Form.Label>Interval</Form.Label>
                <Form.Control onChange={( interval ) => this.setState({ interval: interval.target.value })} placeholder="Enter an interval ( in seconds )" />
              </Col>
            </Form.Row>
          </Form>
          <Button style={{ marginTop: 20, marginBottom: 20 }} onClick={ this.Submit } type="submit">Show Feed</Button>
          <Alert show={ this.state.error } dismissible variant="danger">
            <Alert.Heading>You got an error!</Alert.Heading>
            <p>
              { this.state.errorMessage }
            </p>
          </Alert>
          <FeedComponent feed={ this.state.feed } />
        </Container>
    )
  }
}

export default App
