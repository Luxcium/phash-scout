#!/usr/bin/env node
'use strict';
const http = require('http');
const net = require('net');

/* **************************************************************** */
/*                                                                  */
/* MIT LICENSE                                                      */
/*                                                                  */
/* Copyright © 2021-2022 Benjamin Vincent Kasapoglu (Luxcium)       */
/*                                                                  */
/* NOTICE:                                                          */
/* Additional Licensing information at the bottom of the page may   */
/* have precedence on the current license information in some cases */
/*                                                                  */
/* **************************************************************** */

const [, , web_host, actor_host, threads] = process.argv;
const [web_hostname, web_port] = web_host.split(':');
const [actor_hostname, actor_port] = actor_host.split(':');

let message_id = 0;
let actors = new Set(); // collection of actor handlers
let messages = new Map(); // message ID -> HTTP response
// ++ ----------------------------------------------------------------
net
  .createServer(client => {
    const handler = data => client.write(JSON.stringify(data) + '\0\n\0'); // <1>
    actors.add(handler);
    console.log('actor pool connected', actors.size);
    client
      .on('end', () => {
        actors.delete(handler); // <2>
        console.log('actor pool disconnected', actors.size);
      })
      .on('data', raw_data => {
        const chunks = String(raw_data).split('\0\n\0'); // <3>
        chunks.pop(); // <4>
        for (let chunk of chunks) {
          const data = JSON.parse(chunk);
          const res = messages.get(data.id);
          res.end(JSON.stringify(data) + '\0\n\0');
          messages.delete(data.id);
        }
      });
  })
  .listen(actor_port, actor_hostname, () => {
    console.log(`actor: tcp://${actor_hostname}:${actor_port}`);
  });
// ++ ----------------------------------------------------------------

http
  .createServer(async (req, res) => {
    message_id++;

    if (actors.size === 0) return res.end('ERROR: EMPTY ACTOR POOL');

    const actor = randomActor();

    messages.set(message_id, res);

    console.log(
      req.url.split('/').slice(1, 2).pop(),
      req.url.split('/').slice(2, 3).pop(),
      '\n',
      decodeURI(req.url.split('/').slice(3).join('/'))
    );

    actor({
      id: message_id,
      method: req.url.split('/').slice(1, 2).pop(),
      args: [
        decodeURI(req.url.split('/').slice(3).join('/')),
        req.url.split('/').slice(2, 3).pop(),
      ],
    });
  })
  .listen(web_port, web_hostname, () => {
    console.log(`web:   http://${web_hostname}:${web_port}`);
  });
// ++ ----------------------------------------------------------------

function randomActor() {
  const pool = [...actors];
  return pool[Math.floor(Math.random() * pool.length)];
}

// ++ ---- PART TWO BEGINS BELOW -------------------------------------

const RpcWorkerPool = require('./rpc-worker.js');

const worker = new RpcWorkerPool(
  '/home/luxcium/projects/pHashScout/out/src/API/worker/worker.js',
  threads || 0,
  'leastbusy'
);

actors.add(async data => {
  const value = await worker.exec(data.method, data.id, ...data.args);

  const reply =
    JSON.stringify({
      id: data.id,
      value,
      pid: 'server:' + process.pid,
    }) + '\0\n\0';

  messages.get(data.id).end(reply);
  messages.delete(data.id);
});

/* **************************************************************** */
/*                                                                  */
/*  O’Reilly Online Learning                                        */
/*                                                                  */
/*  Title: “Multithreaded JavaScript”                               */
/*  Author: “by Thomas Hunter II and Bryan English”                 */
/*  Publisher: “O’Reilly”                                           */
/*  Copyright: “© 2022 Thomas Hunter II and Bryan English”          */
/*  ISBN: “978-1-098-10443-6.”                                      */
/*                                                                  */
/*  Using Code Examples                                             */
/*  Supplemental material (code examples, exercises, etc.)          */
/*  is available for download at                                    */
/*  https://github.com/MultithreadedJSBook/code-samples.            */
/*                                                                  */
/*  In general, if example code is offered with this book, you may  */
/*  use it in your programs and documentation. You do not need to   */
/*  contact us for permission unless you’re reproducing a           */
/*  significant portion of the code. For example, writing a         */
/*  program that uses several chunks of code from this book does    */
/*  not require permission. Selling or distributing examples from   */
/*  O’Reilly books does require permission. Answering a question by */
/*  citing this book and quoting example code does not require      */
/*  permission. Incorporating a significant amount of example code  */
/*  from this book into your product’s documentation does require   */
/*  permission.                                                     */
/*                                                                  */
/*  If you feel your use of code examples falls outside fair use or */
/*  the permission given above, feel free to contact us at          */
/*  permissions@oreilly.com.                                        */
/*                                                                  */
/* **************************************************************** */
