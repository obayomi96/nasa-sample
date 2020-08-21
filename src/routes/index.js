const express = require('express');

const router = express();

const wallet = {
  balance: 0
}

let rideFare;

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to Space X API',
  })
);

router.get('/wallets', (req, res) => {
  res.status(200).send({
    status: res.statusCode,
    data: {
      balance: wallet.balance
    }
  })
})

router.patch('/wallets', (req, res) => {
  const { balance } = req.body;
  if (balance !== 3000) {
    return res.status(400).send({
      status: res.statusCode,
      message: `Error!, BTC wallet should be loaded with 3000 BTC`,
      data: {
        balance: wallet.balance
      }
    })
  }
  wallet.balance = balance;
  res.status(200).send({
    status: res.statusCode,
    message: `BTC wallet loaded with ${balance}BTC, balance has been updated to ${balance}`,
    data: {
      balance: wallet.balance
    }
  })
})

router.post('/trips', (req, res) => {
  const { startLocation, destination, spaceCraft } = req.body;
  if (wallet.balance <= 0) {
    return res.status(200).send({
      status: res.statusCode,
      message: `Insufficient funds!, your balance is ${wallet.balance}`,
      data: {
        balance: wallet.balance
      }
    })
  }
  if (startLocation === 'abuja' && destination === 'mars' && spaceCraft === 'falcon9') {
    rideFare = 700;
    wallet.balance = wallet.balance - rideFare;
    return res.status(200).send({
      status: res.statusCode,
      message: `${rideFare}BTC has been deducted from your wallet, your current balance is ${wallet.balance}`,
      data: {
        balance: wallet.balance
      }
    })
  } else if (startLocation === 'moon' && destination === 'mars' && spaceCraft === 'falcon1') {
    rideFare = 300;
    wallet.balance = wallet.balance - rideFare;
    return res.status(200).send({
      status: res.statusCode,
      message: `${rideFare}BTC has been deducted from your wallet, your current balance is ${wallet.balance}`,
      data: {
        balance: wallet.balance
      }
    })
  } else if (startLocation === 'abuja' && destination === 'moon' && spaceCraft === 'falcon9') {
    rideFare = 500;
    wallet.balance = wallet.balance - rideFare;
    return res.status(200).send({
      status: res.statusCode,
      message: `${rideFare}BTC has been deducted from your wallet, your current balance is ${wallet.balance}`,
      data: {
        balance: wallet.balance
      }
    })
  } else {
    return res.status(400).send({
      status: res.statusCode,
      message: `Trip not available, your current balance is still ${wallet.balance}`,
      data: {
        balance: wallet.balance
      }
    })
  }
})

module.exports = router;
