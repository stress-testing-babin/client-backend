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
		fs.writeFileSync('./outputs', "END OF TEST\n", { flag: 'a+' }, err => {});
		return;
	}
	const id = newidentity.id;


	try {
		await identity.topup(client, id, 1)
	} catch (err) {
		console.log(err);
		c.closeClient();
		fs.writeFileSync('./outputs', "END OF TEST\n", { flag: 'a+' }, err => {});
		return;
	}

	
	const cname = 'cname';
	var contract_information;
	try {
		contract_information = await contract.create(client, await identity.get(client, id), cname)
	} catch (err) {
		console.log(err);
		c.closeClient();
		fs.writeFileSync('./outputs', "END OF TEST\n", { flag: 'a+' }, err => {});
		return;
	}


	var document_info;
	try {
		document_info = await document.create(client, (cname + '.note'), await identity.get(client, id), { message: 'message' })
	} catch (err) {
		console.log(err);
		c.closeClient();
		fs.writeFileSync('./outputs', "END OF TEST\n", { flag: 'a+' }, err => {});
		return;
	}
	

	c.closeClient();
	fs.writeFileSync('./outputs', "END OF TEST\n", { flag: 'a+' }, err => {});
}


main();


module.exports = { main }
