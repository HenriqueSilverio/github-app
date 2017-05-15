import React, { Component } from 'react'

class Repositories extends Component {
  render(props) {
    return (
      <div className="repositories">
        <h3>{this.props.title}</h3>
        <ul>
          {this.props.repos.map((repo, index) => (
            <li index={index}>
              <a href={repo.link}>
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Repositories
