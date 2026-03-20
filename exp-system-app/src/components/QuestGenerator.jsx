import React, { useState } from "react";
import { getXPReward } from "../utilis/xpSystem";
import CodeEditor from "./CodeEditor";

const questTemplates = {
  JavaScript: [
    {
      id: "js_001",
      description: "Write a JS function that flattens a nested array.",
      test: (code) => {
        try {
          const fn = new Function(`${code}; return flatten([1,[2,[3]]])`);
          return JSON.stringify(fn()) === JSON.stringify([1, 2, 3]);
        } catch { return false; }
      },
    },
    {
      id: "js_002",
      description: "Write a JS function that removes duplicates from an array.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return JSON.stringify(f([1,2,2,3])) === JSON.stringify([1,2,3]); } catch { return false; } });
            return f ? f([1,2,2,3]) : null;
          `);
          return JSON.stringify(fn.call({})) === JSON.stringify([1, 2, 3]);
        } catch { return false; }
      },
    },
    {
      id: "js_003",
      description: "Write a JS function that checks if a number is prime.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f(7) === true; } catch { return false; } });
            return f ? f(7) : null;
          `);
          return fn.call({}) === true;
        } catch { return false; }
      },
    },
    {
      id: "js_004",
      description: "Write a JS function that returns the Fibonacci sequence up to n terms.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return JSON.stringify(f(5)) === JSON.stringify([0,1,1,2,3]); } catch { return false; } });
            return f ? f(5) : null;
          `);
          return JSON.stringify(fn.call({})) === JSON.stringify([0, 1, 1, 2, 3]);
        } catch { return false; }
      },
    },
    {
      id: "js_005",
      description: "Write a JS function that counts occurrences of each character in a string.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f("aab").a === 2; } catch { return false; } });
            return f ? f("aab") : null;
          `);
          return fn.call({})?.a === 2;
        } catch { return false; }
      },
    },
    {
      id: "js_006",
      description: "Write a JS function that reverses a string.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f("hello") === "olleh"; } catch { return false; } });
            return f ? f("hello") : null;
          `);
          return fn.call({}) === "olleh";
        } catch { return false; }
      },
    },
    {
      id: "js_007",
      description: "Write a JS function that finds the maximum number in an array.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f([1,5,3]) === 5; } catch { return false; } });
            return f ? f([1,5,3]) : null;
          `);
          return fn.call({}) === 5;
        } catch { return false; }
      },
    },
    {
      id: "js_008",
      description: "Write a JS function that capitalizes the first letter of each word.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f("hello world") === "Hello World"; } catch { return false; } });
            return f ? f("hello world") : null;
          `);
          return fn.call({}) === "Hello World";
        } catch { return false; }
      },
    },
    {
      id: "js_009",
      description: "Write a JS function that sums all numbers in an array.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f([1,2,3]) === 6; } catch { return false; } });
            return f ? f([1,2,3]) : null;
          `);
          return fn.call({}) === 6;
        } catch { return false; }
      },
    },
    {
      id: "js_010",
      description: "Write a JS function that checks if a string is a palindrome.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f("racecar") === true; } catch { return false; } });
            return f ? f("racecar") : null;
          `);
          return fn.call({}) === true;
        } catch { return false; }
      },
    },
    {
      id: "js_011",
      description: "Write a JS function that sorts an array in ascending order.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return JSON.stringify(f([3,1,2])) === JSON.stringify([1,2,3]); } catch { return false; } });
            return f ? f([3,1,2]) : null;
          `);
          return JSON.stringify(fn.call({})) === JSON.stringify([1, 2, 3]);
        } catch { return false; }
      },
    },
    {
      id: "js_012",
      description: "Write a JS function that truncates a string to a given length.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f("hello world", 5) === "hello"; } catch { return false; } });
            return f ? f("hello world", 5) : null;
          `);
          return fn.call({}) === "hello";
        } catch { return false; }
      },
    },
    {
      id: "js_013",
      description: "Write a JS function that returns the factorial of a number.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f(5) === 120; } catch { return false; } });
            return f ? f(5) : null;
          `);
          return fn.call({}) === 120;
        } catch { return false; }
      },
    },
    {
      id: "js_014",
      description: "Write a JS function that chunks an array into groups of a given size.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return JSON.stringify(f([1,2,3,4], 2)) === JSON.stringify([[1,2],[3,4]]); } catch { return false; } });
            return f ? f([1,2,3,4], 2) : null;
          `);
          return JSON.stringify(fn.call({})) === JSON.stringify([[1, 2], [3, 4]]);
        } catch { return false; }
      },
    },
    {
      id: "js_015",
      description: "Write a JS function that returns the average of an array.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f([1,2,3]) === 2; } catch { return false; } });
            return f ? f([1,2,3]) : null;
          `);
          return fn.call({}) === 2;
        } catch { return false; }
      },
    },
    {
      id: "js_016",
      description: "Write a JS function that deep clones an object.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const obj = {a: 1, b: {c: 2}};
            const f = fns.find(f => { try { const clone = f(obj); return clone !== obj && clone.b !== obj.b; } catch { return false; } });
            return f ? true : null;
          `);
          return fn.call({}) === true;
        } catch { return false; }
      },
    },
    {
      id: "js_017",
      description: "Write a JS function that merges two objects.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f({a:1},{b:2}).a === 1 && f({a:1},{b:2}).b === 2; } catch { return false; } });
            return f ? f({a:1},{b:2}) : null;
          `);
          const result = fn.call({});
          return result?.a === 1 && result?.b === 2;
        } catch { return false; }
      },
    },
    {
      id: "js_018",
      description: "Write a JS function that converts a string to camelCase.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f("hello world") === "helloWorld"; } catch { return false; } });
            return f ? f("hello world") : null;
          `);
          return fn.call({}) === "helloWorld";
        } catch { return false; }
      },
    },
    {
      id: "js_019",
      description: "Write a JS function that counts the number of words in a string.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f("hello world foo") === 3; } catch { return false; } });
            return f ? f("hello world foo") : null;
          `);
          return fn.call({}) === 3;
        } catch { return false; }
      },
    },
    {
      id: "js_020",
      description: "Write a JS function that returns all unique values from two arrays.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const f = fns.find(f => { try { return f([1,2],[2,3]).length === 3; } catch { return false; } });
            return f ? f([1,2],[2,3]) : null;
          `);
          return fn.call({})?.length === 3;
        } catch { return false; }
      },
    },
  ],

  Python: [
    { id: "py_001", description: "Write a Python function that finds the second largest number in a list.", test: () => true },
    { id: "py_002", description: "Write a Python function that reverses a list without using reverse().", test: () => true },
    { id: "py_003", description: "Write a Python function that checks if a string is an anagram.", test: () => true },
    { id: "py_004", description: "Write a Python function that counts the vowels in a string.", test: () => true },
    { id: "py_005", description: "Write a Python function that merges two sorted lists.", test: () => true },
    { id: "py_006", description: "Write a Python function that finds all prime numbers up to n.", test: () => true },
    { id: "py_007", description: "Write a Python function that flattens a nested list.", test: () => true },
    { id: "py_008", description: "Write a Python function that removes duplicates from a list.", test: () => true },
    { id: "py_009", description: "Write a Python function that returns the factorial recursively.", test: () => true },
    { id: "py_010", description: "Write a Python function that checks if a number is Armstrong.", test: () => true },
    { id: "py_011", description: "Write a Python function that converts Celsius to Fahrenheit.", test: () => true },
    { id: "py_012", description: "Write a Python function that finds the GCD of two numbers.", test: () => true },
    { id: "py_013", description: "Write a Python function that counts word frequency in a string.", test: () => true },
    { id: "py_014", description: "Write a Python function that generates the Fibonacci sequence.", test: () => true },
    { id: "py_015", description: "Write a Python function that sorts a dictionary by value.", test: () => true },
    { id: "py_016", description: "Write a Python function that checks if a list is sorted.", test: () => true },
    { id: "py_017", description: "Write a Python function that rotates a list by n positions.", test: () => true },
    { id: "py_018", description: "Write a Python function that returns the most frequent element.", test: () => true },
    { id: "py_019", description: "Write a Python function that converts a string to title case.", test: () => true },
    { id: "py_020", description: "Write a Python function that zips two lists into a dictionary.", test: () => true },
  ],

  Java: [
    { id: "java_001", description: "Write a Java method that checks if a string is a palindrome.", test: () => true },
    { id: "java_002", description: "Write a Java method that finds the factorial of a number.", test: () => true },
    { id: "java_003", description: "Write a Java method that sorts an array using bubble sort.", test: () => true },
    { id: "java_004", description: "Write a Java method that converts a decimal to binary.", test: () => true },
    { id: "java_005", description: "Write a Java method that counts words in a sentence.", test: () => true },
    { id: "java_006", description: "Write a Java method that finds the largest element in an array.", test: () => true },
    { id: "java_007", description: "Write a Java method that reverses an array.", test: () => true },
    { id: "java_008", description: "Write a Java method that checks if a number is prime.", test: () => true },
    { id: "java_009", description: "Write a Java method that computes the power of a number.", test: () => true },
    { id: "java_010", description: "Write a Java method that removes duplicates from an array.", test: () => true },
    { id: "java_011", description: "Write a Java method that calculates the sum of digits.", test: () => true },
    { id: "java_012", description: "Write a Java method that checks if two strings are anagrams.", test: () => true },
    { id: "java_013", description: "Write a Java method that generates the Fibonacci series.", test: () => true },
    { id: "java_014", description: "Write a Java method that finds the second smallest element.", test: () => true },
    { id: "java_015", description: "Write a Java method that converts a string to uppercase without toUpperCase().", test: () => true },
    { id: "java_016", description: "Write a Java method that counts the frequency of a character.", test: () => true },
    { id: "java_017", description: "Write a Java method that checks if a number is Armstrong.", test: () => true },
    { id: "java_018", description: "Write a Java method that rotates an array by k steps.", test: () => true },
    { id: "java_019", description: "Write a Java method that merges two sorted arrays.", test: () => true },
    { id: "java_020", description: "Write a Java method that finds the GCD of two numbers.", test: () => true },
  ],

  TypeScript: [
    { id: "ts_001", description: "Write a TypeScript interface for a User object with name, email, and age.", test: (code) => code.includes("interface") && code.includes("name") && code.includes("email") && code.includes("age") },
    { id: "ts_002", description: "Write a TypeScript generic function that returns the first element of an array.", test: (code) => (code.includes("<T>") || code.includes("<T,")) && code.includes("function") },
    { id: "ts_003", description: "Write a TypeScript enum for days of the week.", test: (code) => code.includes("enum") && code.includes("Monday") },
    { id: "ts_004", description: "Write a TypeScript type for a product with id, name, and price.", test: (code) => code.includes("type") && code.includes("id") && code.includes("price") },
    { id: "ts_005", description: "Write a TypeScript class for a Rectangle with width, height and an area method.", test: (code) => code.includes("class") && code.includes("area") && code.includes("width") },
    { id: "ts_006", description: "Write a TypeScript function that filters an array by type.", test: (code) => code.includes("filter") && code.includes("<T>") },
    { id: "ts_007", description: "Write a TypeScript interface for a Vehicle with make, model, and year.", test: (code) => code.includes("interface") && code.includes("make") && code.includes("model") },
    { id: "ts_008", description: "Write a TypeScript function with optional parameters that builds a full name.", test: (code) => code.includes("?:") || code.includes("? ") },
    { id: "ts_009", description: "Write a TypeScript union type for a result that can be string or number.", test: (code) => code.includes("|") && (code.includes("string") || code.includes("number")) },
    { id: "ts_010", description: "Write a TypeScript readonly interface for a Config object.", test: (code) => code.includes("readonly") && code.includes("interface") },
    { id: "ts_011", description: "Write a TypeScript function that maps an array to a new type.", test: (code) => code.includes("map") && code.includes("<T>") },
    { id: "ts_012", description: "Write a TypeScript abstract class for a Shape with an area method.", test: (code) => code.includes("abstract") && code.includes("area") },
    { id: "ts_013", description: "Write a TypeScript intersection type combining two interfaces.", test: (code) => code.includes("&") && code.includes("interface") },
    { id: "ts_014", description: "Write a TypeScript decorator that logs method calls.", test: (code) => code.includes("@") || code.includes("decorator") },
    { id: "ts_015", description: "Write a TypeScript utility type that makes all fields optional.", test: (code) => code.includes("Partial") || code.includes("?:") },
    { id: "ts_016", description: "Write a TypeScript function using generics to swap two values.", test: (code) => code.includes("<T>") && (code.includes("swap") || code.includes("function")) },
    { id: "ts_017", description: "Write a TypeScript interface for a paginated API response.", test: (code) => code.includes("interface") && code.includes("data") && code.includes("page") },
    { id: "ts_018", description: "Write a TypeScript tuple type for a coordinate pair.", test: (code) => code.includes("[") && (code.includes("number") || code.includes("tuple")) },
    { id: "ts_019", description: "Write a TypeScript function that uses a type guard to check for a string.", test: (code) => code.includes("is string") || code.includes("typeof") },
    { id: "ts_020", description: "Write a TypeScript class implementing an interface for a Bank Account.", test: (code) => code.includes("implements") && code.includes("class") },
  ],

  CSS: [
    { id: "css_001", description: "Create a CSS animation that makes a div bounce.", test: (code) => code.includes("@keyframes") && code.includes("animation") },
    { id: "css_002", description: "Create a CSS flexbox layout with 3 evenly spaced columns.", test: (code) => code.includes("flex") && (code.includes("space-between") || code.includes("space-around")) },
    { id: "css_003", description: "Create a CSS gradient background from blue to purple.", test: (code) => code.includes("gradient") },
    { id: "css_004", description: "Create a CSS card with a hover effect that lifts it up.", test: (code) => code.includes(":hover") && code.includes("transform") },
    { id: "css_005", description: "Create a CSS responsive navbar that stacks vertically on mobile.", test: (code) => code.includes("@media") && code.includes("flex-direction") },
    { id: "css_006", description: "Create a CSS grid layout with 4 equal columns.", test: (code) => code.includes("grid") && code.includes("repeat") },
    { id: "css_007", description: "Create a CSS sticky header that stays at the top.", test: (code) => code.includes("sticky") || code.includes("fixed") },
    { id: "css_008", description: "Create a CSS tooltip that appears on hover.", test: (code) => code.includes(":hover") && (code.includes("content") || code.includes("::after")) },
    { id: "css_009", description: "Create a CSS loading spinner animation.", test: (code) => code.includes("@keyframes") && (code.includes("rotate") || code.includes("spin")) },
    { id: "css_010", description: "Create a CSS dark mode using CSS variables.", test: (code) => code.includes("--") && code.includes("var(") },
    { id: "css_011", description: "Create a CSS button with a ripple effect on click.", test: (code) => code.includes(":active") || code.includes("::after") },
    { id: "css_012", description: "Create a CSS image gallery using CSS grid.", test: (code) => code.includes("grid") && (code.includes("img") || code.includes(".gallery")) },
    { id: "css_013", description: "Create a CSS accordion collapsible section.", test: (code) => code.includes("max-height") || code.includes("overflow") },
    { id: "css_014", description: "Create a CSS progress bar that fills left to right.", test: (code) => code.includes("width") && (code.includes("transition") || code.includes("%")) },
    { id: "css_015", description: "Create a CSS modal overlay with centered content.", test: (code) => code.includes("position") && code.includes("fixed") && code.includes("z-index") },
    { id: "css_016", description: "Create a CSS hamburger menu icon using only divs.", test: (code) => code.includes("::before") || code.includes("::after") || code.includes("transform") },
    { id: "css_017", description: "Create a CSS star rating component.", test: (code) => code.includes(":checked") || code.includes("★") || code.includes("star") },
    { id: "css_018", description: "Create a CSS timeline layout.", test: (code) => code.includes("::before") && code.includes("border") },
    { id: "css_019", description: "Create a CSS frosted glass effect.", test: (code) => code.includes("backdrop-filter") || code.includes("blur") },
    { id: "css_020", description: "Create a CSS neon glow text effect.", test: (code) => code.includes("text-shadow") || code.includes("box-shadow") },
  ],

  HTML: [
    { id: "html_001", description: "Create an HTML form with validation for name, email, and password.", test: (code) => code.includes("<form") && code.includes("email") && code.includes("password") },
    { id: "html_002", description: "Create an HTML table with 3 columns: Name, Age, and City.", test: (code) => code.includes("<table") && code.includes("<th") && code.includes("Name") },
    { id: "html_003", description: "Create an HTML page with semantic structure using header, main, and footer.", test: (code) => code.includes("<header") && code.includes("<main") && code.includes("<footer") },
    { id: "html_004", description: "Create an HTML ordered list of your top 5 programming languages.", test: (code) => code.includes("<ol") && code.includes("<li") },
    { id: "html_005", description: "Create an HTML image gallery using a div grid with 4 images.", test: (code) => code.includes("<img") && code.includes("<div") },
    { id: "html_006", description: "Create an HTML nav bar with 5 navigation links.", test: (code) => code.includes("<nav") && code.includes("<a") },
    { id: "html_007", description: "Create an HTML video player with controls.", test: (code) => code.includes("<video") && code.includes("controls") },
    { id: "html_008", description: "Create an HTML contact form with name, email, and message.", test: (code) => code.includes("<form") && code.includes("name") && code.includes("message") },
    { id: "html_009", description: "Create an HTML page using the article and section tags.", test: (code) => code.includes("<article") && code.includes("<section") },
    { id: "html_010", description: "Create an HTML dropdown select with 5 country options.", test: (code) => code.includes("<select") && code.includes("<option") },
    { id: "html_011", description: "Create an HTML card component with image, title, and description.", test: (code) => code.includes("<img") && code.includes("<h") && code.includes("<p") },
    { id: "html_012", description: "Create an HTML progress bar using the progress element.", test: (code) => code.includes("<progress") },
    { id: "html_013", description: "Create an HTML details/summary collapsible section.", test: (code) => code.includes("<details") && code.includes("<summary") },
    { id: "html_014", description: "Create an HTML page with a meta viewport tag for mobile.", test: (code) => code.includes("viewport") && code.includes("meta") },
    { id: "html_015", description: "Create an HTML radio button group for selecting a gender.", test: (code) => code.includes("radio") && code.includes("<input") },
    { id: "html_016", description: "Create an HTML checkbox list for selecting hobbies.", test: (code) => code.includes("checkbox") && code.includes("<input") },
    { id: "html_017", description: "Create an HTML responsive image using srcset.", test: (code) => code.includes("srcset") },
    { id: "html_018", description: "Create an HTML data table with thead, tbody, and tfoot.", test: (code) => code.includes("<thead") && code.includes("<tbody") && code.includes("<tfoot") },
    { id: "html_019", description: "Create an HTML page linking an external CSS and JS file.", test: (code) => code.includes("<link") && code.includes("<script") },
    { id: "html_020", description: "Create an HTML figure with an image and figcaption.", test: (code) => code.includes("<figure") && code.includes("<figcaption") },
  ],

  default: [
    {
      id: "def_001",
      description: "Write a function that reverses a string.",
      test: (code) => {
        try {
          const fn = new Function(`${code}
            const fns = Object.values(this).filter(v => typeof v === 'function');
            const rev = fns.find(f => { try { return f("hello") === "olleh"; } catch { return false; } });
            return rev ? rev("hello") : null;
          `);
          return fn.call({}) === "olleh";
        } catch { return false; }
      },
    },
  ],
};

// Get completed quest IDs
const getCompletedQuests = () => {
  return JSON.parse(localStorage.getItem("completedGeneratorQuests")) || [];
};

// Mark a quest as completed
const markQuestCompleted = (questId) => {
  const completed = getCompletedQuests();
  if (!completed.includes(questId)) {
    completed.push(questId);
    localStorage.setItem("completedGeneratorQuests", JSON.stringify(completed));
  }
};

// Get next unfinished quest for a language
const getNextQuest = (language) => {
  const completed = getCompletedQuests();
  const quests = questTemplates[language] || questTemplates["default"];
  const remaining = quests.filter((q) => !completed.includes(q.id));

  if (remaining.length === 0) {
    // All done — reset this language and start again
    const resetCompleted = getCompletedQuests().filter(
      (id) => !quests.map((q) => q.id).includes(id)
    );
    localStorage.setItem("completedGeneratorQuests", JSON.stringify(resetCompleted));
    return quests[0];
  }

  return remaining[Math.floor(Math.random() * remaining.length)];
};

// Get progress for a language
const getQuestProgress = (language) => {
  const completed = getCompletedQuests();
  const quests = questTemplates[language] || questTemplates["default"];
  const completedCount = quests.filter((q) => completed.includes(q.id)).length;
  return {
    completed: completedCount,
    total: quests.length,
    percentage: Math.round((completedCount / quests.length) * 100),
  };
};

function QuestGenerator({ languages, onQuestAccepted, darkMode }) {
  const [currentQuest, setCurrentQuest] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const generateQuest = () => {
    if (!languages || languages.length === 0) return;
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    const quest = getNextQuest(randomLang);
    const xpReward = getXPReward(randomLang);
    setCurrentQuest({ ...quest, language: randomLang, xpReward });
    setUserCode("");
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!userCode.trim()) {
      alert("Please write your solution first!");
      return;
    }

    setSubmitted(true);
    const passed = currentQuest.test(userCode);

    if (passed) {
      markQuestCompleted(currentQuest.id);
      onQuestAccepted && onQuestAccepted({ ...currentQuest, userCode });
      setCurrentQuest(null);
      setUserCode("");
      setSubmitted(false);
    } else {
      alert("Incorrect solution. Try again!");
      setSubmitted(false);
    }
  };

  return (
    <div className="quest-generator">
      <h3>Quest Generator</h3>

      {languages && languages.length > 0 && (
        <div className="quest-progress-overview">
          {languages.map((lang) => {
            const progress = getQuestProgress(lang);
            return (
              <div key={lang} className="quest-progress-item">
                <span>{lang}</span>
                <span>{progress.completed}/{progress.total}</span>
                <div className="quest-mini-bar">
                  <div
                    className="quest-mini-fill"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={generateQuest}
        disabled={!languages || languages.length === 0}
      >
        Generate Quest from My Languages
      </button>

      {currentQuest && (
        <div className="generated-quest">
          <span className="quest-language">{currentQuest.language}</span>
          <p>{currentQuest.description}</p>
          <CodeEditor
            onCodeChange={setUserCode}
            language={currentQuest.language}
            darkMode={darkMode}
          />
          <button onClick={handleSubmit} disabled={submitted}>
            {submitted ? "Checking..." : `Submit Quest (+${currentQuest.xpReward} XP)`}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestGenerator;