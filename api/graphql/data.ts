import { CosmosClient } from "@azure/cosmos";

export type QuestionModel = {
  id: string;
  question: string;
  category: string;
  incorrect_answers: string[];
  correct_answer: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
};

class DataStore {
  #client: CosmosClient;
  #databaseName = "trivia";
  #containerName = "questions";

  #getContainer = () => {
    return this.#client
      .database(this.#databaseName)
      .container(this.#containerName);
  };

  constructor(client: CosmosClient) {
    this.#client = client;
  }

  async getQuestionById(id: string) {
    const container = this.#getContainer();

    const question = await container.items
      .query<QuestionModel>({
        query: "SELECT * FROM c WHERE c.id = @id",
        parameters: [{ name: "@id", value: id }],
      })
      .fetchAll();

    return question.resources[0];
  }

  async getQuestions() {
    const container = this.#getContainer();

    const question = await container.items
      .query<QuestionModel>({
        query: "SELECT * FROM c",
      })
      .fetchAll();

    return question.resources;
  }
}

export const dataStore = new DataStore(new CosmosClient(process.env.CosmosDB));

export type Context = {
  dataStore: DataStore;
};
