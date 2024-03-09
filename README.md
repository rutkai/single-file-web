# Single file web

A dockerized implementation with web interface for [single file service](https://github.com/gildas-lormeau/SingleFile).

This project is an alternative implementation of [SingleFile-dockerized](https://github.com/screenbreak/SingleFile-dockerized).

## Usage

### Docker

Run the container:

```bash
docker run -d -p 3000:3000 --name single-file-web rutkai/single-file-web
```

Use the HTTP API:

```bash
curl -d 'url=http://www.example.com/' localhost:3000
```

Sample docker-compose file:

```yaml
version: '3'
services:
  single-file-web:
    image: rutkai/single-file-web:latest
    container_name: single-file-web
    ports:
      - "3000:3000"
```
