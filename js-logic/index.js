const Dash = require('dash');
const fs = require('fs');

const identity = require('./identity');
const c = require('./client');
const contract = require('./contract');
const document = require('./document');
/******************************************************************************/


/******************************************************************************/
const main = async () => {
	// not time sensitive, as it is preparational and takes milliseconds
	const client = c.getClient();


	var newidentity;
	try {
		newidentity = await identity.register(client)
	} catch (err) {
		console.log(err);
		c.closeClient();
		return;
	}
	const id = newidentity.id;


	try {
		await identity.topup(client, id, 1)
	} catch (err) {
		console.log(err);
		c.closeClient();
		return;
	}

	
	var contract_information;
	try {
		contract_information = await contract.create(client, await identity.get(client, id))
	} catch (err) {
		console.log(err);
		c.closeClient();
		return;
	}


	//contract_information, id, type, data = {}
	var document_info;
	try {
		document_info = await document.create(client, contract_information, id, 'string', { message: "text" })
	} catch (err) {
		console.log(err);
		c.closeClient();
		return;
	}
	console.log(document_info);
	

	fs.writeFileSync('./outputs', "END OF TEST\n", { flag: 'a+' }, err => {});
	c.closeClient();
}


main();


module.exports = { main }
