# grand-chase-pvp-ranker

`GET: '/heroes'`
* Takes the list of SR heroes and returns a random PvP team of 8 members.

`POST: '/heroes'`
* Receives a list for the PvP team and submits it with the user's bans
* Validates that 2 bans have been made
* Checks that the list contains 8 elements
