let currentLocation = window.location.href.slice(window.location.href.indexOf('=') + 1);

let searchText = document.getElementById('searchText');
searchText.innerText = decodeURIComponent(currentLocation);

let resultsContainer = document.getElementById('resultsContainer');

marmottajax({
    url: `https://basic-search-engine.herokuapp.com/search/${currentLocation}`,
    method: 'get',
}).success(function(result) {
    let urls = JSON.parse(result);
    console.log(urls);
    let tempFn = doT.template(
    	`
    		{{~it.urls :value:index}}
    			<a href="{{=value.url}}" class="panel">{{=value.url}}</a>
    		{{~}}
    	`
    )
    console.log(tempFn({urls}))
    resultsContainer.innerHTML = tempFn({urls});
}).error(function(message) {
    console.log(message);
});