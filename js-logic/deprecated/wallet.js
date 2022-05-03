const Dash = require('dash');

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: 'loud autumn travel bird stairs fiscal position wild fashion mother above protect',
    unsafeOptions: {
      // TODO: Coudl this be a greater height to reduce received transactions?
      skipSynchronizationBeforeHeight: 500000, // only sync from mid-2021
    },
  },
};
var client = new Dash.Client(clientOpts);

client.on('error', (error, context) => {
  console.error(`Client error: ${error.name}`);
  console.error(context);
  closeClient();
});

async function getWallet () {
  //if (client == null) client = new Dash.Client(clientOpts);
  const wallet = await client.getWalletAccount();
  return wallet;
};

function getClient () {
  return client;
}

function closeClient () {
  client.disconnect();
}

module.exports = { getWallet, getClient, closeClient }
