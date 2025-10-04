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
COPY ./backend .
COPY --from=build /app/dist/ /app/static
RUN mv /app/static/index.html /app/templates
CMD ["python", "main.py"]
