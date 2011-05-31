var currentWin = Ti.UI.currentWindow;

// set the data from the database to the array
function setData() {
  /** FUNCTION HERE **/ 
};

// create table view
var tableView = Ti.UI.createTableView({
    
});

tableView.addEventListener('click', function(e){
   //** EVENTLISTENER HERE **/ 
});

// add the tableView to hte current window
currentWin.add(tableView);

// call the setData function to attach the database results to the array
setData();

var db = Ti.Database.install('vacancies.sqlite', 'items');

var rows = db.execute('SELECT title FROM items');

var dataArray = [];

while (rows.isValidRow()) {
    dataArray.push({title:'' + rows.fieldByName('title') + '', hasChild:true, path:'items.js'});
    rows.next();
};

tableView.setData(dataArray);

tableView.addEventListener('click', function(e) {
   if(e.rowData.path) {
       var win = Ti.UI.createWindow({
          url:e.rowData.path,
          title:e.rowData.title
       });
       
       var vacancyItem = e.rowData.title;
       win.vacancyItem = vacancyItem;
       Ti.UI.currentTab.open(win);
   } 
});