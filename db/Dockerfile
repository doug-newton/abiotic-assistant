FROM mongo:8.0.15
COPY ./docker-entrypoint-initdb.d docker-entrypoint-initdb.d
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod u+x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["mongod"]
