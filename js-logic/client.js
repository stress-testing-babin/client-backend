const Dash = require('dash');


const client = new Dash.Client(
  {
    network: 'testnet',
    wallet: {
      mnemonic: 'loud autumn travel bird stairs fiscal position wild fashion mother above protect',
      unsafeOptions: {
        // TODO: Coudl this be a greater height to reduce received transactions?
        skipSynchronizationBeforeHeight: 500000, // only sync from mid-2021
      },
    },
});


function getClient () {
  return client;
}
function closeClient () {
  client.disconnect();
}


module.exports = { getClient, closeClient }
