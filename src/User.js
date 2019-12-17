import React from "react";
import PropTypes from "prop-types";
import './User.css'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

class User extends React.Component {
  render() {
    const { name, avatar, email, isLoading } = this.props;

    const userDetails = (
      <div className='profileRow' >
        <img
          className="img-thumbnail rounded-circle mx-auto mb-2 shadow-sm"
          src={avatar}
          alt={name}
          style={{ width: "100px", height: "100px" }}
        />
        <h4 className="mb-0">{name}</h4>
        <span className="text-muted">{email}</span>
      </div>
    );

    const loadingMessage = <span className="d-flex m-auto">Loading...</span>;

    return (
      <div
        style={{ maxWidth: "300px", minHeight: "250px" }}
      >
        {isLoading ? loadingMessage : userDetails}
      </div>
    );
  }
}

User.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool
};

export default User;