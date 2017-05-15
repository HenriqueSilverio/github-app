import React, { Component } from 'react'
import axios from 'axios'

import Search from './components/Search'
import UserInfo from './components/UserInfo'
import Actions from './components/Actions'
import Repositories from './components/Repositories'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo   : null,
      repos      : [],
      starred    : [],
      isFetching : false
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  getEndpoint(username, type) {
    const cleanUser = username ? `/${username}` : ''
    const cleanType = type ? `/${type}` : ''

    return `https://api.github.com/users${cleanUser}${cleanType}`
  }

  handleSearch(event) {
    const username = event.target.value.trim()
    const keyCode  = event.which || event.keyCode
    const ENTER    = 13

    if (ENTER !== keyCode || '' === username) return

    this.setState({
      isFetching: true
    })

    axios.get(this.getEndpoint(username))
      .then((result) => {
        this.setState({
          userInfo: {
            username: result.data.name,
            photo: result.data.avatar_url,
            login: result.data.login,
            repos: result.data.public_repos,
            followers: result.data.followers,
            following: result.data.following
          },
          repos: [],
          starred: [],
          isFetching: false
        })

      })
  }

  getRepositories(type) {
    return (event) => {
      const username = this.state.userInfo.login
      const endpoint = this.getEndpoint(username, type)

      axios.get(endpoint)
        .then((result) => {
          const repos = result.data.map((repo) => ({
            name: repo.name,
            link: repo.html_url
          }))

          this.setState({
            [type]: repos
          })
        })
    }
  }

  render() {
    const isFetching = this.state.isFetching
    const userInfo   = this.state.userInfo
    const repos      = this.state.repos
    const starred    = this.state.starred

    return (
      <div className="app">
        <Search
          isDisabled={this.state.isFetching}
          handleSearch={this.handleSearch}
        />

        {isFetching &&
          <div>Carregando...</div>
        }

        {!!userInfo &&
          <UserInfo
            photo={userInfo.photo}
            username={userInfo.username}
            repos={userInfo.repos}
            followers={userInfo.followers}
            folllowing={userInfo.folllowing}
          />
        }

        {!!userInfo &&
          <Actions
            getRepositories={this.getRepositories('repos')}
            getStarred={this.getRepositories('starred')}
          />
        }

        {!!repos.length &&
          <Repositories
            className="repositories"
            title="Repositórios:"
            repos={repos}
          />
        }

        {!!starred.length &&
          <Repositories
            className="starred"
            title="Favoritos:"
            repos={this.state.starred}
          />
        }
      </div>
    )
  }
}

export default App
