FROM node

EXPOSE 5000

WORKDIR /usr/src/app

COPY client/package* client/

RUN cd client && npm ci --only=production

COPY client client

RUN cd client && npm run build

RUN apt-get update && apt-get install -y python3-pip

RUN pip install Flask Flask-Cors Flask-Bcrypt Flask-JWT-Extended psycopg2-binary python-dotenv

COPY server server

CMD cd server && FLASK_ENV=production python3 -m flask run --host=0.0.0.0 --port=$PORT
