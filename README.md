# Quizzy 

CLI flash card game to sporadically test knowledge of inputted questions with answers. 

## Functionality 

=> `node app.mjs play` -- shuffles and shows 5 random cards <br /> 
=> `node app.js list` -- lists all available Q&As  <br /> 
=> `node app.js add <question> <answer>` -- adds new questions with answer <br /> 
=> `node app.js rm <id>` : removes q&as with id <br /> 

### *Imoprtant Info*: Flashy works much better the more database entries it has. Randomness is hard if you have less than N inputs, 
### where N is not that small of a number. 