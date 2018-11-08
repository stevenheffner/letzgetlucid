// ***********************************************************
//	Hypnodyne ZMax script file
//
//	- Trains user to recognize the luminous dream cue.
//  - Volume is gradually reduced
//  - Button3 to stop
// ***********************************************************

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var _sec = 0
var routine_stopped = 0
var sec_interval = 10 //say a phrase every N seconds.
var total_duration = 2 * 60 // (in seconds)
var phrasen = 0
var phrases = [
  "This light is my dream guide. It helps me remember that I am inside a dream.",
  "When I see this dream cue, I will immediately be aware that I am inside a dream.",
  "I see the dream cue. Am I dreaming?",
  "Luminous objects are a sign that I must remain calm and perform a dream check",
  "Car lights. A light house. A light bulb. Any shiny object may be your sign that you are now dreaming.",
  "When you see this light, you are in full control of your dreams."
]
var phrase /// current phrase to say
var totalREMCount = 0 //// total REM pings for the night
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Variables to modify the acive stims
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mp3Path = "C:\\mp3\\mornigmood.mp3" //path to mp3 on your computer
var mp3Volume = .5 ////sets volume [0 to 1]
var startNewIntervalStim = stim2 /// sets the sim that playes if the total REM's for the night if over 1

///either a phrase or mp3 shoiuld be selected for stimulation
var stim1Phrases = false
var stim2Phrases = false
var stim3Phrases = false
var stim4Phrases = false

var stim1Mp3 = false
var stim2Mp3 = false
var stim3Mp3 = false
var stim4Mp3 = false

