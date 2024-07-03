
const { createServer, request } = require('node:http');
const { readFileSync } = require('node:fs');
const { parse } = require('node:url');

const mockData = JSON.parse(readFileSync('data.json'));
const REMOTE_SERVER = '';
const LOCAL_PORT = '';

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url);
  const method = req.method;
  const data = mockData[parsedUrl.pathname];

  if (method === 'GET' && data) {
    handleLocalRequest(res, 'GET', data);
  } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    handleDataRequest(req, res, data);
  } else {
    forwardRequest(req, res);
  }
});

/**
 * 处理本地请求
 *
 * @param res HTTP响应对象
 * @param method 请求方法（GET, POST等）
 * @param data 响应数据
 */
function handleLocalRequest(res, method, data) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', method);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data));
}

/**
 * 处理数据请求的函数
 *
 * @param req 请求对象
 * @param res 响应对象
 * @param localData 本地数据，可选参数
 */
function handleDataRequest(req, res, localData) {
  let data = [];

  req.on('data', chunk => data.push(chunk));

  req.on('end', () => {
    const body = Buffer.concat(data).toString();
    try {
      const parsedBody = JSON.parse(body);
    } catch (err) {
      console.error('Error parsing JSON:', err);
      res.statusCode = 400;
      res.end('Invalid JSON data');
      return;
    }

    if (localData) {
      handleLocalRequest(res, req.method, localData);
    } else {
      forwardRequest(req, res, body);
    }
  });
}


/**
 * 转发请求到远程服务器
 *
 * @param req 原始请求对象
 * @param res 响应对象
 * @param body 请求体，默认为null
 */
function forwardRequest(req, res, body = null) {
  if (!REMOTE_SERVER) {
    res.statusCode = 500;
    res.end('REMOTE_SERVER is not configured');
    return;
  }

  const parsedRemoteServer = parse(REMOTE_SERVER);

  const options = {
    hostname: parsedRemoteServer.hostname,
    port: parsedRemoteServer.port || 80,
    path: reqPath,
    method: req.method,
    headers: req.headers,
  };

  const remoteReq = request(options, (remoteRes) => {
    remoteRes.on('data', (data) => {
      res.write(data);
    });

    remoteRes.on('end', () => {
      res.end();
    });

    remoteReq.on('error', (err) => {
      console.error(`Error forwarding request: ${err.message}`);
      res.statusCode = 500;
      res.end('Error forwarding request.');
    });
  });

  if (body) {
    remoteReq.write(body);
  }

  req.on('data', (data) => {
    remoteReq.write(data);
  });

  req.on('end', () => {
    remoteReq.end();
  });
}

server.listen(LOCAL_PORT, () => {
  console.log(`Listening on ${LOCAL_PORT}`);
});
