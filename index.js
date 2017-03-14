var net = require('net');

var HOST = '10.10.123.3';
var PORT = 5577;

var on_command = [ 0x71, 0x23, 0x94 ];
var off_command = [ 0x71, 0x24, 0x95 ];
var rgb_array = [ 0x31, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00, 0x00 ];

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);

    send(rgb_array);



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
