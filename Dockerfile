FROM capsulecode/singlefile

WORKDIR /usr/src/app
ADD index.js index.js

ENTRYPOINT ["node", "index.js"]
