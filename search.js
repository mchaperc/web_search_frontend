let currentLocation = window.location.href.slice(window.location.href.indexOf('=') + 1);

marmottajax({
    url: `https://basic-search-engine.herokuapp.com/search/${currentLocation}`,
    method: 'get',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
}).success(function(result) {
    console.log(result);
}).error(function(message) {
    console.log(message);
});