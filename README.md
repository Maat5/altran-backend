# Altran RESTful API Test
___

### What do you need to execute this app?

* [node.js] - evented I/O for the backend

```sh
 curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
 sudo apt-get install -y nodejs

 sudo apt-get install -y build-essential
```

* [mongo] - Mongo is document dabatase

```sh
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse"
| sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

sudo apt-get update

sudo apt-get install -y mongodb-org
```

### Installation

first clone this repository
```sh
$ git clone https://github.com/Maat5/altran-backend.git
```
``` sh
 cd altran-backend
```

### How to run this project

Install all required modules with:

```sh
$ npm i
```

### Create Your env file
```
nano config/config.js
```
and use the next fields:

```
module.exports = {
  apiUrl: 'http://localhost:8080/', // custom url
  port: 8080, // API port
  sessionToken: 'keyboardCat_12345', // session token
  sessionAgeMs: 3600000, //session age in milliseconds
  db: {
    password: '', // mongo db password
    username: '', // mongo db username
    host: 'localhost', // mongo db host
    database: 'altran', // API database name
    port: 27017 // mongo db port
  }
}
```

### Start dev API server:
```sh
$  npm start
```

[node.js]: <http://nodejs.org>
[Npm]: <https://www.npmjs.com/>
[mongo]: <https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/>
