Ti.include('helper_functions.js');
var windowWidth = Ti.Platform.displayCaps.platformWidth;
var windowHeight = Ti.Platform.displayCaps.platformHeight;
var barColor = '#53A2D5';

// vacancies 
var vacaturesurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=vacatures";
var xhr = Titanium.Network.createHTTPClient();
var vacancies = [];
var vacanciesDesc = [];
var vacanciesHtmlDesc = [];
var vacanciesUrl = [];
var vacanciesTitle = [];
xhr.open('GET',vacaturesurl); // uitzondering op de regel om het eerste scherm in te laden
// create rss tab // vacatures jobbroker
var rssWindow = Titanium.UI.createWindow({
    title: '',
    barImage: 'jobbroker_bar.png',
    backgroundColor:'#fff'
});

var rssTab = Titanium.UI.createTab({
    icon:'images/tabs/jobbroker.png',
    title:'Job Broker',
    window:rssWindow
});

rssWindow.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];

Titanium.Gesture.addEventListener('orientationchange', function(e){
    if(e.orientation == Titanium.UI.LANDSCAPE_RIGHT){
        rssWindow.hideNavBar();
    } else if(e.orientation == Titanium.UI.LANDSCAPE_LEFT){
        rssWindow.hideNavBar();
    } else if(e.orientation == Titanium.UI.PORTRAIT){
        rssWindow.showNavBar();
    }
});
// end of rrs tab

// newsitems
var newsurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=getnewsappfeed";
var newsxhr = Titanium.Network.createHTTPClient();
var newsfetched = false;
var newsItems = [];
var newsItemsDesc = [];
var newsItemsHtmlDesc = [];
var newsItemsUrl = [];
var newsItemsTitle = [];
// create news tab
var newsWin = Titanium.UI.createWindow({
    title: '',
    barImage: 'jobbroker_bar.png',
    backgroundColor:'#fff'
});

var newsTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Nieuws',
    window:newsWin
});

newsWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
    
Titanium.Gesture.addEventListener('orientationchange', function(e){
    if(e.orientation == Titanium.UI.LANDSCAPE_RIGHT){
        newsWin.hideNavBar();
    } else if(e.orientation == Titanium.UI.LANDSCAPE_LEFT){
        newsWin.hideNavBar();
    } else if(e.orientation == Titanium.UI.PORTRAIT){
        newsWin.showNavBar();
    }
});
// end of news tab

// vacatures inkoop verkoop
var salesurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=verkoop";
var salesxhr = Titanium.Network.createHTTPClient();
var salesfetched = false;
var salesItems = [];
var salesItemsDesc = [];
var salesItemsHtmlDesc = [];
var salesItemsUrl = [];
var salesItemsTitle = [];
// create sales tab
var salesWin = Titanium.UI.createWindow({
    backgroundColor:'#fff',
    barColor: barColor
});

var salesTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Verkoop & Inkoop',
    window:salesWin
});

salesWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of sales tab

// vacatures administratie
var adminiurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=administratie";
var adminixhr = Titanium.Network.createHTTPClient();
var adminifetched = false;
var adminiItems = [];
var adminiItemsDesc = [];
var adminiItemsHtmlDesc = [];
var adminiItemsUrl = [];
var adminiItemsTitle = [];
// create admini tab
var adminiWin = Titanium.UI.createWindow({
    //title: 'Administratief & Secretariee vacatures',
    backgroundColor:'#fff',
    barColor: barColor
});

var adminiTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Administratief & Secretarieel',
    window:adminiWin
});

adminiWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of sales tab

// vacatures asset management
var asseturl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=asset";
var assetxhr = Titanium.Network.createHTTPClient();
var assetfetched = false;
var assetItems = [];
var assetItemsDesc = [];
var assetItemsHtmlDesc = [];
var assetItemsUrl = [];
var assetItemsTitle = [];
// create asset tab
var assetWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var assetTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Asset Management & Operation',
    window:assetWin
});

assetWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of asset tab

