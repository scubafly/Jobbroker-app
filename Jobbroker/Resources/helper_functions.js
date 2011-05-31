/**
 *
 *
 **/

var windowWidth = Ti.Platform.displayCaps.platformWidth;
var windowHeight = Ti.Platform.displayCaps.platformHeight;
var barColor = '#53A2D5';

function createActionButton(articleUrl, articleTitle, articleDesc ) {
    var button = Titanium.UI.createButton({
        title: '',
        systemButton:Titanium.UI.iPhone.SystemButton.ACTION
    });
	
    button.addEventListener('click',function()	{
        var dialog = Titanium.UI.createOptionDialog({
            title: '',
            options: ['Openen in webbrowser','Doorsturen als Email','Reageren','Annuleren'],
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
                    Ti.UI.currentTab.open(subwebwin);
					
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

function in_array (needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true
    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',
        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}

function implode (glue, pieces) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var i = '',
        retVal = '',
        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        } else {
            for (i in pieces) {
                retVal += tGlue + pieces[i];
                tGlue = glue;
            }
            return retVal;
        }
    } else {
        return pieces;
    }
}

function createTableItemTitle(titleString) {
    var itemTitle = Ti.UI.createLabel({
        text: titleString,
        textAlign: 'left',
        left:1,
        height:20,
        width:'auto',
        top:2,
		font:{fontSize:14,fontWeight:"bold"},
        color: barColor
    });
    return itemTitle;
}

function createTableItemDesc(descriptionString) {
    var itemDesc = Ti.UI.createLabel({
                text: descriptionString,
                textAlign: 'left',
                font:{
                    fontSize:12
                },
                height:40,
                top:26,
                left:5,
                right: 5,
                bottom:22,
                width:'auto',
                color:'grey'
            });
    return itemDesc;
}

function createTableNewsItemTitle(titleString) {
    var itemTitle = Ti.UI.createLabel({
        text: titleString,
        textAlign: 'left',
        left:4,
        height:20,
        width:'auto',
        top:2,
		font:{fontSize:14,fontWeight:"bold"},
        color: barColor
    });
    return itemTitle;
}

function createTableNewsItemDesc(descriptionString) {
    var itemDesc = Ti.UI.createLabel({
                text: descriptionString,
                textAlign: 'left',
                font:{
                    fontSize:12
                },
                height:40,
                top:24,
                left:5,
                right: 5,
                bottom:7,
                width:'auto',
                color:'grey'
            });
    return itemDesc;
}

function createsubString(subString) {
	var itemSubString = Ti.UI.createLabel({
		text: subString,
		font:{
            fontSize:10
        },
        height:10,
        left:5,
        bottom:2,
        width:'auto',
        color:'grey'
	});
	return itemSubString;
}
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

function formatDate()
{
	var date = new Date();
	var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
	if (date.getHours()>=12)
	{
		datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+date.getMinutes()+' PM';
	}
	else
	{
		datestr+=' '+date.getHours()+':'+date.getMinutes()+' AM';
	}
	return datestr;
}