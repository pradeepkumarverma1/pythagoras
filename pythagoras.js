const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const btn = document.getElementById('calculate');

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

let heightValue = '';
let baseValue = '';
let hypoValue = '';

let names = '';

function drawTriangle() {

    ctx.clearRect(0, 0, 500, 300);

    heightValue = '';
    baseValue = '';
    hypoValue = '';

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
    if (!isNaN(parseInt(height_value.value)) && height_value.value != '' && !parseInt(height_value.value) <= 0) {
        heightValue = height_value.value;
    }

    if (!isNaN(parseInt(base_value.value)) && base_value.value != '' && !parseInt(base_value.value) <= 0) {
        baseValue = base_value.value;
    }

    if (
        !isNaN(parseInt(hypo_value.value)) && hypo_value.value != ''
        && !parseInt(hypo_value.value) <= 0
        && !(parseInt(hypo_value.value) <= parseInt(base_value.value)
            || parseInt(hypo_value.value) <= parseInt(height_value.value))
    ) {
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

    const triangleName = names.join('').toUpperCase();
    const height = names[0].toUpperCase() + names[1].toUpperCase();
    const base = names[1].toUpperCase() + names[2].toUpperCase();
    const hypo = names[0].toUpperCase() + names[2].toUpperCase();

    solutions.innerHTML = `
        Given, In triangle ${triangleName}, <br><br>
        Height ${height} = ${heightValue ? heightValue : '?'} cm, <br>
        Base ${base} = ${baseValue ? baseValue : '?'} cm, <br>
        Hypotenuse ${hypo} = ${hypoValue ? hypoValue : '?'} cm, <br><br>
        
        Now, using Pythagoras Theorem, <br><br>


    `

    if (heightValue && baseValue) {

        const heightSquare = Math.pow(heightValue, 2);
        const baseSquare = Math.pow(baseValue, 2);
        const hypoAnswer = Math.sqrt(heightSquare + baseSquare).toFixed(2);

        solutions.innerHTML += `
            Hypotenuse<sup>2</sup> = Height<sup>2</sup> + Base<sup>2</sup><br>
            ${hypo}<sup>2</sup> = ${height}<sup>2</sup> + ${base}<sup>2</sup><br>
            ${hypo}<sup>2</sup> = ${heightValue}<sup>2</sup> + ${baseValue}<sup>2</sup><br>
            ${hypo}<sup>2</sup> = ${heightSquare} + ${baseSquare}<br>
            ${hypo}<sup>2</sup> = ${(heightSquare + baseSquare).toFixed(2)}<br>
            ${hypo} = ${hypoAnswer}<br><br>
            <b>So, Hypotenuse ${hypo} is ${hypoAnswer}</b>

        `;

    } else if (baseValue && hypoValue) {

        const hypoSquare = Math.pow(hypoValue, 2);
        const baseSquare = Math.pow(baseValue, 2);
        const heightAnswer = Math.sqrt(hypoSquare - baseSquare).toFixed(2);

        solutions.innerHTML += `
            Height<sup>2</sup> = Hypotenuse<sup>2</sup> - Base<sup>2</sup><br>
            ${height}<sup>2</sup> = ${hypo}<sup>2</sup> - ${base}<sup>2</sup><br>
            ${height}<sup>2</sup> = ${hypoValue}<sup>2</sup> - ${baseValue}<sup>2</sup><br>
            ${height}<sup>2</sup> = ${hypoSquare} - ${baseSquare}<br>
            ${height}<sup>2</sup> = ${(hypoSquare - baseSquare).toFixed(2)}<br>
            ${height} = ${heightAnswer}<br><br>
            <b>So, Height ${height} is ${heightAnswer} </b>
        `;

    } else if (heightValue && hypoValue) {

        const hypoSquare = Math.pow(hypoValue, 2).toFixed(2);
        const heightSquare = Math.pow(heightValue, 2).toFixed(2);
        const baseAnswer = Math.sqrt(hypoSquare - heightSquare).toFixed(2);

        solutions.innerHTML += `
            Base<sup>2</sup> = Hypotenuse<sup>2</sup> - Height<sup>2</sup><br>
            ${base}<sup>2</sup> = ${hypo}<sup>2</sup> - ${height}<sup>2</sup><br>
            ${base}<sup>2</sup> = ${hypoValue}<sup>2</sup> - ${heightValue}<sup>2</sup><br>
            ${base}<sup>2</sup> = ${hypoSquare} - ${heightSquare}<br>
            ${base}<sup>2</sup> = ${(hypoSquare - heightSquare).toFixed(2)}<br>
            ${base} = ${baseAnswer}<br><br>
            <b>So, Base ${base} is ${baseAnswer} </b>
        `;

    }

}

btn.addEventListener('click', drawTriangle);
