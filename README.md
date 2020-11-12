# Watowatch :movie_camera:

Watowatch is a movie list aggregation application, built using React, PostgreSQL, Express and Node. Create your own personal movie list and allow other users to edit them.

## Features

### User Login

> Users will login in with their email and password, the backend uses JsonWebToken for authentication and bcrypt for password encryption

<img src='/screenshots/register.gif' width='600px'/>

## Movie suggestions and searching

> Search on watowatch is easy, the search is debounced to prevent extra API calls

<img src='/screenshots/searchsuggestions.gif' width='600px'/>

## Movie selection Randomizer

> Choosing a movie is tough, let Watowatch do it for you! Add Movies from the lists you have compiled, or from lists where other users have added you as a buddy.
> Watowatch will choose one for you at random from the selected items.

<img src='/screenshots/random.gif' width='600px'/>

## Installation :file_folder:

### Requirements

- PostgreSQL 12.4^
- API KEY from [TMDB](https://developers.themoviedb.org/3)

### Client-side Installation :heavy_check_mark:

    $ git clone https://github.com/hector4213/watowatchfrontend.git
    $ cd watowatchfrontend
    $ npm install

#### Set environment variables

    Create a .env file in your root directory, create a variable REACT_APP_TVDB_APIKEY='Your TMDB variable here"

### Server-side Installation :heavy_check_mark:

    $ git clone https://github.com/hector4213/watowatch.git
    $ cd watowatch
    $ npm install
    $ npm run dev

#### Set environment variables

    Create a .env file in the root directory create and set the following variables

    POSTGRES_KEY=yourdbpw
    SECRET=yourJWTsecret
    PORT=yourdbport
    PG_USER=yourpostgresusername
    PG_PORT=yourdbport
    PG_HOST=yourlocalhost
    DB=yourdb

### Schema and seeds :heavy_check_mark:

In psql create a new db and run the schema and seeds

    $ createdb mydb then
    $ \c mydb
    $ \i schema.sql
    $ \i seeds.sql

### Dependencies :eyeglasses:

- axios
- react
- react-router-dom
- react-slick
- slick-carousel
- slick-carousel
- material-ui/core
- material-ui/icons
- material-ui/lab
- For a complete list check the [package.json](https://github.com/hector4213/watowatch/blob/master/package.json)
