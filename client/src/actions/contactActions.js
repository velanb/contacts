import {
  GET_CONTACTS,
  DELETE_CONTACT,
  ADD_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT
} from "./types";
import axios from "axios";
//@desc  To get all contacts
export const getContacts = () => async dispatch => {
  const res = await axios.get(`/api/contacts`);
  dispatch({
    type: GET_CONTACTS,
    payload: res.data
  });
};

export const getContact = id => async dispatch => {
  const res = await axios.get(`/api/contacts/${id}`);
  dispatch({
    type: GET_CONTACT,
    payload: res.data
  });
};
// @desc To delete a contact
export const deleteContact = id => async dispatch => {
  await axios.delete(`/api/contacts/delete/${id}`);
  dispatch({
    type: DELETE_CONTACT,
    payload: id
  });
};
// @desc To add a new contact
export const addContact = contact => async dispatch => {
  const res = await axios.post("/api/contacts", contact);
  dispatch({
    type: ADD_CONTACT,
    payload: res.data
  });
};
//@desc To update/edit a contact
export const updateContact = contact => async dispatch => {
  const res = await axios.post(`api/contacts/${contact.id}`, contact);
  dispatch({
    type: UPDATE_CONTACT,
    payload: res.data
  });
};
