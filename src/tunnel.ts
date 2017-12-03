import Server from '@src/server';

import * as ngrok from 'ngrok';

const server = new Server();

server.start().then((port: number) => {
  console.log(`Server running on port ${port}`);
  ngrok.connect(port, (error, url) => {
    console.log(`Tunnel available at ${url}`);
  });
});
