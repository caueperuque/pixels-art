//MODIFICO TEXTO DO TÍTULO
const getTitle = document.getElementById('title');
getTitle.innerText = 'Pixels Art';

//CRIO AS CORES DO PELETTE COLOR
const createSquare = () => {
  const sectionPallets = document.getElementById('color-palette');
  for (let index = 0; index < 4; index += 1) {
    const elementSquare = document.createElement('div');
    elementSquare.classList.add('color');
    sectionPallets.appendChild(elementSquare);
  }
  const getSquares = document.querySelectorAll('.color');
  getSquares[0].style.backgroundColor = 'black';
  getSquares[1].style.backgroundColor = 'purple';
  getSquares[2].style.backgroundColor = 'green';
  getSquares[3].style.backgroundColor = 'blue';
};
createSquare();

//CRIO O BOTÃO DE RANDOMIZAR CORES
const createBtnRandom = () => {
  const createBtn = document.createElement('button');
  createBtn.id = 'button-random-color';
  createBtn.innerText = 'Cores aleatórias';
  document.body.appendChild(createBtn);
};

createBtnRandom();

//CRIO FUNÇÃO PARA GERAR UM COR ALEATÓRIA EM HEX
const generateRandomColor = () => {
  const characterOfColor = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += characterOfColor[Math.floor(Math.random() * 16)];
  }
  return color;
};

//APLICO AS CORES GERADAS NOS ELEMENTOS (EXCETO O PRIMEIRO)
const applyRandomColor = () => {
  const colors = document.querySelectorAll('.color');
  colors[1].style.backgroundColor = generateRandomColor();
  colors[2].style.backgroundColor = generateRandomColor();
  colors[3].style.backgroundColor = generateRandomColor();
};

//SALVO AS CORES GERADAS NO LOCAL STORAGE
const colors = document.querySelectorAll('.color');
let arrayColor = [];
const teste = () => {
  applyRandomColor();
  const teste2 = () => {
    arrayColor = [colors[1].style.backgroundColor, colors[2].style.backgroundColor, colors[3].style.backgroundColor];
    localStorage.setItem('colorPalette', JSON.stringify(arrayColor));
  };
  teste2();
};

//FAÇO O BOTÃO DE GERAR CORES FUNCIONAR
const generatorColor = () => {
  const getBtnRandom = document.querySelector('#button-random-color');
  getBtnRandom.addEventListener('click', teste);
};

//RETORNO AS CORES SALVAS 
const saveColorPalette = () => {
  if (localStorage.getItem('colorPalette') !== null) {
    colors[1].style.backgroundColor = JSON.parse(localStorage.getItem('colorPalette'))[0];
    colors[2].style.backgroundColor = JSON.parse(localStorage.getItem('colorPalette'))[1];
    colors[3].style.backgroundColor = JSON.parse(localStorage.getItem('colorPalette'))[2];
  }
};

const addEventPixels = () => {
  const getPixel = document.querySelectorAll('.pixel');
  for (let index = 0; index < getPixel.length; index += 1) {
    getPixel[index].addEventListener('click', paintPixel);
  };
}

//CRIO A BOARD PARA PINTURA
const getBoard = document.getElementById('pixel-board');
const addPixels = () => {
  for (let index = 0; index < 25; index += 1){
    const createPixel = document.createElement('div');
    createPixel.className = 'pixel';
    getBoard.append(createPixel);
    getBoard.height = 5 * 40 + 'px'
    getBoard.width = 5 * 40 + 'px'
  }
  addEventPixels();
};


//PRÉ-SETTO QUE A PRIMEIRA COR SELECIONADA SEMPRE VAI SER O PRETO
const initialSelected = () => {
  const blackBox = document.querySelector('.color');
  blackBox.classList.add('selected');
}

const selectedColor = (event) => {
  let className = event.target.className;
  if (document.querySelector('.selected') === null) {
    event.target.classList.add('selected');
  } else {
    document.querySelector('.selected').classList.remove('selected');
    event.target.classList.add('selected');
  }
}

//INDICO QUE A COR SELECIONADO É MESMO A SELECIONADA
const getColorPalette = document.querySelectorAll('.color');
for (let index = 0; index < getColorPalette.length; index += 1) {
  getColorPalette[index].addEventListener('click', selectedColor)
};

