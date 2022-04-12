const DAPIClient = require('@dashevo/dapi-client');
const DashPlatformProtocol = require('@dashevo/dpp');

const client = new DAPIClient();
const dpp = new DashPlatformProtocol();


// Data Contract Create State Transition (JSON)
const stateTransitionObject = {
  protocolVersion: 1,
  type: 0,
  signature: 'HxAipUsLWQBE++C1suSRNQiQh91rI1LZbblvQhk2erUaIvRneAagxGYYsXXYNvEeO+lBzlF1a9KHGGTHgnO/8Ts=',
  signaturePublicKeyId: 0,
  dataContract: {
    protocolVersion: 1,
    '$id': 'CMc7RghKkHeHtFdwfSX5Hzy7CUdpCEJnwsbfHdsbmJ32',
    '$schema': 'https://schema.dash.org/dpp-0-4-0/meta/data-contract',
    ownerId: '8Z3ps3tNoGoPEDYerUNCd4yi7zDwgBh2ejgSMExxvkfD',
    version: 1,
    documents: {
      note: {
        type: 'object',
        properties: { 
            message: { type: 'string' }
        },
        additionalProperties: false,
      }
    }
  },
  entropy: '+RqUArypdL8f/gCMAo4b6c3CoQvxHzsQG0BdYrT5QT0=',
};

async function state () {

    await dpp.initialize();

    // Convert signature and entropy to buffer
    stateTransitionObject.signature = Buffer.from(stateTransitionObject.signature, 'base64');
    stateTransitionObject.entropy = Buffer.from(stateTransitionObject.entropy, 'base64');


    dpp.stateTransition.createFromObject(stateTransitionObject, { skipValidation: true })
    .then((stateTransition) => {
        client.platform.broadcastStateTransition(stateTransition.toBuffer())
        .then(() => console.log('State Transition broadcast successfully'));
    });
}

state();
