//GLASS
const glass = document.querySelector(".glass");
//OBTENIENDO DATOS
const color = document.querySelector(".color");
const opacity = document.querySelector(".opacity");
const blur = document.querySelector(".blur");
const contrast = document.querySelector(".contrast");
const saturate = document.querySelector(".saturate");
const size = document.querySelector(".size");
const borderRadius = document.querySelector(".border-radius");
//OBTENIENDO DATOS DE TODOS LOS INPUTS
const allInputs = document.querySelectorAll('input');
//MOSTRANDO RANGOS
const getOpacity = document.querySelector(".get-opacity");
const getBlur = document.querySelector(".get-blur");
const getContrast = document.querySelector(".get-contrast");
const getSaturate = document.querySelector(".get-saturate");
const getSize = document.querySelector(".get-size");
const getBorderRadius = document.querySelector(".get-border-radius");
//COPIAR VALORES
const result = document.querySelector(".stylescopy");
const copyCode = document.querySelector(".copycode");
const objectStyle = window.getComputedStyle(result);
//CONVERTIR HEXADECIMAL A RGBA
const hexToRGBA = (color) => {
  let hexWithOut = color.replace('#','');
  let rgb = hexWithOut.split('');
  const R = parseInt(rgb[0]+rgb[1],16);
  const G = parseInt(rgb[2]+rgb[3],16);
  const B = parseInt(rgb[4]+rgb[5],16);
  const opac = (opacity.value)/100;
  return `rgba(${R},${G},${B},${opac})`;
};
//COLOR DE FONDO
color.addEventListener('input',(e) =>{
  glass.style.backgroundColor = `${hexToRGBA(color.value)}`;
  updateResult('backgroundColor', hexToRGBA(color.value));
})
//TRANSPARENCIA
opacity.addEventListener('input',(e) =>{
  getOpacity.value = `${e.target.value}%`;
  glass.style.backgroundColor = `${hexToRGBA(color.value)}`;
  updateResult('backgroundColor', hexToRGBA(color.value));
})
//BLUR
blur.addEventListener('input',(e) =>{
  getBlur.value = `${e.target.value/4}px`;
  glass.style.backdropFilter = `blur(${getBlur.value}) contrast(${getContrast.value}) saturate(${getSaturate.value})`;
  updateResult('backdropFilter',`blur(${getBlur.value}) contrast(${getContrast.value}) saturate(${getSaturate.value})`);
})
//CONTRAST
contrast.addEventListener('input',(e) =>{
  getContrast.value = `${e.target.value}%`;
  glass.style.backdropFilter = `blur(${getBlur.value}) contrast(${getContrast.value}) saturate(${getSaturate.value})`;
  updateResult('backdropFilter',`blur(${getBlur.value}) contrast(${getContrast.value}) saturate(${getSaturate.value})`);
})
//SATURATE
saturate.addEventListener('input',(e) =>{
  getSaturate.value = `${e.target.value}%`;
  glass.style.backdropFilter = `blur(${getBlur.value}) contrast(${getContrast.value}) saturate(${getSaturate.value})`;
  updateResult('backdropFilter',`blur(${getBlur.value}) contrast(${getContrast.value}) saturate(${getSaturate.value})`);
})
//TAMAÑO
size.addEventListener('input',(e) =>{
  glass.style.width = `${e.target.value*3}px`;
  glass.style.height = `${e.target.value*3}px`;
  getSize.value = `${e.target.value*3}px`;
  updateResult('width',getSize.value);
  updateResult('height',getSize.value);
})
//BORDE DEL CONTENIDO
borderRadius.addEventListener('input',(e) =>{
  glass.style.borderRadius = `${e.target.value*2}px`;
  getBorderRadius.value = `${e.target.value*2}px`;
  updateResult('borderRadius',getBorderRadius.value);
})
//PEGAR VALORES
///Generando Object de los estilos del resultado
const resultStyle = {
  backgroundColor: objectStyle.backgroundColor,
  backdropFilter: objectStyle.backdropFilter,
  borderRadius: objectStyle.borderRadius,
  width: objectStyle.height,
  height: objectStyle.height
};
console.log(resultStyle);
//CONVERTIR KEYS A KEBABCASE
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
//MOSTRANDO RESULTADOS PARA COPIAR
const updateResult = (key, value) => {
  const copyStyles = {...resultStyle, [key]: value}
  console.log(copyStyles);
  const showResult = Object.keys(copyStyles).map((k) => `${toKebabCase(k)}: ${copyStyles[k]};`).join(`<br>`)
  result.innerHTML = showResult
}
//COPIAR VALORES
copyCode.addEventListener('click',(e) =>{
  let text = result.value;
  const textArea = document.createElement('textarea');
  textArea.textContent = text;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
})
