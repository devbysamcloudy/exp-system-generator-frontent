import Editor from "@monaco-editor/react";
import { useState } from "react";

const LANGUAGE_MAP = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  CSS: "css",
  HTML: "html",
  default: "javascript",
};

const DEFAULT_COMMENTS = {
  javascript: "// Write your solution here",
  typescript: "// Write your solution here",
  python: "# Write your solution here",
  java: "// Write your solution here",
  css: "/* Write your solution here */",
  html: "<!-- Write your solution here -->",
};

function CodeEditor({ onCodeChange, language = "JavaScript", darkMode }) {
  const editorLanguage = LANGUAGE_MAP[language] || LANGUAGE_MAP["default"];
  const defaultComment =
    DEFAULT_COMMENTS[editorLanguage] || "// Write your solution here";

  const [code, setCode] = useState(defaultComment);

  const handleChange = (value) => {
    setCode(value);
    onCodeChange(value);
  };

  return (
    <div
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        marginTop: "10px",
        border: "1px solid #404040",
        height: "300px",
        width: "100%",
      }}
    >
      <Editor
        key={editorLanguage}
        height="300px"
        width="100%"
        language={editorLanguage}
        defaultValue={defaultComment}
        value={code}
        onChange={handleChange}
        theme={darkMode ? "vs-dark" : "light"}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: "on",
          wordWrap: "on",
          padding: { top: 10 },
        }}
      />
    </div>
  );
}

export default CodeEditor;