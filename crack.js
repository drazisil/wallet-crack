const spawn = require('child_process').spawn;

// Path to the citcoin-cli executable
const BITCOIN_CLI_PATH = 'C:\\Program Files\\Bitcoin\\daemon\\bitcoin-cli.exe'

// How many seconds between tries
const DELAY = 1

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
	var charBasedString, modulo;
		
	charBasedString = "";

	while (num > 0) {
		modulo = num % characters.length // Basic calculating
		charBasedString = characters[modulo] + charBasedString; // Just push it before the old characters
		num = ((num - modulo) / characters.length); // New value of num, annoying calculation
	} 

	console.log(`Testing num: ${num}, value: ${charBasedString}, fullList: ${characters}`)
	return charBasedString;
};


function loop(characters, i, callback) {
	result = callback( intToCharacterBasedString(characters, i ) );
		
	if( result ){ // If callbacks returns true: we did our job!
		return
	} else {
		i++;
		setTimeout(function() {
			loop(characters, i, callback)
		}, (DELAY * 1000));
	}
}


// https://www.npmjs.com/package/node-bruteforce
function bruteForce(characters, callback) {
	
	var intToCharacterBasedString, result;
	
	if(typeof characters == 'string') {
		characters = characters.split("");
	}
	
	characters = [""].concat(characters); // Useless empty value to start this array on index = 1
	
	let counter = 1;
	
	loop(characters, counter, callback);	
}


var hash = 'HELLO';
 
const CHARACTERS_TO_TEST = '!#$%&*0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ^_abcdefghijklmnopqrstuvwxyz'
 
 bruteForce(CHARACTERS_TO_TEST, function(value){
    
    
	testPassphrase(value)
//	if( hash == value ) {
//        console.log("Correct value of the hash was: " + value);
 //       return true;
//    }
    
    return false;
});



