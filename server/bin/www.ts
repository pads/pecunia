import Server from '../src/server';

const server = new Server();

server.start().then((port: number) => {
  console.log(`Server running on port ${port}`);
});
