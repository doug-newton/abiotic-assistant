FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
COPY requirements-dev.txt .
RUN pip install -r requirements-dev.txt
COPY abiotic_assistant.conf .
COPY entrypoint.sh /entrypoint.sh
RUN chmod u+x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "src/main.py"]
