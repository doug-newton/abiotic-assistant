# Abiotic Assistant

Helps you plan your work efficiently in _Abiotic Factor_ by mapping out crafting recipes and sourcing required items.

## Setup

Build:

```sh
cd ./abiotic-assistant
docker build -t abiotic-image .
```

Run:

```sh
docker run -d -p 8080:5000 --name abiotic-app abiotic-image:latest 
```
