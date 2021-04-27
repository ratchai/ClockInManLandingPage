var tabledata = [
    {Date:"14-05-64", Time:"09.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"10.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"11.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"12.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"13.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"14.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    
    
];

//initialize table
var table = new Tabulator("#example-table", {
    data:tabledata, //assign data to table
    layout:"fitDataStretch",
    columns:[
        {title:"Date", field:"Date", hozAlign:"center"},     
        {title:"Time", field:"Time", hozAlign:"center"},        
        {title:"Type", field:"Type", hozAlign:"center",formatter:function(cell, formatterParams){
            var value = cell.getValue();
             if(value.indexOf("i") >= 0){
                 return "<span style='color:limegreen; font-weight:bold;'>" + value + "</span>";
             }else{
                return "<span style='color:orange; font-weight:bold;'>" + value + "</span>";
             }
         }},
         {title:"Location",field:"Location"}
    ]
    
});
