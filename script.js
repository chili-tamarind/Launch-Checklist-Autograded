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
    })
    
    // ASTRONAUT STUFF
    formSubmit.addEventListener('click', function(event) {     
        
        event.preventDefault();          
        
        const faultyItems = document.getElementById('faultyItems'); 
        const pilotName = document.querySelector('input[name="pilotName"]');
        const copilotName = document.querySelector('input[name="copilotName"]');
        const fuelLevel = document.querySelector('input[name="fuelLevel"]');
        const cargoLevel = document.querySelector('input[name="cargoMass"]');        

        // NEW DIV FOR VALIDATION MESSAGE
            validationDiv = document.createElement("div");
            validationDiv.setAttribute("id", "validationDiv");
            validationDiv.style.visibility = 'hidden'; 
            validationDiv.innerHTML = '';
            validationDiv.style.color = "rgb(156, 11, 11)";
            validationDiv.style.textAlign = 'center';        
            validationDiv.style.fontSize = "11px"; 
        launchForm.appendChild(validationDiv);

        formSubmission(document, faultyItems, pilotName, copilotName, fuelLevel, cargoLevel);               
    });
    

});