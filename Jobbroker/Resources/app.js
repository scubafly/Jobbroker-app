Ti.include('helper_functions.js');
var windowWidth = Ti.Platform.displayCaps.platformWidth;
var windowHeight = Ti.Platform.displayCaps.platformHeight;
var barColor = '#53A2D5';
Titanium.UI.setBackgroundColor('#000');

// jobbroker news window
var newsWin = Ti.UI.createWindow({
	title: '',
	url:'news/news.js',
	barImage: 'images/jobbroker_bar.png',
	titleImage: ''
});

newsWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
];

var newsTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Nieuws',
    window:newsWin
});

// create linkedIn tab
var linkedInWin = Ti.UI.createWindow({
    title: '',
    barImage: 'images/jobbroker_bar.png',
    backgroundColor:'#ddd',
    barColor: barColor
});
var linkedInTab = Ti.UI.createTab({
    icon:'images/tabs/linkedIn.png',
    title:'LinkedIn',
    window:linkedInWin
});

var linkedInImage = Ti.UI.createImageView({
    image: 'images/linkedInPage_portrait.png'
});

linkedInImage.addEventListener('click', function(e) {
    var dialog = Titanium.UI.createOptionDialog({
        title: '',
        options: ['Direct aanmelden','Uitnodigen per email versturen','Annuleren'],
        cancel:2
    });
	
    dialog.addEventListener('click', function(evnt) {
        switch(evnt.index) {
            case 0: // open in browser						
                var linkedInWindow = Ti.UI.createWindow({
			        title: 'LinkedIn',
			        backgroundColor:'#ddd',
			        backButtonTitle:'LinkedIn'
			    });
			    var linkedInWebView = Titanium.UI.createWebView({
			        url: 'http://www.linkedin.com/groupRegistration?gid=1819555&trk=anetsrch_join&goback=.gdr_1236765551148_1'
			    });
			    linkedInWindow.add(linkedInWebView);
			    linkedInTab.open(linkedInWindow);
				
                break;
            case 1: // send as email
                var emailDialog = Titanium.UI.createEmailDialog();
                emailDialog.subject = 'Uitnodiging voor linkedIn groep Job Broker Banking & Insurance'; 
                emailDialog.messageBody = 'Netwerken met 4000+ collega\'s?\nKlik op de onderstaande link of kopieer deze naar uw browser om lid te worden\nhttp://www.linkedin.com/groupRegistration?gid=1819555&trk=anetsrch_join&goback=.gdr_1236765551148_1';
                emailDialog.open();
                break;
        }
    });
    dialog.show();
});

var linkedInView = Ti.UI.createView({
    borderRadius:0,
    backgroundColor:'#53A2D5',
    width:windowWidth,
    height:windowHeight
});

linkedInView.add(linkedInImage);
linkedInWin.add(linkedInView);

linkedInWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];


Titanium.Gesture.addEventListener('orientationchange', function(e){
    if(e.orientation == Titanium.UI.LANDSCAPE_RIGHT){

		linkedInImage.image = 'images/linkedInPage_landscape.png';
		linkedInView.width = windowHeight;
		linkedInView.height = windowWidth;
    } else if(e.orientation == Titanium.UI.LANDSCAPE_LEFT){

		linkedInImage.image = 'images/linkedInPage_landscape.png';
		linkedInView.width = windowHeight;
		linkedInView.height = windowWidth;
    } else if(e.orientation == Titanium.UI.PORTRAIT){
		linkedInImage.image = 'images/linkedInPage_portrait.png';
		linkedInView.width = windowWidth;
		linkedInView.height = windowHeight;
    }
});

// end of linkedIn tab

//categories main window

var catWin = Ti.UI.createWindow({
   title:'',
   barImage: 'images/jobbroker_bar.png',
   url:'vacancies/categories.js'
});

catWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
];

var catTab = Ti.UI.createTab({
   icon: 'images/tabs/categories.png', // image moet nog aangepast worden
   title: 'Categoriën',
   window:catWin
});
// end of categories main window

// vacancies window
var vacWin = Ti.UI.createWindow({
	title: '',
	url:'vacancies/vacancies_list.js',
	barImage: 'images/jobbroker_bar.png'
});

vacWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
];

var vacTab = Ti.UI.createTab({
	icon: 'images/tabs/categories.png',
	title: 'Vacatures',
	window:vacWin
});
// end of vacancies window

// jobbroker tab
var jbWin = Ti.UI.createWindow({
	title: '',
	url:'homePage.js',
	barImage: 'images/jobbroker_bar.png'
});

jbWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
];

Titanium.Gesture.addEventListener('orientationchange', function(e){
    if(e.source.isLandscape()){
		jbWin.titleImage = '';
		jbWin.barImage = '';
		jbWin.hideNavBar();
		
	//	vacWin.titleImage = '';
	//	vacWin.barImage = '';	
		vacWin.hideNavBar();
		
	//	catWin.titleImage = '';
	//	catWin.barImage = '';
		catWin.hideNavBar();
		
		linkedInWin.titleImage = '';
		linkedInWin.barImage = '';
		linkedInWin.hideNavBar();
		
//		newsWin.titleImage = '';
//		newsWin.barImage = '';
		newsWin.hideNavBar();
		
    } else if( e.orientation != Ti.UI.FACE_UP && e.orientation != Ti.UI.FACE_DOWN ) {
		jbWin.titleImage = 'images/jobbroker_bar.png';
		jbWin.showNavBar();
		//vacWin.titleImage = 'images/jobbroker_bar.png';
		vacWin.showNavBar();
		//catWin.titleImage = 'images/jobbroker_bar.png';
		catWin.showNavBar();
		linkedInWin.titleImage = 'images/jobbroker_bar.png';
		linkedInWin.showNavBar();
//		newsWin.titleImage = 'images/jobbroker_bar.png';
		newsWin.showNavBar();
    }
});

var jbTab = Ti.UI.createTab({
	icon: 'images/tabs/jobbroker.png',
	title: 'Job Broker',
	window:jbWin
});

// end of job broker tab.

var tabGroup = Titanium.UI.createTabGroup({
    barColor: barColor
});

// add tabs to tabgroup
tabGroup.addTab(jbTab);
tabGroup.addTab(vacTab);
tabGroup.addTab(catTab);
tabGroup.addTab(linkedInTab);
tabGroup.addTab(newsTab);

// create animation for loading screen transition
tabGroup.open({
    transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
});

Ti.App.addEventListener('youtubeVideo', function(e) {
	
	var webView = Titanium.UI.createWebView({
	     url: 'http://www.youtube.com/watch?v=FWTgnCLrdt8'
	});
	// 
	var youtubeWin = Ti.UI.createWindow({
	     title: 'Job Broker Bedrijfsfilm',
	     backgroundColor:'#ddd',
	     barColor: barColor
	});
	
	var backbtn = Ti.UI.createButton({
	     title:'Close'
 	});
	
	// add back button to reload the jobbroker youtube movie
	backbtn.addEventListener('click', function() {
		youtubeWin.close();
	});
	
	youtubeWin.add(webView);

	youtubeWin.setRightNavButton(backbtn);
	jbTab.open(youtubeWin);
});