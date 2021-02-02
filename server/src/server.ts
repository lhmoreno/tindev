import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

import routes from './routes';

interface ConnectedUsers {
  [key: string]: string;
}

type MySocket = Socket & {
  handshake: {
    query: {
      user: string
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      io: Server;
      connectedUsers: ConnectedUsers;
    }
  }
}

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const connectedUsers: ConnectedUsers = {};

io.on('connection', (socket: MySocket) => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;

  socket.on('disconnecting', () => {
    delete connectedUsers[user];
  });
});

mongoose.connect('YOU_URL_CONNECTION_MONGODB', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('CONNECTED DB'));

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
