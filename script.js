// Write your JavaScript code here! 

window.addEventListener('load', function() { 
    
    // PLANET STUFF
    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        //console.log(listedPlanets);
    }).then(function () {
        //console.log(listedPlanets);
        
        const my_planet = pickPlanet(listedPlanets);
        //console.log(my_planet);

        let planet_name = my_planet.name; 
        let diameter = my_planet.diameter;
        let star = my_planet.star;
        let distance = my_planet.distance;
        let moons = my_planet.moons;
        let imageUrl = my_planet.image;
        addDestinationInfo(document, planet_name, diameter, star, distance, moons, imageUrl);

        // NEW DIV FOR VALIDATION MESSAGE
        const validationDiv = document.createElement("div");
            validationDiv.setAttribute("id", "validationDiv");
            validationDiv.style.visibility = 'hidden'; 
            validationDiv.innerHTML = ' ';
            validationDiv.style.color = "white";
            validationDiv.style.textAlign = 'center';        
            validationDiv.style.padding = "12px"; 
            validationDiv.style.backgroundColor = "rgb(83, 25, 11)"; 
        launchForm.appendChild(validationDiv);
    })

    // ASTRONAUT STUFF
    formSubmit.addEventListener('click', function(event) {     
        
        event.preventDefault();          
        
        const faultyItems = document.getElementById('faultyItems'); 
        const pilot = document.querySelector('input[name="pilotName"]');
        const copilot = document.querySelector('input[name="copilotName"]');
        const fuelLevel = document.querySelector('input[name="fuelLevel"]');
        const cargoLevel = document.querySelector('input[name="cargoMass"]');        

        formSubmission(document, faultyItems, pilot, copilot, fuelLevel, cargoLevel);               
    });
    
});