import React, { Component } from 'react'
import CardComponent from './Card'
import CardColumns from 'react-bootstrap/CardColumns'

class FeedComponent extends Component {
  render() {
    return(
        <CardColumns>
            { this.props.feed.map( ( data, key ) => <CardComponent key={ key } data={ data } /> ) }
        </CardColumns>
      )
  }
}

export default FeedComponent
