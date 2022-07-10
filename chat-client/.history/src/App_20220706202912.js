import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import JoinRoom from "./screens/JoinRoom";
import ChatRoom from "./screens/ChatRoom";

import { history } from "./config/network";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joinData, setJoinData] = useState({});

  function onJoinSuccess(data) {
    setJoinData(data);
    setUsername(data.userData.username);
    setRoom(data.userData.room);
    history.push(`/chat/rooms/${data.userData.room}`);
  }

  return (
    <div className="App">
      <Switch>
        <Route
          path="/join"
          component={() => <JoinRoom onJoinSuccess={onJoinSuccess} />}
        />
        <Redirect from="/" to="/join" exact />
      </Switch>
    </div>
  );
}

export default App;
