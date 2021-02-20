import React from "react";

const notiStyle = (message) => {
  const style1 = {
    color: "green",
  };
  const style2 = {
    color: "rgb(255, 0, 0)",
  };
  if (message.includes("A new blog")) {
    return style1;
  } else {
    return style2;
  }
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <p className="error" style={notiStyle(message)}>{message}</p>;
};

export default Notification;
