# authhiccups
### A _very_ simple TOTP library
I would most definitely would *not* use this in any projects. This was a just a hobby project to see what I could do.

How to use this library:    
```
let TOTPauth = require("authhiccups");    
let myOneTimeCode = TOTPauth.newCode("my secure key");
```
