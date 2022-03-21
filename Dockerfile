FROM python:alpine

EXPOSE 5000

WORKDIR /usr/src/app

COPY poetry.lock pyproject.toml ./

RUN apk add --no-cache gcc libffi-dev musl-dev postgresql-dev && \
    pip install poetry && poetry install

COPY . .

CMD [ "poetry", "run", "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
