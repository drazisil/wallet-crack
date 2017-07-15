const spawn = require('child_process').spawn;

const BITCOIN_CLI_PATH = 'C:\\Program Files\\Bitcoin\\daemon\\bitcoin-cli.exe'

const DELAY = 500

//const maxCount = 2

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

// https://www.npmjs.com/package/node-bruteforce
function bruteForce(characters, callback) {
	
	var i, intToCharacterBasedString, result, sortedCharacters;
	
	if(typeof characters == 'string')
		characters = characters.split("");
	
	// Sort all characters
	characters.sort();
	characters = characters.filter(function(value, index, arr){
		if(index < 1) {
			return true;
		} else {
			return value != arr[index-1];
		}
	});
	
	characters = [""].concat(characters); // Useless empty value to start this array on index = 1
	
	intToCharacterBasedString = function(num) { // Anoying algorithm..
		var charBasedString, modulo;
		
		charBasedString = "";

		while (num > 0) {
			modulo = num % characters.length // Basic calculating
			charBasedString = characters[modulo] + charBasedString; // Just push it before the old characters
			num = ((num - modulo) / characters.length); // New value of num, annoying calculation
		} 

		return charBasedString;
	};
	
	i = 1;
	
	(function loop() {
		result = callback( intToCharacterBasedString( i ) );
		
		if( result ){ // If callbacks returns true: we did our job!
			return
		} else {
			i++;
			setTimeout(function() {
				loop()
			}, DELAY);
		}
	}());	
}


var hash = 'HELLO';
 
bruteForce(['!', '#', '$', '%', '&', '*', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '@', 'A', 
	'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 
	'V', 'W', 'X', 'Y', 'Z', '^', '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
	'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], function(value){
    
    console.log(`Testing value: ${value}`)
	testPassphrase(value)
//	if( hash == value ) {
//        console.log("Correct value of the hash was: " + value);
 //       return true;
//    }
    
    return false;
});



