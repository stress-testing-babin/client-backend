const fs = require('fs');


async function register (client) {
	var output;
	var start = process.hrtime();
		output = await client.platform.identities.register()
	var time = process.hrtime(start);
	fs.writeFileSync('./outputs', "Time -- Register: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	console.log("Registered new Identity");
	return output;
}
async function get (client, id) {
	var output;
	var start = process.hrtime();
		output = await client.platform.identities.get(id)
	var time = process.hrtime(start);
	fs.writeFileSync('./outputs', "Time -- Get: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	return output;
}
async function topup (client, id, amount) {
	var start = process.hrtime();
		await client.platform.identities.topUp(id, amount);
	var time = process.hrtime(start);
	fs.writeFileSync('./outputs', "Time -- Topup: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	console.log("Topupped " + amount + " Dash");
}


module.exports = { register, get, topup };