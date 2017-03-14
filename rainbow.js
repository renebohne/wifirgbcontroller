var net = require('net');

var HOST = '10.10.123.3';
var PORT = 5577;

var on_command = [ 0x71, 0x23, 0x94 ];
var off_command = [ 0x71, 0x24, 0x95 ];
var rgb_array = [ 0x31, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00, 0x00 ];

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);

    dynamicRainbow(50);


});

function send(cmd)
{
  let codes = cmd;
  codes.push(codes.reduce((sum, val) => sum + val, 0) & 0xFF);
  let msg = new Buffer(codes, 'hex');
  client.write(msg);
}

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // Close the client socket completely
    //client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});



var r = 0;
var g = 0;
var b = 0;

function dynamicRainbow( delay ){

      var showColor;
      var cwi = 0; // colour wheel index (current position on colour wheel)
      var foo = setInterval(function(){
          if (++cwi > 255) {
              cwi = 0;
          }
              showColor = colorWheel(  cwi & 255 );
              //console.log("sending message...");
              rgb_array[1] = r;
              rgb_array[2] = g;
              rgb_array[3] = b;
              send(rgb_array);

      }, delay);
  }

  // Input a value 0 to 255 to get a color value.
  // The colors are a transition r - g - b - back to r.
  function colorWheel( WheelPos ){

      WheelPos = 255 - WheelPos;

      if ( WheelPos < 85 ) {
          r = 255 - WheelPos * 3;
          g = 0;
          b = WheelPos * 3;
      } else if (WheelPos < 170) {
          WheelPos -= 85;
          r = 0;
          g = WheelPos * 3;
          b = 255 - WheelPos * 3;
      } else {
          WheelPos -= 170;
          r = WheelPos * 3;
          g = 255 - WheelPos * 3;
          b = 0;
      }
      // returns a string with the rgb value to be used as the parameter
      return "rgb(" + r +"," + g + "," + b + ")";
  }
