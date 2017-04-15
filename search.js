let currentLocation = window.location.href.slice(window.location.href.indexOf('=') + 1);

let searchText = document.getElementById('searchText');
searchText.innerText = decodeURIComponent(currentLocation);

let resultsContainer = document.getElementById('resultsContainer');

marmottajax({
    // url: `https://basic-search-engine.herokuapp.com/search/${currentLocation}`,
    url: `http://127.0.0.1:8000/search/${currentLocation}`,
    method: 'get',
}).success(function(result) {
    let urls = JSON.parse(result);
    console.log(urls);
    let tempFn = doT.template(
    	`
    		{{~it.urls :value:index}}
    		    <div class="panel">
    		        <a href="{{=value.url}}">{{=value.title || value.url}}
    		            <p>{{=value.url}}</p>
    		            <p>{{=value.description || ''}}</p>
    		        </a>
                </div>
    			
    		{{~}}
    	`
    )
    console.log(tempFn({urls}))
    resultsContainer.innerHTML = tempFn({urls});
}).error(function(message) {
    console.log(message);
});