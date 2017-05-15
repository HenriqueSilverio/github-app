import React, { Component } from 'react'

class Search extends Component {
  render(props) {
    return (
      <div className="search">
        <input
          type="search"
          placeholder="Buscar por usuário..."
          disabled={this.props.isDisabled}
          onKeyUp={this.props.handleSearch}
        />
      </div>
    )
  }
}

export default Search
