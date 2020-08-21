const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

const { expect } = chai;
chai.use(chaiHttp);
const baseUrl = '/api/v1';
let rideFare;
const wallet = {
  balance: 0
}

describe('Base route test', () => {
  it('Should display welcome message on home route', (done) => {
    chai.request(app)
      .get(`${baseUrl}/`)
      .end((err, res) => {
        const { message, status } = res.body;
        expect(message).to.equal('Welcome to Space X API');
        expect(status).to.equal(200);
        done();
    });
  });
  
  it('Should display an error message for an invalid route', (done) => {
    chai.request(app)
      .get(`${baseUrl}/invalid-route`)
      .end((err, res) => {
        const { error, status } = res.body;
        expect(error).to.equal('Resource not found. Double check the url and try again');
        expect(status).to.equal(404);
        done();
    });
  });

describe('Wallet route test', () => {
  it('Should load wallet with 3000BTC', (done) => {
    chai
      .request(app)
      .patch(`${baseUrl}/wallets`)
      .send({ balance: 3000 })
      .end((err, res) => {
        wallet.balance = wallet.balance + 3000;
        const { status, message } = res.body
        expect(status).to.equal(200)
        expect(message).to.be.a('string')
        expect(message).to.equal(`BTC wallet loaded with 3000BTC, balance has been updated to 3000`)
        done();
      });
  })

  it('Should fail if balance is empty', (done) => {
    chai
      .request(app)
      .patch(`${baseUrl}/wallets`)
      .send({ balance : null })
      .end((err, res) => {
        const { status, message } = res.body;
        expect(status).to.equal(400);
        expect(message).to.equal('Error!, BTC wallet should be loaded with 3000 BTC');
        done();
      });
  });

  it('Should fetch wallet balance', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}/wallets`)
      .end((err, res) => {
        const { balance, status } = res.body
        expect(status).to.equal(200)
        expect(balance).to.equal(balance)
        done();
      });
    })
  });

describe('Trips route test', () => {
    it('Should return insufficient if balance is 0', (done) => {
      chai.request(app)
      .post(`${baseUrl}/trips`)
      .end((err, res) => {
        if (wallet.balance <= 0) {
          const { status, message } = res.body
          expect(status, message).to.equal(200)
          expect(message).to.equal(`Insufficient funds!, your balance is ${wallet.balance}`)
        }
        done();
      })
    });

    it('Taking the Falcon	9 from Abuja	to Mars - POST', (done) => {
      chai
      .request(app)
      .post(`${baseUrl}/trips`)
      .set({ balance: wallet.balance })
      .send({ startLocation: 'abuja', destination: 'mars', spaceCraft: 'falcon9' })
      .end((err, res) => {
        const { status, message } = res.body
        rideFare = 700;
        wallet.balance = wallet.balance - rideFare;
        expect(status).to.equal(200)
        expect(message).to.equal(`${rideFare}BTC has been deducted from your wallet, your current balance is ${wallet.balance}`)
        done();
      });
    })
    it('Taking the Falcon	1 from the Moon	to Spock	station on Mars - POST', (done) => {
      chai
      .request(app)
      .post(`${baseUrl}/trips`)
      .set({ balance: wallet.balance })
      .send({ startLocation: 'moon', destination: 'mars', spaceCraft: 'falcon1' })
      .end((err, res) => {
        const { status, message } = res.body
        rideFare = 300;
        wallet.balance = wallet.balance - rideFare;
        expect(status).to.equal(200)
        expect(message).to.equal(`${rideFare}BTC has been deducted from your wallet, your current balance is ${wallet.balance}`)
        done();
      });
    })
    it('Taking the Falcon	9 from Abuja	station to the Moon - POST', (done) => {
      chai
      .request(app)
      .post(`${baseUrl}/trips`)
      .set({ balance: wallet.balance })
      .send({ startLocation: 'abuja', destination: 'moon', spaceCraft: 'falcon9' })
      .end((err, res) => {
        const { status, message } = res.body
        rideFare = 500;
        wallet.balance = wallet.balance - rideFare;
        expect(status).to.equal(200)
        expect(message).to.equal(`${rideFare}BTC has been deducted from your wallet, your current balance is ${wallet.balance}`)
        done();
      });
    })
    it('Taking the Falcon	9 from Abuja	station to the Moon - POST', (done) => {
      chai
      .request(app)
      .post(`${baseUrl}/trips`)
      .set({ balance: wallet.balance })
      .send({ startLocation: 'Nirobi', destination: 'Yola', spaceCraft: 'super falcon' })
      .end((err, res) => {
        const { status, message } = res.body
        expect(status).to.equal(400)
        expect(message).to.equal(`Trip not available, your current balance is still ${wallet.balance}`)
        done();
      });
    })
  });
});
