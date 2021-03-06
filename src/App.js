import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import InputContainer from "./InputContainer.js";
import OutputContainer from "./OutputContainer.js";
import OutputCard from "./OutputCard";

function App() {
  const [allCards, setAllCards] = useState([]);
  async function getResponse(input) {
    const data = {
      prompt: input,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      }
    );
    setAllCards([
      ...allCards,
      <OutputCard
        key={input}
        input={input}
        output={response.data.choices[0].text}
      />,
    ]);
  }

  return (
    <div
      className="App"
      style={{
        width: "90vh",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        component="div"
        style={{ margin: 20, fontSize: 80, fontWeight: "bold" }}
      >
        Fun with AI
      </Typography>
      <InputContainer getResponse={getResponse}></InputContainer>
      <OutputContainer outputCards={allCards}></OutputContainer>
    </div>
  );
}

export default App;