//CONSTRUO UMA FUNÇÃO PARA QUE A COR SELECIONADA SEJA A QUE VAI SER PINTADA NO BOARD
const paintPixel = (event) => {
  const getClassSelectedColor = document.querySelectorAll('.selected')[0].style.backgroundColor;
  event.target.style.backgroundColor = getClassSelectedColor;
  console.log(event.target.style.backgroundColor);
  const teste2 = () => {
    let arrayPixels = [];
    const getPixel = document.querySelectorAll('.pixel');
    for (let index = 0; index < getPixel.length; index += 1) {
      arrayPixels.push(getPixel[index].style.backgroundColor);
      localStorage.setItem('pixelBoard', JSON.stringify(arrayPixels));
    }
    
  };
  teste2();
}





//CRIO O BOTÃO DE RESET
const getBtnReset = document.getElementById('clear-board');
getBtnReset.innerText = 'Limpar';

const clearBoard = () => {
  const getPixel = document.querySelectorAll('.pixel');
  for (index = 0; index < getPixel.length; index += 1){
    getPixel[index].style.backgroundColor = 'white';
  }
}

//BOTO PARA FUNCIONAR O BOTÃO RESET
getBtnReset.addEventListener('click', clearBoard);

// SALVO A PINTURA FEITA NO BOARD
const savePaint = () => {
  if (localStorage.getItem('pixelBoard') !== null) {
    const getPixel = document.querySelectorAll('.pixel');
    for(let index = 0; index < getPixel.length; index += 1) {
      const saveColorPaint = JSON.parse(localStorage.getItem('pixelBoard'))[index];
      getPixel[index].style.backgroundColor = saveColorPaint;
      console.log(JSON.parse(localStorage.getItem('pixelBoard'))[index]);
    }
  }
};


const getBtnVQV = document.querySelectorAll('button')[1];
getBtnVQV.id = 'generate-board';
const getInput = document.querySelector('input');
getInput.id = 'board-size';
const boardSize = () => {
  const pixelBoard = document.getElementById('pixel-board');
  const getInputValue = getInput.value;
  if (getInputValue <= 5 && getInputValue > 0) {
    pixelBoard.innerHTML = '';
    for (let index = 0; index < 5**2; index += 1) {
      const createPixel = document.createElement('div');
      createPixel.className = 'pixel';
      getBoard.append(createPixel);
      pixelBoard.style.width = 5 * 40 + 'px';
      pixelBoard.style.height = 5 * 40 + 'px';
    }
  } else if (getInputValue >= 50 && getInputValue > 0){
    pixelBoard.innerHTML = '';
    for (let index = 0; index < 50**2; index += 1) {
      const createPixel = document.createElement('div');
      createPixel.className = 'pixel';
      getBoard.append(createPixel);
      pixelBoard.style.width = 50 * 40 + 'px';
      pixelBoard.style.height = 50 * 40 + 'px';
    }
  } else if (getInputValue > 0){
    pixelBoard.innerHTML = '';
    for (let index = 0; index < getInputValue**2; index += 1) {
      const createPixel = document.createElement('div');
      createPixel.className = 'pixel';
      getBoard.append(createPixel);
      pixelBoard.style.width = getInputValue * 40 + 'px';
      pixelBoard.style.height = getInputValue * 40 + 'px';
    } 
  } else {
    alert('Board Inválido!')
  }
  addEventPixels();
};

const defaultSize = () => {
  const pixelBoard = document.getElementById('pixel-board');
  if(getInput.value < 5) {
    pixelBoard.innerHTML = '';
    for (let index = 0; index < 5**2; index += 1){
      const createPixel = document.createElement('div');
      createPixel.className = 'pixel';
      getBoard.append(createPixel);
      pixelBoard.style.width = 5 * 40 + 'px';
      pixelBoard.style.height = 5 * 40 + 'px';
    }
  }
  addEventPixels();
}

// saveBoard();
// addPixels();
getBtnVQV.addEventListener('click', boardSize);

const upSize = (event) => {
    event.target.style.height = '90px'
    event.target.style.width = '90px'
}

const downSize = (event) => {
    event.target.style.height = '78px'
    event.target.style.width = '78px'
}

for (let color of colors) {
    color.addEventListener('mousedown', upSize);
    color.addEventListener('mouseup', downSize);
}



window.onload = () => {
  initialSelected();
  generatorColor();
  saveColorPalette();
  addPixels();
  savePaint();
};


