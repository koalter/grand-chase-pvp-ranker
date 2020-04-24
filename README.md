# grand-chase-pvp-ranker

`GET: '/heroes'`
* Takes the list of SR heroes and returns a random PvP team of 8 members.

`POST: '/heroes'`
* Receives a list for the PvP team and submits it with the user's bans
* Validates that 2 bans have been made
* Checks that the list contains 8 elements

# TODO List

* GET method should return two hidden heroes (I'll later decide if it should also make it return them as anonymous)
* Generate a database for each submit
* Make an individual ranking based on how many times a hero has been banned
* Make a ranking for ban couples
* Make an algorithm to generate stronger teams based on the rankings and ditch random generated teams (this will probably be made for the end, and after I make the UI)
* Refactor the initial methods to follow a better structure
