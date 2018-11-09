// ***********************************************************
//	Hypnodyne ZMax script file
//
//	- Trains user to recognize the luminous dream cue.
//  - Volume is gradually reduced
//  - Button3 to stop
// ***********************************************************
 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var _sec = 0;
var routine_stopped = 0;
var sec_interval = 10; //say a phrase every N seconds.
var total_duration = 2*60; // (in seconds) 
var phrasen = 0;
var phrases=[
"This light is my dream guide. It helps me remember that I am inside a dream.",
"When I see this dream cue, I will immediately be aware that I am inside a dream.",
"I see the dream cue. Am I dreaming?",
"Luminous objects are a sign that I must remain calm and perform a dream check",
"Car lights. A light house. A light bulb. Any shiny object may be your sign that you are now dreaming.",
"When you see this light, you are in full control of your dreams."
];

var remsArray=[];
var fiveMinutes= 30000     //milliseconds
var oneHour = 1000 * 3600  //milliseconds
var halfHour = 1000 * 1800 //milliseconds

if (false) //set to true for using mode realistic parameters. set to false to test by shortening time values.
{
	sec_interval = 30;
	total_duration = 15*60;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions directly called by HDRecorder. These must exist and cannot throw errors.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ***********************************************************
// button1
// ----------------------------------------------------------
// called when ZMax button 1 state changes
// buttondown is true if the button is pressed, false otherwise
// ************************************************************
function button1(buttondown)
{
	if (buttondown)
	{
		ZMax_Toast("Button 1 pressed", "#0099ff"); 

	}
}
// ***********************************************************
// button2
// ----------------------------------------------------------
// called when ZMax button 2 state changes
// buttondown is true if the button is pressed, false otherwise
// ***********************************************************
function button2(buttondown)
{
	if (buttondown)
	{
		ZMax_Toast("Button 2 pressed", "#0099ff");

	}
}
// ***********************************************************
// button3
// ----------------------------------------------------------
// called when ZMax button 3 state changes
// buttondown is true if the button is pressed, false otherwise
// ***********************************************************
function button3(buttondown)
{
	if (buttondown)
	{  
		//ZMax_Toast("Button 3 pressed", "#0099ff"); 
		routine_stopped = 1;
	}
}
function DoStimulation1()
{
	var vibrate = 0;
	var alternateEyes = 0;
	var color = "white";
	var intensity = 100; // 0 to 100
	var onTime = 2; // * 100ms units
	var offTime = 4; // * 100ms units
	var reps = 4;
	ZMax_FlashLEDS(color, intensity, onTime, offTime, reps, vibrate, alternateEyes); 
}
function DoStimulation2()
{
	var vibrate = 0;
	var alternateEyes = 0;
	var color = "white";
	var intensity = 100; // 0 to 100
	var onTime = 2; // * 100ms units
	var offTime = 4; // * 100ms units
	var reps = 4;
	ZMax_FlashLEDS(color, intensity, onTime, offTime, reps, vibrate, alternateEyes); 
}
function DoStimulation3()
{
	var vibrate = 0;
	var alternateEyes = 0;
	var color = "white";
	var intensity = 100; // 0 to 100
	var onTime = 2; // * 100ms units
	var offTime = 4; // * 100ms units
	var reps = 4;
	ZMax_FlashLEDS(color, intensity, onTime, offTime, reps, vibrate, alternateEyes); 
}
function DoStimulation4()
{
	var vibrate = 0;
	var alternateEyes = 0;
	var color = "white";
	var intensity = 100; // 0 to 100
	var onTime = 2; // * 100ms units
	var offTime = 4; // * 100ms units
	var reps = 4;
	ZMax_FlashLEDS(color, intensity, onTime, offTime, reps, vibrate, alternateEyes); 
}
// ***********************************************************
// secondTimer
// ----------------------------------------------------------
// called every second (rough timing)
// ***********************************************************
function secondTimer(bodytemp, lightlevel, batteryvoltage, BPM, dx, dy, dz, nasal_range_l, nasal_range_r)
{  
	if ((_sec < total_duration) && (routine_stopped == 0))
	{
		if (_sec % sec_interval == 0)
		{
			var useVolume = (total_duration-_sec) / total_duration;
			ZMax_SetSpeechVolume(Math.floor(useVolume*100));
			ZMax_SetSpeechRate(-2);
			var phrase = phrases[phrasen];
			ZMax_SpeakAsync(phrase); 
			phrasen = phrasen + 1;
			if (phrasen > phrases.length - 1)
			{
				phrasen = 0;
			}
			DoStimulation1();
		}
	}
	_sec = _sec+1; 
}

var mp3Path = "C:\\mp3\\mornigmood.mp3"; ////path to mp3 file on your computer
var mp3Volume = 0.5;                     ////sets volume [0 to 1]

function playMp3(stimulation){
	ZMax_StopSound()
  ZMax_PlaySound(mp3Path, 0)
	ZMax_SetSoundVolume(mp3Volume)
	if (stimulation)
	{
		stimulation()
	}
}

var phrasesSeconds = 0

function playPhrases(stimulation){

	clearInterval()
	phrasesSeconds = 0

	setInterval(function(){
		phrasesSeconds++
	}, 1000)

	if (phrasesSeconds % sec_interval == 0)
	{
	  useVolume = (total_duration-phrasesSeconds) / total_duration;
	  ZMax_SetSpeechVolume(Math.floor(useVolume*100));
	  ZMax_SetSpeechRate(-2);
	  phrase = phrases[phrasen];
	  ZMax_SpeakAsync(phrase); 
	  phrasen = phrasen + 1;
	  if (phrasen > phrases.length - 1)
    {
	  	phrasen = 0;
	  }
	  if(stimulation)
	  {
	   stimulation();
	  }
  }
}

// ***********************************************************
// NewEpochReceived
// ----------------------------------------------------------
// called every 256*30 samples of data received (30 seconds)
// ***********************************************************

function NewEpochReceived(isREM)
{    
	if (isREM)
	{
		remsArray.push(new Date().getTime());
		var totalRems = remsArray.length;
		var timeSinceLastRem = !remsArray[0] ? remsArray[totalRems - 1] - remsArray[totalRems - 2] : 0		
		if (totalRems == 1 && timeSinceLastRem < fiveMinutes)
		{
			DoStimulation1()
			// playMp3(DoStimulation1)
			// playPhrases(DoStimulation1)
		}
		else if (totalRems == 2 && timeSinceLastRem < fiveMinutes)
		{
			DoStimulation2()
			// playMp3(DoStimulation2)
			// playPhrases(DoStimulation2)
		}
		else if (totalRems == 3 && timeSinceLastRem < fiveMinutes)
		{
			DoStimulation3()
			// playMp3(DoStimulation3)
			// playPhrases(DoStimulation3)
		}
		else if (totalRems == 4 && timeSinceLastRem < fiveMinutes)
		{
			DoStimulation4()
			// playMp3(DoStimulation4)
			// playPhrases(DoStimulation4)
		}
		else if (totalRems > 0 && timeSinceLastRem > oneHour)
		{
			DoStimulation2()
			// playMp3(DoStimulation4)
			// playPhrases(DoStimulation4)
		}
		else 
		{
			// Default DoStimulation
			DoStimulation1()
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions not directly called by HDRecorder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFormattedDate() { //creates a date string that can be used as file name
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    return str;
}