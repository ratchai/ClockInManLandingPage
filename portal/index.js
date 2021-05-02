var profile;
var userid;
var profileimgURL;

var tabledata = new Array();
let now = new Date();
var profileimage = document.getElementById("pictureUrl");
var DBsubscribeDate =  moment(now).format('YYYY-MM-DD');
var btn_sharepicker = document.getElementById("btn_sharepicker");
btn_sharepicker.onclick = function(event){liff.logout()};
var count=0;

var table;
var dbRef_usr ;  //for subscribing new update
var dbRef_query ; // for the first query

async function main()
{
    await liff.init({ liffId: "1655863402-2K8gzNPn" });
    if(!liff.isLoggedIn())
        await liff.login();

    profile = await liff.getProfile();
    userid= profile.userId;
    profileimgURL= profile.pictureUrl;
    profileimage.src = profileimgURL;
    
    const firebaseConfig = {
        apiKey: "AIzaSyC4CozT8itBrDosBrMR5pBAIkeWPTp5eUo",
        authDomain: "checkin-310e7.firebaseapp.com",
        databaseURL: "https://checkin-310e7.firebaseio.com",
        projectId: "checkin-310e7",
        storageBucket: "checkin-310e7.appspot.com",
        messagingSenderId: "1031310741781",
        appId: "1:1031310741781:web:f78e888f082e2be768d91c",
        measurementId: "G-T1NEF88G3H"
      };
      firebase.initializeApp(firebaseConfig);
       dbRef_usr = firebase.database().ref("CheckInTable/"+userid+"/"+DBsubscribeDate);//.child(userid+"/2021-05-02");
       dbRef_query = firebase.database().ref("CheckInTable").child(userid).orderByKey().limitToLast(5);
       
      console.log(DBsubscribeDate);

    let listener = dbRef_usr.on('child_added', (param) => {     
        if(count>0)
        {
            console.log("new item is added");
            console.log(param.val());
            table.addData(param.val(),true);
            if(DBsubscribeDate!= new Date().toISOString().slice(0, 10))
            {
                dbRef_usr.off('child_added',listener);            
            }
        }    
    });
    
    
    
    //Query data
    
    dbRef_query.get().then((snapshot)=>{
        var returnobj = snapshot.val();
        console.log(returnobj);
        if(count==0)
        {
            addDataToTable(returnobj);
            count++;
        }   
    });
    
}


function getDateFromTimeStamp(unix_timestamp)
{
    var d = new Date(unix_timestamp);   
    var txtdate=  d.toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Bangkok"});
    txtdate = txtdate.substr(0,txtdate.length-6);
    txtdate = txtdate.replace(/25/g,"");
    return txtdate;
}

function getTimeFromTimeStamp(unix_timestamp)
{
    var d = new Date(unix_timestamp);   
    var txttime= d.toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Bangkok"});
    return txttime.substr(txttime.length-6);
}



main();





function pushDataToTable(returnobj)
{
    var dt = new Array();
    var keylist = Object.keys(returnobj);
    for(i=0;i<keylist.length;i++)
    {
        var recordObj = returnobj[keylist[i]];        
        var keylist2 = Object.keys(recordObj)

        for(j=0;j<keylist2.length;j++)
        {
            var record = recordObj[keylist2[j]];
            //console.log(record);  
            dt.push(record);          
        }
    }       
    table.addData(dt,true);
}

function addDataToTable(returnobj)
{
  
    var keylist = Object.keys(returnobj);
    for(i=0;i<keylist.length;i++)
    {
        var recordObj = returnobj[keylist[i]];        
        var keylist2 = Object.keys(recordObj)

        for(j=0;j<keylist2.length;j++)
        {
            var record = recordObj[keylist2[j]];
            //console.log(record);  
            tabledata.push(record);          
        }
    }       
    tabledata.sort((a,b)=>(a.unix_timestamp>b.unix_timestamp?-1:1));//newer is on the top
   table = new Tabulator("#example-table", {    
        layout:"fitDataStretch",
        data:tabledata,
        rowAdded:function(row){
            row.getElement().addClass("animation-class");
            },
        columns:[
            {title:"Date", field:"utcCreatedUnix", hozAlign:"center",formatter:function(cell,formatterParams){
                var value = cell.getValue();
                return getDateFromTimeStamp(value);
            }},     
            {title:"Time", field:"utcCreatedUnix", hozAlign:"center",formatter:function(cell,formatterParams){
                var value = cell.getValue();
                return getTimeFromTimeStamp(value);
            }},            
            {title:"Type", field:"Type", hozAlign:"center",formatter:function(cell, formatterParams){
                var value = cell.getValue();
                 if(value.indexOf("i") >= 0){
                     return "<span style='color:limegreen; font-weight:bold;'>" + value + "</span>";
                 }else{
                    return "<span style='color:orange; font-weight:bold;'>" + value + "</span>";
                 }
             }},
             {title:"Location",field:"locationtxt"}
        ]});   
}


