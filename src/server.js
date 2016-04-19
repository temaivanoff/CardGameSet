import { Server } from 'ws';
import { newGame } from './game.js';
import { getGame } from './game.js';
import { checkGame } from './game.js';
let ban = {};
let users = {};
let count = {};
const PORT = 9000;
const server = new Server({ port: PORT });

server.sendAll = data => {
  server.clients.forEach(client => client.send(JSON.stringify(data)));
};


function clientConnection(client) {

  if (Object.keys(server.clients).length === 1) {
    ban = {};
    users = {};
    count = {};
      server.sendAll({ action: 'user', users, ban, count });
    client.send(JSON.stringify({ action: 'game', game: newGame() }));
  } else {
      server.sendAll({ action: 'user', users, ban, count });
    client.send(JSON.stringify({ action: 'game', game: getGame() }));
  }
}


function clientSendMessage(client, mes) {
  if (mes.action === 'user') {
    users[client._socket.remoteAddress + client._socket.remotePort] = mes.name;
    server.sendAll({ action: 'user', users, ban, count });
  }
  if (mes.action === 'set') {
    if (typeof ban[client._socket.remoteAddress + client._socket.remotePort] === 'undefined') {
      const check = checkGame(mes.ob);
      if (check.action === 'win') {
        ban = {};
        count[client._socket.remoteAddress + client._socket.remotePort] = count[client._socket.remoteAddress + client._socket.remotePort] || 0 + 3;
        console.log(count[client._socket.remoteAddress + client._socket.remotePort]);
        server.sendAll({ action: 'game', game: check.game });
        server.sendAll({ action: 'user', users, ban, count });
      } else {
        ban[client._socket.remoteAddress + client._socket.remotePort] = true;
        console.log();
        if (Object.keys(ban).length === Object.keys(users).length ) {
          ban = {};
        }
        client.send(JSON.stringify({ action: 'ban', user: 'lol :D' }));
        server.sendAll({ action: 'user', users, ban, count });
      }
    } else {
      client.send(JSON.stringify({ action: 'ban', user: 'I\'m watching you loser, lol :D ' }));
    }
  }
}


server.on('connection', client => {
  clientConnection(client);
  client.on('message', message => clientSendMessage(client, JSON.parse(message)));
});

if (server) {
  /* eslint no-console: 0 */
  console.warn('WS Server listening on port', PORT);
}
