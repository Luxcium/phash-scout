/*                                                                  */
/*                                                                  */

const { parentPort } = require('worker_threads');

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
function asyncOnMessageWrap(fn) {
  return async function (msg) {
    parentPort.postMessage(await fn(msg));
  };
}

const commands = {
  async square_sum(max) {
    await new Promise(res => setTimeout(res, 10_000));
    let sum = 0;
    for (let i = 0; i < max; i++) sum += Math.sqrt(i);
    return sum;
  },
};

parentPort.on(
  'message',
  asyncOnMessageWrap(async ({ method, params, id }) => {
    const messageRPC = {
      jsonrpc: '2.0',
      id,
      pid: 'worker:' + process.pid,
    };

    try {
      const result = await commands[method](...params);

      return { ...messageRPC, result };
    } catch (error) {
      const errorRPC = {
        code: -32_603,
        message:
          'Internal error!!! (Internal JSON-RPC error). ' +
          (error.message || ''),
        data: error,
      };

      return { error: errorRPC, ...messageRPC };
    }
  })
);

/*


msg => { // .. dosomething }
      URL: https://www.jsonrpc.org/specification
      5.1 Error object
When a rpc call encounters an error, the Response Object MUST contain the error member with a value that is a Object with the following members:

code
A Number that indicates the error type that occurred.
This MUST be an integer.
message
A String providing a short description of the error.
The message SHOULD be limited to a concise single sentence.
data
A Primitive or Structured value that contains additional information about the error.
This may be omitted.
The value of this member is defined by the Server (e.g. detailed error information, nested errors etc.).
The error codes from and including -32768 to -32000 are reserved for pre-defined errors. Any code within this range, but not defined explicitly below is reserved for future use. The error codes are nearly the same as those suggested for XML-RPC at the following url: http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php

code	message	meaning
-32700	Parse error	Invalid JSON was received by the server.
An error occurred on the server while parsing the JSON text.
-32600	Invalid Request	The JSON sent is not a valid Request object.
-32601	Method not found	The method does not exist / is not available.
-32602	Invalid params	Invalid method parameter(s).
-32603	Internal error	Internal JSON-RPC error.
-32000 to -32099	Server error	Reserved for implementation-defined server-errors.
The remainder of the space is available for application defined errors.
       */

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
