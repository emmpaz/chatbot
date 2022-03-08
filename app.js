const tmi = require('tmi.js');
const { exec } = require("child_process");
const { setIntervalAsync } = require('set-interval-async/dynamic')
const { randomInt } = require('crypto');
const dotenv = require('dotenv');


dotenv.config({path:'./.env'});

//list of songs
var list = [];
//initial time to start playing song
var timeRand = 60000;


const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'handymanni',
		password: process.env.PASSWORD
	},
	channels: [ 'handymanni' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	console.log(`${tags['display-name']}: ${message}`);
    if(message.includes("-sr") && !message.includes("porn") && !message.includes("xxx")){
        link = message.split(' ')[1];
		command = `open -a firefox ${link}`;
		list.push(command);
    } 
});

/**
 * sees if list has any songs to play
 * if there is one. Then remove it from list.
 */
function play() {
	if(list.length > 0){
		exec(list[0]);
		list.shift();
	}
	else{
		console.log('no songs...');
	}
}
/**
 * this is the timer to call play() and reset timer.
 */
const timer = setIntervalAsync(
	async () => {
	  console.log('timer done')
	  await play()
	  console.log('timer reset')
	},
	35000
  )
