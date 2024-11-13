import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import "./MoodTracker.css";

const initialMoodTrackerData = [
  { date: "2024-01-01", mood: "Happy", notes: "Had a great day at work" },
  { date: "2024-01-02", mood: "Anxious", notes: "Deadline pressure" },
];

const MoodTracker = () => {
  const [dailyMood, setDailyMood] = useState("");
  const [moodNote, setMoodNote] = useState("");
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [moodHistory, setMoodHistory] = useState(initialMoodTrackerData);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const calculateStreak = () => {
      let currentStreak = 0;
      const today = new Date().toISOString().split("T")[0];

      for (let i = moodHistory.length - 1; i >= 0; i--) {
        if (
          moodHistory[i].date === today ||
          new Date(moodHistory[i].date).getTime() >=
            new Date(today).getTime() - 86400000
        ) {
          currentStreak++;
        } else {
          break;
        }
      }
      setStreak(currentStreak);
    };

    calculateStreak();
  }, [moodHistory]);

  const addMoodEntry = () => {
    if (dailyMood) {
      const newEntry = {
        date: new Date().toISOString().split("T")[0],
        mood: dailyMood,
        notes: moodNote,
      };
      setMoodHistory([...moodHistory, newEntry]);
      setDailyMood("");
      setMoodNote("");
      setShowMoodTracker(false);
    }
  };

  return (
    <div className="mood-tracker bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Daily Mood Tracker</h2>
        <Calendar className="w-6 h-6" />
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-3xl">🏆</div>
        <div>
          <p className="text-lg font-semibold">{streak} Day Streak</p>
          <p className="text-sm text-gray-600">Keep up the great work!</p>
        </div>
      </div>
      <button
        onClick={() => setShowMoodTracker(true)}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Log Today's Mood
      </button>

      {showMoodTracker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              How are you feeling today?
            </h3>
            <select
              value={dailyMood}
              onChange={(e) => setDailyMood(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="">Select mood</option>
              <option value="Happy">😊 Happy</option>
              <option value="Calm">😌 Calm</option>
              <option value="Anxious">😰 Anxious</option>
              <option value="Sad">😢 Sad</option>
              <option value="Energetic">⚡ Energetic</option>
            </select>
            <textarea
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="Add a note about your day..."
              className="w-full p-2 mb-4 border rounded h-24"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowMoodTracker(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={addMoodEntry}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
