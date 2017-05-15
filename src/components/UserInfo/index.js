import React, { Component } from 'react'

class UserInfo extends Component {
  render(props) {
    return (
      <div className="user-info">
        <img src={this.props.photo} alt="" />

        <h2>
          <a href={`https://github.com/${this.props.login}`}>
            {this.props.username}
          </a>
        </h2>

        <ul>
          <li><b>Repositórios:</b> {this.props.repos}</li>
          <li><b>Seguidores:</b> {this.props.followers}</li>
          <li><b>Seguindo:</b> {this.props.following}</li>
        </ul>
      </div>
    )
  }
}

export default UserInfo
