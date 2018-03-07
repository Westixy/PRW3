import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  List,
  Dropdown,
  Checkbox,
  Input,
} from 'semantic-ui-react'
import ChordDiagram from 'react-chord-diagram'
import { Animate } from 'react-move'
import { easeExpInOut } from 'd3-ease'
import moment from 'moment'

import { data, Control } from './utils/model'

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.control = new Control()
    let d = this.control.getFiltered(data).transform()
    this.translate = [
      {
        origin: 'Appenzell Innerrhoden',
        name: 'Appenzell Rhodes-Intérieures',
        n: 'AI',
        color: 'hsl(10, 100%, 50%)',
      },
      {
        origin: 'Thurgau',
        name: 'Thurgovie',
        n: 'TG',
        color: 'hsl(20, 100%, 50%)',
      },
      {
        origin: 'Aargau',
        name: 'Argovie',
        n: 'AG',
        color: 'hsl(30, 100%, 50%)',
      },
      {
        origin: 'Schwyz',
        name: 'Schwytz',
        n: 'SZ',
        color: 'hsl(40, 100%, 50%)',
      },
      {
        origin: 'Ticino',
        name: 'Tessin',
        n: 'TI',
        color: 'hsl(50, 100%, 50%)',
      },
      { origin: 'Bern', name: 'Berne', n: 'BE', color: 'hsl(60, 100%, 50%)' },
      {
        origin: 'Nidwalden',
        name: 'Nidwald',
        n: 'NW',
        color: 'hsl(70, 100%, 50%)',
      },
      {
        origin: 'Basel-Landschaft',
        name: 'Bâle-Campagne',
        n: 'BL',
        color: 'hsl(80, 100%, 50%)',
      },
      { origin: 'Valais', name: 'Valais', n: 'VS', color: 'hsl(90, 75%, 50%)' },
      {
        origin: 'Solothurn',
        name: 'Soleure',
        n: 'SO',
        color: 'hsl(100, 50%, 50%)',
      },
      {
        origin: 'Fribourg',
        name: 'Fribourg',
        n: 'FR',
        color: 'hsl(110, 100%, 50%)',
      },
      { origin: 'Vaud', name: 'Vaud', n: 'VD', color: 'hsl(120, 100%, 30%)' },
      {
        origin: 'Schaffhausen',
        name: 'Schaffhouse',
        n: 'SH',
        color: 'hsl(130, 100%, 50%)',
      },
      {
        origin: 'Grisons',
        name: 'Grisons',
        n: 'GR',
        color: 'hsl(140, 100%, 50%)',
      },
      {
        origin: 'Obwalden',
        name: 'Obwald',
        n: 'OW',
        color: 'hsl(150, 100%, 50%)',
      },
      {
        origin: 'Lucerne',
        name: 'Lucerne',
        n: 'LU',
        color: 'hsl(160, 100%, 50%)',
      },
      {
        origin: 'Neuchâtel',
        name: 'Neuchâtel',
        n: 'NE',
        color: 'hsl(170, 100%, 50%)',
      },
      { origin: 'Jura', name: 'Jura', n: 'JU', color: 'hsl(180, 100%, 50%)' },
      {
        origin: 'Zurich',
        name: 'Zurich',
        n: 'ZH',
        color: 'hsl(190, 100%, 50%)',
      },
      { origin: 'Uri', name: 'Uri', n: 'UR', color: 'hsl(200, 100%, 50%)' },
      {
        origin: 'Basel-Stadt',
        name: 'Bâle-Ville ',
        n: 'BS',
        color: 'hsl(210, 100%, 50%)',
      },
      { origin: 'Zug', name: 'Zoug', n: 'ZG', color: 'hsl(220, 100%, 50%)' },
      {
        origin: 'Geneva',
        name: 'Genève',
        n: 'GE',
        color: 'hsl(230, 100%, 50%)',
      },
      {
        origin: 'St. Gallen',
        name: 'Saint-Gall',
        n: 'SG',
        color: 'hsl(240, 100%, 50%)',
      },
      {
        origin: 'Appenzell Ausserrhoden',
        name: 'Appenzell Rhodes-Extérieures',
        n: 'AR',
        color: 'hsl(250, 100%, 50%)',
      },
      { origin: 'Undefined', name: 'Inconnu', n: 'NA', color: '#000000' },
    ]

    this.state = {
      oldMatrix: null,
      labels: this.transformToShort(d.labels),
      matrix: d.matrix,
      do: 0,
      colors: this.getColorsFromLabels(d.labels),
    }
    this.done = false
    this.dates = data.dateList.map(a => moment(a))
    this.data = data
    this.curData = data
  }

  getColorsFromLabels(labels) {
    return labels.map(a => this.translate.find(b => b.origin === a).color)
  }
  getElemFromShort(short) {
    return this.translate.find(b => b.n === short)
  }
  transformToShort(labels) {
    return labels.map(a => this.translate.find(b => b.origin === a).n)
  }

  handleClick() {
    this.changeFromData(data)
  }

  changeFromData(data) {
    if (data.matrix === undefined) {
      this.curData = data
      data = this.control.getFiltered(data).transform()
    }
    this.setState({
      oldMatrix: this.state.matrix,
      labels: this.transformToShort(data.labels),
      matrix: data.matrix,
      do: this.state.do === 0 ? 1 : 0,
      colors: this.getColorsFromLabels(data.labels),
    })
  }

  render() {
    return (
      <Container className="Page">
        <Header as="h1">
          Where people goes <small>PRW3 ESO</small>
        </Header>
        <div>
          <Input
            label={'start'}
            labelPosition="right"
            value={this.dates[0].format('YYYY-MM-DD')}
          />
          <br />
          <Input
            label={'end'}
            labelPosition="right"
            value={this.dates[this.dates.length - 1].format('YYYY-MM-DD')}
          />
          <br />
          <Button
            content="full"
            circular
            onClick={() => this.changeFromData(this.data)}
          />
          <br />
          {Object.keys(this.control.tf).map(a => {
            let b = this.control.tf[a]
            return (
              <div key={a}>
                <Checkbox
                  toggle
                  label={a}
                  checked={b.enabled}
                  onChange={(ev, value) => {
                    b.enabled = value.checked
                    this.changeFromData(this.curData)
                  }}
                />
              </div>
            )
          })}
          <br />
          <Dropdown
            scrolling
            multiple
            selection
            onChange={(_, a) =>
              this.changeFromData(
                this.data.only(
                  a.value.map(b => this.translate.find(c => b === c.n).origin)
                )
              )
            }
            options={this.translate
              .map(a => ({
                key: a.n,
                text: a.name,
                value: a.n,
              }))
              .sort((a, b) => a.text.localeCompare(b.text))}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Animate
            start={() => ({
              x: 0,
              colors: this.state.colors,
            })}
            update={() => ({
              x: [this.state.do],
              colors: [this.state.colors],
              timing: { duration: 1500, ease: easeExpInOut },
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
                  ;[base, change] = [change, base]
                  isNormal = false
                }

                a = base.map((row, ri) =>
                  row.map((cell, ci) => {
                    let cellChange = 0
                    let cellBase = cell
                    if (change[ri] && change[ri][ci])
                      cellChange = change[ri][ci]
                    if (!isNormal) {
                      cellBase = cellChange
                      cellChange = cell
                    }
                    return Math.round(cellBase + x * (cellChange - cellBase))
                  })
                )
              }
              if (x === 1) {
                a = this.state.matrix
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
        </div>
        <List>
          {this.state.labels
            .sort((a, b) => (a.name ? a.name.localeCompare(b.name) : 0))
            .map((a, ai) => {
              a = this.getElemFromShort(a)
              return (
                <List.Item
                  key={ai}
                  onClick={() =>
                    this.changeFromData(this.data.withoutOwn.hasOne([a.origin]))
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <List.Content>
                    <small style={{ fontFamily: 'monospace', color: a.color }}>
                      [{a.n}]
                    </small>{' '}
                    {a.name}
                  </List.Content>
                </List.Item>
              )
            })}
        </List>
      </Container>
    )
  }
}
