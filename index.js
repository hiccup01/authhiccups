// authhiccups - make your own secure TOTP client

//Import the HMAC-SHA1 library
let Crypto = require("jssha");
let leftpad = require("left-pad");
let library = {
	newCode: function(secret) { // secret is a base32 string
		console.log("Hello!");
		secret = myBase32(secret);
		let epoch = Math.round(Date.now() / 1000.0);
		let time = leftpad((Math.floor(epoch / 30)).toString(16), 16, "0");
		let sha = new Crypto("SHA-1", "HEX");
		sha.setHMACKey(secret, 'HEX');
		sha.update(time);
		let hmac = sha.getHMAC('HEX');
		let shaoffset = parseInt(hmac.substr(hmac.length - 1), 16);
		let code = (parseInt(hmac.substr(shaoffset * 2, 8), 16) & parseInt("7fffffff", 16)) + "";
		code = code.substr(code.length - 6, 6);
		return code;
	}
}

function myBase32(base32) {
	let charTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
	base32 = base32.replace(/\s+/g, "");
	let binary = "";
	for (var i = 0; i < base32.length; i++) {
		let base10 = charTable.indexOf(base32.charAt(i).toUpperCase());
		binary = binary + leftpad((base10 >>> 0).toString(2), 5, "0");
	}
	let hex = "";
	for (var i = 0; i + 4 <= binary.length; i += 4) {
		hex = hex + parseInt(binary.substr(i, 4), 2).toString(16);
	}
	return hex;
}