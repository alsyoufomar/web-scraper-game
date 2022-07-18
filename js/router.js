// This func will handle the link default behavior and location changes
// here we captured the click event of the link which we need to use to call preventDefault()
// this will prevent the anchor tag from performing its default behavior of navigating to the link target(href)
// now we will use the browser's history API by calling pushState, and passing our anchor's href value to the 3rd argument
// this will update the url on the browser
const backgroundAudio = new Audio();

function route(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
}

// here we gonna define our routes for the path in handleLocation
// every route has its own html page
const routes = {
  404: '/views/404.html',
  '/': '/views/index.html',
  '/game': '/views/game.html',
};

// now we need to to handle the change of the location
// this will call everytime we have a navigation in our app
// 1st we need to capture our pathname from the current location
// once we defined our routes, we will use the pathname to find
// our desired route or default to the 404 route if it does not exist
// next we need to load in the html for our route by using the fetch call
// once we have our html to load, we asssign it to the innerHTML of our page container
const handleLocation = async () => {
  let path = window.location.pathname;
  if (path === '/') backgroundAudio.pause();
  if (path === '/index.html') {
    path = '/';
  }
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => {
    return data.text();
  });
  document.getElementById('main-page').innerHTML = html;
  if (path === '/game') theGame();
  if (path === '/') entryMessage();
};

// last thing we need to do is to handle browser routing functionality and page first load
//  and to do that we need to call handleLocation for the window.onpopstate event
// which will handle when users click the forward and backward browser buttons
// and then we need to make a call to handleLocation on our page load to load the current
//  page for whatever route the user 1st loads on(as shown at the last line)
//  and lastly we need to call it each time we call our route function(as shown above)
window.onpopstate = handleLocation;
// here we give global access to the route function
window.route = route;

handleLocation();
