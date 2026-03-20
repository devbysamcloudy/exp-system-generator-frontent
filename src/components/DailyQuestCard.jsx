import React, { useState } from "react";
import CodeEditor from "./CodeEditor";

const DAILY_QUESTS = [
  {
    id: 1,
    title: "Reverse a String",
    description: "Write a function that reverses a string.",
    difficulty: "Easy",
    reward: 50,
    language: "JavaScript",
    test: (code) => {
      try {
        const fn = new Function(`
          ${code}
          if (typeof reverseString === 'function') return reverseString("hello") === "olleh";
          if (typeof reverse === 'function') return reverse("hello") === "olleh";
          const fns = Object.values(this).filter(v => typeof v === 'function');
          const f = fns.find(f => { try { return f("hello") === "olleh"; } catch(e) { return false; } });
          return f ? f("hello") === "olleh" : false;
        `);
        return fn.call({}) === true;
      } catch { return false; }
    },
  },
  {
    id: 2,
    title: "Sum of Array",
    description: "Write a function that returns the sum of all numbers in an array.",
    difficulty: "Easy",
    reward: 50,
    language: "JavaScript",
    test: (code) => {
      try {
        const fn = new Function(`
          ${code}
          if (typeof sum === 'function') return sum([1,2,3]) === 6;
          if (typeof sumArray === 'function') return sumArray([1,2,3]) === 6;
          if (typeof getSum === 'function') return getSum([1,2,3]) === 6;
          const fns = Object.values(this).filter(v => typeof v === 'function');
          const f = fns.find(f => { try { return f([1,2,3]) === 6; } catch(e) { return false; } });
          return f ? f([1,2,3]) === 6 : false;
        `);
        return fn.call({}) === true;
      } catch { return false; }
    },
  },
  {
    id: 3,
    title: "Find the Largest Number",
    description: "Write a function that returns the largest number in an array.",
    difficulty: "Medium",
    reward: 75,
    language: "JavaScript",
    test: (code) => {
      try {
        const fn = new Function(`
          ${code}
          if (typeof findLargest === 'function') return findLargest([1,5,3]) === 5;
          if (typeof largest === 'function') return largest([1,5,3]) === 5;
          if (typeof maxNumber === 'function') return maxNumber([1,5,3]) === 5;
          if (typeof findMax === 'function') return findMax([1,5,3]) === 5;
          const fns = Object.values(this).filter(v => typeof v === 'function');
          const f = fns.find(f => { try { return f([1,5,3]) === 5; } catch(e) { return false; } });
          return f ? f([1,5,3]) === 5 : false;
        `);
        return fn.call({}) === true;
      } catch { return false; }
    },
  },
  {
    id: 4,
    title: "Check Palindrome",
    description: "Write a function that checks if a string is a palindrome. Return true or false.",
    difficulty: "Medium",
    reward: 75,
    language: "JavaScript",
    test: (code) => {
      try {
        const fn = new Function(`
          ${code}
          if (typeof isPalindrome === 'function') return isPalindrome("racecar") === true;
          if (typeof palindrome === 'function') return palindrome("racecar") === true;
          if (typeof checkPalindrome === 'function') return checkPalindrome("racecar") === true;
          const fns = Object.values(this).filter(v => typeof v === 'function');
          const f = fns.find(f => { try { return f("racecar") === true; } catch(e) { return false; } });
          return f ? f("racecar") === true : false;
        `);
        return fn.call({}) === true;
      } catch { return false; }
    },
  },
  {
    id: 5,
    title: "FizzBuzz",
    description: "Write a function that takes a number and returns 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, and 'FizzBuzz' for multiples of both.",
    difficulty: "Hard",
    reward: 100,
    language: "JavaScript",
    test: (code) => {
      try {
        const fn = new Function(`
          ${code}
          if (typeof fizzBuzz === 'function') {
            return fizzBuzz(15) === "FizzBuzz" && fizzBuzz(3) === "Fizz" && fizzBuzz(5) === "Buzz";
          }
          if (typeof fizzbuzz === 'function') {
            return fizzbuzz(15) === "FizzBuzz" && fizzbuzz(3) === "Fizz" && fizzbuzz(5) === "Buzz";
          }
          const fns = Object.values(this).filter(v => typeof v === 'function');
          const f = fns.find(f => {
            try {
              return f(15) === "FizzBuzz" && f(3) === "Fizz" && f(5) === "Buzz";
            } catch(e) { return false; }
          });
          return f ? f(15) === "FizzBuzz" : false;
        `);
        return fn.call({}) === true;
      } catch { return false; }
    },
  },
];

const DIFFICULTY_COLORS = {
  Easy: "#4caf50",
  Medium: "#f0a500",
  Hard: "#e74c3c",
};

function DailyQuestCard({ onQuestComplete, darkMode }) {
  const todayIndex = new Date().getDay() % DAILY_QUESTS.length;
  const quest = DAILY_QUESTS[todayIndex];

  const [started, setStarted] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem(`quest_completed_${quest.id}`);
    return saved === new Date().toDateString();
  });

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!userCode.trim()) {
      alert("Please write your solution first!");
      return;
    }
    setSubmitted(true);

    try {
      const passed = quest.test(userCode);
      if (passed) {
        localStorage.setItem(
          `quest_completed_${quest.id}`,
          new Date().toDateString()
        );
        setCompleted(true);
        setStarted(false);
        onQuestComplete && onQuestComplete(quest);
      } else {
        alert("Incorrect solution. Try again!");
        setSubmitted(false);
      }
    } catch (err) {
      console.error(err);
      alert("Your code has an error. Check your function.");
      setSubmitted(false);
    }
  };

  return (
    <div className="daily-quest-card">
      <div className="quest-card-header">
        <h3>Daily Quest</h3>
        {completed && (
          <span className="quest-completed-badge">✅ Completed</span>
        )}
      </div>

      <div className="quest-card-body">
        <h4>{quest.title}</h4>
        <p>{quest.description}</p>
        <div className="quest-meta">
          <span
            className="quest-difficulty"
            style={{ backgroundColor: DIFFICULTY_COLORS[quest.difficulty] }}
          >
            {quest.difficulty}
          </span>
          <span className="quest-reward">🏆 {quest.reward} XP</span>
          <span className="quest-language-tag">{quest.language}</span>
        </div>
      </div>

      {!completed && (
        <>
          {!started ? (
            <button
              className="start-quest-btn"
              onClick={() => setStarted(true)}
            >
              Start Quest →
            </button>
          ) : (
            <div className="quest-editor-section">
              <CodeEditor
                onCodeChange={setUserCode}
                language={quest.language}
                darkMode={darkMode}
              />
              <div className="quest-editor-actions">
                <button
                  className="submit-quest-btn"
                  onClick={handleSubmit}
                  disabled={submitted}
                >
                  {submitted ? "Checking..." : `Submit (+${quest.reward} XP)`}
                </button>
                <button
                  className="cancel-quest-btn"
                  onClick={() => setStarted(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DailyQuestCard;