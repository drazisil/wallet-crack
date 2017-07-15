## wallet-crack

This script will attempt all possibilities of your passphrase against your wallet.

It does this by using bitcoin-cli.exe from the Bitcoin QT client to attempt to unlock you wallet.
It stops when it no longer gets errors from the RPC calls, or if the CPU load goes over a user-defined limit.

## ToDo

* Switch to using actual RPC calls to cut down on `spawn()` CPU overhead

## Contributing

Pull requests and Issues welcome!

### Credits

Windows CPU usage: https://www.npmjs.com/package/windows-cpuWindows 

Modified code from: https://www.npmjs.com/package/node-bruteforce

### Licence

MIT, please see the LICENCE file
