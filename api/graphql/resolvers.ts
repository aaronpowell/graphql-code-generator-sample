import { Resolvers } from "./generated";

const resolvers: Resolvers = {
  Query: {
    question(_, { id }, { dataStore }) {
      return dataStore.getQuestionById(id);
    },
    async getRandomQuestion(_, __, { dataStore }) {
      const questions = await dataStore.getQuestions();
      return questions[Math.floor(Math.random() * questions.length) + 1];
    },
  },
  Question: {
    answers(question) {
      return question.incorrect_answers.concat([question.correct_answer]);
    },
    correctAnswer(question) {
      return question.correct_answer;
    },
    id(question) {
      return question.id;
    },
    question(question) {
      return question.question;
    },
  },

  Mutation: {
    async answerQuestion(_, { id, answer }, { dataStore }) {
      const question = await dataStore.getQuestionById(id);

      return {
        questionId: id,
        question: question.question,
        correctAnswer: question.correct_answer,
        submittedAnswer: answer,
        correct: question.correct_answer === answer,
      };
    },
  },

  Answer: {
    correct({ correct }) {
      return correct;
    },
    correctAnswer({ correctAnswer }) {
      return correctAnswer;
    },
    question({ question }) {
      return question;
    },
    questionId({ questionId }) {
      return questionId;
    },
    submittedAnswer({ submittedAnswer }) {
      return submittedAnswer;
    },
  },
};

export default resolvers;
