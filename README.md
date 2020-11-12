# Watowatch :movie_camera:

Watowatch is a movie list aggregation application, built using React, PostgreSQL, Express and Node. Create your own personal movie list and allow other users to edit them.

## Screenshots

<img src='screenshots/register.png' width='300'>
<img src='screenshots/details.png' width='300'>
<img src='screenshots/explore.png' width='300'>

## Installation :file_folder:

### Requirements

- PostgreSQL 12.4^
- API KEY from [TMDB](https://developers.themoviedb.org/3)

### Client-side Installation :heavy_check_mark:

    $ git clone https://github.com/hector4213/watowatchfrontend.git
    $ cd watowatchfrontend
    $ npm install
    
    Create a .env file in your root directory, create a variable REACT_APP_TVDB_APIKEY='Your TMDB variable here" 

### Server-side Installation :heavy_check_mark:

    $ git clone https://github.com/hector4213/watowatch.git
    $ cd watowatch
    $ npm install
    $ npm run dev
    
    Create a .env file in the root directory create and set
    ```javascript
    POSTGRES_KEY=yourdbpw
    SECRET=yourJWTsecret
    PORT=yourdbport
    PG_USER=hector
    PG_PORT=yourdbport
    PG_HOST=localhost
    DB=yourdb
    ```

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
