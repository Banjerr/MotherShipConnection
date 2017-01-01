## MotherShip Connection

![pic!](https://github.com/Banjerr/MotherShipConnection/blob/master/mothershipconnection.gif)

This came from the Arduino Uno kit, one of the first actual projects where you program anything. Since I use JavaScript quite often, I decided to try and re-factor this code using the Johnny-Five IOT Node lib. Here is the original code

### original Arduino code

```java
/** THE MOTHERSHIP CONNECTION
 *  by Ben Redden
 */

int switchState = 0;

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(2, INPUT);
}

// the loop function runs over and over again forever
void loop() {
  switchState = digitalRead(2);

  if (switchState == LOW) {
    // button isnt pressed
    digitalWrite(3, HIGH); // green LED
    digitalWrite(4, LOW); // red LED
    digitalWrite(5, LOW); // red LED
  }
  else {
    digitalWrite(3, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, HIGH);

    delay(500);
    digitalWrite(4, HIGH);
    digitalWrite(5, LOW);
    delay(500);
  }
}
```

### Johnny-Five code (probably couldve been written more elegantly)

```javascript
'use strict'
/** THE MOTHERSHIP CONNECTION
 *  by Ben Redden
 */

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

```
