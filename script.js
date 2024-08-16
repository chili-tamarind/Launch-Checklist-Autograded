window.addEventListener('load', function () {
    
    // PLANET STUFF
    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;}).then(function () {

        const myPlanet = pickPlanet(listedPlanets);

        let planetName = myPlanet.name;
        let diameter = myPlanet.diameter;
        let star = myPlanet.star;
        let distance = myPlanet.distance;
        let moons = myPlanet.moons;
        let imageUrl = myPlanet.image;
        addDestinationInfo(document, planetName, diameter, star, distance, moons, imageUrl);

        const launchForm = document.getElementById('launchForm');
        const validationDiv = document.createElement("div");
            validationDiv.setAttribute("id", "validationDiv");
            validationDiv.style.visibility = 'hidden';
            validationDiv.innerHTML = ' ';
            validationDiv.style.color = "white";
            validationDiv.style.textAlign = 'center';
            
            validationDiv.style.backgroundColor = "rgb(83, 25, 11)";
        launchForm.appendChild(validationDiv);
    })

    formSubmit.addEventListener('click', function (event) {

        event.preventDefault();

        const faultyItems = document.getElementById('faultyItems');
        const pilot = document.querySelector('input[name="pilotName"]');
        const copilot = document.querySelector('input[name="copilotName"]');
        const fuelLevel = document.querySelector('input[name="fuelLevel"]');
        const cargoLevel = document.querySelector('input[name="cargoMass"]');

        formSubmission(document, faultyItems, pilot, copilot, fuelLevel, cargoLevel);
    });

});