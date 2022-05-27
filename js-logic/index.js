const Dash = require('dash');
const fs = require('fs');

const identity = require('./identity');
const c = require('./client');
const contract = require('./contract');
const document = require('./document');
/******************************************************************************/


/******************************************************************************/
const cleanup = () => {
	c.closeClient();
	fs.writeFileSync('./outputs', "END OF TEST\n", { flag: 'a+' }, err => {});
}
/******************************************************************************/


/******************************************************************************/
const main = async () => {
	// not time sensitive, as it is preparational and takes milliseconds
	const client = c.getClient();
	//TODO search any data for dapiAddress:DAPIAddress {...}


	//var data = JSON.stringify({ 'id': id }, null, 2);
	//fs.writeFileSync('id.json', data);

	const FORCE_NEWID = false;	
	const cname = 'cname';


	try {
		//get from data cache
		let oldData = JSON.parse(fs.readFileSync('data.json'));
		let Identity;
		if (oldData.id == "" || FORCE_NEWID) {
			Identity = await identity.register(client)
			oldData.id = Identity.id;
		} else {
			Identity = await identity.get(client, oldData.id);
		}
		if (Identity.balance < 10000) await identity.topup(client, oldData.id, 1);
		let contract_information = await contract.create(client, Identity, cname)
		let document_info = await document.create(client, (cname + '.note'), Identity, { message: 'message' })
		//write "new" data to cache
		fs.writeFileSync('data.json', JSON.stringify(oldData));
		console.log("Saved data to data.json");
	} catch (err) {
		console.log(err);
	} finally {
		cleanup();
	}
}


main();


module.exports = { main }
