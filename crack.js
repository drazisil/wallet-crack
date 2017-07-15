const spawn = require('child_process').spawn;

const bitcoinCliPath = 'C:\\Program Files\\Bitcoin\\daemon\\bitcoin-cli.exe'
const characters = " !\"\#$%&'()*+,-./0123456789:;<=> @ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"
const maxCount = 12

function testPassphrase(phraseToTest) {
	
	console.log(passphrase)

	const ls = spawn(bitcoinCliPath, ['walletpassphrase', phraseToTest, '20']);

	ls.stdout.on('data', (data) => {
		// console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
		// console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
}

function setCharAt(str,index2,chr) {
//	console.log(`str: ${str}, index: ${index2}, chr '${chr}'`)
    if(index2 > str.length) return str;
    if(index2 === 0) return chr;
    return str.substr(0,index2) + chr + str.substr(index2+1);
}

function walkReplace(phraseToWalk) {
	let newPhrase = phraseToWalk
	
	console.log(`Char length: ${characters.length}`)
	
	for (let l = 0; l < maxCount; l++) {
		for (let i = 0; i < characters.length; i++) {
			// console.log(`char: ${characters.substr(i, 1)}`)
			newPhrase = setCharAt(newPhrase, l, characters.substr(i,1))
				for (let k = l; k < maxCount; k++) {
//					console.log(`k: ${k}`)
					for (let j = 0; j < characters.length; j++) {
						newPhrase = setCharAt(newPhrase, l + k, characters.substr(j,1))
						console.log(`Made2: ${newPhrase}`);
					}
				}
//			console.log(`Made1: ${newPhrase}`);
		}
//		console.log(`Made-l: ${l}: ${newPhrase}`);
	}
}

let passphrase = ' '.repeat(maxCount)

console.log(`String: ${passphrase}, length: ${passphrase.length}`)

passphrase = walkReplace(passphrase)


