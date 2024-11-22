import { Shield } from "lucide-react";
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/Alert"; // Fix path and capitalization
import { Button } from "../ui/Button"; // Capitalize Button if the file is named Button.js
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"; // Capitalize Card if the file is named Card.js
import { Label } from "../ui/Label"; // Fix path and capitalization
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"; // Fix path and capitalization

const MentalHealthAssessment = () => {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [answers, setAnswers] = useState({
    suicidalThoughts: "",
    endLife: "",
    harmPlan: "",
  });

  const handleStartAssessment = () => {
    setCurrentScreen("welcome");
  };

  const handleTakeTest = () => {
    setCurrentScreen("questions");
  };

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the submission
    console.log("Answers submitted:", answers);
    setCurrentScreen("confirmation");
  };

  const StartScreen = () => (
    <Card className="max-w-md mx-auto my-8">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Mental Health Assessment</h1>
          <p className="text-gray-600">
            Take a moment to assess your mental wellbeing
          </p>
          <Button
            onClick={handleStartAssessment}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Start Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const WelcomeScreen = () => (
    <Card className="max-w-md mx-auto my-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Shield className="w-8 h-8 text-teal-500" />
          <p className="text-sm">
            Your answers are confidential and will only be used to generate your
            personal score.
          </p>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Don't wait anymore to start taking control of your mind and your life
        </p>
        <Button
          onClick={handleTakeTest}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          Take test now
        </Button>
      </CardContent>
    </Card>
  );

  const QuestionScreen = () => (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle>Assessment Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base">
              1. Do you have any suicidal thoughts?
            </Label>
            <RadioGroup
              className="flex justify-between"
              value={answers.suicidalThoughts}
              onValueChange={(value) =>
                handleAnswerChange("suicidalThoughts", value)
              }
            >
              {[0, 1, 2, 3, 4].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value.toString()} id={`q1-${value}`} />
                  <Label htmlFor={`q1-${value}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>

            <Label className="text-base">
              2. Would you like to end your life?
            </Label>
            <RadioGroup
              className="flex justify-between"
              value={answers.endLife}
              onValueChange={(value) => handleAnswerChange("endLife", value)}
            >
              {[0, 1, 2, 3, 4].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value.toString()} id={`q2-${value}`} />
                  <Label htmlFor={`q2-${value}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>

            <Label className="text-base">
              3. Do you have a plan for harming yourself?
            </Label>
            <RadioGroup
              className="flex justify-between"
              value={answers.harmPlan}
              onValueChange={(value) => handleAnswerChange("harmPlan", value)}
            >
              {[0, 1, 2, 3, 4].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value.toString()} id={`q3-${value}`} />
                  <Label htmlFor={`q3-${value}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const ConfirmationScreen = () => (
    <Card className="max-w-md mx-auto my-8">
      <CardContent className="p-6">
        <Alert>
          <AlertTitle>Assessment Submitted</AlertTitle>
          <AlertDescription>
            Thank you for completing the assessment. If you're experiencing
            thoughts of self-harm, please reach out to a mental health
            professional or call your local crisis helpline immediately.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );

  const screens = {
    start: <StartScreen />,
    welcome: <WelcomeScreen />,
    questions: <QuestionScreen />,
    confirmation: <ConfirmationScreen />,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">{screens[currentScreen]}</div>
  );
};

export default MentalHealthAssessment;
