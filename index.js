// We import the object from the data file. Inside that object there is a function to get players data
const data = require("./data");

const playerData = data.getPlayers();
// console.log(playerData);

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

// displayPlayerData();

/**
 * Test 2
 * Write a function to log in the console an array with only the names of the players, ordered by name length descending
 */

// Your code
function sortPlayerNames(){
    let playerArr = []

    for(let i = 0; i < playerData.length; i++){
        playerArr.push(playerData[i].name);
    }

    console.log(playerArr.sort((a, b) => b.length - a.length || b.localeCompare(a)))
}

// sortPlayerNames();

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

    console.log(scoringTotal / 100);
}

// calculateGoals();

/**
 * Test 4
 * Write a function that accepts a name, and logs the position of the player with that name (by position it means striker, goalkeeper...)
 */

// Your code
function getPositionByName(playerName){
    for(let i = 0; i < playerData.length; i++){
        if (playerData[i].name === playerName){
            return console.log(playerData[i].position);
        }
    }

    return console.log(`Player ${playerName} not found.`);
}

// getPositionByName('Ethan');
// getPositionByName('Dio Brando');


/**
 * Test 5
 * Write a function that splits all the players randomly into 2 teams, Team A and Team B. Both teams should have same number of players.
 * The function should log the match score, using the average number of goals like the Test 3 and rounding to the closest integer
 * Example:
 *      Team A has 4 players, 2 with 50 scoringChance and 2 with 70 scoringChance. 
 *      The average score for the team would be 2.4 (50+50+70+70 / 100), and the closest integer is 2, so the Team A score is 2
 */

// Your code
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function getRoundedGoals(playerData){
    let scoringTotal = 0

    for(let i = 0; i < playerData.length; i++){
        scoringTotal += parseInt(playerData[i].scoringChance);
    }

    return Math.round(scoringTotal / 100);
}

function splitPlayers(playerData){
    if(playerData.length % 2 !== 0){
        return console.log("Error: Equal number of players required per team");
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

splitPlayers(playerData);
// splitPlayers(testData);