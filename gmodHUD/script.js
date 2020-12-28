/// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />
if (typeof window === "undefined") var p5 = require("p5");

var IN_ENGINE = navigator.userAgent.indexOf( "Valve Source Client" ) != -1;

/**
 * @type {Meter[]}
 */
var meters = [];
var currentState = {};
var scaleFactor = 1.5;

function runLua(lua) {
  console.log("RUNLUA:" + lua)
}

class Meter {
	/**
	 * A hud meter.
	 * @param {String} id - The id of the meter
	 * @param {p5.Vector} pos
	 * @param {Object} options - An options object
	 * @param {p5.Color} options.color - The color of the meter ring
	 * @param {Number} options.width - The width of the meter
	 * @param {Number} options.height - The height of the meter
	 * @param {"TopLeft" | "BottomLeft" | "BottomRight"} options.align
	 * @param {Boolean} [options.hideWhenEmpty] - Decides if this meter will hide when 0 or below
	 * @param {Boolean} [options.showTextNumber] - Decides if the meter will render the number amount in the middle
	 * @param {Boolean} [options.painfulDecrease] - Decides if the meter will shake when decreasing, like when taking damage
	 * @param {Boolean} [options.showMax] - If true, show the max value off to the side.
   * @param {Boolean} [options.smooth] - Animate values in the ring (does not animate number displayed number value)
	 */
	constructor(id, pos, options) {
		(this.id = id), (this.options = options);
		this.pos = pos;
		this.value = 0;
    this.max = 0;
    this.displayedValue = 0;
    this.opacity = 1;
	}

	set(value, max, extra = 0) {
		this.value = value;
    this.max = max;
    this.sideValue = extra;
  }

	draw() {
		this.drawAt(this.pos.x, this.pos.y);
	}

	drawAt(x, y) {
    this.animate();
		push();
		switch (this.options.align) {
			case "BottomLeft":
				translate(0, height/scaleFactor);
				break;
			case "BottomRight":
				translate(width/scaleFactor, height/scaleFactor);
				break;
			default:
				translate(0, 0);
    }
    // Ring drawing
    push()
		angleMode(DEGREES);
    noFill();
		strokeWeight(2);
    stroke(255, 128*this.opacity)
    ellipse(this.pos.x, this.pos.y, this.options.width, this.options.height);
    strokeWeight(3);
    let useColor = this.options.color
    useColor.setAlpha(255*this.opacity)
		stroke(useColor);
    arc(this.pos.x, this.pos.y, this.options.width, this.options.height, 0, (this.displayedValue / this.max) * 360);
    pop()
    push()
    // Text drawing
    if (this.options.showTextNumber) {
      push()
      textAlign(CENTER, CENTER);
      noStroke();
      fill(255, 255*this.opacity)
      text(this.value, this.pos.x, this.pos.y)
      pop()
    }
    if (this.options.showMax) {
      push()
      textAlign(LEFT, BOTTOM);
      noStroke();
      fill(255, 200*this.opacity)
      let sideValuePos = this.pos.copy()
      sideValuePos.add((this.options.width/2)+textWidth('/')/1.1, this.options.height/2)
      text('/ ' + this.sideValue, sideValuePos.x, sideValuePos.y)
      pop()
    }
    pop();
    //circle(this.pos.x, this.pos.y, 3)
		pop();
  }
  
  animate() {
    if (this.options.smooth) {
      this.displayedValue += (this.displayedValue - this.value) / -10
      if (this.displayedValue < 0.05) {
        this.displayedValue = 0
      }
    } else {
      this.displayedValue = this.value
    }
    if (this.options.hideWhenEmpty) {
      if (this.value <= 0) {
        this.opacity += (this.opacity - 0) / -10
      } else {
        this.opacity += (this.opacity - 1) / -10
      }
    } else {
      this.opacity = 1;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (IN_ENGINE) {
    // @ts-ignore
    runLua(`print("[Sulfrix HTML HUD] Loaded!")`)
  }
	let healthMeter = new Meter("health", createVector(30, -30), { color: color(255, 50, 50), width: 30, height: 30, align: "BottomLeft", showTextNumber: true, smooth: true});
  meters.push(healthMeter);
  let armorMeter = new Meter("armor", createVector(70, -30), { color: color(50, 200, 255), width: 30, height: 30, align: "BottomLeft", showTextNumber: true, smooth: true, hideWhenEmpty: true });
	meters.push(armorMeter);
  if (!IN_ENGINE) {
    devMode()
    document.body.style.background = "#808080"
  }
  if (window.innerWidth >= 2000) {
    pixelDensity(3)
  }
}

function draw() {
  clear();
  scale(scaleFactor)
	meters.forEach((meter) => {
    meter.draw();
	});
}

/**
 *
 * @param {Object} stats - A base options object
 * @param {Number} stats.health - The player's current health
 * @param {Number} stats.maxHealth - The player's max health
 * @param {Number} stats.armor - The player's current armor
 * @param {Number} stats.maxArmor - The player's max armor, usually 100
 * @param {Object} [stats.weapon] - An weapon object
 * @param {Object} stats.weapon.hasAmmo - If a weapon should display ammo counters at all.
 * @param {String} stats.weapon.name - The name of the weapon
 * @param {Number} stats.weapon.primaryAmmo - The current amount of primary ammo
 * @param {Number} stats.weapon.primaryMax - The max size of the primary clip
 * @param {Number} stats.weapon.primaryReserve - The amount of primary ammo in reserve
 * @param {Number} [stats.weapon.secondaryAmmo] - The current amount of secondary ammo
 * @param {Number} [stats.weapon.secondaryMax] - The maximum amount of secondary ammo, might not apply
 */
function playerStatus(stats) {
  getMeterById("health").set(stats.health, stats.maxHealth, stats.maxHealth);
  getMeterById("armor").set(stats.armor, stats.maxArmor, stats.maxArmor);
}

function devMode() {
	playerStatus({ health: 100, maxHealth: 100, maxArmor: 100, armor: 0 });
}

function windowResized() {
	console.log(`Canvas resize: ${windowWidth}x${windowHeight}`);
	resizeCanvas(windowWidth, windowHeight);
}
/**
 *
 * @param {String} id
 * @returns {Meter}
 */
function getMeterById(id) {
	for (let i in meters) {
		if (meters[i].id == id) {
			return meters[i];
		}
	}
	return undefined;
}

