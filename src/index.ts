import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSource } from './datasource';
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";

async function start() {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 5999 },
    });
    console.log(`🚀 Server ready at: ${url}`);
  }

start();
