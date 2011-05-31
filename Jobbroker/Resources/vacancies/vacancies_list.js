Ti.include('../helper_functions.js');
var currentWin = Ti.UI.currentWindow;

var vacaturesurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=vacatures";
var xhr = Titanium.Network.createHTTPClient();
//xhr.open('GET',vacaturesurl);

var pulling = false;
var reloading = false;
var scrolled = 0;

// connect to db


// set the data from the database to the array
function pullDBdata() {
	var db = Ti.Database.install('../vacancies/vacancies.sqlite', 'vac');
    var categoryId = Ti.UI.currentWindow.categoryId;
    var query = 'SELECT title, htmlDescription, url, description, substring FROM vac';
    var rows = db.execute(query);

    var dataArray = [];

    while (rows.isValidRow()) {
		var tableViewRow = Ti.UI.createTableViewRow({
			height:70,
		 	width:windowWidth,
		 	top:0,
		 	hasChild:true,
			url: '' + rows.fieldByName('url') + '',
			itemTitle: '' + rows.fieldByName('title') + '',
			htmlDesc: '' + rows.fieldByName('htmlDescription') + '',
			desc: '' + rows.fieldByName('description') + ''	
		});
		tableViewRow.add(createTableItemTitle( rows.fieldByName('title') ) );
		tableViewRow.add(createTableItemDesc( rows.fieldByName('description') ) );
		tableViewRow.add(createsubString( rows.fieldByName('substring') ) );
		
		dataArray.push(tableViewRow);
        rows.next();
    };
	db.close();
   	return dataArray;
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
	height:60,
	color:'#000'
});

headerView.add(border1);
headerView.add(headerStatusLabel);
headerView.add(headerLastUpdatedLabel);
headerView.add(actIndi);
// end of loading header view

// create table view for showing the data
 var tableView = Ti.UI.createTableView({
	data: pullDBdata()
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

tableHeader.add(border);
tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

// set tableHeader to the header pull view


function beginReloading() {
	xhr.open('GET', vacaturesurl);
	xhr.send();	
}

function endReloading() {

	if(!scrolled) {
		tableView.top = 0;
		tableView.height = 367;
		currentWin.remove(headerView);
		actIndi.hide();
		scrolled = 1;
		
		// load this when refreshcontent onload app has finished to prevent duplicate headerPullViews
		tableView.headerPullView = tableHeader;
		tableView.addEventListener('scroll', function(e) {
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
	
	tableView.setData(pullDBdata());

	// reset loading view
	tableView.setContentInsets({top:0},{animated:true});
	reloading = false;
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	actInd.hide();
	arrow.show();
}

xhr.onload = function() {
	var db = Ti.Database.install('../vacancies/vacancies.sqlite', 'vac');
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
			var substring = curItem.getElementsByTagName("substr").item(0).text;
			
			vacArray.push({
				title: '' + this_post_title + '',
				desc: '' + post_description + '',
				htmlDesc: '' + post_Htmldescription + ' <br /> Dit Openen in de webbrowser?, Doorsturen als Email? of Reageren? <br /> Druk op de actieknop in de rechter bovenhoek.',
				category: '' + post_category + '',
				url: '' + post_link + '',
				substr: '' + substring + ''
			});
        }
		
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
//				alert('doInsert');
				db.execute("INSERT INTO vac ( category, title, url, description, htmlDescription, new, substring ) VALUES ( ?, ?, ?, ?, ?, ?, ? )",
					vacArray[t].category, vacArray[t].title, vacArray[t].url, vacArray[t].desc, vacArray[t].htmlDesc, 1, vacArray[t].substr
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

		db.execute(query);
		db.close();
		// update view
//		Ti.App.fireEvent('app:refreshHomeTable', true);
		endReloading();
    }
};


tableView.addEventListener('click', function(e) {
    if (e.rowData.itemTitle) {

        var win = Ti.UI.createWindow({
            title: e.rowData.itemTitle,
            backgroundColor: "#fff",
			backButtonTitle: 'Job Broker'
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
// 
// if(Ti.Platform.name == 'iPhone OS') {
// 	actInd.show();
//  	actInd.color = '#fff';
//  	actInd.message = 'Loading...';
// 
// };
// remove activity window if loading takes longer than 10 seconds and alert user
// setTimeout(function() {
// 	if(refreshed == false){
//   		actWin.hide();
// 		alert('kon geen verbinding maken met de server.\n Er staan mogelijk oude vacatures in deze lijst.');
// 	}
// },10000);
//add the tableView to hte current window
currentWin.add(tableView);

// call the setData function to attach the database results to the array
//setData();

//Ti.App.addEventListener('app:refreshHomeTable', setData);

tableView.top = 60;
tableView.height = 306;
actIndi.show();
currentWin.add(headerView);
currentWin.add(tableView);

beginReloading();
