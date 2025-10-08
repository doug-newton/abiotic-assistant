FROM node:20-slim AS build
WORKDIR /app
COPY ./frontend/package*.json .
RUN npm install
COPY ./frontend .
RUN npm run build

FROM python:3.12-slim
WORKDIR /app
COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt
COPY ./backend/src/ /app/src
COPY --from=build /app/dist/ /app/src/static
RUN mv /app/src/static/index.html /app/src/templates
COPY abiotic_assistant.conf .
COPY entrypoint.sh /entrypoint.sh
RUN chmod u+x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "src/main.py"]
