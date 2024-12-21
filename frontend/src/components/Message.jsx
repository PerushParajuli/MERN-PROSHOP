import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ varient, children }) => {
  //here varient refers to type of alert and children is what we wrap in it.
  return <Alert variant={varient}>{children}</Alert>;
};

Message.defaultProps = {
  varient: "info",
};

export default Message;
