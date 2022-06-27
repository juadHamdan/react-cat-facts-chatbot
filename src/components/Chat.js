import "./Chat.css";
import { useEffect, useRef } from "react";
import HandleMessages from "./HandleMessages.js";
import { ChatBotName } from "./ChatConstants";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

const scrollToRef = (ref) =>
  ref.current.scrollTo(0, ref.current.scrollHeight - ref.current.clientHeight);

const Chat = ({ handleClose, active }) => {
  const { messages, setNewMessage, addNewUserMessage } = HandleMessages();

  //focus on messages input
  const messagesInputRef = useRef(null);
  useEffect(() => {
    messagesInputRef.current.focus();
  }, [active]);

  //Scroll to bottom of chat
  const messagesRef = useRef(null);
  const executeScroll = () => scrollToRef(messagesRef);
  useEffect(() => {
    if (messages.length > 1) executeScroll();
  }, [messages]);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addNewUserMessage(e);
    }
  }

  return (
    <div class="container">
      <div>
        <div class="header">
          <div class="header-logo">
            <p style={{ margin: "0" }}>😺</p>
            <div
              class="status"
              style={{ background: active ? "#00FF00" : "#FF0000" }}
            ></div>
          </div>
          <div class="header-text">
            <h2>{ChatBotName}</h2>
            <small>{active ? <>Online</> : <>Offline</>}</small>
          </div>
          <FontAwesomeIcon
            className="close-btn"
            onClick={handleClose}
            icon={faXmark}
          />
        </div>

        <div class="messages" ref={messagesRef}>
          <TransitionGroup>
            {messages.map((message, index) => {
              return (
                <CSSTransition key={index} timeout={200} classNames="messages">
                  <div
                    class={
                      message.sender === ChatBotName
                        ? "chat-message-container"
                        : "user-message-container"
                    }
                  >
                    <div
                      class={
                        message.sender === ChatBotName
                          ? "message chat-message"
                          : "message user-message"
                      }
                    >
                      {message.text}
                    </div>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>

        <div class="form">
          <input
            placeholder="Send a message..."
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            ref={messagesInputRef}
          />
          <FontAwesomeIcon
            className="send-btn"
            onClick={addNewUserMessage}
            icon={faPaperPlane}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
