import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../util/socket";
import { useSelector } from "react-redux";


const Chat = () => {
  const { targetedId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        if(!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", {userId, targetedId, firstName:user.firstName});

        socket.on("MessageReceived", ({firstName, text}) => {
            // console.log(firstName + " :" + text);
            setMessages((messages) => [...messages, {firstName, text}])

        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetedId])

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessages", {userId, targetedId, firstName:user.firstName, text:newMessage});
        setNewMessage("")
    }


  return (
    <div className="w-3/4 md:w-3/5 lg:w-1/2 border-gray-500 mx-auto flex flex-col my-6 text-white">
      {/* Header */}
      <div className="border border-gray-500 text-white text-xl font-semibold lg:p-4 md:p-3 p-2">
        Chat
      </div>

      {/* Message Box */}
      <div
        style={{ height: "340px", overflowY: "auto" }}
        className="border border-gray-500 p-4 overflow-y-auto"
      >
        {/* <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>Hello!</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>How are you?</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>I'm just a static message.</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>I'm just a static message.</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>I'm just a static message.</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>I'm just a static message.</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>I'm just a static message.</p>
          </div>
        </div> */}
        {messages?.map((message, index) => {
          return (
            <div key={index} class="chat chat-start">
              <div class="chat-header">
                {message.firstName}
                <time class="text-xs opacity-50">2 hours ago</time>
              </div>
              <div class="chat-bubble">{message.text}</div>
              <div class="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      {/* Input Box and Send Button */}
      <div className="lg:p-4 md:p-3 p-2 flex border border-gray-500 items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none text-black"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="btn btn-secondary text-white p-2 rounded-lg hover:bg-primary-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
