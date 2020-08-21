# space-test

## Getting started

### Installation

- run `yarn`
- run `yarn start`
- You may create a `.env` file and add environment variable as specified in `.env.sample` file.
- App should load on `/api/v1` with appropriate success message.

### Test

- run `yarn test`

### API

- The following APIs could be tested with Postman or a similar tool.

- GET `/wallets` - Get wallet balance
- PATCH `/wallets` - Load wallet (with 3000 BTC)

- POST `/trips` - take trips trying the following locations below

```
{ 
  "startLocation": "abuja", 
  "destination": "moon", 
  "spaceCraft": "falcon9" 
}
```
```
{ 
  "startLocation": "abuja", 
  "destination": "mars", 
  "spaceCraft": "falcon9" 
}
```
```
{ 
  "startLocation": "moon", 
  "destination": "mars", 
  "spaceCraft": "falcon1" 
}
```