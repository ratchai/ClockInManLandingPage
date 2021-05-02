function getDateFromTimeStamp(unix_timestamp)
{
    var date = new Date(unix_timestamp * 1000);   
    return date.toLocaleDateString("th-TH","medium");
}

function getTimeFromTimeStamp(unix_timestamp)
{
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    return hours+":"+minutes+":"+seconds;
}


