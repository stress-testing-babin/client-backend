const fs = require('fs');
const Identifier = require('@dashevo/dpp/lib/Identifier');


async function create (client, identity, cname) {
	var output;
	var start = process.hrtime();
		const contract = await client.platform.contracts.create({
				note: {
					type: 'object',
					properties: {
						message: {
							type: 'string'
						}
					},
					additionalProperties: false
				}
			}, identity);
		await client.platform.dpp.initialize();
		const result = await client.platform.dpp.dataContract.validate(contract);
		if (result.isValid()) {
			output = await client.platform.contracts.publish(contract, identity);
		} else {
			console.error(result);
			throw result.errors[0];
		}
		/*await*/ client.getApps().set(cname, {
			contractId: Identifier.from(contract.id),
			contract: contract
		});
	var time = process.hrtime(start);
	fs.writeFileSync('./outputs', "Time -- Create Contract: " + (time[0] + time[1]/1000000000) + "\n", { flag: 'a+' }, err => {});
	console.log("Registered data contract");
	return output;
}


module.exports = { create };