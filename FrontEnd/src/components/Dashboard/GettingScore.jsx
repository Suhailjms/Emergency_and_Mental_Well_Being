import React, { useEffect, useState } from "react";
import "./recommendations.css";
const Recommendations = (userid) => {
  const [fetchedScore, setFetchedScore] = useState(0);
  const [fetchedDepression, setFetchedDepression] = useState(null);
  const [fetchedrecommendations, setFetchedRecommendation] = useState(" ");

  const GetScore = async (userid) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/getTestResults?id=${userid}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) throw new Error("Invalid Request Or Invalid UserId");
      const data = await response.json();
      setFetchedScore(data.status[data.status.length - 1].score);
      setFetchedDepression(data.status[data.status.length - 1].status);
      const id = data.status[data.status.length - 1].id;
      GetRecommendation(id);
      console.log(data);
    } catch (error) {
      console.error(error.message + "invalid");
    }
  };
  const GetRecommendation = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/getRecommendations?id=${id}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) throw new Error("Invalid Request Or Invalid UserId");

      const data = await response.json();

      var recommended = "";
      for (var i = 0; i < data.recommendation.length; i++)
        recommended = recommended + " " + data.recommendation[i];
      setFetchedRecommendation(recommended);
      recommended = "";
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    GetScore(userid.userid);
  }, []);

  return (
    <>
      <div className="recommendations_body">
        <h3 className="recommendations_testresult">Test Results</h3>
        <hr className="GreenLine" />
        <span>Your Total Score : {fetchedScore}</span>
        <span className="depression_level">
          {" "}
          Depression Level : {fetchedDepression}
        </span>
        <div className="recommendations_message">
          <h2 style={{ color: "black" }}>Recommendations :</h2>
          <p className="Recommendation"> {fetchedrecommendations}</p>
        </div>
      </div>
    </>
  );
};

export { Recommendations };
