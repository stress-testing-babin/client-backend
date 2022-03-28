// index.js

const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const { spawn } = require('child_process');


/*
 * Sets the app up to use json standard
 */
app.use(express.json());



/*
 * starts a stress test that repeatedly sends dash from Wallet A to Wallet B.
 */
app.post("/start", (req, res) => {
	console.log("responding to call on start");
	const data = req.body;
	
	const seed = data.seed;
	const http = data.http;
	/*
	const grpc;
	const newA;
	const newB;
	const recurse;
	const WalletA;
	const WalletB;
	*/

	res.json({message: "Hello World!"});
});

/*
 * Stops the test that correspends to the id in the request.
 * If that test had already ending it simply responds with results of it
 */
app.post("/stop", (req, res) => {
	//const id;

	const program = spawn(`./src/cpp/program`);

	program.stdout.on('data', (data) => {
		res.json({message: `${data}`});
		console.log(`output: ${data}`);
	});

	program.stderr.on('data', (data) => {
		console.log(`error: ${data}`);
	});

	program.on('close', (code) => {
		console.log(`exit with code ${code}`);
	});
});







/*
 * Starts listening on the configured port
 */
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});



/*
 * GET call which returns overview data of all previous stress tests
 */
app.get("*", (req, res) => {
	console.log("responding to call on *");
	//TODO
});
