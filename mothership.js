'use strict'

const five = require("johnny-five"),
	board = new five.Board();

board.on("ready", function(){
  // create an Led on pins 3, 4 and 5
  let red_led_one = new five.Led(4),
	  red_led_two = new five.Led(5),
		green_led = new five.Led(3),
		ignition_switch = new five.Switch(2);

	// the green light is on (HIGH)
	green_led.on();
	// red led is off (LOW)
	red_led_one.off();
	red_led_two.off();

  // do cool stuff when the switch is closed
	ignition_switch.on("close", function() {
		// turn the green off
		green_led.off();
		// make the red led blink fater
		red_led_one.blink(325);
		red_led_two.blink(325);
	});

	// do the opposite when you release the switch
	ignition_switch.on("open", function() {
		// turn em all off, except the green.. turn that back on
		green_led.on();
		red_led_one.stop().off();
		red_led_two.stop().off();
	});
});
