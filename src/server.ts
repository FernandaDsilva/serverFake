
// const express = require('express')

// const app = express()

// const Knex = require("knex");
// const { Model } = require("objection");
// let config = {
//   client: "pg",
//   connection: {
//     port: 5432,
//     host: "localhost",
//     database: "server_fake",
//     user: "postgres",
//     password: "pass123",
//   },
// };
// const knex = Knex(config);
// Model.knex(knex);

// app.listen(3333, () => console.log(`listening on port: ${3333}`))


// app.get('/', (request, response) => {
//     response.json({ message: 'Hello World!' })
// })

import Fastify, { fastify } from "fastify";
import mercurius from "mercurius";
import { gql } from "mercurius-codegen";
import cors from 'fastify-cors';
import Music from "./models/music"

const Knex = require('knex');

import  { Model } from "objection";

let config = {
  client: "pg",
  connection: {
    port: 5432,
    host: "localhost",
    database: "server_fake",
    user: "postgres",
    password: "pass123",
  },
};

const app = fastify();

const knex = Knex(config);

Model.knex(knex);

const schema = gql`
  input MusicInput {
    id: ID
    title: String!
    artist: String!
    image: String!
  }
  type Music {
    id: ID!
    title: String!
    artist: String!
    image: String!
  }
  type Query {
    musics: [Music!]!
    music(id: ID!): Music!
  }
  type Mutation {
    createMusic(input: MusicInput): Music!
    updateMusic(input: MusicInput): Music!
    deleteMusic(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    musics: () => Music.query(),
    music: async (root, args, context, info) => {
      const { id } = args;
      return Music.query().findById(id);
    },
  },
  Mutation: {
    createMusic: async (root, args, context, info) => {
      const { input } = args;
      const createdMusic = await Music.query().insert({ ...input });
      return createdMusic;
    },
    updateMusic: async (root, args, context, info) => {
      const { input } = args;
      const { id } = input;
      let musicExists = await Music.query().findById(id);
      if (!musicExists) {
        return;
      }
      await Music.query()
        .findById(id)
        .patch({
          ...input,
        });
      //const createdMusic = await Music.query().insert({ ...input });
      return { ...input };
    },
    deleteMusic: async (root, args, context, info) => {
      const { id } = args;
      let musicExists = await Music.query().findById(id);
      if (!musicExists) {
        return;
      }
      await Music.query().deleteById(id);
      //const createdMusic = await Music.query().insert({ ...input });
      return true
    },
    // console.log({music})
  },
};

app.register(cors, { origin: '*' })
app.register(mercurius, {
   schema,
   resolvers,
   graphiql: "playground",
    // playgroundHeaders(window) {
    //   return {
    //     authorization: `bearer ${window.sessionStorage.getItem("token")}`,
    //   };
    // },

  
});

app.get('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'world' }
})
app.listen(3333);
