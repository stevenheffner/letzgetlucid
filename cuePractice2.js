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
function DoStimulation() {
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
      var phrase = phrases[phrasen]
      ZMax_SpeakAsync(phrase)
      phrasen = phrasen + 1
      if (phrasen > phrases.length - 1) {
        phrasen = 0
      }
      DoStimulation()
    }
  }
  _sec = _sec + 1
}

// ***********************************************************
// NewEpochReceived
// ----------------------------------------------------------
// called every 256*30 samples of data received (30 seconds)
// ***********************************************************
setInterval(() => NewEpochReceived((isREM = true)), 5000)

function stim1() {
  console.log("stim 1 hit")
}

function stim2() {
  console.log("stim 2 hit")
}

function stim3() {
  console.log("stim 3 hit")
}
var REMCount = 0 ////number of REM pings hit
var REMTime = 0 //// amount of time after the first REM ping
var timerInt //// timer to keep track of the 5 min mark

var timer = {
		startTimer: function(){
			timerInt = setInterval(() => {
				REMTime++
				console.log(REMTime)
			},1000)
		},
		stopTimer: function(){
			clearInterval(timerInt)
			REMTime = 0
			REMCount = 0
		}

  }


function NewEpochReceived(isREM) {
  if (isREM && REMCount === 0) {
		timer.startTimer()
    stim1()
    REMCount += 1
  } else if (isREM && REMCount === 1 && REMTime >= 300000) {
    stim2()
    REMCount += 1
  } else if (isREM && REMCount === 2 && REMTime >= 300000) {
    stim3()
		REMCount += 1
	} else {
		console.log('REM is false')
	  timer.stopTimer()
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
