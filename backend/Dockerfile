FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
COPY requirements-dev.txt .
RUN pip install -r requirements-dev.txt
CMD ["python", "main.py"]
