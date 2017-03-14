# wifirgbcontroller
This software controls the HF-LPB100-1 based wifi rgb led strip controller that comes with MagicHome Wifi

This is the wifi chip: HF-LPB100-1
https://gridconnect.box.com/shared/static/pddbk7obfl47qsftspco.pdf

The device creates a wifi AP and can be accessed on this IP address: http://10.10.123.3/
on port 80, we are asked for username and password.


This meanst: TCP port is 5577.

This might help: https://github.com/herrmannj/wifilight/blob/master/FHEM/32_WifiLight.pm
Or this might help: https://github.com/jikelmon/UFOLEDController/tree/master/UFOLEDController


I learned, that my device is compatible to ld382. After I implemented the simple client, I found this nice library, but did not test it yet:
https://github.com/psi-4ward/ld382.js
