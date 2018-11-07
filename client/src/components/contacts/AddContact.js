import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addContact } from "../../actions/contactActions";

class AddContact extends Component {
  state = {
    name: "",
    age: "",
    city: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, age, city } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (age === "") {
      this.setState({ errors: { age: "Age is required" } });
      return;
    }

    if (city === "") {
      this.setState({ errors: { city: "City is required" } });
      return;
    }

    const newContact = {
      name,
      age,
      city
    };

    this.props.addContact(newContact);

    // Clear State
    this.setState({
      name: "",
      age: "",
      city: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, age, city, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Age"
              name="age"
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={this.onChange}
              error={errors.age}
            />
            <TextInputGroup
              label="City"
              name="city"
              placeholder="Enter City"
              value={city}
              onChange={this.onChange}
              error={errors.city}
            />
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired
};

export default connect(
  null,
  { addContact }
)(AddContact);
