import "./styles.css";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import Chat from "./components/Chat.js";

export default function App() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="App">
      <div class="footer">
        <button
          class="btn"
          onClick={() => setOpenChat((openChat) => !openChat)}
        >
          {openChat ? <p>Close Chat</p> : <p>Open Chat</p>}
        </button>

        <CSSTransition
          unmountOnExit
          in={openChat}
          timeout={200}
          classNames="chat"
        >
          <Chat handleClose={() => setOpenChat(false)} active={openChat} />
        </CSSTransition>
      </div>
    </div>
  );
}
