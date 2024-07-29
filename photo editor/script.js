let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let startX, startY, endX, endY;
let isZooming = false;
let img = new Image();
let originalImg = new Image();
let history = [];
let redoStack = [];
let scaleFactor = 1;
let rotationAngle = 0;
let currentFilter = 'none';

document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('zoom').addEventListener('click', () => isZooming = true);
document.getElementById('resize').addEventListener('click', () => isResizing = true);
document.getElementById('filter').addEventListener('click', applyFilter);
document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);
document.getElementById('save').addEventListener('click', saveImage);

const rotateButton = document.getElementById('rotate');
const popup = document.getElementById('popup');
const rotationInput = document.getElementById('rotation');
const applyRotationButton = document.getElementById('applyRotation');
const cancelRotationButton = document.getElementById('cancelRotation');

rotateButton.addEventListener('click', () => {
  popup.classList.remove('hidden');
});

applyRotationButton.addEventListener('click', () => {
  rotationAngle = parseInt(rotationInput.value, 10);
  drawImage();
  popup.classList.add('hidden');
});

cancelRotationButton.addEventListener('click', () => {
  popup.classList.add('hidden');
});

canvas.addEventListener('mousedown', startZoom);
canvas.addEventListener('mousemove', showZoomArea);
canvas.addEventListener('mouseup', endZoom);

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    img.onload = function() {
      originalImg.src = e.target.result; // Orijinal resmi sakla
      canvas.width = img.width;
      canvas.height = img.height;
      drawImage();
    }
    img.src = e.target.result;
  }

  reader.readAsDataURL(file);
}

function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotationAngle * Math.PI / 180);
  ctx.drawImage(originalImg, -originalImg.width / 2, -originalImg.height / 2, originalImg.width * scaleFactor, originalImg.height * scaleFactor);
  ctx.restore();
  ctx.filter = currentFilter; // Filtreyi uygula
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.filter = 'none'; // Filtreyi temizle
}

function startZoom(event) {
  if (!isZooming) return;
  startX = event.offsetX;
  startY = event.offsetY;
}

function showZoomArea(event) {
  if (!isZooming) return;
  endX = event.offsetX;
  endY = event.offsetY;
  const width = endX - startX;
  const height = endY - startY;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImage();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.strokeRect(startX, startY, width, height);
}

function endZoom(event) {
  if (!isZooming) return;
  isZooming = false;
  const width = endX - startX;
  const height = endY - startY;
  const zoomedImage = ctx.getImageData(startX, startY, width, height);
  const zoomCanvas = document.createElement('canvas');
  const zoomCtx = zoomCanvas.getContext('2d');
  zoomCanvas.width = width;
  zoomCanvas.height = height;
  zoomCtx.putImageData(zoomedImage, 0, 0);
  const scaleX = canvas.width / width;
  const scaleY = canvas.height / height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(zoomCanvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
}

function applyFilter() {
  currentFilter = 'grayscale(100%)'; // Örnek gri ton filtresi
  drawImage();
}

function undo() {
  if (history.length > 0) {
    redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(history.pop(), 0, 0);
  }
}

function redo() {
  if (redoStack.length > 0) {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(redoStack.pop(), 0, 0);
  }
}

function saveImage() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'image.png';
  link.click();
}

function saveState() {
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}