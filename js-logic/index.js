const Dash = require('dash');
/******************************************************************************/


/******************************************************************************/
const main = async () => {
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
	

	var output;
	await client.platform.identities.register()
		.then((d) => output = d);
		/*
	var identity;
	await client.platform.identities.get(id)
		.then ((d) => identity = d);
*/

	console.log(output);


	client.disconnect();
}

main();
