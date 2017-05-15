import React, { Component } from 'react'

class Actions extends Component {
  render(props) {
    return (
      <div className="actions">
        <button onClick={this.props.getRepositories}>
          Ver Repositórios
        </button>
        <button onClick={this.props.getStarred}>
          Ver Favoritos
        </button>
      </div>
    )
  }
}

export default Actions