// vacatures audit
var auditurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=audit";
var auditxhr = Titanium.Network.createHTTPClient();
var auditfetched = false;
var auditItems = [];
var auditItemsDesc = [];
var auditItemsHtmlDesc = [];
var auditItemsUrl = [];
var auditItemsTitle = [];
// create audit tab
var auditWin = Titanium.UI.createWindow({
    backgroundColor:'#fff',
    barColor: barColor
});

var auditTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Audit & Compliance',
    window:auditWin
});

auditWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of audit tab

// vacatures finance
var financeurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=finance";
var financexhr = Titanium.Network.createHTTPClient();
var financefetched = false;
var financeItems = [];
var financeItemsDesc = [];
var financeItemsHtmlDesc = [];
var financeItemsUrl = [];
var financeItemsTitle = [];
// create finance tab
var financeWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff'
});

var financeTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Finance',
    window:financeWin
});

financeWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of finance tab

// vacatures it
var iturl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=it";
var itxhr = Titanium.Network.createHTTPClient();
var itfetched = false;
var itItems = [];
var itItemsDesc = [];
var itItemsHtmlDesc = [];
var itItemsUrl = [];
var itItemsTitle = [];
// create it tab
var itWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var itTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'IT & Internet & Telecommunicatie',
    window:itWin
});

itWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of it tab

// vacatures tax
var taxurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=tax";
var taxxhr = Titanium.Network.createHTTPClient();
var taxfetched = false;
var taxItems = [];
var taxItemsDesc = [];
var taxItemsHtmlDesc = [];
var taxItemsUrl = [];
var taxItemsTitle = [];
// create tax tab
var taxWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var taxTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Juridisch & Tax',
    window:taxWin
});

taxWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of tax tab

// vacatures management
var managementurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=management";
var managementxhr = Titanium.Network.createHTTPClient();
var managementfetched = false;
var managementItems = [];
var managementItemsDesc = [];
var managementItemsHtmlDesc = [];
var managementItemsUrl = [];
var managementItemsTitle = [];
// create management tab
var managementWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var managementTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Management',
    window:managementWin
});

managementWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of management tab

// vacatures marketing
var marketingurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=marketing";
var marketingxhr = Titanium.Network.createHTTPClient();
var marketingfetched = false;
var marketingItems = [];
var marketingItemsDesc = [];
var marketingItemsHtmlDesc = [];
var marketingItemsUrl = [];
var marketingItemsTitle = [];
// create marketing tab
var marketingWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var marketingTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Marketing, Reclame & Communicatie',
    window:marketingWin
});

marketingWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of marketing tab

// vacatures overig
var overigurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=overig";
var overigxhr = Titanium.Network.createHTTPClient();
var overigfetched = false;
var overigItems = [];
var overigItemsDesc = [];
var overigItemsHtmlDesc = [];
var overigItemsUrl = [];
var overigItemsTitle = [];
// create overig tab
var overigWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var overigTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Overig',
    window:overigWin
});

overigWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of overig tab

// vacatures pr
var prurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=pr";
var prxhr = Titanium.Network.createHTTPClient();
var prfetched = false;
var prItems = [];
var prItemsDesc = [];
var prItemsHtmlDesc = [];
var prItemsUrl = [];
var prItemsTitle = [];
// create pr tab
var prWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var prTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Personeel & Organisatie',
    window:prWin
});

prWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of pr tab

// vacatures risk
var riskurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=risk";
var riskxhr = Titanium.Network.createHTTPClient();
var riskfetched = false;
var riskItems = [];
var riskItemsDesc = [];
var riskItemsHtmlDesc = [];
var riskItemsUrl = [];
var riskItemsTitle = [];
// create risk tab
var riskWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var riskTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Risk & Credit Management',
    window:riskWin
});

riskWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of risk tab

// vacatures verzeker
var verzekerurl = "http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=risk";
var verzekerxhr = Titanium.Network.createHTTPClient();
var verzekerfetched = false;
var verzekerItems = [];
var verzekerItemsDesc = [];
var verzekerItemsHtmlDesc = [];
var verzekerItemsUrl = [];
var verzekerItemsTitle = [];
// create verzeker tab
var verzekerWin = Titanium.UI.createWindow({
    
    backgroundColor:'#fff',
    barColor: barColor
});

