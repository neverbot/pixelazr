

Pixelazr.Art = function()
{
  this.canvas           = null;
  this.context          = null;
  this.originalImage    = null;
  this.modifiedCanvas   = null;
  this.modifiedContext  = null;
}

Pixelazr.Art.prototype.initialize = function (canvasElement)
{
  this.canvas = canvasElement;
  this.context = this.canvas.getContext('2d');
} 

Pixelazr.Art.prototype.clearCanvas = function ()
{
  this.context.clearRect(0, 0, 500, 500);
}

Pixelazr.Art.prototype.drawCurrent = function ()
{
  // this.context.drawImage(this.currentImage, 0, 0);
  this.context.drawImage(this.modifiedCanvas, 0, 0);
}

Pixelazr.Art.prototype.setImage = function (image)
{
  this.clearCanvas();
  this.originalImage = image;
  this.modifiedCanvas = this.convertImageToCanvas(image);
  this.modifiedContext = this.modifiedCanvas.getContext('2d');
  this.drawCurrent();
}

Pixelazr.Art.prototype.getImage = function ()
{
  return this.convertCanvasToImage(this.modifiedCanvas);
}

Pixelazr.Art.prototype.doPixelate = function ()
{
  for (var i = 0; i < this.modifiedCanvas.width; i+=3)
  {
    for (var j = 0; j < this.modifiedCanvas.height; j+=3)
    {
      this.modifiedContext.fillStyle = '#FF0000';
      this.modifiedContext.fillRect(i, j, 2, 2);  
    }
    this.drawCurrent();
  }
}

Pixelazr.Art.prototype.resetImage = function()
{
  this.clearCanvas();
  this.modifiedCanvas = this.convertImageToCanvas(this.originalImage);
  this.modifiedContext = this.modifiedCanvas.getContext('2d');
  this.drawCurrent();
}

// These two functions taken from david walsh blog:
// http://davidwalsh.name/convert-canvas-image

// Converts image to canvas; returns new canvas element
Pixelazr.Art.prototype.convertImageToCanvas = function(image) 
{
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext('2d').drawImage(image, 0, 0);

  return canvas;
}

// Converts canvas to an image
Pixelazr.Art.prototype.convertCanvasToImage = function(canvas) 
{
  var image = new Image();
  image.src = canvas.toDataURL('image/png');
  return image;
}