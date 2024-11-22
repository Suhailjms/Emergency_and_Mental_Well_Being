import "@iconscout/unicons/css/line.css";
import React, { useState } from "react";
import "./ChatBot.css";
const Chatbot = (userid) => {
  const [Page, setPage] = useState("ChatBot");
  const [showDashboard, setShowDashboard] = useState(false); // State to manage dashboard visibility

  // Function to close the Chatbot and go back to Dashboard
  const handleCloseChatbot = () => {
    setShowDashboard(true); // Set state to show the Dashboard
  };

  const CurrentChat = (userid) => {
    console.log(userid);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const handleSendMessage = () => {
      if (input.trim()) {
        const newMessage = { text: input, sender: "user" };
        setMessages([...messages, newMessage]);
        setInput("");

        const fetchResponse = async () => {
          try {
            const response = await fetch("http://localhost:8083/api/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: userid.userid,
                query: input,
              }),
            });
            if (
              !response.headers
                .get("content-type")
                ?.includes("application/json")
            ) {
              throw new Error("Response is not JSON");
            }
            if (!response.ok) {
              const errorResponse = await response.json();
              console.log("Error Response:", errorResponse);
              throw new Error("Error from server");
            }
            const botResponse = await response.json();
            setTimeout(() => {
              setMessages((prevMessages) => [
                ...prevMessages,
                { text: botResponse.response, sender: "bot" },
              ]);
            }, 1000);
          } catch (e) {
            console.error("Error occurred:", e.message);
          }
        };
        fetchResponse();
      }
    };

    return (
      <div className="chatbot-container" id="unique-chatbot-container">
        <div className="chatbot-header" id="unique-chatbot-header">
          <h2>Chatbot</h2>
          <div className="showHistory">
            {" "}
            <i class="uil uil-cog settings-icon"></i>
            <i onClick={() => setPage("History")}>Show My History</i>
          </div>
        </div>
        <div className="chatbot-box" id="unique-chatbot-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
              id={`message-${index}`}
            >
              <div className="message-content" id={`message-content-${index}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div
          className="chatbot-input-container"
          id="unique-chatbot-input-container"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="unique-chatbot-input"
            placeholder="Type your message"
          />
          <button onClick={handleSendMessage} id="unique-chatbot-send-btn">
            Send
          </button>
        </div>
      </div>
    );
  };
  const ChatBotHistory = (userid) => {
    const [History, setHistory] = useState([]);

    const GetHistory = async (userid) => {
      // console.log(userid);
      try {
        const response = await fetch(
          `http://localhost:8083/api/history/${userid}`
        );
        if (!response.ok) throw new Error("Bad Network");
        const data = await response.json();

        setHistory(data.History);
        return true;
      } catch (e) {
        return false;
      }
    };
    GetHistory(userid);

    return (
      <div className="unique-chatbotHistory-body">
        <div className="unique-chatbotHistory-container">
          <div className="unique-chatbotHistory-chats">
            <h2>Your History</h2>
            {GetHistory(userid.userid) ? (
              History.map((item) => (
                <>
                  <div className="DateShow" style={{ marginLeft: "350px" }}>
                    {item.timestamp
                      .toString()
                      .substring(0, item.timestamp.toString().indexOf("T"))
                      .split("-")
                      .reverse()
                      .join(" / ")}
                  </div>
                  <p key={item.id}>
                    <span className="query">{item.query}</span>
                  </p>
                  <p className="scheduleTime" style={{ marginTop: "-28px" }}>
                    {item.timestamp
                      .toString()
                      .substring(
                        item.timestamp.toString().indexOf("T") + 1,
                        item.timestamp.toString().length - 3
                      )}
                  </p>
                  <p key={item.id}>
                    <span className="response">{item.response}</span>
                  </p>
                  <p
                    className="scheduleTime"
                    style={{ marginLeft: "710px", marginTop: "-18px" }}
                  >
                    {item.timestamp
                      .toString()
                      .substring(
                        item.timestamp.toString().indexOf("T") + 1,
                        item.timestamp.toString().length - 3
                      )}
                  </p>
                </>
              ))
            ) : (
              <>
                <p>
                  <span className="query">Query: Network Error</span>
                </p>
                <p>
                  <span className="response">
                    Response : Can't Able to how The history
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {Page === "ChatBot" && <CurrentChat userid={userid.userid}></CurrentChat>}
      {Page === "History" && (
        <ChatBotHistory userid={userid.userid}></ChatBotHistory>
      )}
    </>
  );
};

export default Chatbot;
