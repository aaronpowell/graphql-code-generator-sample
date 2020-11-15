# GraphQL Code Generator Sample App

This is a sample application showing how to use [GraphQL Code Generator](https://graphql-code-generator.com/) to generate an the TypeScript definitions from a GraphQL schema, then how to combine that with a data store that uses a different data model. The backend storage model is [CosmosDB](https://azure.microsoft.com/services/cosmos-db/?WT.mc_id=javascript-0000-aapowell) by default, using the [`trivia.json`](api/trivia.json) data (the data was generated from [Open Trivia DB](https://opentdb.com)), but there is an in-memory store you can switch to by uncommenting code in `data.ts`.

You can watch the video of the talk that this was presented at on the [BrisJS](https://brisjs.org) [YouTube Channel](https://youtu.be/p8aJqeX7TT4?t=2741).

## Azure Static Website React Template

This repository contains a template for creating an [Azure Static Web App](https://docs.microsoft.com/azure/static-web-apps/?WT.mc_id=javascript-0000-aapowell) projects using React + TypeScript.

In the template there is [Create React App](https://create-react-app.dev) site using TypeScript and an `api` folder with an empty [Azure Functions](https://docs.microsoft.com/azure/functions/?WT.mc_id=javascript-0000-aapowell), also using TypeScript.

To get started, click the **Use this template** button to create a repository from this template, and check out the [GitHub docs on using templates](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

## Running The Application

From a terminal run `npm start` from both the repository root and `api` folder to start the two servers, the web application will be on `http://localhost:3000` and the API on `http://localhost:7071`. Alternatively, you can use the VS Code launch of `Run full stack` to run both together with debuggers attached.