var verzekerTab = Titanium.UI.createTab({
    icon:'images/tabs/newstab.png',
    title:'Verzekeringen & Hypotheken',
    window:verzekerWin
});

verzekerWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of verzeker tab

/**
 * Encode XML string, to be able to use with Titanium's XML parser
 * @param {Object} s
 */
function encodeXMLString(s) {
    // XML characters for tags
    var conv = {
        '%3C': '<', 
        '%3D': '=', 
        '%3E': '>', 
        '%0D%0A': "\n", 
        '%20': ' ', 
        '%22': '"',
        '%09': "\t", 
        '%0A': "\n", 
        '%0D': "\n", 
        '%5B': '[', 
        '%5D': ']' 
    };
 
    s = encodeURI(s);
    // Replace XML characters back to normal
    for (var i in conv) {
        if (conv.hasOwnProperty(i)) {
            s = s.replace(new RegExp(i, 'g'), conv[i]);
        }
    }
 
    return s;
}

Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup({
    barColor: barColor
});


// create youtube tab
var webView = Titanium.UI.createWebView({
    url: 'http://www.youtube.com/watch?v=FWTgnCLrdt8'
});

var youtubeWin = Ti.UI.createWindow({
    title: 'Job Broker Bedrijfsfilm',
    backgroundColor:'#ddd',
    barColor: barColor
});
var youtubeTab = Ti.UI.createTab({
    icon:'images/tabs/youTube.png',
    title:'YouTube',
    window:youtubeWin
});

var backbtn = Ti.UI.createButton({
    title:'YouTube'
});

// add back button to reload the jobbroker youtube movie
backbtn.addEventListener('click', function() {
    // reset the url to the jobbroker movie
    webView.url = 'http://www.youtube.com/watch?v=FWTgnCLrdt8';
    // reload the page ( repaint so the new url is loaded )
    webView.repaint();
});

youtubeWin.add(webView);
youtubeWin.setLeftNavButton(backbtn);

// add orientation modes to youtube tab
youtubeWin.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
    ];
// end of youtube tab


// create linkedIn tab
var linkedInWin = Ti.UI.createWindow({
    title: '',
    barImage: 'jobbroker_bar.png',
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
        linkedInWin.hideNavBar();
		linkedInImage.image = 'images/linkedInPage_landscape.png';
		linkedInView.width = windowHeight;
		linkedInView.height = windowWidth;
    } else if(e.orientation == Titanium.UI.LANDSCAPE_LEFT){
        linkedInWin.hideNavBar();
		linkedInImage.image = 'images/linkedInPage_landscape.png';
		linkedInView.width = windowHeight;
		linkedInView.height = windowWidth;
    } else if(e.orientation == Titanium.UI.PORTRAIT){
		linkedInImage.image = 'images/linkedInPage_portrait.png';
		linkedInView.width = windowWidth;
		linkedInView.height = windowHeight;
        linkedInWin.showNavBar();
		// set image back to portrait
    }
});
// end of linkedIn tab

//categories main window

var catWin = Ti.UI.createWindow({
   title:'db vacancies',
   url:'vacancies/categories.js'
});

var catTab = Ti.UI.createTab({
   icon: 'images/tabs/KS_nav_ui.png', // image moet nog aangepast worden
   title: 'Vacatures per categorie',
   window:catWin
});

tabGroup.addTab(catTab);

//end of tb testing

// add tabs to tabgroup
tabGroup.addTab(rssTab);
tabGroup.addTab(youtubeTab);
tabGroup.addTab(linkedInTab);
tabGroup.addTab(newsTab);
tabGroup.addTab(adminiTab);
tabGroup.addTab(assetTab);
tabGroup.addTab(auditTab);
tabGroup.addTab(financeTab);
tabGroup.addTab(itTab);
tabGroup.addTab(taxTab);
tabGroup.addTab(managementTab);
tabGroup.addTab(marketingTab);
tabGroup.addTab(prTab);
tabGroup.addTab(riskTab);
tabGroup.addTab(salesTab);
tabGroup.addTab(verzekerTab);
tabGroup.addTab(overigTab);

