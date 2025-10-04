FROM node:20-slim AS build
WORKDIR /app
COPY ./frontend .
RUN npm install
RUN npm run build

FROM python:3.12-slim
WORKDIR /app
COPY ./backend .
RUN pip install -r requirements.txt
COPY --from=build /app/dist/ /app/static
RUN mv /app/static/index.html /app/templates
CMD ["python", "main.py"]
