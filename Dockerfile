FROM ubuntu:latest

SHELL ["/bin/bash", "-c"]

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt install -y python3
RUN apt install -y python3-pip
RUN apt install -y vim
RUN apt install -y python3.12-venv
RUN python3 -m venv env
RUN source ./env/bin/activate && \
	pip install flask
RUN rm -rf /var/lib/apt/lists/*

COPY ./src .

CMD ["./env/bin/python", "-m", "flask", "--app", "main.py", "run", "--host=0.0.0.0"]
