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

export default HomeService