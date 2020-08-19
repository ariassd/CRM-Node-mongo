# CRM + NODE + Angular 1 + MongoDB
Example of companies management, using Node JS and mongo DB, this is an single page application that uses Angular 1 for rendering.

It doesn't have authentication or security at all because the aim of the project is just learning use of Node and mongo

Classes:
- Company: Basic information of the company

Database:
- mongodb

Why angular 1?

I found and downloaded an HTML template, angular 1 was the easiest way to interact with this template


## Technologies

- Javascript
- Node ↣ version 14.7.0
- Express ↣  version 4.17.1
- Mongoose ↣ version 5.7.7

## Setup

Create a `config/default.json` file in the root of the project and add the following lines

```json
{
  "App": {
    "webserver": {
      "port": 5000
    }
  },
  "MongoDB": {
    "connectionString": "mongodb+srv://<<db_user">>:<<db_password>>@<<host>>/crm"
  }
}
```
Install the dependencies

```bash
$ npm install
```

Run the project

```bash
# development
$ npm run start

```

## Features

- CRUD API Rest to manage companies

## Status

Project is: _in progress_ because I'm still developing

## TODO
- Registration page as user.
- Login page.
- Main menu.
- Make a UI using a newer version of angular or react.

## Stay in touch

- Author - Luis Arias 2019 <ariassd@gmail.com> - [GitHub profile](https://github.com/ariassd)

## License

This is [MIT licensed](LICENSE)
