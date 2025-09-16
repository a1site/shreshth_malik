function toggleMenu() {
  const menuBtn = document.querySelector('.menu-btn'); // the hamburger button
  const menu = document.getElementById('menu');        // the dropdown menu

  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
}


//test code 2

//test code 
const lamp = document.getElementById("lamp");
const hero = document.querySelector(".hero");
const sound = document.getElementById("flicker-sound");

let isOn = false;

// ---------------- Lamp Images (desktop & mobile) ----------------
const lampImages = {
  desktop: {
    on: "/art/lamp_on.png",
    off: "/art/lamp_off.png"
  },
  mobile: {
    on: "/art/lamp_on_mobile.png",
    off: "/art/lamp_off_mobile.png"
  }
};

// detect which set to use
const isMobile = window.innerWidth <= 768;
const lampSet = isMobile ? lampImages.mobile : lampImages.desktop;

// ---------------- Flicker Animation ----------------
function flickerSequence(finalOn) {
  const timings = [0, 100, 200, 300, 450, 600]; // flicker timings (ms)
  
  timings.forEach((t, i) => {
    setTimeout(() => {
      const stateOn = (i % 2 === 0); // even steps = ON
      if (stateOn) {
        lamp.src = lampSet.on;
        hero.classList.add("colored", "glow");
      } else {
        lamp.src = lampSet.off;
        hero.classList.remove("colored", "glow");
      }
    }, t);
  });

  // Final settle
  setTimeout(() => {
    if (finalOn) {
      lamp.src = lampSet.on;
      hero.classList.add("colored", "glow");
    } else {
      lamp.src = lampSet.off;
      hero.classList.remove("colored", "glow");
    }
    hero.classList.remove("flicker");
  }, timings[timings.length - 1] + 50);
}

function turnOnWithFlicker() {
  hero.classList.add("flicker");
  flickerSequence(true);
}

// ---------------- Sound ----------------
function playFlickerSound(volume = 1) {
  sound.volume = volume;
  sound.currentTime = 0;  
  sound.play().catch(err => console.log("Autoplay blocked:", err));
}

// ---------------- Events ----------------

// ✅ On page load = lamp ON with flicker + sound
window.addEventListener("load", () => {
  isOn = true;
  playFlickerSound();
  turnOnWithFlicker();
});

// ✅ Click = permanent toggle + sound
lamp.addEventListener("click", () => {
  isOn = !isOn;
  playFlickerSound();
  if (isOn) {
    turnOnWithFlicker();
  } else {
    flickerSequence(false);
  }
});

// ✅ Hover = temporary ON + softer sound (only if OFF)
lamp.addEventListener("mouseenter", () => {
  if (!isOn) {
    playFlickerSound(0.7); // softer volume on hover
    turnOnWithFlicker();
  }
});

lamp.addEventListener("mouseleave", () => {
  if (!isOn) {
    flickerSequence(false);
  }
});



//scrambling effect

function TextScramble(el) {
  this.el = el;
  this.chars = '!<>-_\\/[]{}—=+*^?#________';
  this.update = this.update.bind(this);
}

TextScramble.prototype.setText = function(newText) {
  var oldText = this.el.innerText;
  var length = Math.max(oldText.length, newText.length);
  var self = this;

  var promise = new Promise(function(resolve) {
    self.resolve = resolve;
  });

  this.queue = [];
  for (var i = 0; i < length; i++) {
    var from = oldText[i] || '';
    var to = newText[i] || '';
    var start = Math.floor(Math.random() * 40);
    var end = start + Math.floor(Math.random() * 40);
    this.queue.push({ from: from, to: to, start: start, end: end });
  }

  cancelAnimationFrame(this.frameRequest);
  this.frame = 0;
  this.update();
  return promise;
};

TextScramble.prototype.update = function() {
  var output = '';
  var complete = 0;

  for (var i = 0, n = this.queue.length; i < n; i++) {
    var q = this.queue[i];
    var from = q.from;
    var to = q.to;
    var start = q.start;
    var end = q.end;
    var char = q.char;

    if (this.frame >= end) {
      complete++;
      output += to;
    } else if (this.frame >= start) {
      if (!char || Math.random() < 0.28) {
        char = this.randomChar();
        this.queue[i].char = char;
      }
      output += '<span class="dud">' + char + '</span>';
    } else {
      output += from;
    }
  }

  this.el.innerHTML = output;

  if (complete === this.queue.length) {
    this.resolve();
  } else {
    var self = this;
    this.frameRequest = requestAnimationFrame(function() {
      self.update();
    });
    this.frame++;
  }
};

TextScramble.prototype.randomChar = function() {
  return this.chars[Math.floor(Math.random() * this.chars.length)];
};

// Example usage
var phrases = [
  '----->If you can visualize it,',
  'I can make it',
  ':)'
  
];

var el = document.querySelector('.text');
var fx = new TextScramble(el);

var counter = 0;

function next() {
  fx.setText(phrases[counter]).then(function() {
    setTimeout(next, 800);
  });
  counter = (counter + 1) % phrases.length;
}

next();