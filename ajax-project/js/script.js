
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
    var $city = $('#city').val();
    var address = $street + ", " + $city;
    $greeting.text('So, you want to live at ' + address + '?');

    // var addressUrl = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + address + "";
    // $body.append('<img class="bgimg" src="'+ addressUrl + '">');
    

    var nyTimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $city + '&sort=newest&api-key=4c810a6f5ef448ebad93168acccac947'
    $.getJSON(nyTimesUrl, function(response) {
            $nytHeaderElem.text('New York Times articles about ' + $city);
            var data = response;
            var articles = data.response.docs
            articles.forEach(function(article){
                console.log(article.headline.main)

            })
    })
            


    return false;

    
 
};

    


$('#form-container').submit(loadData);
