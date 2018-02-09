import React, { Component } from 'react'
import { Button, Container, Header } from 'semantic-ui-react'
import ChordDiagram from 'react-chord-diagram'

import { data } from './utils/model'

export default class Page extends Component {
  constructor(props) {
    super(props)
    console.log(data)
    this.state = {
      matrix: [
        [10000, 5871, 8916, 2868],
        [10000, 10048, 2060, 6171],
        [10000, 16145, 8090, 8045],
        [10000, 990, 940, 6907],
      ],
    }
  }

  handleClick() {
    this.setState({
      matrix: this.state.matrix.map(row =>
        row.map(elem => Math.random() * 10000)
      ),
    })
  }

  render() {
    return (
      <Container className="Page">
        <Header as="h1">
          Where people goes <small>PRW3 ESO</small>
        </Header>
        <Button
          content="Hey Semantic !"
          circular
          onClick={() => this.handleClick()}
        />
        <ChordDiagram
          matrix={this.state.matrix}
          componentId={1}
          groupLabels={['Black', 'Yellow', 'Brown', 'Orange']}
          groupColors={['#000000', '#FFDD89', '#957244', '#F26223']}
        />
      </Container>
    )
  }
}
