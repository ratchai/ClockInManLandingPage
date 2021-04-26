var tabledata = [
    {Date:"14-05-64", Time:"09.00" ,Action:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"10.00" ,Action:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"11.00" ,Action:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"12.00" ,Action:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"13.00" ,Action:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Date:"14-05-64",Time:"14.00" ,Action:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    
    
];

//initialize table
var table = new Tabulator("#example-table", {
    data:tabledata, //assign data to table
    autoColumns:true, //create columns from data field names
    layout:"fitDataStretch",
    fitColumns :true
});
