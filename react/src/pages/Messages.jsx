import instance from "../Axios";
import { useState, useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await instance.get("/messages");

      setMessages(response.data.data);
    } catch (error) {
      console.error("Errore nel recupero dei messaggi:", error);
    }
    console.log(messages);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="container mx-auto px-10">
      {messages.map((message) => (
        <div key={message.id} className="pb-5">
          <p className="text-customColorTertiary pe-5">Da: {message.email}</p>
          <p className="text-customColorQuaternary pe-5">
            Il: {message.createdAt}
          </p>
          <p
            className="text-customColorSecondary"
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          >
            Messaggio: {message.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
