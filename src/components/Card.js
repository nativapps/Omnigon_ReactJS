import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import moment from 'moment'

class CardComponent extends Component {
  render() {
    const info = this.props.data
    return (
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title> { info.user.name } </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"> { moment( info.created_at ).format('DD/MM/YYYY HH:mm') } </Card.Subtitle>
          <Card.Text>
            { info.text }
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default CardComponent
