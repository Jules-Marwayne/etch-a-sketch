let range = document.querySelector("#range");
let squares = document.querySelector("#Squares");
let container = document.querySelector("#container");
let colorChoice = document.querySelector("#color");
let custom = document.querySelector("#custom")
let rgb = document.querySelector("#rgb");
let additive = document.querySelector("#additive");
let eraser = document.querySelector("#eraser");
let clear = document.querySelector("#clear");
let mode = "custom";
let color = colorChoice.value;

onLoad(range.value);

colorChoice.addEventListener("change", function(e) {
    color = e.target.value;
})
custom.addEventListener("click", function() {
    erase();
    mode = "custom";
    generateGrid(range.value);
    updateBtns();
})
rgb.addEventListener("click", function() {
    erase();
    mode = "rgb";
    generateGrid(range.value);
    updateBtns();
})
additive.addEventListener("click", function() {
    mode = "additive";
    updateBtns();
})
eraser.addEventListener("click", function() {
    mode = "eraser";
    updateBtns();
})
clear.addEventListener("click", function() {
    erase();
})

// for slider
range.addEventListener("input", function() {
    squares.textContent = `${range.value} x ${range.value}`;
});
range.addEventListener("change", function(e) {
    generateGrid(e.target.value);
});

function onLoad(value) {
    squares.textContent = `${value} x ${value}`;
    generateGrid(value);
}

function generateGrid(value) {
    container.innerHTML = "";
    for (let i = 0; i < value; i++) {
        for (let j = 0; j < value; j++) {
            let div = document.createElement("DIV");
            div.style.width = `calc(500px / ${value})`;
            div.style.height = `calc(500px / ${value})`;
            div.style.backgroundColor = "#ffffff";
            div.addEventListener("mouseenter", function() {
                if (mode === "custom") {
                    div.style.backgroundColor = color;
                } else if (mode === "rgb") {
                    div.style.backgroundColor = randomColor();
                } else if (mode === "additive") {
                    div.style.backgroundColor = darken(div.style.backgroundColor);
                } else {
                    div.style.backgroundColor = "rgb(255, 255, 255)";
                }
            })
            
            container.appendChild(div);
        }
    }
}

function randomColor() {
    let color1 = Math.floor(Math.random().toFixed(3) * 255).toString(16);
    let color2 = Math.floor(Math.random().toFixed(3) * 255).toString(16);
    let color3 = Math.floor(Math.random().toFixed(3) * 255).toString(16);
    return `#${color1}${color2}${color3}`;
}

function erase() {
    let divs = document.querySelectorAll("#container div");
    for (let div of divs) {
        div.style.backgroundColor = "#ffffff";
        div.addEventListener("mouseenter", function() {
            if (mode === "custom") {
                div.style.backgroundColor = color;
            } else if (mode === "rgb") {
                div.style.backgroundColor = randomColor();
            } else {
                let initColor = div.style.backgroundColor;
                div.style.backgroundColor = darken(initColor);
            }
        });
    }
}

function darken(hex) {
    if (hex[0] === "#") {
        let values = hex.substring(1);
        let r = parseInt('0x' + values.slice(0, 2));
        let g = parseInt('0x' + values.slice(2, 4));
        let b = parseInt('0x' + values.slice(4));
        let rr = (r - Math.round(255 * 0.1)).toString(16);
        let gg = (g - Math.round(255 * 0.1)).toString(16);
        let bb = (b - Math.round(255 * 0.1)).toString(16);
        return `#${rr}${gg}${bb}`;
    } else if (hex.slice(0, 3) === "rgb") {
        let values = hex.slice(4, -1).split(", ");
        let r = values[0] - Math.round(255 * 0.1);
        let g = values[1] - Math.round(255 * 0.1);
        let b = values[2] - Math.round(255 * 0.1);
        return `rgb(${r}, ${g}, ${b})`;
    }
}

function updateBtns() {
    let btns = document.getElementsByTagName("BUTTON");
    for (let btn of btns) {
        let id = btn.getAttribute("id");
        console.log(id);
        if (mode == id) {
            btn.style.backgroundColor = "black";
            btn.style.color = "white";
        } else {
            btn.style.backgroundColor = "white";
            btn.style.color = "black";
        }
    }
}