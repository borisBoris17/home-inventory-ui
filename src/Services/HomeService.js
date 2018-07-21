const apiEndpoint = "http://localhost:8080"
var HomeService = {};

HomeService.postHome = function(homeName, homeOccupants) {
    let greetingJson = {
        name: homeName,
        occupants: homeOccupants
    }
    return fetch(apiEndpoint + "/api/home/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(greetingJson)
    });
}

HomeService.searchHomes = function(homeName, homeOccupants) {
    var nameParam = "";
    var occupantsParam = "";
    var allParams = "";
    if(homeName) {
      nameParam = "name=" + homeName;
    }
    if(homeOccupants) {
      occupantsParam = "occupants=" + homeOccupants;
    }
    if (nameParam && occupantsParam) {
        allParams = "search?" + nameParam + "&" + occupantsParam;
    } else if (nameParam) {
        allParams = "searchByName?" + nameParam;
    } else if (occupantsParam) {
        allParams = "searchByOccupants?" + occupantsParam;
    }
    return fetch(apiEndpoint + "/api/home/" + allParams, {
        method: 'GET'
    });
}
export default HomeService