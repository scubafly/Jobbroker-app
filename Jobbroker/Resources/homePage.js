var currentWin = Ti.UI.currentWindow;

var homepage = Ti.UI.createWebView({url:'homePage.html'});
currentWin.add(homepage);

Ti.App.addEventListener('openUrl', function(data) {
	var newPage = Ti.UI.createWebView({url:data.url});
	currentWin.add(newPage);
});