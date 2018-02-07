import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'

export default class Page extends Component {
  render() {
    return (
      <div className="Page">
        <Button content="Hey Semantic !" circular />
      </div>
    )
  }
}
