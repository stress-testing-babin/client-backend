// get instance of dpp
const DashPlatformProtocol = require('@dashevo/dpp');
const dpp = new DashPlatformProtocol();
// get dashes interpretation of InstantLock
const InstaLock = require('@dashevo/dashcore-lib/lib/instantlock/instantlock');


/******************************************************************************/
// type:
//      0 -> ECDSA Secp256k1
//      1 -> BLS 12-381
//      2 -> ECDSA Secp256k1 Hash160
function getPubKeyEntry (public_key, k_type) {
    const pubkey = {
        id: 0,
        type: k_type,
        purpose: 0,
        securityLevel: 0,
        data: public_key,
        readOnly: false
    }
    return pubkey;
}
/******************************************************************************/


/******************************************************************************/
async function callDPP (instantLockObject, transaction, publicKey) {
  await dpp.initialize();
  // TODO find out how the instalock OBJECT needs to look like
  const insLock = InstaLock.fromObject(instantLockObject);
  const asset = dpp.identity.createInstantAssetLockProof(insLock, transaction, 0)
  const identity = dpp.identity.create(asset, [ getPubKeyEntry(publicKey) ]);
  console.log(identity);
}
/******************************************************************************/


module.exports.createIdentity = callDPP;