if (false) {
  //set to true for using mode realistic parameters. set to false to test by shortening time values.
  sec_interval = 30
  total_duration = 15 * 60
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
function button1(buttondown) {
  if (buttondown) {
    ZMax_Toast("Button 1 pressed", "#0099ff")
  }
}
// ***********************************************************
// button2
// ----------------------------------------------------------
// called when ZMax button 2 state changes
// buttondown is true if the button is pressed, false otherwise
// ***********************************************************
function button2(buttondown) {
  if (buttondown) {
    ZMax_Toast("Button 2 pressed", "#0099ff")
  }
}
// ***********************************************************
// button3
// ----------------------------------------------------------
// called when ZMax button 3 state changes
// buttondown is true if the button is pressed, false otherwise
// ***********************************************************
function button3(buttondown) {
  if (buttondown) {
    //ZMax_Toast("Button 3 pressed", "#0099ff");
    routine_stopped = 1
  }
}
function DoStimulation1() {
  var vibrate = 0
  var alternateEyes = 0
  var color = "white"
  var intensity = 100 // 0 to 100
  var onTime = 2 // * 100ms units
  var offTime = 4 // * 100ms units
  var reps = 4
  ZMax_FlashLEDS(
    color,
    intensity,
    onTime,
    offTime,
    reps,
    vibrate,
    alternateEyes
  )
}

function DoStimulation2() {
  var vibrate = 0
  var alternateEyes = 0
  var color = "white"
  var intensity = 100 // 0 to 100
  var onTime = 2 // * 100ms units
  var offTime = 4 // * 100ms units
  var reps = 4
  ZMax_FlashLEDS(
    color,
    intensity,
    onTime,
    offTime,
    reps,
    vibrate,
    alternateEyes
  )
}

function DoStimulation3() {
  var vibrate = 0
  var alternateEyes = 0
  var color = "white"
  var intensity = 100 // 0 to 100
  var onTime = 2 // * 100ms units
  var offTime = 4 // * 100ms units
  var reps = 4
  ZMax_FlashLEDS(
    color,
    intensity,
    onTime,
    offTime,
    reps,
    vibrate,
    alternateEyes
  )
}

function DoStimulation4() {
  var vibrate = 0
  var alternateEyes = 0
  var color = "white"
  var intensity = 100 // 0 to 100
  var onTime = 2 // * 100ms units
  var offTime = 4 // * 100ms units
  var reps = 4
  ZMax_FlashLEDS(
    color,
    intensity,
    onTime,
    offTime,
    reps,
    vibrate,
    alternateEyes
  )
}
// ***********************************************************
// secondTimer
// ----------------------------------------------------------
// called every second (rough timing)
// ***********************************************************
function secondTimer(
  bodytemp,
  lightlevel,
  batteryvoltage,
  BPM,
  dx,
  dy,
  dz,
  nasal_range_l,
  nasal_range_r
) {
  if (_sec < total_duration && routine_stopped == 0) {
    if (_sec % sec_interval == 0) {
      var useVolume = (total_duration - _sec) / total_duration
      ZMax_SetSpeechVolume(Math.floor(useVolume * 100))
      ZMax_SetSpeechRate(-2)
      phrase = phrases[phrasen]
      ZMax_SpeakAsync(phrase)
      phrasen = phrasen + 1
      if (phrasen > phrases.length - 1) {
        phrasen = 0
      }
      DoStimulation1()
    }
  }
  _sec = _sec + 1
}

// ***********************************************************
// NewEpochReceived
// ----------------------------------------------------------
// called every 256*30 samples of data received (30 seconds)
// ***********************************************************

function timer() {
	let seconds = 0
	let intervalREMCount = 0
	let REMPhrasen = 0
  return {
    startTimer: function() {
      timerInt = setInterval(() => {
        seconds++
      }, 1000)
    },
    stopTimer: function(){
      clearInterval(timerInt)
      seconds = 0
			intervalREMCount = 0
			phrasen = 0
		},
		addIntervalREMCount: function(){
			intervalREMCount++
		},
		addPhrasen: function(){
			REMPhrasen++
		},
		getSeconds: function(){
			return seconds
		},
		getIntervalREMCount: function(){
			return intervalREMCount
		},
		getREMPhrasen: function(){
			return REMPhrasen
		},
	  
  }
}

var REMIntervalTimer = timer()
var phrasesTimer = timer()

function playPhrases(stim, phrasesTimer, total_duration, routine_stopped){
	let phrasenSecs = phrasesTimer.getSeconds()
	let phrasenCount = phrasesTimer.getREMPhrasen()
	if (phrasenSecs < total_duration && routine_stopped == 0) {
		// ZMax_StopSound()
		if (phrasenSecs % sec_interval == 0) {
			var useVolume = (total_duration - phrasenSecs) / total_duration
			// ZMax_SetSpeechVolume(Math.floor(useVolume * 100))
			// ZMax_SetSpeechRate(-2)
			// var phrase = phrases[phrasesTimer.getREMPhrasen()]
			// ZMax_SpeakAsync(phrase)
			phrasesTimer.addPhrasen()
			if (phrasenCount > phrases.length - 1) {
				phrasesTimer.stopTimer()
			}
			stim()
		}
	}
}

function playMp3(){
	ZMax_StopSound()
	ZMax_PlaySound(mp3Path, 0)
	ZMax_SetSoundVolume(mp3Volume)
}

function NewEpochReceived(isREM) {
	let intervalREMCount = REMIntervalTimer.getIntervalREMCount()
	let intervalSeconds = REMIntervalTimer.getSeconds()

  if (isREM && intervalREMCount === 0) {
    REMIntervalTimer.startTimer()
    if (totalREMCount >= 1) startNewIntervalStim()
		
		if (stim1Phrases && stim1Mp3){
			playPhrases(DoStimulation1, phrasesTimer, total_duration, routine_stopped)
		} else if (stim1Mp3) {
			playMp3()
		} else if (stim1Phrases) {
			playPhrases(stim1, phrasesTimer, total_duration, routine_stopped)
		} else {
			DoStimulation1()
		}
    totalREMCount++
    REMIntervalTimer.addIntervalREMCount()
  } else if (isREM && intervalREMCount === 1 && intervalSeconds < 300000) {
		if (stim2Phrases && stim2Mp3){
			playPhrases(DoStimulation2, phrasesTimer, total_duration, routine_stopped)
		} else if (stim2Mp3) {
			playMp3()
		} else if (stim2Phrases) {
			playPhrases(stim2, phrasesTimer, total_duration, routine_stopped)
		} else {
			DoStimulation2()
		}
    totalREMCount++
    REMIntervalTimer.addIntervalREMCount()
  } else if (isREM && intervalREMCount === 2 && intervalSeconds < 300000) {
		if (stim3Phrases && stim3Mp3){
			playPhrases(DoStimulation3, phrasesTimer, total_duration, routine_stopped)
		} else if (stim3Mp3) {
			playMp3()
		} else if (stim3Phrases) {
			playPhrases(stim3, phrasesTimer, total_duration, routine_stopped)
		} else {
			DoStimulation3()
		}
    totalREMCount++
		REMIntervalTimer.addIntervalREMCount()
  } else if (isREM && intervalREMCount >= 3 && intervalSeconds < 300000) {
		if (stim4Phrases && stim4Mp3){
			playPhrases(DoStimulation4, phrasesTimer, total_duration, routine_stopped)
		} else if (stim4Mp3) {
			playMp3()
		} else if (stim4Phrases) {
			playPhrases(stim4, phrasesTimer, total_duration, routine_stopped)
		} else {
			DoStimulation4()
		}
    totalREMCount++
    REMIntervalTimer.addIntervalREMCount()
  } else {
    REMIntervalTimer.stopTimer()
  }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions not directly called by HDRecorder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFormattedDate() {
  //creates a date string that can be used as file name
  var date = new Date()
  var str =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    "-" +
    date.getMinutes() +
    "-" +
    date.getSeconds()
  return str
}
