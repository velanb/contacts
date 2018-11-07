import React, { Component } from "react";
import Contact from "./Contact";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContacts } from "../../actions/contactActions";

function searchingFor(term) {
  return each => {
    return each.name.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    this.props.getContacts();
  }

  searchHandler(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    const { contacts } = this.props;
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Contact</span> List
        </h1>
        <div>
          <form className="form-inline mt-2 mt-md-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              onChange={this.searchHandler}
            />
          </form>
        </div>
        {contacts.filter(searchingFor(this.state.term)).map(contact => (
          <Contact key={contact._id} contact={contact} />
        ))}
      </React.Fragment>
    );
  }
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  getContacts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contact.contacts
});

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
