import React, { Component } from "react";
import axios from "axios";
import User from './User';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [], searchTerm: '', alphabetical: 'az' };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then(response => {
        console.log(response.data.results);
        this.setState({ users: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    let sortedUsers;

    if (this.state.alphabetical === "az") {
      sortedUsers = this.state.users.sort((a, b) =>
        a.name.first > b.name.first ? 1 : -1
      );
    } else {
      sortedUsers = this.state.users.sort((a, b) =>
        a.name.first < b.name.first ? 1 : -1
      );
    }

    let filteredUsers = sortedUsers;

    if (this.state.searchTerm)
      filteredUsers = this.state.users.filter(u =>
        u.name.first.startsWith(this.state.searchTerm)
      );

    const userNames = filteredUsers.map(u => {
      return <User key={u.email} email={u.email} avatar={u.picture.thumbnail} name={u.name.first} age={u.dob.age} />;
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for user:
            <input
              type="text"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* <select
          name="alphabetical"
          value={this.state.alphabetical}
          onChange={this.handleChange}
        >
          <option selected value="az">
            A to Z
          </option>
          <option value="za">Z to A</option>
        </select> */}

        {userNames}

      </div>
    );
  }
}

export default App;