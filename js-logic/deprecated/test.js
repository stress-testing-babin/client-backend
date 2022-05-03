const DAPIClient = require('@dashevo/dapi-client');
const DashPlatformProtocol = require('@dashevo/dpp');

const client = new DAPIClient();
const dpp = new DashPlatformProtocol();

const arg = require('./identity');

/******************************************************************************/
// at least one public key needs to be assigned to each identity
/******************************************************************************/
const examplepubkey = "AkWRfl3DJiyyy6YPUDQnNx5KERRnR8CoTiFUvfdaYSDS";
/******************************************************************************/
// instandsend transaction containing the identity creation fee
const exampletx = "0300000001c31d075e91b15924e40511ed459d18e80de98bfe83c5feff48304feaa618ede6010000006b483045022100dd0e4a6c25b1c7ed9aec2c93133f6de27b4c695a062f21f0aed1a2999fccf01c0220384aaf84cd5fd1c741fd1739f5c026a492abbfc18cfde296c6d90e98304f2f76012102fb9e87840f7e0a9b01f955d8eb4d1d2a52b32c9c43c751d7a348482c514ad222ffffffff021027000000000000166a14ea15af58c614b050a3b2e6bcc131fe0e7de37b9801710815000000001976a9140ccc680f945e964f7665f57c0108cba5ca77ed1388ac00000000";
/******************************************************************************/
const exampleinstalockproof = "AQHDHQdekbFZJOQFEe1FnRjoDemL/oPF/v9IME/qphjt5gEAAAB/OlZB9p8vPzPE55MlegR7nwhXRpZC4d5sYnOIypNgzfdDRsW01v8UtlRoORokjoDJ9hA/XFMK65iYTrQ8AAAAGI4q8GxtK9LHOT1JipnIfwiiv8zW+C/sbokbMhi/BsEl51dpoeBQEUAYWT7KRiJ4Atx49zIrqsKvmU1mJQza0Y1YbBSS/b/IPO8StX04bItPpDuTp6zlh/G7YOGzlEoe";
/******************************************************************************/

arg.createIdentity(exampleinstalockproof, exampletx, examplepubkey);
return



////////////////////////////////////////////////////////////////////////////////
const dataContractCreate = {
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
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
const identityCreate = {
  protocolVersion:1,
  type:2,
  signature:"IBTTgge+/VDa/9+n2q3pb4tAqZYI48AX8X3H/uedRLH5dN8Ekh/sxRRQQS9LaOPwZSCVED6XIYD+vravF2dhYOE=",
  assetLockProof:{
    type:0,
    instantLock:"AQHDHQdekbFZJOQFEe1FnRjoDemL/oPF/v9IME/qphjt5gEAAAB/OlZB9p8vPzPE55MlegR7nwhXRpZC4d5sYnOIypNgzfdDRsW01v8UtlRoORokjoDJ9hA/XFMK65iYTrQ8AAAAGI4q8GxtK9LHOT1JipnIfwiiv8zW+C/sbokbMhi/BsEl51dpoeBQEUAYWT7KRiJ4Atx49zIrqsKvmU1mJQza0Y1YbBSS/b/IPO8StX04bItPpDuTp6zlh/G7YOGzlEoe",
    transaction:"0300000001c31d075e91b15924e40511ed459d18e80de98bfe83c5feff48304feaa618ede6010000006b483045022100dd0e4a6c25b1c7ed9aec2c93133f6de27b4c695a062f21f0aed1a2999fccf01c0220384aaf84cd5fd1c741fd1739f5c026a492abbfc18cfde296c6d90e98304f2f76012102fb9e87840f7e0a9b01f955d8eb4d1d2a52b32c9c43c751d7a348482c514ad222ffffffff021027000000000000166a14ea15af58c614b050a3b2e6bcc131fe0e7de37b9801710815000000001976a9140ccc680f945e964f7665f57c0108cba5ca77ed1388ac00000000",
    outputIndex:0
  },
  publicKeys:[
    {
      id:0,
      type:0,
      purpose:0,
      securityLevel:0,
      data:"AkWRfl3DJiyyy6YPUDQnNx5KERRnR8CoTiFUvfdaYSDS",
      readOnly:false
    }
  ]
}
////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////
async function state () {
  await dpp.initialize();

  //stateTransitionObject = dataContractCreate;
  stateTransitionObject = identityCreate;

  // Convert signature and entropy to buffer
  //stateTransitionObject.signature = Buffer.from(stateTransitionObject.signature, 'base64');
  //stateTransitionObject.entropy = Buffer.from(stateTransitionObject.entropy, 'base64');

  dpp.stateTransition.createFromObject(stateTransitionObject, { skipValidation: true })
  .then((stateTransition) => {
      client.platform.broadcastStateTransition(stateTransition.toBuffer())
      .then(() => console.log('State Transition broadcast successfully'));
  });
}
////////////////////////////////////////////////////////////////////////////////
state();
