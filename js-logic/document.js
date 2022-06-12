const fs = require('fs');


async function create (client, name, id, properties) {
	let output;
	let start = process.hrtime();
	let stamp = new Date();
	let str = "{\"time\":\"" + stamp.getHours() + ":" + stamp.getMinutes() + ":" + stamp.getSeconds() + "\", ";
		doc = await client.platform.documents.create(name, id, properties);
		output = await client.platform.documents.broadcast({
			create: [doc],
			replace: [],
			delete: []
		}, id);
	var time = process.hrtime(start);
	fs.writeFileSync('./outputs', str + "\"duration\":\"" + (time[0] + time[1]/1000000000) + "\"},\n", { flag: 'a+' }, err => {});
	return doc;
}


module.exports = { create };