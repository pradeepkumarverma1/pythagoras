const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const tri_name = document.getElementById('tri_name');
const solutionDiv = document.getElementById('solutions');

const height_value = document.getElementById('height_value');
const base_value = document.getElementById('base_value');
const hypo_value = document.getElementById('hypo_value');

const height_color = document.getElementById('height_color');
const base_color = document.getElementById('base_color');
const hypo_color = document.getElementById('hypo_color');

height_value.addEventListener('blur', () => drawTriangle());
base_value.addEventListener('blur', () => drawTriangle());
hypo_value.addEventListener('blur', () => drawTriangle());

height_color.addEventListener('change', () => drawTriangle());
base_color.addEventListener('change', () => drawTriangle());
hypo_color.addEventListener('change', () => drawTriangle());

tri_name.addEventListener('blur', drawTriangle)


const varHeight = 50;
const varBase = 250;
const varHypo = 100;

let heightValue = 10;
let baseValue = 10;
let hypoValue = 10;

let names = '';

function drawTriangle() {

    ctx.clearRect(0, 0, 500, 300);

    drawHeight();
    drawBase();
    drawHypo();

    names = tri_name.value.split('');

    if (names.length >= 0 && names.length <= 2) {
        names = ['a', 'b', 'c'];
    }

    //Show the name of the triangle
    ctx.fillStyle = 'black';
    ctx.font = '18px arial rounded mt';
    ctx.fillText(names[0].toUpperCase(), 30, 20);
    ctx.fillText(names[2].toUpperCase(), 250, 120);
    ctx.fillText(names[1].toUpperCase(), 30, 120);

    ctx.font = '10px cambria';

    //show the values of the three sides
    if (!isNaN(parseInt(height_value.value)) && height_value.value != '') {
        heightValue = height_value.value;
    }

    if (!isNaN(parseInt(base_value.value)) && base_value.value != '') {
        baseValue = base_value.value;
    }

    if (!isNaN(parseInt(hypo_value.value)) && hypo_value.value != '') {
        hypoValue = hypo_value.value;
    }

    ctx.fillText(heightValue, 20, 70);
    ctx.fillText(baseValue, 120, 120);
    ctx.fillText(hypoValue, 120, 50);

    showSolution();
}


function drawHeight() {
    ctx.strokeStyle = height_color.value;
    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.lineTo(50, varHypo);
    ctx.stroke();
}


function drawBase() {
    ctx.strokeStyle = base_color.value;
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(varBase, varHypo);
    ctx.stroke();
}


function drawHypo() {
    ctx.strokeStyle = hypo_color.value;
    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.lineTo(varBase, 100);
    ctx.stroke();
}


function showSolution() {

    solutions.innerHTML = `
    Given, In triangle ABC, <br>
    Height = ${heightValue} cm, <br>
    Base = ${baseValue} cm, <br>
    Hypotenuse = ${hypoValue} cm, <br><br>
    
    Now, using Pythagoras Theorem, <br>
    ${names[0].toUpperCase() + names[2].toUpperCase()}<sup>2</sup> = AB<sup>2</sup> + BC<sup>2</sup>


    `
}