tabGroup.addEventListener('focus', function(e) {
    if(e.tab) {
        switch(e.tab.title) {
            case 'Nieuws':
                if (newsfetched == false ) {
                    newsxhr.open('GET',newsurl);
                    newsxhr.send();
                    newsfetched = true;
                }
                break;
			
            case 'Verkoop & Inkoop':
                if (salesfetched == false ) {
                    salesxhr.open('GET',salesurl);
                    salesxhr.send();
                    salesfetched = true;
                }
                break;
			
            case 'Administratief & Secretarieel':
                if (adminifetched == false ) {
                    adminixhr.open('GET',adminiurl);
                    adminixhr.send();
                    adminifetched = true;
                }
                break;
			
            case 'Asset Management & Operation':
                if (assetfetched == false ) {
                    assetxhr.open('GET',asseturl);
                    assetxhr.send();
                    assetfetched = true;
                }
                break;
			
            case 'Finance':
                if (financefetched == false ) {
                    financexhr.open('GET',financeurl);
                    financexhr.send();
                    financefetched = true;
                }
                break;
			
            case 'IT & Internet & Telecommunicatie':
                if (itfetched == false ) {
                    itxhr.open('GET',iturl);
                    itxhr.send();
                    itfetched = true;
                }
                break;
			
            case 'Juridisch & Tax':
                if (taxfetched == false ) {
                    taxxhr.open('GET',taxurl);
                    taxxhr.send();
                    taxfetched = true;
                }
                break;
			
            case 'Management':
                if (managementfetched == false ) {
                    managementxhr.open('GET',managementurl);
                    managementxhr.send();
                    managementfetched = true;
                }
                break;
			
            case 'Marketing, Reclame & Communicatie':
                if (marketingfetched == false ) {
                    marketingxhr.open('GET',marketingurl);
                    marketingxhr.send();
                    marketingfetched = true;
                }
                break;
			
            case 'Overig':
                if (overigfetched == false ) {
                    overigxhr.open('GET',overigurl);
                    overigxhr.send();
                    overigfetched = true;
                }
                break;
			
            case 'Personeel & Organisatie':
                if (prfetched == false ) {
                    prxhr.open('GET',prurl);
                    prxhr.send();
                    prfetched = true;
                }
                break;
			
            case 'Risk & Credit Management':
                if (riskfetched == false ) {
                    riskxhr.open('GET',riskurl);
                    riskxhr.send();
                    riskfetched = true;
                }
                break;
			
            case 'Verzekeringen & Hypotheken':
                if (verzekerfetched == false ) {
                    verzekerxhr.open('GET',verzekerurl);
                    verzekerxhr.send();
                    verzekerfetched = true;
                }
                break;
			
            case 'Audit & Compliance':
                if (auditfetched == false ) {
                    auditxhr.open('GET',auditurl);
                    auditxhr.send();
                    auditfetched = true;
                }
                break;

        }
    }
});

tabGroup.open({
    transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
});


function createActionButton(articleUrl, articleTitle, articleDesc ) {
    var button = Titanium.UI.createButton({
        title: '',
        systemButton:Titanium.UI.iPhone.SystemButton.ACTION
    });
	
    button.addEventListener('click',function()	{
        var dialog = Titanium.UI.createOptionDialog({
            title: '',
            options: ['Openen in webbrowser','Verzenden als Email','Reageren','Annuleren'],
            cancel:3
        });
		
        dialog.addEventListener('click', function(evnt) {
            switch(evnt.index) {
                case 0: // open in browser						
                    var subwebwin = Ti.UI.createWindow({
                        title: '',
                        backgroundColor:'#fff'
                    });
                    var siteview = Ti.UI.createWebView({
                        url:articleUrl
                    });
                    subwebwin.add(siteview);
                    tabGroup.activeTab.open(subwebwin);
					
                    break;
                case 1: // send as email
                    var emailDialog = Titanium.UI.createEmailDialog();
                    emailDialog.subject = articleTitle; // add vacature of nieuwsbericht titel hier
                    emailDialog.messageBody = articleTitle+"\n "+articleDesc+'\n \n<a href="'+articleUrl+'">'+articleTitle+'</a>'; // add vacancy text and url to vacancy here
                    emailDialog.open();
                    break;
                case 2: // reageren op vacature
                    var emailDialog2 = Titanium.UI.createEmailDialog();
                    emailDialog2.toRecipients = ['info@jobbroker.nl'];
                    emailDialog2.subject = 'Reactie op: '+articleTitle; // add vacature of nieuwsbericht titel hier
                    emailDialog2.messageBody = 'Beste Job Broker,\n Hierbij wil ik reageren op '+articleTitle+'\n \n<a href="'+articleUrl+'">'+articleTitle+'</a>'; // add vacancy text and url to vacancy here
                    emailDialog2.open();
                    break;
            }
        });
        dialog.show();
    });

    return button;
}

xhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {
		var vacArray = [];
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
			var post_category = unescape(curItem.getElementsByTagName("cat").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:70, 
                width:'auto',
                top:0,
                hasChild:true
            });
            
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
		
			row.title = this_post_title;
			//Ti.API.info(addslashes(post_description));
			vacArray.push({
				title: '' + this_post_title + '',
				desc: '' + post_description + '',
				htmlDesc: '' + post_Htmldescription + '',
				category: '' + post_category + '',
				url: '' + post_link + ''
			});
			
            vacanciesDesc.push(post_description);
            vacanciesHtmlDesc.push(post_Htmldescription);
            vacancies.push(row);
            vacanciesUrl.push(post_link);
            vacanciesTitle.push(this_post_title);
        }
		
		// install db connection
		var db = Ti.Database.install('vacancies/vacancies.sqlite','vac');
		
		var n = 0;
		var query = null;
		var result = null;
		// set all vacancies to old
		query = "UPDATE vac SET new = 0";
		db.execute(query);
		
		var newItemsUrl = [];
		for(var t = 0; t < vacArray.length; t++) {
			// create array of new urls to check old items if they're still active 
			newItemsUrl.push(vacArray[t].url);
			
			// insert if url not in db and status is new
			query = "SELECT id FROM vac WHERE url = '" + vacArray[t].url + "'";
			row = db.execute(query);
			if(!row.isValidRow()) {
				db.execute("INSERT INTO vac ( category, title, url, description, htmlDescription, new ) VALUES ( ?, ?, ?, ?, ?, ?)",
					vacArray[t].category, vacArray[t].title, vacArray[t].url, vacArray[t].desc, vacArray[t].htmlDesc, 1
				);
			}
		};
		
		// select all old vacancies
		var oldItemsUrl = db.execute("SELECT DISTINCT url FROM vac WHERE new = 0");
		var key = '';
		var deleteItems = [];

		// check old items if they're still active
		while(oldItemsUrl.isValidRow()) {
			if( !in_array( oldItemsUrl.fieldByName('url'), newItemsUrl ) ) {
				deleteItems.push(oldItemsUrl.fieldByName('url'));
			}
			oldItemsUrl.next();
		}

		// delete from vac were url in oldItemsUrl
		query = "DELETE FROM vac WHERE url in ('" + implode("','",deleteItems) + "')";
		Ti.API.info(query);
		db.execute(query);
		
        var tv = Titanium.UI.createTableView({
            data:vacancies,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        rssWindow.add(tv);
        tv.addEventListener('click',function(e) {
            var webwin = Ti.UI.createWindow({
                title: 'Vacature',
                backgroundColor:'#fff',
                backButtonTitle:'Vacature overzicht'
            });
            var button = createActionButton( vacanciesUrl[e.index], vacanciesTitle[e.index], vacanciesDesc[e.index] );
            var rssview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+vacanciesTitle[e.index]+'</h1>\n'+vacanciesHtmlDesc[e.index]
            });
            webwin.setRightNavButton( button );
            webwin.add(rssview);
            rssTab.open(webwin);
        });
    }
};


// load first tab
xhr.send();


newsxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
           
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            newsItemsDesc.push(post_description);
            newsItemsHtmlDesc.push(post_Htmldescription);
            newsItemsTitle.push(this_post_title);
            newsItemsUrl.push(post_link);
            newsItems.push(row);
        }

        var newstv = Titanium.UI.createTableView({
            data:newsItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        newsWin.add(newstv);
        newstv.addEventListener('click', function(e) {
            var newswindow = Ti.UI.createWindow({
                title: 'Nieuwsitem',
                backgroundColor:'#fff',
                barColor: barColor,
                backButtonTitle: 'Nieuws'
            });
		
            var newsview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+newsItemsTitle[e.index]+'</h1>'+ newsItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( newsItemsUrl[e.index], newsItemsTitle[e.index], newsItemsDesc[e.index] );
            newswindow.setRightNavButton( button );
            newswindow.add(newsview);
            newsTab.open(newswindow);
        });
    }
    else {
        alert('Momenteel zijn er geen nieuwsberichten.');
    }
};

salesxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    salesWin.title = 'Verkoop & Inkoop';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
          
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            salesItemsDesc.push(post_description);
            salesItemsHtmlDesc.push(post_Htmldescription);
            salesItemsTitle.push(this_post_title);
            salesItemsUrl.push(post_link);
            salesItems.push(row);
        }

        var salestv = Titanium.UI.createTableView({
            data:salesItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        salesWin.add(salestv);
        salestv.addEventListener('click', function(e) {
            var saleswindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var salesview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+salesItemsTitle[e.index]+'</h1>'+ salesItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( salesItemsUrl[e.index], salesItemsTitle[e.index], salesItemsDesc[e.index] );
            saleswindow.setRightNavButton( button );
            saleswindow.add(salesview);
            salesTab.open(saleswindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

adminixhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    adminiWin.title = 'Administratief & Secretarieel';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
           
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            adminiItemsDesc.push(post_description);
            adminiItemsHtmlDesc.push(post_Htmldescription);
            adminiItemsTitle.push(this_post_title);
            adminiItemsUrl.push(post_link);
            adminiItems.push(row);
        }

        var adminitv = Titanium.UI.createTableView({
            data:adminiItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        adminiWin.add(adminitv);
        adminitv.addEventListener('click', function(e) {
            var adminiwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var adminiview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+adminiItemsTitle[e.index]+'</h1>'+ adminiItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( adminiItemsUrl[e.index], adminiItemsTitle[e.index], adminiItemsDesc[e.index] );
            adminiwindow.setRightNavButton( button );
            adminiwindow.add(adminiview);
            adminiTab.open(adminiwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

assetxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    assetWin.title = 'Asset Management & Operations';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
           
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            assetItemsDesc.push(post_description);
            assetItemsHtmlDesc.push(post_Htmldescription);
            assetItemsTitle.push(this_post_title);
            assetItemsUrl.push(post_link);
            assetItems.push(row);
        }

        var assettv = Titanium.UI.createTableView({
            data:assetItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        assetWin.add(assettv);
        assettv.addEventListener('click', function(e) {
            var assetwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var assetview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+assetItemsTitle[e.index]+'</h1>'+ assetItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( assetItemsUrl[e.index], assetItemsTitle[e.index], assetItemsDesc[e.index] );
            assetwindow.setRightNavButton( button );
            assetwindow.add(assetview);
            assetTab.open(assetwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

auditxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    auditWin.title = 'Audit & Compliance';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
            
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            auditItemsDesc.push(post_description);
            auditItemsHtmlDesc.push(post_Htmldescription);
            auditItemsTitle.push(this_post_title);
            auditItemsUrl.push(post_link);
            auditItems.push(row);
        }

        var audittv = Titanium.UI.createTableView({
            data:auditItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        auditWin.add(audittv);
        audittv.addEventListener('click', function(e) {
            var auditwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var auditview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+auditItemsTitle[e.index]+'</h1>'+ auditItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( auditItemsUrl[e.index], auditItemsTitle[e.index], auditItemsDesc[e.index] );
            auditwindow.setRightNavButton( button );
            auditwindow.add(auditview);
            auditTab.open(auditwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

financexhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    financeWin.title = 'Finance';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
            
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            financeItemsDesc.push(post_description);
            financeItemsHtmlDesc.push(post_Htmldescription);
            financeItemsTitle.push(this_post_title);
            financeItemsUrl.push(post_link);
            financeItems.push(row);
        }

        var financetv = Titanium.UI.createTableView({
            data:financeItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        financeWin.add(financetv);
        financetv.addEventListener('click', function(e) {
            var financewindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var financeview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+financeItemsTitle[e.index]+'</h1>'+ financeItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( financeItemsUrl[e.index], financeItemsTitle[e.index], financeItemsDesc[e.index] );
            financewindow.setRightNavButton( button );
            financewindow.add(financeview);
            financeTab.open(financewindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

itxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    itWin.title = 'IT & Internet & Telecommunicatie';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
            
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            itItemsDesc.push(post_description);
            itItemsHtmlDesc.push(post_Htmldescription);
            itItemsTitle.push(this_post_title);
            itItemsUrl.push(post_link);
            itItems.push(row);
        }

        var ittv = Titanium.UI.createTableView({
            data:itItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        itWin.add(ittv);
        ittv.addEventListener('click', function(e) {
            var itwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var itview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+itItemsTitle[e.index]+'</h1>'+ itItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( itItemsUrl[e.index], itItemsTitle[e.index], itItemsDesc[e.index] );
            itwindow.setRightNavButton( button );
            itwindow.add(itview);
            itTab.open(itwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

taxxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    taxWin.title = 'Juridisch & Tax';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
            
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            taxItemsDesc.push(post_description);
            taxItemsHtmlDesc.push(post_Htmldescription);
            taxItemsTitle.push(this_post_title);
            taxItemsUrl.push(post_link);
            taxItems.push(row);
        }

        var taxtv = Titanium.UI.createTableView({
            data:taxItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        taxWin.add(taxtv);
        taxtv.addEventListener('click', function(e) {
            var taxwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var taxview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+taxItemsTitle[e.index]+'</h1>'+ taxItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( taxItemsUrl[e.index], taxItemsTitle[e.index], taxItemsDesc[e.index] );
            taxwindow.setRightNavButton( button );
            taxwindow.add(taxview);
            taxTab.open(taxwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

managementxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    managementWin.title = 'Management';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
            
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            managementItemsDesc.push(post_description);
            managementItemsHtmlDesc.push(post_Htmldescription);
            managementItemsTitle.push(this_post_title);
            managementItemsUrl.push(post_link);
            managementItems.push(row);
        }

        var managementtv = Titanium.UI.createTableView({
            data:managementItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        managementWin.add(managementtv);
        managementtv.addEventListener('click', function(e) {
            var managementwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var managementview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+managementItemsTitle[e.index]+'</h1>'+ managementItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( managementItemsUrl[e.index], managementItemsTitle[e.index], managementItemsDesc[e.index] );
            managementwindow.setRightNavButton( button );
            managementwindow.add(managementview);
            managementTab.open(managementwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

marketingxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    marketingWin.title = 'Marketing, Reclame & Communicatie';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
            
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            marketingItemsDesc.push(post_description);
            marketingItemsHtmlDesc.push(post_Htmldescription);
            marketingItemsTitle.push(this_post_title);
            marketingItemsUrl.push(post_link);
            marketingItems.push(row);
        }

        var marketingtv = Titanium.UI.createTableView({
            data:marketingItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        marketingWin.add(marketingtv);
        marketingtv.addEventListener('click', function(e) {
            var marketingwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var marketingview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+marketingItemsTitle[e.index]+'</h1>'+ marketingItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( marketingItemsUrl[e.index], marketingItemsTitle[e.index], marketingItemsDesc[e.index] );
            marketingwindow.setRightNavButton( button );
            marketingwindow.add(marketingview);
            marketingTab.open(marketingwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

overigxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    overigWin.title = 'Overig';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });

            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            overigItemsDesc.push(post_description);
            overigItemsHtmlDesc.push(post_Htmldescription);
            overigItemsTitle.push(this_post_title);
            overigItemsUrl.push(post_link);
            overigItems.push(row);
        }

        var overigtv = Titanium.UI.createTableView({
            data:overigItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        overigWin.add(overigtv);
        overigtv.addEventListener('click', function(e) {
            var overigwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var overigview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+overigItemsTitle[e.index]+'</h1>'+ overigItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( overigItemsUrl[e.index], overigItemsTitle[e.index], overigItemsDesc[e.index] );
            overigwindow.setRightNavButton( button );
            overigwindow.add(overigview);
            overigTab.open(overigwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie.');
    }
};

prxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    prWin.title = 'Personeel & Organisatie';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });

            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            prItemsDesc.push(post_description);
            prItemsHtmlDesc.push(post_Htmldescription);
            prItemsTitle.push(this_post_title);
            prItemsUrl.push(post_link);
            prItems.push(row);
        }

        var prtv = Titanium.UI.createTableView({
            data:prItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        prWin.add(prtv);
        prtv.addEventListener('click', function(e) {
            var prwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var prview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+prItemsTitle[e.index]+'</h1>'+ prItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( prItemsUrl[e.index], prItemsTitle[e.index], prItemsDesc[e.index] );
            prwindow.setRightNavButton( button );
            prwindow.add(prview);
            prTab.open(prwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

verzekerxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    verzekerWin.title = 'Verzekeringen & Hypotheken';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });
            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            row.link = post_link;
            verzekerItemsDesc.push(post_description);
            verzekerItemsHtmlDesc.push(post_Htmldescription);
            verzekerItemsTitle.push(this_post_title);
            verzekerItemsUrl.push(post_link);
            verzekerItems.push(row);
        }

        var verzekertv = Titanium.UI.createTableView({
            data:verzekerItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        verzekerWin.add(verzekertv);
        verzekertv.addEventListener('click', function(e) {
            var verzekerwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var verzekerview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+verzekerItemsTitle[e.index]+'</h1>'+ verzekerItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( verzekerItemsUrl[e.index], verzekerItemsTitle[e.index], verzekerItemsDesc[e.index] );
            verzekerwindow.setRightNavButton( button );
            verzekerwindow.add(verzekerview);
            verzekerTab.open(verzekerwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};

riskxhr.onload = function() {
    var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
    riskWin.title = 'Risk & Credit Management';
    var items = xml.documentElement.getElementsByTagName("item");
    if(items != null) {	
        for (var i = 0; i < items.length; i++) {
            var curItem = items.item(i);
            var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
            var post_link = curItem.getElementsByTagName("link").item(0).text;
            var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
            var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
            var row = Ti.UI.createTableViewRow({
                height:'auto', 
                width:windowWidth,
                top:0,
                hasChild:true
            });

            row.add(createTableItemTitle(this_post_title));
            row.add(createTableItemDesc(post_description));
            
            row.link = post_link;
            riskItemsDesc.push(post_description);
            riskItemsHtmlDesc.push(post_Htmldescription);
            riskItemsTitle.push(this_post_title);
            riskItemsUrl.push(post_link);
            riskItems.push(row);
        }

        var risktv = Titanium.UI.createTableView({
            data:riskItems,
            top:0,
            width:windowWidth,
            height:windowHeight-112
        });
        riskWin.add(risktv);
        risktv.addEventListener('click', function(e) {
            var riskwindow = Ti.UI.createWindow({
                title: 'vacature',
                backgroundColor:'#fff'
            });

            var riskview = Ti.UI.createWebView({
                html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">'+riskItemsTitle[e.index]+'</h1>'+ riskItemsHtmlDesc[e.index]
            });
		
            var button = createActionButton( riskItemsUrl[e.index], riskItemsTitle[e.index], riskItemsDesc[e.index] );
            riskwindow.setRightNavButton( button );
            riskwindow.add(riskview);
            riskTab.open(riskwindow);
        });
    }
    else {
        alert('Momenteel zijn er geen vacatures in deze categorie gevonden.');
    }
};