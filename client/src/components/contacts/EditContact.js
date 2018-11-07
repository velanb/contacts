import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getContact, updateContact } from "../../actions/contactActions";

class EditContact extends Component {
  state = {
    name: "",
    age: "",
    city: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, age, city } = nextProps.contact;
    this.setState({
      name,
      age,
      city
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

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

    const { id } = this.props.match.params;

    const updContact = {
      id,
      name,
      age,
      city
    };

    this.props.updateContact(updContact);

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
        <div className="card-header">Edit Contact</div>
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
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact);
