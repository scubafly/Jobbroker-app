
// include helpeer functions
Ti.include('../helper_functions.js');

// create window for this tab.
var currentWin = Ti.UI.currentWindow;

// define rss ( XML ) feed url for this tab.
var newsurl = "http://jobbroker.nl/index.php?option=com_rssfeed&task=getnewsappfeed";
// create http client for pulling the rss ( XML ) feed
var newsxhr = Titanium.Network.createHTTPClient();
//newsxhr.open('GET', newsurl);

// define variables which keep the status of pulling and reloading of the tableView
var pulling = false;
var reloading = false;
var scrolled = 0;

// connect to database
var db = Ti.Database.install('newsitems.sqlite', 'news');
	
function pullDataFromDB(){

	var query = 'SELECT title, htmlDescription, url, description FROM news';
	var rows = db.execute(query);
	var data = [];

	while (rows.isValidRow()) {
		var tableViewRow = Ti.UI.createTableViewRow({
			height:55,
			width:windowWidth,
			top:0,
			hasChild:true,
			url: '' + rows.fieldByName('url') + '',
			itemTitle: ' ' + rows.fieldByName('title') + '',
			htmlDesc: '' + rows.fieldByName('htmlDescription') + '',
			desc: '' + rows.fieldByName('description') + ''

		});
		tableViewRow.add(createTableNewsItemTitle( rows.fieldByName('title') ) );
		tableViewRow.add(createTableNewsItemDesc( rows.fieldByName('description') ) );

		data.push(tableViewRow);
	    rows.next();
	};
	return data;
};

// create header for loading when the tab is opened
var headerView = Ti.UI.createView({
	backgroundColor:'#e2e7ed',
	width:320,
	height:60,
	top: 0
});

// create label for loading header
headerStatusLabel = Ti.UI.createLabel({
	text:"Loading...",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});

// create border for loading header
var border1 = Ti.UI.createView({
	backgroundColor:'#576c89',
	height:2,
	bottom:0
});

// create lastUpdatedLabel for loading header
var headerLastUpdatedLabel = Ti.UI.createLabel({
	text:"Last Updated: "+formatDate(),
	left:55,
	width:200,
	bottom:15,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:12},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});

// create activity indicator for loading header ( loading circle jQuery style )
var actIndi = Ti.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30,
	color:'#000'
});

headerView.add(border1);
headerView.add(headerStatusLabel);
headerView.add(headerLastUpdatedLabel);
headerView.add(actIndi);
// end of loading header view

// create table view for showing the data
 var tableView = Ti.UI.createTableView({
	data: pullDataFromDB()
 });

// create border between tableView and activity indicator for reloading view
var border = Ti.UI.createView({
	backgroundColor:'#576c89',
	height:2,
	bottom:0
});

// create a view to place the activity indicator in.
var tableHeader = Ti.UI.createView({
	backgroundColor:'#e2e7ed',
	width:320,
	height:60
});

// create a view of the arrow for pointing it up and down
var arrow = Ti.UI.createView({
	backgroundImage: '../images/whiteArrow.png',
	width:23,
	height:60,
	bottom:10,
	left:20
});

// define status label
var statusLabel = Ti.UI.createLabel({
	text:"Pull to reload",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});

// define lastUpdated label
var lastUpdatedLabel = Ti.UI.createLabel({
	text:"Last Updated: "+formatDate(),
	left:55,
	width:200,
	bottom:15,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:12},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});

// create activity indicator ( loading image )
var actInd = Ti.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30
});

function beginReloading() {
	newsxhr.open('GET', newsurl);
	newsxhr.send();	
}

