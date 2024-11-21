import React, { useEffect, useState } from "react";
import Chatbot from "../ChatBot/ChatBot";
import EmergencyApp from "../SOS/EmergencyApp";
import "./Dashboard.css";
// import { Recommendations } from "./GettingScore";
import VideoRecommendationsApp from "../VideoRecommendations/VideoRecommendationsApp";
import { Recommendations } from "./GettingScore";
import MoodTracker from "./MoodTracker";

// Dashboard Component
const Dashboard = ({ userid }) => {
  const [questions, setQuestions] = useState([]); // Store questions
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [response, setResponse] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false); // Declare state for chatbot visibility
  const [questionLength, setQuestionLength] = useState(0);

  // Function to toggle the visibility of the chatbot
  const toggleChatbot = () => {
    setIsChatbotVisible((prevState) => !prevState); // Toggle visibility using the setter
  };
  // Fetch questions from the backend
  const getQuestions = async () => {
    try {
      const res = await fetch(
        "http://localhost:8082/api/questions/getQuestions"
      );
      if (!res.ok) throw new Error("Invalid Request");
      const data = await res.json();
      setQuestions(data);
      setQuestionLength(Object.keys(data).length);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // Store the user's answers to the backend
  const storeData = async () => {
    await fetch("http://localhost:8082/api/takeTest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userid,
        QuestionAndAnswer: response,
      }),
    });
  };

  // Calculate the score after the quiz
  const calculateScore = () => {
    const gainedscore = answers.reduce((acc, score) => acc + score, 0);
    setScore(((gainedscore / (questionLength * 15)) * 100).toFixed(0));
  };

  // Handle the answer selection
  const handleAnswer = (score, option, questionText) => {
    // alert(currentQuestion + 1);
    setAnswers((prev) => [...prev, score]);
    setResponse((prev) => ({
      ...prev,
      [questionText]: option,
    }));

    if (currentQuestion + 1 === questionLength) {
      calculateScore();
      storeData();
      setCurrentPage("results");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Render the dashboard page
  const renderDashboard = () => (
    <div className="dashboard">
      <header className="header">
        <div className="logo">
          <div className="logo-circle">SS</div>
          <h1>Serenity Space</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#About">About</a>
            </li>
            <li>
              <a href="#tracker" onClick={() => setCurrentPage("moodTracker")}>
                Mood Tracker
              </a>
            </li>
            <li>
              <a
                href="#tasks"
                onClick={() => setCurrentPage("VideoRecommendations")}
              >
                Video Recommendations
              </a>
            </li>
            {/* <li><a href="#wellbeing">Mental Well-being</a></li> */}
            <li>
              <a href="#Emergency" onClick={() => setCurrentPage("Emergency")}>
                Emergency
              </a>
            </li>
            <li>
              <a
                href="#recommendations"
                onClick={() => setCurrentPage("ChatBot")}
              >
                Recommendations
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <div className="welcome-card">
          <div className="card-content">
            <h2>Your Journey to Mental Well-being</h2>
            <p className="subtitle">
              Discover insights about yourself through our comprehensive
              assessment
            </p>
            <div className="feature-grid">
              <div className="feature">
                <div className="feature-icon">🎯</div>
                <h3>Personal Insights</h3>
                <p>
                  Gain deep understanding of your mental well-being patterns
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">📈</div>
                <h3>Track Progress</h3>
                <p>Monitor your journey and celebrate improvements</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🎓</div>
                <h3>Expert Guidance</h3>
                <p>
                  Receive tailored recommendations from mental health
                  professionals
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌱</div>
                <h3>Growth Focus</h3>
                <p>Develop strategies for continuous personal development</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage("assessment")}
              className="primary-button"
            >
              Begin Assessment
            </button>
            <p className="note">Takes approximately 5-7 minutes to complete</p>
          </div>
        </div>
      </main>
    </div>
  );

  // Render the assessment page
  const renderAssessment = () => (
    <div className="assessment_body">
      <div className="assessment">
        <div className="assessment-card">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentQuestion / questionLength) * 100}%` }}
            ></div>
          </div>
          <div className="question-header">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                  setAnswers(answers.slice(0, -1));
                } else {
                  setCurrentPage("dashboard");
                  setCurrentQuestion(0);
                  setAnswers([]);
                }
              }}
              className="back-button"
            >
              ← Back
            </button>
            <div className="question-progress">
              Question {currentQuestion + 1} of {questionLength}
            </div>
          </div>

          <div className="question-content">
            <h3 className="question-text">
              {questions[currentQuestion]?.questionText}
            </h3>
            <div className="options">
              {questions[currentQuestion]?.choices.map((choice, index) => (
                <div key={index} className="option-item">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={choice.option}
                    checked={selectedOption === choice.option}
                    onChange={() =>
                      handleAnswer(
                        choice.score,
                        choice.option,
                        questions[currentQuestion]?.questionText
                      )
                    }
                  />
                  <label style={{ marginLeft: "20px" }}>{choice.option}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the results page
  const renderResults = () => (
    <div className="results_body">
      <div className="results">
        <div className="results-card">
          <h2>Your Well-being Assessment Results</h2>
          <div className="score-section">
            <div className="score-circle">
              <div className="score-value">{score}%</div>
              <div className="score-label">Well-being Score</div>
            </div>
          </div>
          <div className="results-content">
            <div className="insight-section">
              <h3>Key Insights</h3>
              <p>
                {score >= 75
                  ? "You're demonstrating excellent emotional resilience and healthy lifestyle patterns."
                  : score >= 50
                  ? "You're maintaining a moderate level of well-being with room for enhancement."
                  : "Your responses indicate you might be experiencing some challenges with your current well-being."}
              </p>
            </div>
            <div className="recommendations-section">
              <h3>Personalized Recommendations</h3>
              <div className="recommendation-cards">
                {score >= 75 ? (
                  <div className="recommendation-card">
                    <h4>Maintain Excellence</h4>
                    <p>
                      Continue your positive practices while exploring new
                      growth opportunities
                    </p>
                  </div>
                ) : score >= 50 ? (
                  <div className="recommendation-card">
                    <h4>Enhance Well-being</h4>
                    <p>
                      Consider adding self-care practices to strengthen your
                      resilience
                    </p>
                  </div>
                ) : (
                  <div className="recommendation-card">
                    <h4>Seek Support</h4>
                    <p>
                      Explore additional mental health resources for better
                      coping strategies
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setCurrentPage("Recommendations")}
                style={{ color: "white", marginLeft: "270px", width: "200px" }}
              >
                For More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);
  return (
    <>
      {currentPage === "dashboard" && renderDashboard()}
      {currentPage === "assessment" && renderAssessment()}
      {currentPage === "results" && renderResults()}
      {currentPage === "moodTracker" && <MoodTracker />}
      {currentPage === "Emergency" && <EmergencyApp />}
      {currentPage === "ChatBot" && <Chatbot userid={userid} />}
      {currentPage === "Recommendations" && (
        <Recommendations userid={userid}></Recommendations>
      )}
      {currentPage === "VideoRecommendations" && (
        <VideoRecommendationsApp></VideoRecommendationsApp>
      )}
      <div>
        {/* Chatbot logo (toggle button) */}
        <div
          id="chatbot-toggle"
          className="chatbot-toggle-logo"
          onClick={toggleChatbot}
        >
          <img
            src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
            alt="Chatbot Logo"
            className="chatbot-logo"
          />
        </div>

        {/* Chatbot container */}
        {isChatbotVisible && (
          <div id="chatbot-container" className="chatbot-container">
            <Chatbot />
            {/* <div className="header">Chat with us!</div>
          <div className="messages">
          </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
