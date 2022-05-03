// get dashcore library
const DashCore = require('@dashevo/dashcore-lib');

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
async function callDPP (dpp, instantLockObject, transaction, publicKey) {
  await dpp.initialize();
  // TODO find out how the instalock OBJECT needs to look like
  const insLock = DashCore.InstantLock.fromObject(instantLockObject);
  const asset = dpp.identity.createInstantAssetLockProof(insLock, transaction, 0)
  const identity = dpp.identity.create(asset, [ getPubKeyEntry(publicKey) ]);
  return identity;
}
/******************************************************************************/


module.exports.createIdentity = callDPP;
