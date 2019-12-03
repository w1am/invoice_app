import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './settings/config';
import { startMongooose } from './mongoose';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { refreshTokens } from './utils/auth';
import { getClients } from './routes/clients';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;
const SECRET2 = process.env.SECRET2;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

export const startServer = () => {

  const port = config.development.node_port;
  const app = express();

  app.use(cors());
  app.use(getClients)

  const addUser = async (req, res, next) => {
    const token = req.headers['x-token'];
    if (token) {
      try {
        const { user } = jwt.verify(token, SECRET);
        req.user = user;
      } catch (err) {
        const refreshToken = req.headers['x-refresh-token'];
        const newTokens = await refreshTokens(
          token,
          refreshToken,
          SECRET,
          SECRET2
        );
        if (newTokens.token && newTokens.refreshToken) {
          res.set(
            'Access-Control-Expose-Headers',
            'x-token, x-refresh-token',
          );
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        }
        req.user = newTokens.user;
      }
    }
    next();
  };


  app.use(addUser)

  startMongooose();

  app.get('/', (_, res) => {
    res.send('Hello World')
  });

  new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      SECRET,
      SECRET2,
      user: req.user
    })
  }).applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server ready at port ${port}`)
  })
}
