FROM denoland/deno:debian

RUN apt-get update && apt-get install -y unzip chromium wget &&\
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN wget -q -O source.zip https://github.com/gildas-lormeau/single-file-cli/archive/master.zip && unzip -q source.zip && rm source.zip

WORKDIR /app/single-file-cli-master

ADD index.js index.js

ENTRYPOINT ["deno", "-q", "run", "--allow-read", "--allow-write", "--allow-net", "--allow-env", "--allow-run", "index.js"]
