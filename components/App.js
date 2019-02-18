var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'SIGf5ZISEVrGRbkUIS5UH4m56axoRuVR';


App = React.createClass({

  getInitialState() {
    return {
        loading: false,
        searchingText: '',
        gif: {}
    };
},

  render: function() {

    var styles = {
        margin: '0 auto',
        textAlign: 'center',
        width: '90%'
    };

    return (
      <div style={styles}>
            <h1>Wyszukiwarka GIFow!</h1>
            <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
            <Search onSearch={this.handleSearch}/>
            <Gif
              loading={this.state.loading}
              url={this.state.gif.url}
              sourceUrl={this.state.gif.sourceUrl}
            />
      </div>
    );
},

handleSearch: function(searchingText) {  
  this.setState({
    loading: true  
  });
  
  this.getGif(searchingText) 
  .then(
    (response) => {
      const data = JSON.parse(response).data; 
      const gif = { 
        url: data.fixed_width_downsampled_url,
        sourceUrl: data.url
      }; 

    this.setState({ 
      loading: false,  
      gif: gif,  
      searchingText: searchingText  
    });
  })
},

// getGif: function(searchingText, callback) {  // 1.
//   var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
//   var xhr = new XMLHttpRequest();  // 3.
//   xhr.open('GET', url);
//   xhr.onload = function() {
//       if (xhr.status === 200) {
//          var data = JSON.parse(xhr.responseText).data; // 4.
//           var gif = {  // 5.
//               url: data.fixed_width_downsampled_url,
//               sourceUrl: data.url
//           };
//           callback(gif);  // 6.
//       }
//   };
//   xhr.send();
// }



getGif: function(searchingText) {
  console.log('Updating State', 'primary');
        
    return new Promise(
        function(resolve, reject) {
            const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = function() {
                if (this.status === 200) {
                  resolve(this.response); 
                  console.log("request finished and response is ready");
                  console.log(this.response);
                  
                } else {
                    reject(new Error(this.statusText)); 
                }
            };
            request.onerror = function() {
                reject(new Error(
                   `XMLHttpRequest Error: ${this.statusText}`));
            };
            
            request.send();
        });
    }
});
  
 



  
