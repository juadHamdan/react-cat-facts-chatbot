import { useState } from "react";
import axios from "axios";
import { UserName, ChatBotName, InitialChatMessage } from "./ChatConstants";

const HandleMessages = () => {
  const [messages, setMessages] = useState([
    { sender: ChatBotName, text: InitialChatMessage }
  ]);
  const [newMessage, setNewMessage] = useState(null);

  function createNewUserMessage() {
    return { sender: UserName, text: newMessage };
  }

  function createNewChatMessage(message) {
    return { sender: ChatBotName, text: message };
  }

  function addNewUserMessage(e) {
    if (newMessage != null) {
      setMessages((messages) => [
        ...messages,
        createNewUserMessage(newMessage)
      ]);
      setNewMessage(null);
      e.target.value = "";

      fetchChatbotMessage();
    }
  }

  function addNewChatMessage(message) {
    setMessages((messages) => [...messages, createNewChatMessage(message)]);
  }

  async function fetchChatbotMessage() {
    const url = "https://catfact.ninja/fact";
    try {
      const res = await axios({
        method: "get",
        url: url
      });
      addNewChatMessage(res.data.fact);
    } catch (err) {
      console.log(err.response);
    }
  }
  return { messages, setNewMessage, addNewUserMessage };
};

export default HandleMessages;
