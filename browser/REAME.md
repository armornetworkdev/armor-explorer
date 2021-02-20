1. Download [zip](https://github.com/Armor-Network/armor-explorer/archive/browser.zip)
2. Unpack it in folder.
3. Edit config-section in `/browser/RPC.js`
4. Run armord with --CORS:
```
	./armord --armord-bind-address=0.0.0.0:58081 --p2p-bind-address=0.0.0.0:58080 --data-folder="/folderPath/" --CORS
```
5. Open `/browser/index.html` in new browser tab.