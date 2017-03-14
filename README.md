# wifirgbcontroller
This software controls the HF-LPB100-1 based wifi rgb led strip controller that comes with MagicHome Wifi

This is the wifi chip: HF-LPB100-1
https://gridconnect.box.com/shared/static/pddbk7obfl47qsftspco.pdf

The device creates a wifi AP and can be accessed on this IP address: http://10.10.123.3/
on port 80, we are asked for username and password.


TCP port is probably 5577.

This might help: https://github.com/herrmannj/wifilight/blob/master/FHEM/32_WifiLight.pm
Or this might help: https://github.com/jikelmon/UFOLEDController/tree/master/UFOLEDController

I hope that this product uses this protocol:

/* Every Command ist encoded via WireShark in Hex, you can convert them to int and add them to a byte array to send them.
     * This Method is easier to read in the RGB Values from 0 to 255 out of a textbox in the form.
     * Every command consists of an Operator, the value(s) and a checksum, which represents the total sum of all values,
     * converted to a hex-value and trimmed everything but the last 2 values. Reconvert this to an int and add it to the last
     * entry of your command array.
     * 
     * LD382: (UFOv1)
     * On/Off Command contains an Operator, Command and the Checksum
     * RGB Command contains an {Operator, Red-Value, Green-Value, Blue-Value,     0xff,     0x00,    0x00,   Checksum}
     *                                                                        [maybe for a White-LED-Strip?]
     * Examples:
     * -On:
     *                           {Operator, Command, Checksum}   
     *      Data from WireShark: {  0x71,     0x23,    0x94  } -> {113, 35, 148} 
     *      
     * Checksum: 0x71 + 0x23 = 113 + 35 = 148 = 0x94 as the last entry.
     * -Off:
     *                           {Operator, Command, Checksum}   
     *      Data from WireShark: {  0x71,     0x24,    0x95  } -> {113, 36, 149}
     *      
     * -RGB:
     *                           {Operator, Command, Command, Command, 0xff, 0x00, 0x00, Checksum}   
     *      Data from WireShark: {  0x31,     0xff,   0xff,    0xff,   0xff, 0x00, 0x00,   0x2d  } -> {49, 255, 255, 255, 255, 0, 0, 45}
     *      
     * Checksum: 0x31 + 0xff + 0xff+ 0xff + 0xff + 0x00 + 0x00 = 49+255+255+255+255+0+0 = 1069 = 0x42d -> last two values -> convert 2d to int -> 45, that is our checksum!
     * 
     * LD382A: (UFOv3)
     *  !!At the seventh position in the array there is a 0x0F instead of a 0x00!!
     * Have a great experience with my Data and Experiences and feel free to optimize.
     * 
     * Best Regards,
     * 
     * jikelmon
     * 
     * 
     * 
     * 
     * To-Do:
     * -Predefined-Fades
     * -White LED-Strips -> i do not own one, because of that i am not able to get the data at the moment, sorry
     * -Timer
     * -Exceptions etc. -> i am not familiar with that, because i am learning c# as a new language beside my bachelor as a hobby
     * -Clean-Up the code and make it C#-Standard conform...
     */
