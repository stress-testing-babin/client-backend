const Dash = require('dash');
const fs = require('fs');

const identity = require('./identity');
/******************************************************************************/


/******************************************************************************/
const main = async () => {
	var start;
	var time;
	var output;

	
	start = process.hrtime();
	const client = new Dash.Client(
		{
			network: 'testnet',
			wallet: {
				mnemonic: 'loud autumn travel bird stairs fiscal position wild fashion mother above protect',
				unsafeOptions: {
					// TODO: Coudl this be a greater height to reduce received transactions?
					skipSynchronizationBeforeHeight: 500000, // only sync from mid-2021
				},
			},
	});
	//await client.platform.initialize();
	time = process.hrtime(start);
	fs.writeFile('./outputs', "Time -- Client: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});


	start = process.hrtime();
		await client.platform.identities.register()
			.then((d) => output = d);
	time = process.hrtime(start);
	fs.writeFile('./outputs', "Time -- Register: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	console.log(output.balance);

	start = process.hrtime();
		await client.platform.identities.register()
			//.then((d) => output = d);
	time = process.hrtime(start);
	fs.writeFile('./outputs', "Time -- Register: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	//console.log(output.balance);


	start = process.hrtime();
		await client.platform.identities.topUp(output.id, 0.0001);
	time = process.hrtime(start);
	fs.writeFile('./outputs', "Time -- Topup: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});


	var newb;
	start = process.hrtime();
		await client.platform.identities.get(output.id)
			.then((d) => newb = d.balance);
	time = process.hrtime(start);
	fs.writeFile('./outputs', "Time -- Get: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	console.log(newb);
	

	fs.writeFile('./outputs', "END OF TEST\n", { flag: 'a+' }, err => {});
	client.disconnect();
}


main();


module.exports = { main }