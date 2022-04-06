FROM node

EXPOSE 5000

WORKDIR /usr/src/app

COPY client/package* client/

RUN cd client && npm ci --only=production

COPY client client

RUN cd client && npm run build


COPY server/poetry.lock server/pyproject.toml server/

RUN apt-get update && apt-get install -y python3-pip && pip install poetry

RUN cd server && poetry install

COPY server server

CMD cd server && FLASK_ENV=production poetry run python3 -m flask run --host=0.0.0.0
