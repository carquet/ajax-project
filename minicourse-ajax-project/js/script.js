
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');


    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    
    // YOUR CODE GOES HERE!
    var $street = $('#street').val();
    console.log($street);
    var $city = $('#city').val();
    console.log($city);
    var address = $street + ", " + $city;
    console.log(address)
    var addressUrl = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + address + "";
    console.log(addressUrl)
    $body.append('<img class="bgimg" src="'+ addressUrl + '">');
    return false;
};

$('#form-container').submit(loadData);
