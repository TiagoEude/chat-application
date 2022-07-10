import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Card, Button } from "antd";
import { socket } from "../../config/web-sockets";

function JoinRoom(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const onUsernameChange = (e) => {
    const inputValue = e.target.value;
    setUsername(inputValue);
  };
  const onRoomChange = (e) => {
    const roomNo = e.target.value;
    setRoom(roomNo);
  };
  const onClick = () => {
    if (username && room) {
      socket.emit("join", { username, room }, (error) => {
        if (error) {
          setError(error);
          alert(error);
        } else {
          socket.on("welcome", (data) => {
            props.onJoinSuccess(data);
          });
        }
      });
    }
  };
  socket.on("Bem-Vindo!", (error) => {});

  return <></>;
}

export default JoinRoom;
