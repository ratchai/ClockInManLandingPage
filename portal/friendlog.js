var tabledata = [
    {Name:"https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder.png", Time:"09.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Name:"https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder.png",Time:"10.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Name:"https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder.png",Time:"11.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Name:"https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder.png",Time:"12.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Name:"https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder.png",Time:"13.00" ,Type:"in",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    {Name:"https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder.png",Time:"14.00" ,Type:"out",Location:"ต.สวนดอก อ.เมือง จ.ลำปาง"},
    
    
];


var imageFormatter = function(cell, formatterParams){
	var value = this.sanitizeHTML(cell.getValue());
	var img = $("<img src='" + value + "' width=\"50px\"/>");    
	img.on("load", function(){
		cell.getRow().normalizeHeight();
	})

	return img[0];
}
//initialize table
var table = new Tabulator("#example-table", {
    data:tabledata, //assign data to table
  
   // layout:"fitDataStretch",
   // fitColumns :true,
    columns:[
        {formatter:imageFormatter ,field:"Name", title:"Person",   hozAlign:"center",  variableHeight:true,
            cellClick:function(e, cell){alert("Printing row data for: " + cell.getRow().getData().name)},            
        },
        
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
