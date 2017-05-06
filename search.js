let currentLocation = window.location.href.slice(window.location.href.indexOf('=') + 1);

let searchText = document.getElementById('searchText');
searchText.innerText = decodeURIComponent(currentLocation);

let resultsContainer = document.getElementById('resultsContainer');

let pageNum = 1;

let searchQuery = () => {
    marmottajax({
        url: `https://basic-search-engine.herokuapp.com/search/${currentLocation}`,
        // url: `http://127.0.0.1:8000/search/${currentLocation}/${pageNum}`,
        method: 'get',
    }).success(function(result) {
        result = JSON.parse(result);
        let urls = result && result.search_results;
        let pages = [];
        let pageNums = (result && result.pages) || 10;
        for (let i = 0; i < pageNums; i++) {
            pages.push(i+1);
        }
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
    		<div class="pagination">
    		    <a href="#"><i class="fa fa-angle-left"></i></a>
    		    {{~it.pages :value:index}}
    		        <a href="#" id={{=value}} class="page-link {{? value == pageNum}} active {{?}}">{{=value}}</a><!--
    		        -->
    		    {{~}}
    		    <a href="#"><i class="fa fa-angle-right"></i></a>
            </div>
    	`
        )
        resultsContainer.innerHTML = tempFn({urls, pages});
        window.scrollTo(0, 0);
        let pageLinks = document.getElementsByClassName('page-link');
        [...pageLinks].forEach( ( pageLink ) => {
            pageLink.onclick = ( e ) => {
                e.preventDefault();
                pageNum = pageLink.id;
                searchQuery();
            };
        });
        document.getElementById('searchFormInput').value = currentLocation.replace(/%20/gi, ' ');
    }).error(function(message) {
        console.log(message);
    });
}

searchQuery();