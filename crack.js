const spawn = require('child_process').spawn;
var cpu = require('windows-cpu')

// Path to the citcoin-cli executable
const BITCOIN_CLI_PATH = 'C:\\Program Files\\Bitcoin\\daemon\\bitcoin-cli.exe'

// How many seconds between tries
const DELAY = 0.25

function testPassphrase(phraseToTest) {
	
	const ls = spawn(BITCOIN_CLI_PATH, ['walletpassphrase', phraseToTest, '20']);

	ls.stdout.on('data', (data) => {
		// console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
		// console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
		// console.log(`child process exited with code ${code}`);
		if (code === 0) {
			console.log(`Passphrase is ${phraseToTest}`)
			process.exit()
		}
	});
}

function intToCharacterBasedString(characters, num) { // Anoying algorithm..
	let charBasedString = "";
	let modulo = 1

	while (num > 0) {
		modulo = num % characters.length // Basic calculating
		charBasedString = characters[modulo] + charBasedString; // Just push it before the old characters
		num = ((num - modulo) / characters.length); // New value of num, annoying calculation
	}

	return charBasedString;
};



function loop(startingIndex, characters, i, callback) {
	
	// This failsafe will end if the current index can be divided by 1000
	if (i > 100 && i % 400 === 0 && i !== startingIndex) {
		console.log(`Current index: ${i}, please try again`)
		process.exit()
	}
	
	result = callback( intToCharacterBasedString(characters, i ), i );
		
	if( result ){ // If callbacks returns true: we did our job!
		return
	} else {
		i++;
		setTimeout(function() {
			loop(startingIndex, characters, i, callback)
		}, (DELAY * 1000));
	}
}


// https://www.npmjs.com/package/node-bruteforce
function bruteForce(counter, characters, callback) {
	
	var intToCharacterBasedString, result;
	
	if(typeof characters == 'string') {
		characters = characters.split("");
	}
	
	characters = [""].concat(characters); // Useless empty value to start this array on index = 1
	
	loop(counter, characters, counter, callback);	
}

// ===================================================

var hash = 'HELLO';
 
const CHARACTERS_TO_TEST = '!#$%&*0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ^_abcdefghijklmnopqrstuvwxyz'

const STARTING_INDEX = process.argv[2] || 1

console.log(`Starting index: ${STARTING_INDEX}`)

bruteForce(STARTING_INDEX, CHARACTERS_TO_TEST, function(value, index){    
 
	console.log(`Testing value: ${value}`)
	
	// Get load for current running node process
	cpu.totalLoad(function(error, results) {
		if(error) {
			return console.log(error);
		}
		
	console.log(`Total Process Load: ${results[0]}`);
	
	// This failsafe will kick in if cpu usage goes over the limit
	if (results[0] > 60) {
		console.log(`Cpu usage percent exceeded: ${results[0]}, Current index: ${index}, please try again`)
		process.exit()
	}
		testPassphrase(value)
    
		return false;
	});
 })



