import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../../config/web-sockets";
import { history } from "../../config/network";
import Header from "../../components/Header";
import Messages from "../../components/Messages";
import {
  ChatContainer,
  StyledContainer,
  ChatBox,
  StyledButton,
  SendIcon,
} from "./styles";

function ChatRoom(props) {
  const { username, room, joinData } = props;
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (Object.keys(joinData).length > 0) {
      setMessages([joinData]);
      socket.on("message", (message, error) => {
        setMessages((msgs) => [...msgs, message]);
      });
    } else {
      history.push("/join");
    }
  }, [joinData]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <ChatContainer>
      <Header room={room} />
      <StyledContainer>
        <ChatBox>
          <Messages messages={messages} username={username} />
          <Input
            text="text"
            placeholder="Digite sua mensagem"
            value={message}
            onChange={handleChange}
          />
          <StyledButton onClick={handleClick}>
            <SendIcon>
              <i className="fa fa-paper-plane" />
            </SendIcon>
          </StyledButton>
        </ChatBox>
      </StyledContainer>
    </ChatContainer>
  );
}

export default ChatRoom;
