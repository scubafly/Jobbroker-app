Ti.include('../helper_functions.js');
var currentWin = Ti.UI.currentWindow;

var vacaturesurl="http://jobbroker.nl/index.php?option=com_rssfeed&task=loadappfeed&url=vacatures";
var xhr = Titanium.Network.createHTTPClient();
//xhr.open('GET',vacaturesurl);

var pulling = false;
var reloading = false;
var scrolled = 0;

// create table view
var tableView = Ti.UI.createTableView({
    
});


// set the data from the database to the array
function getData() {
    var db = Ti.Database.install('vacancies.sqlite', 'categories');
    
    var rows = db.execute('SELECT id, name FROM categories ORDER BY name LIKE "Overig", name ASC');
    
    var dataArray = [];
    
    while (rows.isValidRow()) {
        dataArray.push({title:'' + rows.fieldByName('name') + '', hasChild:true, path:'category_vacancies.js', id:rows.fieldByName('id')});
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
	data: getData()
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
	
	tableView.setData(getData());

	// reset loading view
	tableView.setContentInsets({top:0},{animated:true});
	reloading = false;
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	actInd.hide();
	arrow.show();
}

tableView.addEventListener('click', function(e) {
    if(e.rowData.path) {
        var win = Ti.UI.createWindow({
            url:e.rowData.path,
            title:e.rowData.title
        });
        
        var categoryId = e.rowData.id;
        win.categoryId = categoryId;
        Ti.UI.currentTab.open(win);
    } 
});

// add the tableView to hte current window
currentWin.add(tableView);

// call the setData function to attach the database results to the array
//setData();

tableView.top = 60;
tableView.height = 306;
actIndi.show();
currentWin.add(headerView);
currentWin.add(tableView);

beginReloading();

xhr.onload = function() {
	var vacdb = Ti.Database.install('vacancies.sqlite', 'vac');
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
		vacdb.execute(query);
		
		var newItemsUrl = [];
		for(var t = 0; t < vacArray.length; t++) {
			// create array of new urls to check old items if they're still active 
			newItemsUrl.push(vacArray[t].url);
			
			// insert if url not in db and status is new
			query = "SELECT id FROM vac WHERE url = '" + vacArray[t].url + "'";
			row = vacdb.execute(query);
			if(!row.isValidRow()) {
//				alert('doInsert');
				vacdb.execute("INSERT INTO vac ( category, title, url, description, htmlDescription, new, substring ) VALUES ( ?, ?, ?, ?, ?, ?, ? )",
					vacArray[t].category, vacArray[t].title, vacArray[t].url, vacArray[t].desc, vacArray[t].htmlDesc, 1, vacArray[t].substr
				);
			}
		};
		
		// select all old vacancies
		var oldItemsUrl = vacdb.execute("SELECT DISTINCT url FROM vac WHERE new = 0");
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

		vacdb.execute(query);
		vacdb.close();
		// update view
//		Ti.App.fireEvent('app:refreshHomeTable', true);
		endReloading();
    }
};