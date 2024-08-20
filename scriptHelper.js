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
    const numericRegex = /^\d+(\.\d+)?$/;
    let validatedInput;

    if (testInput.trim() === "" || testInput.length === 0) {
        validatedInput = "Empty";
    } else if (!isNaN(testInput) && isFinite(testInput) && numericRegex.test(testInput)) {
        validatedInput = "Is a Number";
    } else {
        validatedInput = "Not a Number";
    }

    return validatedInput;
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let validationMessage = '';    
    let launchStatus = document.getElementById('launchStatus');

    let validatePilot = validateInput(pilot.value);
    let validateCopilot = validateInput(copilot.value);
    let validateFuelLevel = validateInput(fuelLevel.value);
    let validateCargoLevel = validateInput(cargoLevel.value);
    let errorCounterValidate = 0;

    if (validatePilot === "Empty") {
        errorCounterValidate++;
        validationMessage += `⚠️ Pilot name must be a non-empty string<br>`;
    }

    if (validateCopilot === "Empty") {
        errorCounterValidate++;
        validationMessage += `⚠️ Copilot name must be a non-empty string<br>`;
    }

    if (validateFuelLevel !== "Is a Number") {
        errorCounterValidate++;
        validationMessage += `⚠️ Fuel level must be a positive number<br>`;
    }

    if (validateCargoLevel !== "Is a Number") {
        errorCounterValidate++;
        validationMessage += `⚠️ Cargo level must be a positive number`;
    }

    if (errorCounterValidate > 0) {
        validationDiv.innerHTML = validationMessage;
        validationDiv.style.padding = "12px";
        validationDiv.style.visibility = 'visible';

        faultyItems.style.visibility = 'hidden';
        launchStatus.innerHTML = 'Awaiting Information Before Launch';
        launchStatus.style.color = 'black';

    } 
    else {
        validationDiv.style.visibility = 'hidden';
        validationDiv.innerHTML = '';

        updateLaunchInfo(pilot, copilot, fuelLevel, cargoLevel);
    }
}

function updateLaunchInfo(pilot, copilot, fuelLevel, cargoLevel) {

    let errorCounterLaunch = 0;

    if (parseFloat(fuelLevel.value) < 10000) { // liters            
        fuelStatus.innerHTML = 'Error! There is not enough fuel for the journey.';
        launchErrors();
    } else {fuelStatus.innerHTML = 'Fuel level high enough for launch';}

    if (parseFloat(cargoLevel.value) > 10000) { // kilograms            
        cargoStatus.innerHTML = 'Error! There is too much mass for the shuttle to take off.';
        launchErrors();
    } else {cargoStatus.innerHTML = 'Cargo mass low enough for launch';}

    function launchErrors() {
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = 'red';
        errorCounterLaunch++;
    }

    // NO ERROR
    if (errorCounterLaunch === 0) {

        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = 'green';
    };

    pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;        
    
    faultyItems.style.visibility = 'visible';
}

module.exports.updateLaunchInfo = updateLaunchInfo;

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;