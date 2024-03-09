const http = require('http');
const qs = require('querystring');
const api = require('single-file-cli/single-file-cli-api');
const backend = require('single-file-cli/back-ends/puppeteer');

const options = Object.assign({}, api.DEFAULT_OPTIONS, {
    'browserHeadless': true,
    'browserWidth': 1280,
    'browserHeight': 720,
    'browserExecutablePath': '/usr/bin/chromium-browser',
    'browserArgs': '["--no-sandbox"]',
});

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        var body = '';

        req.on('data', data => {
            body += data;
        });

        req.on('end', () => {
            const post = qs.parse(body);

            if (post['url'] && api.VALID_URL_TEST.test(post['url'])) {
                backend.getPageData({
                    'url': post['url'],
                })
                    .then(pageData => {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(pageData.content);
                        res.end();

                        return backend.closeBrowser();
                    });
            } else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write('Missing or invalid parameter: url');
                res.end();
            }
        });
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('POST request expected.');
        res.end();
    }
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server stopped.');
    });
});

backend.initialize(options)
    .then(() => {
        server.listen(3000);
        console.log('Server running at port 3000');
    });
