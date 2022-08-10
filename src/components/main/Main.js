import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TalkingRobot from "../talking-robot/TalkingRobot";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import "./Main.css";

const Main = (props) => {
  const elInputName = useRef(null);
  const elInputMessage = useRef(null);
  const elForma = useRef(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(false);

  const FormTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#7c5b70",
        border: "2px solid #7c5b70",
      },
      "&:hover fieldset": {
        borderColor: "#7c5b70",
      },
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setProgress(true);
    if (
      elInputName.current.value.trim() !== "" &&
      elInputMessage.current.value.trim()
    ) {
      setName(elInputName.current.value);
      setMessage(elInputMessage.current.value);
    }
    event.target.reset();
  };

  const calcUID = () => {
    return props.messageList.length ? props.messageList.length + 1 : 1;
  };

  useEffect(() => {
    if (name.trim() !== "" && message.trim()) {
      setName(elInputName.current.value);
      setMessage(elInputMessage.current.value);
      props.setMessageList((prev) => [
        ...prev,
        {
          id: calcUID(),
          author: name,
          text: message,
        },
      ]);

      setTimeout(() => {
        props.setMessageList((prev) => [
          ...prev,
          {
            id: calcUID() + 1,
            author: "Robot",
            text: `Привет, ${name}!`,
          },
        ]);
        setProgress(false);
      }, 1500);

      elInputName.current.focus();
    }
    // eslint-disable-next-line
  }, [name, message, props]);

  return (
    <div className="main">
      <Container className="main-container" maxWidth="sm">
        <List
          className="chat-list"
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {props.listChat &&
            props.listChat.map((chat) => (
              <div key={chat.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="../../image/robot.gif" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.author}
                    secondary={<React.Fragment>{chat.text}</React.Fragment>}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
        </List>
        <Box
          className="box"
          sx={{
            bgcolor: "#fef6e4",
          }}
        >
          <h2 className="text">Ask the robot Max something:</h2>
          <form ref={elForma} className="form" onSubmit={handleSubmit}>
            <FormTextField
              inputRef={elInputName}
              label="Type your name"
              id="custom-css-outlined-input"
              name="name"
              className="input"
            />
            <FormTextField
              inputRef={elInputMessage}
              label="Type your message"
              id="custom-css-outlined-input"
              name="message"
              className="input"
            />
            <button type="submit" className="btn-submit">
              SEND
            </button>
          </form>
          <TalkingRobot chat={props.messageList} progress={progress} />
        </Box>
      </Container>
    </div>
  );
};

export default Main;
