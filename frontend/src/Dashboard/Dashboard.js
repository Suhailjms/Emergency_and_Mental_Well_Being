    import React from 'react';
    import './Dashboard.css'; // Import the CSS file
    import { Link } from 'react-router-dom';

    function Dashboard() {
      return (
        <div className="App">
          <header className="header">
            <div className="logo">
              <img src="https://static.wixstatic.com/media/53b470_a5c2fcd77e8e491cbc2bc2bcec96764f~mv2.png/v1/fill/w_560,h_560,al_c,lg_1,q_85,enc_auto/Serenity%20Space%20Logo.png" alt="Serenity Space Logo" className="logo-img" />
              <h1>Serenity Space</h1>
            </div>
            <nav>
              <ul className="nav-links">
                <li><a href="#">News</a></li>
                <li><a href="#">Mood Tracker</a></li>
                <li><a href="#">Task Creation</a></li>
                <li><a href="#">Mental Well-being</a></li>
                <li><Link to = '/location'>Emergency</Link></li>
                <li><a href="#">Recommendations</a></li>
                <li><a href="#">Logout</a></li>
              </ul>
            </nav>
          </header>
          <section className="main-section">
            <div className="main-content">
              <h2>Assess Your Personal Growth & Well-being</h2>
              <p>Take a short, insightful survey to measure your current well-being and personal growth. SelfCheck helps you explore your mindset, habits, and progress toward self-improvement. Begin your journey toward balance, growth, and fulfillment today.</p>
              <button className="start-button">Start Your journey</button>
            </div>
            <img src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-woman-meditating-clipart-girl-sitting-in-lotus-pose-cartoon-vector-png-image_12161831.png" alt="Mental Health Illustration" className="illustration" />
          </section>
        </div>
      );
    }

    export default Dashboard;

