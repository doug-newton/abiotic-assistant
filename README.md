# Abiotic Assistant

Helps you plan your work efficiently in _Abiotic Factor_ by mapping out crafting recipes and sourcing required items.

## Setup

### Run/Dev:

To run in dev mode (frontend and backend):

```sh
docker compose up -d
```

Access frontend/backend here:

Frontend:
```
http://localhost:3000
```

Backend:
```
http://localhost:3001
```

### Build:

To build an image with the backend and compiled frontend:

```sh
docker build -t abiotic-assistant .
```

Start the container:

```sh
docker run -d -p 8080:3000 --name abiotic-app abiotic-assistant
```

