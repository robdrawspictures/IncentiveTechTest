// We import the object from the data file. Inside that object there is a function to get players data
const data = require("./data");

// Get data array for use in functions
const playerData = data.getPlayers();

// Dummy data to test functions
const testData = [
    {
        name: "Jotaro",
        lastname: "Kujo",
        position: "forward",
        scoringChance: 45
    },
    {
        name: "Kakyoin",
        lastname: "Noriaki",
        position: "forward",
        scoringChance: 32
    },
    {
        name: "Jean-Pierre",
        lastname: "Polnareff",
        position: "midfielder",
        scoringChance: 18
    },
]

/**
 * Test 1
 * Write a function to log in the console the players data with this format:
 * PLAYER 1
 * NAME: Zinedine
 * LASTNAME: Zidane
 * POSITION: Midfielder
 * PLAYER 2...
 */

 // Your code
function displayPlayerData(){
    for(let i = 0; i < playerData.length; i++){
        console.log(`PLAYER ${i + 1}`)
        console.log(`NAME: ${playerData[i].name}`);
        console.log(`LASTNAME: ${playerData[i].lastname}`);
        console.log(`POSITION: ${playerData[i].position}`);
    }
}

console.log('--- TEST 1 ---');
displayPlayerData();
console.log('--------------');

/**
 * Test 2
 * Write a function to log in the console an array with only the names of the players, ordered by name length descending
 */

// Your code
function sortPlayerNames(){
    const playerArr = playerData.map((player) => player.name);

    // Logs array in descending order of size, or alphabetically where names are equal in length
    console.log(playerArr.sort((a, b) => b.length - a.length || b.localeCompare(a)));
}

console.log('--- TEST 2 ---');
sortPlayerNames();
console.log('--------------');

/**
 * Test 3
 * Write a function to log in the console the average number of goals there will be in a match if all the players in the data play on it
 * scoringChance means how many goals per 100 matches the player will score
 * Example: 10 players play in a match, each of them has a 0.11 scoringChance, the total number of goals will be 1.1 average 
 * Output example -> Goals per match: 2.19
 */

// Your code
function calculateGoals(){
    let scoringTotal = 0

    for(let i = 0; i < playerData.length; i++){
        scoringTotal += parseInt(playerData[i].scoringChance);
    }

    console.log('Goals per match: ' + scoringTotal / 100);
}

console.log('--- TEST 3 ---');
calculateGoals();
console.log('--------------');

/**
 * Test 4
 * Write a function that accepts a name, and logs the position of the player with that name (by position it means striker, goalkeeper...)
 */

// Your code
const getPositionByName = (playerName) => {
    const foundPlayer = playerData.find((player) => player.name === playerName);

    if (!foundPlayer){
        return console.log(`Player ${playerName} not found.`);
    }

    return console.log(`${playerName} is a ${foundPlayer.position.toLowerCase()}.`);
}

console.log('--- TEST 4: SUCCESS ---');
getPositionByName('Bernd');
console.log('--- TEST 4: FAILURE ---');
getPositionByName('Dio Brando');
console.log('-----------------------');

/**
 * Test 5
 * Write a function that splits all the players randomly into 2 teams, Team A and Team B. Both teams should have same number of players.
 * The function should log the match score, using the average number of goals like the Test 3 and rounding to the closest integer
 * Example:
 *      Team A has 4 players, 2 with 50 scoringChance and 2 with 70 scoringChance. 
 *      The average score for the team would be 2.4 (50+50+70+70 / 100), and the closest integer is 2, so the Team A score is 2
 */

// Your code
// Randomly shuffle the index positions of given array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// Return the average goals for given team, rounded to nearest whole number
function getRoundedGoals(team){
    let scoringTotal = 0;

    team.map((player) => scoringTotal += parseInt(player.scoringChance));

    return Math.round(scoringTotal / 100);
}

// Split players into two randomised teams, calculate goals scored and declare a winner or a draw
function splitPlayers(playerData){
    if(playerData.length % 2 !== 0){
        return console.log("Error: Equal number of players required per team.");
    }
    let shuffledArray = shuffle([...playerData]);
    let teamA = shuffledArray.splice(0, (shuffledArray.length / 2));
    let teamB = shuffledArray;

    const teamAScore = getRoundedGoals(teamA);
    const teamBScore = getRoundedGoals(teamB);

    if(teamAScore === teamBScore){
        console.log(`It's a draw at ${teamAScore} all!`);
    } else if(teamAScore > teamBScore) {
        console.log(`Team A wins with a score of ${teamAScore} to ${teamBScore}!`);
    } else {
        console.log(`Team B wins with a score of ${teamBScore} to ${teamAScore}!`)
    }
}

console.log('--- TEST 5: SUCCESS ---');
splitPlayers(playerData);
console.log('--- TEST 5: FAILURE ---');
splitPlayers(testData);
console.log('-----------------------');