// calculadora.js

let resultado = '0';
let operadorActual = '';
let operadorAnterior = '';
let nuevaEntrada = true;

const calcular = () => {
  const num1 = parseFloat(operadorAnterior);
  const num2 = parseFloat(resultado);

  if (isNaN(num1) || isNaN(num2)) {
    return 'Error';
  }

  switch (operadorActual) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return 'Error';
      }
      return num1 / num2;
    case '%':
      return num1 * (num2 / 100);
    default:
      return num2;
  }
};

const manejarClick = (event) => {
  const valor = event.target.innerText;

  if (valor >= '0' && valor <= '9') {
    if (nuevaEntrada || resultado === '0') {
      resultado = valor;
      nuevaEntrada = false;
    } else {
      resultado += valor;
    }
  } else if (valor === '.') {
    if (nuevaEntrada) {
      resultado = '0.';
      nuevaEntrada = false;
    } else if (!resultado.includes('.')) {
      resultado += '.';
    }
  } else if (valor === '=') {
    resultado = calcular();
    operadorAnterior = '';
    operadorActual = '';
    nuevaEntrada = true;
  } else if (valor === 'CE') {
    resultado = resultado.slice(0, -1) || '0';
  } else if (valor === 'C') {
    resultado = '0';
    operadorAnterior = '';
    operadorActual = '';
    nuevaEntrada = true;
  } else {
    if (operadorActual !== '') {
      operadorAnterior = calcular();
      nuevaEntrada = true;
    } else {
      operadorAnterior = resultado;
      nuevaEntrada = true;
    }
    operadorActual = valor;
  }

  actualizarDisplay(resultado);
};

const actualizarDisplay = (value) => {
  const display = document.getElementById('resultado');
  display.innerText = value;
};

const botones = document.querySelectorAll('button');
botones.forEach(button => {
  button.addEventListener('click', manejarClick);
});
