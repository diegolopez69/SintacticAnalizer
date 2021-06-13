const varTag = "<var>";
const num = "<num>";
const operadores = [
  "<equals>",
  "<distinct>",
  "<greather than>",
  "<greather/equal than>",
  "<lower than>",
  "<lower/equal than>",
];
const asings = "<asign>";
const term = "<term>";

const desagregarLasInstruciones = (input) => {
  const desagregarLasInstruciones = [[]];
  let inForce = 0;
  for (let i = 0; i < input.length; i++) {
    desagregarLasInstruciones[inForce].push(input[i]);
    if (input[i] === term) {
      i !== input.length - 1 && desagregarLasInstruciones.push([]);
      inForce++;
    }
  }
  return desagregarLasInstruciones;
};

const puntoYComa = (input) => {
  input.forEach(
    (input) =>
      input[input.length - 1] !== term && console.log("Falta el punto y coma"),
      console.log('**********************************************')
  );
  return input;
};

const token = (input) => {
  input.forEach(
    (input) => input.includes("<error>") && console.log("Token inesperado"),
    console.log('**********************************************')
  );
  return input;
};

const instruction = (instruction) => {
  let result;
  if (instruction.length === 2) {
    result = revisarTermino(instruction[0]);
  } else {
    result = expre(instruction.slice(0, -1));
  }
  console.log(`Instrución: ${result}, ${instruction}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  return result;
};

const revisarTermino = (term) => {
  const result = cantidadDeNumeroDePruebas(term[0]) || variable(term[0]);
  console.log(`Termino: ${result}, ${term}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  return result;
};

const expre = (expre) => {
  let result;
  if (expre[1] === asings) {
    result = asignados(expre)
  } else {
    result = pruebasDeComparacion(expre);
  }
  console.log(`Expresión: ${result}, ${expre}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  return result;
};

const asignados = (asignados) => {  //nombre
  let result;
  if (variable(asignados[0]) && pruebaDeAsignacionDeComparadores(asignados[1])) {
    result = pruebaDeSegundoTermino(asignados.slice(2, asignados.length))
  } else {
    result = false;
  }
  console.log(`Asignación: ${result}, ${asignados}`);
  return result;
};

const pruebaDeSegundoTermino = (pruebaDeSegundoTermino) => {
  let result;
  if (pruebaDeSegundoTermino.length === 1) {
    result = revisarTermino(pruebaDeSegundoTermino)
  } else {
    result = pruebasDeComparacion(pruebaDeSegundoTermino);
  }
  console.log(`Segundo termino: ${result}, ${pruebaDeSegundoTermino}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  return result;
};

const pruebasDeComparacion = (pruebasDeComparacion) => { 
  const result =
    (variable(pruebasDeComparacion[0]) || cantidadDeNumeroDePruebas(pruebasDeComparacion[0])) &&
    pruebaDeComparadorDeOperadores(pruebasDeComparacion[1]) &&
    (variable(pruebasDeComparacion[2]) || cantidadDeNumeroDePruebas(pruebasDeComparacion[2]));
  console.log(`Comparación: ${result}, ${pruebasDeComparacion}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  if (pruebasDeComparacion.length > 3) {
    return result;
  }
  return result;
};

const variable = (variable) => {
  const result = variable === varTag;
  console.log(`Variable: ${result}, ${variable}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  return result;
};

const cantidadDeNumeroDePruebas = (cantidadDeNumeroDePruebas) => {  
  const result = cantidadDeNumeroDePruebas === num;  
  console.log(`Número de prueba: ${result}, ${cantidadDeNumeroDePruebas}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  return result;
};

const pruebaDeComparadorDeOperadores = (operator) => { 
  const result = operadores.includes(operator); 
  console.log(`Operador de comparación: ${result}. ${operator}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  return result;
};

const pruebaDeAsignacionDeComparadores = (input) => { 
  const result = input === asings;
  console.log(`Asignación de comparador: ${result} , ${input}`);
  console.log('-----------------------------------------------------------------------------------------------------------')
  return result;
};

module.exports = {
  analize: (input) => {
    const separacionDeInstruciones = desagregarLasInstruciones(input);
    const terminosFiltrados = puntoYComa(separacionDeInstruciones);
    const soloLosCharsValidos = token(terminosFiltrados);
    return soloLosCharsValidos.map((input, index) => {
      console.log(`Número de instrucción: ${index + 1}`);
      console.log('-----------------------------------------------------------------------------------------------------------')
      return !input.includes("<Error>") ? instruction(input) : false;
    });
  },
};
