import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/";
import styled from "styled-components";

const StyledMessages = styled.div`
  padding: 5% 0px;
  overflow: auto;
  flex: auto;
`;

function Messages(props) {
  const { messages, username } = props;

  return (
    <StyledMessages>
      <ScrollToBottom>
        {messages.map((message, index) => (
          <Message key={index} message={message} username={username} />
        ))}
      </ScrollToBottom>
    </StyledMessages>
  );
}
export default Messages;
