import  { useContext, useState, useEffect } from "react";
import React from "react";
import "./chat.css";
import Rightsidebar from "../../components/Rightsidebar/Rightsidebar";
import Leftsidebar from "../../components/Leftsidebar/Leftsidebar";
import Chatbox from "../../components/Chatbox/Chatbox";
import { AppContext } from "../../context/AppContext";

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);

  const MainLoader = () => {
    return (
      <div className="flex items-center justify-center container">
        <svg width="100" height="100" viewBox="0 0 300 300">
          <defs>
            <linearGradient
              id="gradient-fill"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="300"
              x2="300"
              y2="0"
            >
              <stop offset="0%">
                <animate
                  attributeName="stop-color"
                  values="#A3D9FF;#FFD6E8;#A3D9FF"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%">
                <animate
                  attributeName="stop-color"
                  values="#FFEBAF;#D4F2D2;#FFEBAF"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <clipPath id="clip">
              <rect
                className="square s1"
                x="0"
                y="0"
                rx="12"
                ry="12"
                height="90"
                width="90"
              ></rect>
              <rect
                className="square s2"
                x="100"
                y="0"
                rx="12"
                ry="12"
                height="90"
                width="90"
              ></rect>
              <rect
                className="square s3"
                x="200"
                y="0"
                rx="12"
                ry="12"
                height="90"
                width="90"
              ></rect>
              <rect
                className="square s4"
                x="0"
                y="100"
                rx="12"
                ry="12"
                height="90"
                width="90"
              ></rect>
              <rect
                className="square s5"
                x="200"
                y="100"
                rx="12"
                ry="12"
                height="90"
                width="90"
              ></rect>
              <rect
                className="square s6"
                x="0"
                y="200"
                rx="12"
                ry="12"
                height="90"
                width="90"
              ></rect>
              <rect
                className="square s7"
                x="100"
                y="200"
                rx="12"
                ry="12"
                height="90"
                width="90"
              ></rect>
            </clipPath>
          </defs>
          <rect
            className="gradient"
            clipPath="url('#clip')"
            height="300"
            width="300"
          ></rect>
        </svg>
      </div>
    );
  };

  return (
    <div className="chat">
      {loading ? (
        <MainLoader /> // Use the MainLoader component here
      ) : (
        <div className="chat-container">
          <Leftsidebar />
          <Chatbox />
          <Rightsidebar />
        </div>
      )}
    </div>
  );
};

export default Chat;
