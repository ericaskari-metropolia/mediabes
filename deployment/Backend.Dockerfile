FROM node:lts-gallium

ARG PORT=8000
ENV PORT=$PORT

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src .
COPY deployment/Backend.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh"]
CMD [ "node", "/app/main.js" ]

EXPOSE 8000
