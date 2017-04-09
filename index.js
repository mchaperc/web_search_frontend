let form = document.getElementById('searchForm');
let searchInput = document.getElementById('searchInput');

const navigateToSearch = (e) => {
	e.preventDefault();
	let currentLocation = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
	let userInput = e.target[0].value;
	let searchLocation = `search.html?=${userInput}`;
	if (userInput) {
		window.location.href = `${window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1)}${searchLocation}`;		
	}
}

if (form && form.addEventListener) {
    form.addEventListener("submit", navigateToSearch, false);
} else if (form && form.attachEvent) {
    form.attachEvent('onsubmit', navigateToSearch);
}