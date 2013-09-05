

Pixelazr.Art = function()
{
  this.canvas         = null;
  this.context        = null;
  this.originalImage  = null;
  this.currentImage   = null;
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
  this.context.drawImage(this.currentImage, 0, 0);
}

Pixelazr.Art.prototype.setImage = function (image)
{
  this.clearCanvas();
  this.originalImage = image;
  this.currentImage = image;
  this.drawCurrent();
}
