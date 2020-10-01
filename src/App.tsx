import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  useAnswerQuestionMutation,
  useRandomQuestionLazyQuery,
  Question,
} from "./generated";
import ApolloClient from "apollo-boost";

const client = new ApolloClient<object>({
  uri: "/api/graphql",
});

type QuestionProps = {
  question: Pick<Question, "id" | "question" | "answers">;
  setAnswer: (answer: string) => void;
};

const QuestionDisplay: React.FC<QuestionProps> = ({ question, setAnswer }) => {
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
      <ul>
        {question.answers.map((a) => (
          <li key={a}>
            <label>
              <input type="radio" name="answer" onChange={() => setAnswer(a)} />
              &nbsp;
              <span dangerouslySetInnerHTML={{ __html: a }}></span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

function App() {
  const [getRandomQuestion, { loading, data }] = useRandomQuestionLazyQuery({
    client,
  });
  const [submitAnswer, submitAnswerResponse] = useAnswerQuestionMutation({
    client,
  });

  const [correct, setCorrect] = useState(false);
  const [answer, setAnswer] = useState<string>();

  useEffect(() => {
    if (submitAnswerResponse.data) {
      setCorrect(submitAnswerResponse.data.answerQuestion?.correct || false);
    }
  }, [submitAnswerResponse]);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  }

  if (!data || !data.getRandomQuestion) {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => getRandomQuestion()}>Start Game</button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <QuestionDisplay
          question={data.getRandomQuestion}
          setAnswer={setAnswer}
        />
        <button
          disabled={!answer}
          onClick={() =>
            submitAnswer({
              variables: { answer, id: data.getRandomQuestion?.id },
            })
          }
        >
          Submit Answer
        </button>
        {submitAnswerResponse.called && !submitAnswerResponse.loading && (
          <p>{correct ? "Correct!" : "Try again!"}</p>
        )}
      </header>
    </div>
  );
}

export default App;
