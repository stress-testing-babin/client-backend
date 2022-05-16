const fs = require('fs');


async function create (client, contract_information, id, type, data) {
	var output;
	var start = process.hrtime();
		output = await client.platform.documents.create(contract_information, id, type, data);
	var time = process.hrtime(start);
	fs.writeFileSync('./outputs', "Time -- Create Document: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	return output;
}


module.exports = { create };