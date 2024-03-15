import * as qs from 'node:querystring';
import * as child_process from "node:child_process";
import * as url from "node:url";


Deno.addSignalListener("SIGINT", () => {
    console.log("Exiting...");
    Deno.exit();
});

Deno.serve({ port: 3000 }, async request => {
    if (request.method === 'POST') {
        const post = qs.parse(await request.text());

        if (post['url'] && isValidUrl(post['url'])) {
            try {
                const result = child_process.execSync(`/usr/bin/deno -q run --allow-read --allow-write --allow-net --allow-env --allow-run ./single-file --browser-executable-path /usr/bin/chromium --output-directory ./../out/ --dump-content ${post['url']}`);

                return new Response(result, {
                    headers: { 'Content-Type': 'text/html' },
                });
            } catch (err) {
                return new Response(err.message, {
                    status: 500,
                    headers: { 'Content-Type': 'text/plain' },
                });
            }
        }

        return new Response('Missing or invalid parameter: url', {
            status: 400,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    return new Response('POST request expected.', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' },
    });
});


const isValidUrl = (s) => {
    try {
        new url.URL(s);
        return true;
    } catch (err) {
        return false;
    }
}