function endReloading() {

	if(!scrolled) {
		tableView.top = 0;
		tableView.height = 367;
		currentWin.remove(headerView);
		actIndi.hide();
		scrolled = 1;
		
		// set tableHeader to the header pull view
		tableView.headerPullView = tableHeader;
		
		// create eventListener for the pulling event
		tableView.addEventListener('scroll',function(e)
		{
			var offset = e.contentOffset.y;
			var t = Ti.UI.create2DMatrix();
			if (offset <= -65.0 && !pulling)
			{
				t = t.rotate(-180);
				pulling = true;
				arrow.animate({transform:t,duration:180});
				statusLabel.text = "Release to refresh...";
			}
			else if (pulling && offset > -65.0 && offset < 0)
			{
				pulling = false;
				arrow.animate({transform:t,duration:180});
				statusLabel.text = "Pull down to refresh...";
			}
		});
		
		// create evendListener for release of the scroll when the table is pulled enough to start updating

		tableView.addEventListener('scrollEnd',function(e)
		{
			if (pulling && !reloading && e.contentOffset.y <= -65.0)
			{
				reloading = true;
				pulling = false;
				arrow.hide();
				actInd.show();
				statusLabel.text = "Reloading...";
				tableView.setContentInsets({top:60},{animated:true});
				arrow.transform=Ti.UI.create2DMatrix();
				beginReloading();
			}
		});
	}
	
	tableView.setData(pullDataFromDB());

	// reset loading view
	tableView.setContentInsets({top:0},{animated:true});
	reloading = false;
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	actInd.hide();
	arrow.show();
}

tableHeader.add(border);
tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

newsxhr.onload = function() {
     var xml = Ti.XML.parseString(encodeXMLString(this.responseText));
     var items = xml.documentElement.getElementsByTagName("item");
     if(items != null) {
 		var newsArray = [];
         for (var i = 0; i < items.length; i++) {
             var curItem = items.item(i);
             var this_post_title = curItem.getElementsByTagName("title").item(0).text ;
             var post_link = curItem.getElementsByTagName("link").item(0).text;
             var post_description = decodeURI(curItem.getElementsByTagName("description").item(0).text);
             var post_Htmldescription = decodeURI(curItem.getElementsByTagName("rawdesc").item(0).text);
 
 			newsArray.push({
 				title: '' + this_post_title + '',
 				desc: '' + post_description + '',
 				htmlDesc: '' + post_Htmldescription + '',
 				url: '' + post_link + ''
 			});
         }
 		
 		// install db connection
// 		var db = Ti.Database.install('newsitems.sqlite','news');
 		
 		var n = 0;
 		var query = null;
 		var result = null;
 		// set all newsitems to old
 		query = "UPDATE news SET new = 0";
 		db.execute(query);
 		
 		var newItemsUrl = [];
 		for(var t = 0; t < newsArray.length; t++) {
 			// create array of new urls to check old items if they're still active 
 			newItemsUrl.push(newsArray[t].url);
 			
 			// insert if url not in db and status is new
 			query = "SELECT id FROM news WHERE url = '" + newsArray[t].url + "'";
 			row = db.execute(query);
 			if(!row.isValidRow()) {
 				db.execute("INSERT INTO news ( title, url, description, htmlDescription, new ) VALUES ( ?, ?, ?, ?, ?)",
 					newsArray[t].title, newsArray[t].url, newsArray[t].desc, newsArray[t].htmlDesc, 1
 				);
 			}
 		};
 		
 		// select all old newsitems
 		var oldItemsUrl = db.execute("SELECT DISTINCT url FROM news WHERE new = 0");
 		var key = '';
 		var deleteItems = [];
 
 		// check old items if they're still active
 		while(oldItemsUrl.isValidRow()) {
 			if( !in_array( oldItemsUrl.fieldByName('url'), newItemsUrl ) ) {
 				deleteItems.push(oldItemsUrl.fieldByName('url'));
 			}
 			oldItemsUrl.next();
 		}
 
 		// delete from news were url in oldItemsUrl
 		query = "DELETE FROM news WHERE url in ('" + implode("','",deleteItems) + "')";
 
 		db.execute(query);
 		// update view
		endReloading();
     }
 };

tableView.addEventListener('click', function(e) {
    if (e.rowData.itemTitle) {

        var win = Ti.UI.createWindow({
            title: e.rowData.itemTitle,
            backgroundColor: "#fff",
			backButtonTitle: 'Nieuws'
        });

        var webbie = Ti.UI.createWebView({
            html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">' + e.rowData.itemTitle + '</h1>\n' + e.rowData.htmlDesc
        });

        win.add(webbie);
        var button = createActionButton(e.rowData.url, e.rowData.itemTitle, e.rowData.desc);
        win.setRightNavButton(button);

        Ti.UI.currentTab.open(win);
    }
});

tableView.top = 60;
tableView.height = 306;
actIndi.show();
currentWin.add(headerView);
currentWin.add(tableView);
beginReloading();

