// ***********************************************************
//	Hypnodyne ZMax script file
//
//	- This is a javascript file which contains code executed by HDRecorder. 
//  - Please refer to the documentation for help. 
//	- Right click on "Load a script" icon in HDRecorder reloads the last loaded script.
// ***********************************************************
//
// Some examples of functions you can call:
//
//ZMax_FlashLEDS("white", 100, 1, 5, 5, 1, 0); 
//Parameters are color, intensity [0..100], ontime [0..255] * 100ms, offtime [0..255] * 100ms,
//reps [0..255], vibrate [0 or 1], alternateEyes [0 or 1]
//ZMax_StrobeLEDS("white", 100, 4, 4, 40, 1, 0); 
//Same as FlashLEDS but on time and off time are expressed as 2.5 * (x+1) milliseconds, and reps are multiplied by 10.
//In the example above a 10 second 40Hz waveform is produced (12.5ms on, 12.5ms off) 

//ZMax_StrobeLEDS("black", 100, 3, 4, 40, 1, 0);  //vibration only, faintest possible vibration, nearly imperceptible
//ZMax_StrobeLEDS("black", 100, 4, 4, 40, 1, 0);  //slightly more intense vibration (still very weak)

//ZMax_SoundAlarm(); 																							//sounds alarm
//ZMax_StartSunrise(1); 																					//starts sunrise in 1 minute
//ZMax_StopSunrise();  																						//stops sunrise
//var bpm  = parseFloat(ZMax_GetBPM()).toFixed(2);  							//gets BPM
//var temp = parseFloat(ZMax_GetTemperature()).toFixed(2); 			  //gets forehead temperature
//ZMax_Toast("Hello", "#ffff00"); 																//color coded message box
//ZMax_TurnOffMonitor(); 																					//puts monitor to sleep
//var success = ZMax_PlaySound("C:\\mp3\\morningmood.mp3", 0); 		//plays an mp3 file
//ZMax_SetSoundVolume(0.1); 																			//sets volume [0 to 1]
//ZMax_StopSound(); 																							//stops the currently playing sound
//ZMax_Speak("Hello"); 																						//uses voice synthesis to say hello (blocking)
//ZMax_SpeakAsync("Hello"); 																			//uses voice synthesis to say hello (asynchronous)
//ZMax_CreateTextFile("myfile.txt");                              //creates a text file (Extension must be txt or mrk)
//ZMax_AppendTextToFile("myfile.txt", "text");										//adds a line to a text file (Extension must be txt or mrk)

//The following call syntax does the following:
// - it autoconnects to the local HDServer
// - it sets "reps" to zero (deactivates lucid dreaming stimulation)
// - loads your specified javascript file
// - starts lucid dreaming mode
// You use this command when you have coded your own REM stimulation functions
//  in your script and you only want HDRecorder to pass the isREM parameter without
//  performing any stimulation other than what your script defines.
// Command syntax (from DOS or you can create a windows shortcut):
//  HDRecorder.exe -autoconnect -ldfile="C:\HypnoDyne program path\js\test.js"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var recording_audio = false; 

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
		if (ZMax_isRecording() == false)
		{
			var success = ZMax_StartHDRecording();
			if (success>0)
			{ 
				ZMax_SpeakAsync("Recording started.");
			}
		}
		else
		{
			var success = ZMax_StopHDRecording(false);
			if (success>0)
			{ 
				if (success==1)
				{
					ZMax_SpeakAsync("Recording completed successfully.");
				}
				else
				{
					ZMax_SpeakAsync("Recording completed; however, we have lost connection to the server during the recording. The saved files may have skips.");
				}
				
			}
		} 
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
		ZMax_Toast("Button 3 pressed", "#0099ff"); 
		
	}
}
// ***********************************************************
// secondTimer
// ----------------------------------------------------------
// called every second (rough timing)
// ***********************************************************
function secondTimer(bodytemp, lightlevel, batteryvoltage, BPM, dx, dy, dz, nasal_range_l, nasal_range_r)
{ 
}

// ***********************************************************
// NewEpochReceived
// ----------------------------------------------------------
// called every 256*30 samples of data received (30 seconds)
// ***********************************************************
function NewEpochReceived(nEpoch, dxyz, isREM)
{   
	//ZMax_Toast("Epoch " + nEpoch + ", temp " + bodytemp + ", light " +lightlevel+", V" + batteryvoltage + ", BPM " + BPM, "#009900"); 
	if (isREM == true) 
	{
		//Trigger > minimum interval parameter in HDRecorder LD menu is ignored for the purposes of this function.
		//If you want a minimum interval you must code it by yourself in JS.
		ZMax_Toast("Epoch " + nEpoch + " is REM!", "#009900"); 
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