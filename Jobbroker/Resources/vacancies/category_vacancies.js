Ti.include('../helper_functions.js');
var currentWin = Ti.UI.currentWindow;

currentWin.backButtonTitle = 'Functie categorien';
// create table view
var tableView = Ti.UI.createTableView({

    });

var db = Ti.Database.install('vacancies.sqlite', 'vac');
// set the data from the database to the array
function setData() {

    var categoryId = Ti.UI.currentWindow.categoryId;
    var query = 'SELECT title, htmlDescription, url, description, substring FROM vac WHERE category = "' + categoryId +
    '" OR category LIKE "' + categoryId + '|*|%" OR category LIKE "%|*|' + categoryId +
    '" OR category LIKE "%|*|' + categoryId + '|*|%"';
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
	
    tableView.setData(dataArray);
};

tableView.addEventListener('click', function(e) {
    if (e.rowData.itemTitle) {

        var win = Ti.UI.createWindow({
            title: e.rowData.itemTitle,
            backgroundColor: "#fff"
        });

        var webbie = Ti.UI.createWebView({
            html: '<h1 style="color: #FA7D21; font-weight:bold; font-size:20px;">' + e.rowData.itemTitle + '</h1>\n' + e.rowData.htmlDesc
        });

        win.add(webbie);
        var button = createActionButton(e.rowData.url, e.rowData.itemTitle, e.rowData.desc);
		button.addEventListener('actionButonClick', function(e) {
			button.click();
		});

        win.setRightNavButton(button);

        Ti.UI.currentTab.open(win);
    }
});

// add the tableView to hte current window
currentWin.add(tableView);

// call the setData function to attach the database results to the array
setData();
