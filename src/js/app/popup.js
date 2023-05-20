
myApp.controller("PageController",function ($scope,$http) {
    $scope.message = "Hello from AngularJS";  
    //$http.post('/someUrl', data, config).then(successCallback, errorCallback);
    var responseArray=[];
    var data = 'Good Job'
    $scope.showLoader=false;

// or add tags with pre-defined properties
var whitelist = ["hard work","empatethic","dedicated","smart worker","intutive","comendable"]

var input = document.querySelector('input[name=tags]'),
    tagify = new Tagify(input, {
        pattern: /^.{0,20}$/,    // validate typed tag(s) by Regex. Here maximum chars length is defined as "20"
        delimiters: ",",       // add new tags when a comma or a space character is entered
        trim: false,             // if "delimiters" setting is using space as a delimeter, then "trim" should be set to "false"
        keepInvalidTags: true,   // do not remove invalid tags (but keep them marked as invalid)
        editTags: 1,             // single click to edit a tag
        maxTags: 6,
        blacklist: ["foo", "bar", "baz"],
        whitelist: whitelist,
        transformTag: transformTag,
        backspace: "edit",
        placeholder: "Type something",
        dropdown : {
            enabled: 1,            // show suggestion after 1 typed character
            fuzzySearch: false,    // match only suggestions that starts with the typed characters
            position: 'text',      // position suggestions list next to typed text
            caseSensitive: true,   // allow adding duplicate items if their case is different
        },
        templates: {
            dropdownItemNoMatch: function(data) {
                return `<div class='${this.settings.classNames.dropdownItem}' tabindex="0" role="option">
                    No suggestion found for: <strong>${data.value}</strong>
                </div>`
            }
        }
    })

// generate a random color (in HSL format, which I like to use)
function getRandomColor(){
    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    var h = rand(1, 360)|0,
        s = rand(40, 70)|0,
        l = rand(65, 72)|0;

    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

function transformTag( tagData ){
    tagData.style = "--tag-bg:" + getRandomColor();

    if( tagData.value.toLowerCase() == 'shit' )
       tagData.value = 's✲✲t'
}

tagify.on('add', function(e){
    console.log(e.detail)
})

tagify.on('invalid', function(e){
    console.log(e, e.detail);
})
var cachedData = localStorage.getItem('tagsData');

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      });    

      $('#generateButton').click(function()
      {
         var context = $('#keywprds').val();
         var inputElm = document.querySelector('input[name=tags]')
         var tagify = new Tagify(inputElm);
         var keyWords  = tagify.value.map(item => item.value).join(',');
        if(keyWords!=null && keyWords!=undefined && keyWords!='')
        {
            $("#table-result").hide();          
            $('#loader').show();
            getData(keyWords,context);           
            localStorage.setItem('tagsData', keyWords);
        }
      })

      $scope.tags = [
        { text: 'Tag1' },
        { text: 'Tag2' },
        { text: 'Tag3' }
      ];

      function getData(keyWord,context)
      {
        var url=`https://aimavericks.azurewebsites.net/api/Function1?prompt='${keyWord}'&context='${context}'`;
        $http({
            method: 'GET',        
            url: url,       
            headers: {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'

            },                 
            }).then(function success(response) {             
                responseArray=[];      
                response.data.forEach(function(currentElement, index) { responseArray.push({"id":index,"suggestion":currentElement})  });
                $('#loader').hide();   
                generateData();            
            }, function error(response) {
                $('#loader').hide();                               
                console.error('Failed to get data');            
            });
      }
      function generateData()
      {
        if(responseArray.length>0)
        {
        var inHTML="";       
        $.each(responseArray, function(index, value){
           if(value.suggestion!=null && value.suggestion!=undefined && value.suggestion!='')
           {
            var newitem = `<tr ng-show="response.suggestion!=''">
            <th scope="row">`+value.id+`</th>
            <td>`+value.suggestion+`</td>           
            <td>
                <button class="btn-clipboard" title="Copy to clipboard" data-toggle="tooltip" data-placement="top" onclick="copyData($event)">Copy</button>
            </td>
            </tr>`;           
            inHTML += newitem;  
           }
            
        });
        $("#table-data").html("");
        $("#table-data").html(inHTML); //add generated tr html to corresponding table
        $("#table-result").show();   
      }     

    }
     
     
});



