function Circles(id, pTop, pLeft, size) {
    let created = document.createElement('div')
    created.setAttribute('number', id)
    created.style.top = pTop - (size / 2) + 'px'
    created.style.left = pLeft - (size / 2)  + 'px'

    let animate = function () {
        created.animate([
            { top: `${pTop - (size / 2)}px`, left: `${pLeft - (size / 2)}px` },
            { top: `${pTop}px`, left: `${pLeft}px` }
        ], { duration: 1000, iterations: 1, delay: 350 })
    };

    let deleteDiv = function () {
        setTimeout(function () {
            created.remove()
        }, 1000)
    };

    this.draw = function () {
        document.body.append(created)
        animate()
        deleteDiv()
    }
}

// ######
var logo = document.querySelector('#logo')

// speed of movement

var speed = () => {
    let s = 0;
    while (s < 0.5) {
        s = Math.random()
    }
    return s * 100;
}
// assinging directions randomly
var direction = {
    x: Math.random() < 0.5 ? -speed() : speed(),
    y: Math.random() < 0.5 ? -speed() : speed(),
}

// Changing direction when the edge is hit
function checkDirection(rect) {
    // check Edge hit in "Y" direction
    if (direction.y > 0 && rect.top + 50 >= window.innerHeight ||
        direction.y < 0 && rect.top <= 0) {
        direction.y = direction.y < 0 ? speed() : -speed();
        // setRandomColor()
    }

    // check Edge hit in "X" direction
    if (direction.x > 0 && rect.left + 50 >= window.innerWidth ||
        direction.x < 0 && rect.left <= 0) {
        direction.x = direction.x < 0 ? speed() : -speed();;
        // setRandomColor()
    }
}

// Moving depending on derection X, Y values
let amount = 0
function moveLogo(rect) {
    logo.style.top = (rect.top + direction.y) + "px";
    logo.style.left = (rect.left + direction.x) + "px";
    amount++
    let d = new Circles(amount, rect.top+25, rect.left+25, 50)
    d.draw()
}

// generating and assining random color
function setRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    logo.style.background = color;
}

window.onload = () => {
    var move = setInterval(() => {
        let rect = logo.getBoundingClientRect();
        checkDirection(rect);
        moveLogo(rect);
    }, 100)
}