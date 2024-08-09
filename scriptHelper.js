// Write your helper functions here!

require('cross-fetch/polyfill');

async function myFetch() { 
    let url = 'https://handlers.education.launchcode.org/static/planets.json';    
    const response = await fetch(url);    
    const planetsReturned = await response.json();
    return planetsReturned;
}

function pickPlanet(planets) {
    const randomPlanet = Math.floor(Math.random() * planets.length);
    return planets[randomPlanet];
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById('missionTarget');
    
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src=" ${imageUrl}">`;
}

function validateInput(testInput) {
    
    testInput = String(testInput);
    const numericRegex = /^\d+(\.\d+)?$/; //regex to check for only numeric digits 
    let validated_input;

    if (testInput.trim() === "" || testInput.length === 0) {
        validated_input = "Empty";
    } else if (!isNaN(testInput) && isFinite(testInput) && numericRegex.test(testInput)) { 
        validated_input = "Is a Number";
    } else {
        validated_input = "Not a Number";
    }

    return validated_input;
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) { 
    
    let validationDiv = document.getElementById('validationDiv'); 
    let validationMessage = '';

    // VARIABLES
    let validate_pilot = validateInput(pilot.value);
    let validate_copilot = validateInput(copilot.value);
    let validate_fuelLevel = validateInput(fuelLevel.value);
    let validate_cargoLevel = validateInput(cargoLevel.value);
    let error_counter_validate = 0; 

    // PILOT 
    if  (validate_pilot === "Empty") {
        error_counter_validate++;
        validationMessage += `⚠️ Pilot name must be a non-empty string<br>`;
    }

    // COPILOT 
    if  (validate_copilot === "Empty") {
        error_counter_validate++;
        validationMessage += `⚠️ Copilot name must be a non-empty string<br>`;
    } 

    // FUEL LEVEL 
    if  (validate_fuelLevel !== "Is a Number") {
        error_counter_validate++;
        validationMessage += `⚠️ Fuel level must be a positive number<br>`; 
    }

    // CARGO MASS
    if  (validate_cargoLevel !== "Is a Number") {
        error_counter_validate++;
        validationMessage += `⚠️ Cargo level must be a positive number`;
    }

    /* STUFF
    validationMessage += 
        `<br> Pilot: ${validate_pilot}
        <br> Copilot: ${validate_copilot}
        <br> Fuel: ${validate_fuelLevel}
        <br> Cargo: ${validate_cargoLevel}`*/

    // UPDATE DIVS
    if (error_counter_validate > 0) {    
        // Update error messages        
        validationDiv.style.visibility = 'visible';  
        validationDiv.innerHTML = validationMessage;      

        // Reset info screen
        faultyItems.style.visibility = 'hidden';         
        launchStatus.innerHTML = 'Awaiting Information Before Launch';
        launchStatus.style.color = 'black'; 
        }
    else {        
        // Clear error messages
        validationDiv.style.visibility = 'hidden';
        validationDiv.innerHTML = '';

        // Update info screen
        updateLaunchInfo(pilot, copilot, fuelLevel, cargoLevel);
    }
}

function updateLaunchInfo(pilot, copilot, fuelLevel, cargoLevel) {
    
    let error_counter_launch = 0; 

    if (parseFloat(fuelLevel.value) < 10000) { // liters            
        fuelStatus.innerHTML = 'Error! There is not enough fuel for the journey.';
        launchErrors();
    }

    if (parseFloat(cargoLevel.value) > 10000) { // kilograms            
        cargoStatus.innerHTML = 'Error! There is too much mass for the shuttle to take off.';
        launchErrors();
    }    

    function launchErrors() {
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = 'red';
        error_counter_launch++;
    }

    // NO ERROR
    if (error_counter_launch === 0) {            
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = 'green';
    }

    pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`; 
    copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`; 
    faultyItems.style.visibility = 'visible';
}

// MODULE EXPORTS
module.exports.updateLaunchInfo = updateLaunchInfo;

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;