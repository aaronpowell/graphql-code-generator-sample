import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRandomQuestionQuery, useAnswerQuestionMutation } from "./generated";
import ApolloClient from "apollo-boost";

const client = new ApolloClient<object>({
  uri: "http://localhost:7072/api/graphql",
});

function App() {
  const { loading, data } = useRandomQuestionQuery({ client });
  const [submitAnswer] = useAnswerQuestionMutation({
    client,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data.getRandomQuestion?.question}</p>
        <ul>
          {data.getRandomQuestion?.answers.map((a) => (
            <li key={a}>
              {a}{" "}
              <button
                onClick={() => {
                  submitAnswer({
                    variables: {
                      id: data.getRandomQuestion?.id,
                      answer: a,
                    },
                  });
                }}
              >
                Submit Answer
              </button>
            </li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
