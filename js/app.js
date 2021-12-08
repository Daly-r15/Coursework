//The URIs of the REST endpoint
RAAURI = "https://prod-04.northcentralus.logic.azure.com/workflows/6d8e3bbcbb284983a5c9c902b04a6f51/triggers/manual/paths/invoke/rest/v1/post?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OLEiCM1UXhsLtWsAlksoQxDnqY1qk5LCUBHKLMgX2W0";
CIAURI = "https://prod-05.northcentralus.logic.azure.com/workflows/a19b913a3ea04b3581b3365d8b25ad74/triggers/manual/paths/invoke/rest/v1/upload?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ECmHj6_o2V4A-3i4M6vO1jse5dv7S_9A1JN3IvsjhZU";

DIAURI0 = "https://prod-16.northeurope.logic.azure.com/workflows/65514546b51d4df3ba6816be1bec7ef2/triggers/manual/paths/invoke/rest/v1/posts/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6_Ec9xt7BVGAjUUhetgwKKkm2BDAKdwyn7gs52B_pWs";


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retPosts").click(function(){

      //Run the get asset list function
      getPostList();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewPost();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewPost(){
  var subObj = {
    Username: $('#username').val(),
    Post: $('#post').val()
  }
  //Construct JSON Object for new item
  subObj = JSON.stringify(subObj)

  //Convert to a JSON String


  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function(response) { getPostList(); });
}
submitData = new FormData();

submitData.append('FileName'. $('#FileName').val());
submitData.append('File'. $("#UpFile")[0].files[0]);

$.ajax({
  url: IUPS,
  data: submitData,
  cache:false,
  enctype:'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success:function(data){
    
  }
});

//A function to get a list of all the posts and write them to the Div with the AssetList Div
function getPostList(){

  //Replace the current HTML in that div with a loading message
  $('#PostList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  //Get the JSON from the RAA API 
  $.getJSON(RAAURI, function( data ) {

    //Create an array to hold all the retrieved posts
    var items = [];
    var i;
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    for (i=0; i<data.length;i++){
      $.each( data[i], function( key, val ) {
        if(key === "post"){
          items.push( val +"<br/>")
        }
        
      });
    }
    //Clear the assetlist div
    $('#PostList').empty();
    //Append the contents of the items array to the AssetList Div
    $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
    }).appendTo( "#PostList" );
  });
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
// function deleteAsset(id){
//   $.ajax({
    
//     type: "DELETE",
//     //Note the need to concatenate the
//     url: DIAURI0 + id + DIAURI1,
    
//   }).done(function( msg ) {
    
//      //On success, update the assetlist.
//     getAssetList();
//   });
    
// 