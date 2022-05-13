import express from "express";
import { DataSource } from "typeorm";
import bodyParser from "body-parser";
import { Account } from "./entities/Account";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AccountResolver } from "./resolvers/accountResolver";
import { SecretResolver } from "./resolvers/secretResolver";
import { Secret } from "./entities/Secret";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";
import { Region } from "./entities/Region";
import { RegionResolver } from "./resolvers/regionResolver";
import { Vote } from "./entities/Vote";
import { VoteStatus } from "./entities/VoteStatus";
import { Admin } from "./entities/Admin";

const PORT = 4000;

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "postgres",
  password: "awesomepassword123",
  database: "votingsystem",
  logging: true,
  synchronize: true,
  entities: [Account, Secret, Region, Vote, VoteStatus, Admin],
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });

const main = async () => {
  const app = express();

  app.use(bodyParser.json({ limit: "30mb" }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "vid",
      store: new RedisStore({
        client: redis,
        disableTouch: false,
      }),
      secret: "oiajsdfajsiodfjaksjdfiasjdfio",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        sameSite: "lax",
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AccountResolver, SecretResolver, RegionResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
  });
};

main();
