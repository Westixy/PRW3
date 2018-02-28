import React, { Component } from 'react'
import { Button, Container, Header } from 'semantic-ui-react'
import ChordDiagram from 'react-chord-diagram'
import { Animate } from 'react-move'
import { easeExpInOut, easeLinear } from 'd3-ease'

import { data } from './utils/model'

export default class Page extends Component {
  constructor(props) {
    super(props)
    let d = data.noUndefined.transform()
    this.state = {
      oldMatrix: null,
      labels: d.labels,
      matrix: d.matrix,
      do: 0,
      colors: d.colors,
    }
    this.done = false
    this.data = data
  }

  handleClick() {
    this.changeFromData(data)
  }

  changeFromData(data){
    if(data.matrix===undefined) data = data.noUndefined.transform()
    this.setState({
      oldMatrix: this.state.matrix,
      labels: data.labels,
      matrix: data.matrix,
      do: this.state.do === 0 ? 1 : 0,
      colors: data.colors,
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
            timing: { duration: 3000, ease: easeLinear },
          })}
        >
          {state => {
            let { x, colors } = state
            let a = this.state.matrix
            if (this.state.oldMatrix !== null) {
              x = this.state.do === 0 ? 1 - x : x

              let base = this.state.oldMatrix
              let change = this.state.matrix
              let isNormal = true

              if (base.length < change.length) {
                [base, change] = [change, base]
                isNormal = false
              }

              a = base.map((row, ri) => {
                return row.map((cell, ci) => {
                  let cellChange = 0
                  let cellBase = cell
                  if (change[ri] && change[ri][ci]) cellChange = change[ri][ci]
                  if (!isNormal) {
                    cellBase = cellChange
                    cellChange = cell
                  }
                  return Math.round(cellBase + x * (cellChange - cellBase))
                })
              })        
            }
            return (
              <ChordDiagram
                matrix={a}
                componentId={1}
                groupLabels={this.state.labels}
                groupColors={colors}
              />
            )
          }}
        </Animate>
      </Container>
    )
  }
}
