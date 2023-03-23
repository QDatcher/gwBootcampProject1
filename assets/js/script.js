// const FMkey = '454e25c0ad504f5f95f870a78830824c';
// const sharesSecret = 'c7b73866d4588addbb675a95ce264480';
var generateColor = document.querySelector('#generate-color')
var trackBox = document.querySelector('#trackBox')
var genre = 'country';
var ourTracks;
function getTracksAPI(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.tracks.track;
    })
    .catch(function (err) {
      console.error(err);
    });
}

// getAPI(
//   'http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=grey&api_key=454e25c0ad504f5f95f870a78830824c&format=json'
// )
//   .then(function (trackList) {
//     console.log(trackList);
//   });

var fmAPI = {
  getTracksFromApi: function (randomWord, color, index) {
    var topTracksUrl = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=' + randomWord + '&api_key=454e25c0ad504f5f95f870a78830824c&format=json';

    getTracksAPI(topTracksUrl)
        .then(function (trackList) {
          console.log(trackList);
          if(trackList.length < 10){
            getColor().then(function(data){
              console.log(data)
              var {colorName, hexVal} = data;
              fmAPI.getTracksFromApi(colorName, hexVal, index)
            })
          } else {
              var randomTrackNum = Math.floor(Math.random()*trackList.length)
              var track = trackList[randomTrackNum]
              var colorBoxDiv = trackBox.children[index].querySelector('div')
              var h4Div = trackBox.children[index].querySelector('h4')
              var artistDiv = trackBox.children[index].querySelector('h5')
              var trackNameDiv = trackBox.children[index].querySelector('p')

              var artistName = track.artist.name;
              var trackName = track.name;
              
              
              artistDiv.textContent = artistName;
              trackNameDiv.textContent = trackName;
              h4Div.textContent = randomWord;
              colorBoxDiv.style.backgroundColor = '#' + color;
            
          }
        });
  },

  generateArtistBox: function (){
    var
    
  }
};
// This is the beginning of the color Api
function getColor() {
  var randomColor = Math.floor(Math.random()*16777215).toString(16);

      //Our json fetch url.
  return fetch(`https://www.thecolorapi.com/id?hex=${randomColor}&format=json`)
    .then(function(response) {
       return response.json()
     })
    .then(function(data) {
    var colorName = data.name.value;
    var info = {colorName:colorName, hexVal:randomColor}
    return info;
  });
  
}



 function generateArtists(){
  
  for(let i = 0; i < trackBox.children.length; i++){
    
    getColor().then(function(data){
      console.log(data)
      var {colorName, hexVal} = data;
      fmAPI.getTracksFromApi(colorName, hexVal, i)
    })
  }
  
}


generateColor.addEventListener('click', generateArtists)
console.log(trackBox.children)








// console.log(fmAPI.getTracksFromApi('Stromboli'))
// // console.log(track)
// // getAPI(fmAPI.topTracksUrl)
// console.log(ourTracks)
console.log(getColor())