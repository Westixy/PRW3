import React, { Component } from 'react'
import { Button, Container, Header } from 'semantic-ui-react'
import ChordDiagram from 'react-chord-diagram'
import { Animate } from 'react-move'
import { easeExpInOut } from 'd3-ease'

import { data } from './utils/model'

const genColor = () => '#' + Math.floor(0xffffff * Math.random()).toString(16)

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      do: 0,
      matrix: [
        [10000, 5871, 8916, 2868],
        [10000, 10048, 2060, 6171],
        [10000, 16145, 8090, 8045],
        [10000, 990, 940, 6907],
      ],
      oldMatrix: null,
    }
    this.done = false
  }

  handleClick() {
    this.setState({
      oldMatrix: this.state.matrix,
      matrix: this.state.matrix.map(row =>
        row.map(elem => Math.random() * 10000)
      ),
      do: 1,
      colors: [0,1,2,3].map(a=>genColor()),
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
        <Animate
          start={() => ({
            x: 0,
            colors: ['#fffaaa', '#123456', '#1ab3d4', '#ccc'],
          })}
          update={() => ({
            x: [this.state.do],
            colors: [this.state.colors],
            timing: { duration: 2000, ease: easeExpInOut },
          })}
        >
          {state => {
            const { x, colors } = state
            if (x === 1 && !this.done) {
              this.done = true
              this.setState({ do: 0, oldMatrix: this.state.matrix })
            } else this.done = false
            const a = this.state.oldMatrix
              ? this.state.oldMatrix.map((row, ri) =>
                  row.map(
                    (cell, ci) =>
                      (cell += x * (this.state.matrix[ri][ci] - cell))
                  )
                )
              : this.state.matrix
            return (
              <ChordDiagram
                matrix={a}
                componentId={1}
                groupLabels={colors}
                groupColors={colors}
              />
            )
          }}
        </Animate>
      </Container>
    )
  }
}
