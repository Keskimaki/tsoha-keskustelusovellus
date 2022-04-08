![GitHub Actions](https://github.com/Keskimaki/tsoha-keskustelusovellus/workflows/Pipeline/badge.svg)

# tsoha-keskustelusovellus
Tietokantasovellus 2022 kevät

## Usage
Replace [the template file](server/env.template) with a .env file. 

Launch the app in development mode by running `docker-compose up` in the root folder.

If you're having issues with the database starting add the POSTGRES_PASSWORD, USER and DB variables manually to the [docker-compose.yml](docker-compose.yml).

By default the client will run on port 3000 and the server on port 5000.


To initialize the PostgreSQL database run `docker exec tsoha_server_1 poetry run python3 src/database/init_db.py` while the app is running.

Database initialization will create users Admin and TestUser with the corresponding privileges. Their passwords will be the same as the DB_PASSWORD defined in the .env file. Testing board with a thread and a post will also be created.

## Ominaisuudet

- Käyttäjä voi luoda tunnuksen sekä kirjautua sisään ja ulos.
- Käyttäjä näkee listan alueista, ketjuista ja viesteistä erillisissä näkymissä.
- Käyttäjä voi luoda ketjuja ja viestejä.
- Käyttäjä voi lisätä viestiin kuvan.
- Käyttäjä voi muokata ja poistaa omia ketjujaan ja viestejään.
- Käyttäjä voi poistaa viestissään olevan kuvan
- Käyttäjä näkee listan omista viesteistään erillisessä näkymässä.
- Käyttäjä voi hakea viestejä niiden sisällön perusteella.
- Ylläpitäjä voi luoda uusia alueita.
- Ylläpitäjä voi muokata ja poistaa alueita.
- Ylläpitäjä voi muokata ja poistaa mitä vain ketjuja ja viestejä.
- Ylläpitäjä voi sulkea ketjun.

Sovellus on toiminnassa osoitteessa https://tsohasovellus.herokuapp.com.
