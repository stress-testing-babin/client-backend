const fs = require('fs');


async function create (client, name, id, properties) {
	var output;
	var start = process.hrtime();
		doc = await client.platform.documents.create(name, id, properties);
		output = await client.platform.documents.broadcast({
			create: [doc],
			replace: [],
			delete: []
		}, id);
	var time = process.hrtime(start);
	fs.writeFileSync('./outputs', "Time -- Create Document: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	return output;
}


module.exports = { create };