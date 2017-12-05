var db = null;

function id(element){
    return document.getElementById(element);
}


// ----------------------- BUTTONS ------------------------------
function init () {
    id ("gotoPage2Butt").addEventListener("click", function (){
        gotoPage2();
    });
    
     id ("loadListButt").addEventListener("click", function (){
        loadList();
    });
        id ("gotoPage3Butt").addEventListener("click", function (){
        gotoPage3();
    });
    
     id ("noti_btn_datetime").addEventListener("click", function (){
        noti_datetime();
    });
} 


function gotoPage2 (){
    $.mobile.navigate("#page2", {
        info: "info about the var hash"
    });
}

function gotoPage3 (){
    $.mobile.navigate("#page3", {
        info: "info about the var hash"
    });
}

function loadList (){
    var list= id("myList2");
    
    var data = {
        "notifications":["1/12/2017","10/12/2017","23/12/2017"]
    }
    
    var myHtml;
    
    for (i=0; i<data.notifications.length;i++){
        myHtml+="<li>" + data.notifications[i] + "/<li>"
    }
    
    list.innerHTML=myHtml;
}

cordova.plugins.notification.local.schedule({
    title: 'Design team meeting',
    text: '3:00 - 4:00 PM',
    trigger: { at: new Date("November 30, 2017 11:47 AM") }
});
//--------------------------- END BUTTONS ----------------------- 

//***************************************************************

//--------------------------- NOTIFICATIONS ---------------------

function noti_datetime(){

var noti_datetime = document.getElementById("noti_datetime").value;
var noti_datetimeDate= new Date(noti_datetime);

cordova.plugins.notification.local.schedule({
title: 'New Notification',
text: 'You put: '+noti_datetimeDate,
trigger: { at: noti_datetimeDate }
});
alert("The new assignment is inserted");
}


var DateTime;
var db = null;



$(document).on('pageinit','#page3',function(){

     $('.home_btn').click(function(){
        $.mobile.navigate("#page3",{transition: "slide",direction: "reverse",info: "info goes here"});
    });
     $('#as1_btn').click(function(){
        $.mobile.navigate("#As1",{transition: "slide",info: "info goes here"});
        createDB();

    });
    $('#PickDate').click(function(){
       showDatePicker();
    });
    $('#PickTime').click(function(){
       showTimePicker();
    });
    $('#ListButton').click(function(){
        loadlist();


    });
     $('#deleteAllDb').click(function(){
        deleteDB();

    });
      $('#noti_btn_datetime').click(function(){
        noti_datetime();

    });

     

});
//------------------------ END NOTIFICATIONS --------------------

//***************************************************************
    
//--------------------------DATABASE-----------------------------  

/*function createDB(){
     db = window.sqlitePlugin.openDatabase({name: 'citas.db', location: 'default'});

     db.sqlBatch([
    'CREATE TABLE IF NOT EXISTS citas (id INTEGER PRIMARY KEY,description, date)',
     ], function() {
    console.log('Created database OK');
            selectDB();
  }, function(error) {
    console.log('SQL batch ERROR: ' + error.message);
  });

}

function insertDB(){
    var title = $("#Task_title").val();
    console.log(title);
    var dateString = DateTime.year+DateTime.month+DateTime.day+"T"+DateTime.hour+DateTime.minute;
    console.log(dateString);
    db.sqlBatch([
        'CREATE TABLE IF NOT EXISTS citas (id INTEGER PRIMARY KEY,description, date)',
        ['INSERT INTO citas VALUES (?,?,?)', [null,title, dateString ]],
    ], function() {
        console.log('Values inserted correctly');
            DateTime = {};
            selectDB();
            $("#Task_title").val("");
            $("#DatePrint").empty();
            $("#TimePrint").empty();
            $("#datepicker").panel("close")
  }, function(error) {
    console.log('SQL batch ERROR: ' + error.message);
  });


}

function selectDB(){

     db.executeSql('SELECT description, date , count(*) AS mycount FROM citas', [], function(rs) {
    console.log('Record count (expected to be 3): ' + rs.rows.item(0).mycount);
       var counter = rs.rows.item(0).mycount;
         $("#ListHandler").empty();
        for(i = 1; i <= counter;i++){
           db.executeSql('SELECT id, description, date , count(*) AS mycount FROM citas WHERE id='+i, [], function(res) {
                        console.log(res.rows.item(0).date);
                        $("#ListHandler").append(
                                                 '<li id="Elem'+res.rows.item(0).id+'" data-icon="delete" style="margin: 10px 10px 10px 10px; border:none;" class="ui-body-a">'+
                                                    '<div>'+
                                                        '<div class="ui-bar ui-bar-a" style="background-color:#D3D3D3; border:none;">'+
                                                            '<h3 style="float:left; text-align: left;">Event: '+res.rows.item(0).description+'</h3><h3 style="float:right; text-align:right;" ><a href="javascript:deleteElement('+res.rows.item(0).id+')"><i class="fa fa-times" style="color:red; font-size:18px;" aria-hidden="true"></i></a></h3>'+
                                                        '</div>'+
                                                        '<div class="ui-body ui-body-a">'+
                                                            '<h4>Date: '+moment(res.rows.item(0).date).format('MMMM Do YYYY, h:mm:ss a')+'</h4>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</li>');
                           },
                         function(error) {
                        console.log('SELECT SQL statement ERROR: ' + error.message);
                      });
        }
  }, function(error) {
    console.log('SELECT SQL statement ERROR: ' + error.message);
  });
}

function deleteElement(id){
    db.executeSql('DELETE FROM citas WHERE id=?', [id], function(rs) {
    console.log('rowsDeleted: ' + rs.rowsAffected);
    var ElemToDelete = "Elem"+id;
        $('#'+ElemToDelete+'').remove();
  }, function(error) {
    console.log('Delete SQL statement ERROR: ' + error.message);
  });

}

function deleteDB(){
    db.executeSql('DELETE FROM citas', [], function(rs) {
    console.log('rowsDeleted: ' + rs.rowsAffected);
    $("#ListHandler").empty();
  }, function(error) {
    console.log('Delete SQL statement ERROR: ' + error.message);
  });
}/*


//----------------------FIN DATABASE----------------------------- 
