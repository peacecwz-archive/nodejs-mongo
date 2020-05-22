# nodejs-mongo
NodeJS project that using MongoDB

## Getting Started

1. First of all, clone the project

```bash
git clone https://github.com/peacecwz/nodejs-mongo
```

2. Configure database configuration. You need to run MongoDB and add connection string into src/configs/config-keys.ts file

```ts
  const DEV: IConfigSet = {
    DEBUG_LOGGING_ENABLED: false,
    MONGODB_CONNECTION_STRING: "connection-string"
  };
```

If the app is running on heroku, aws or kubernetes, you should set mongodb connection string as MONGODB_CONNECTION_STRING key on environment

3. Run the application

Running on local debugging

```bash
yarn start:dev
```

Running on server

```bash
yarn build; yarn start
```

## Development

You can send request on swagger

```json
{ 
	"startDate": "2017-02-04T05:57:48.877Z", 
	"endDate": "2017-02-04T16:57:48.877Z",
	"minCount": 0,
	"maxCount": 1000
}
```


### Example Request

```bash
curl --location --request POST 'http://nodejs-mongo-demo.herokuapp.com/v1/collections/filter' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{ 
	"startDate": "2017-02-04T05:57:48.877Z", 
	"endDate": "2017-02-04T16:57:48.877Z",
	"minCount": 0,
	"maxCount": 1000
}'
```
