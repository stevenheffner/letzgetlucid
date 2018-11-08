var offtime = 10;
var reps = 5;
function NewEpochReceived(nEpoch, dxyz, isREM) {
    ZMax_Toast("Epoch " + nEpoch + " ", "#009900");
    if (isREM == false) {
        nonrem_epoch = 1;        //This code here is to prevent making recently_run not present light stimuli if an NREM period (or NREM periods) is sandwiched between a REM period. Only interested in providing a stimulation pause in consecutively detected REM periods
        recently_run = false;

        if (nEpoch == "2") {
            ZMax_SpeakAsync("Hello participant. ")
            //var success = ZMax_PlaySound("C:\\Program Files (x86)\\Hypnodyne\\js\\LIGHT STIMULATION STUDIES\\test.mp3", 0); 
        }
        if ((nEpoch == 4) || (nEpoch == 6)) {
            ZMax_FlashLEDS("white", light_intensity, ontime, offtime, reps, vibration, alternate_eyes)
        }

    }

    if (isREM == true) //enable_rem_detection must be true
    {
        nonrem_epoch = 0;
        ZMax_Log("Script shows isREM is true, epoch " + nEpoch);
        ZMax_Toast("Epoch " + nEpoch + " is REM!", "#009900");
        if (recently_run === false && nEpoch >= 600 && nonrem_epoch === 0) {
            recently_run = true;

            ZMax_FlashLEDS("white", light_intensity, ontime, offtime, reps, vibration, alternate_eyes)
            ZMax_Log("Script shows isREM is true, epoch " + nEpoch + ", and light was presented at " + light_intensity + "% light intensity");


            if (light_intensity < 100) {
                light_intensity += 5;
            }

        } else {
            recently_run = false;
            nonrem_epoch = 1;

        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions not directly called by HDRecorder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFormattedDate() { //creates a date string that can be used as file name
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    return str;
}