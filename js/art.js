

Pixelazr.Art = function()
{
  this.canvas           = null;
  this.context          = null;
  this.originalImage    = null;
  this.modifiedCanvas   = null;
  this.modifiedContext  = null;

  this.pixelWide = 4;
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

Pixelazr.Art.prototype.getAverageColor = function (x, y)
{
  var data = this.modifiedContext.getImageData(x, y, this.pixelWide, this.pixelWide);
  var result = [0, 0, 0, 0];

  var len = data.data.length;

  // Loop for each pixel
  for (var i = 0; i < len; i+=4)
  {
    // R,G,B,Alpha
    result[0] = result[0] + data.data[i];
    result[1] = result[1] + data.data[i+1];
    result[2] = result[2] + data.data[i+2];
    result[3] = result[3] + data.data[i+3];

    // Loop for each color (r,g,b,alpha)
    // for (var j = 0; j < 4; j++)
    // {
    //   result[j] += data.data[i + j];
    // }
  }

  // The average
  result[0] = Math.floor(result[0] / (this.pixelWide * this.pixelWide));
  result[1] = Math.floor(result[1] / (this.pixelWide * this.pixelWide));
  result[2] = Math.floor(result[2] / (this.pixelWide * this.pixelWide));
  result[3] = Math.floor(result[3] / (this.pixelWide * this.pixelWide));

  return result;
}

Pixelazr.Art.prototype.doPixelate = function ()
{
  for (var x = 0; x < this.modifiedCanvas.width; x+=this.pixelWide)
  {
    for (var y = 0; y < this.modifiedCanvas.height; y+=this.pixelWide)
    {
      var color = this.getAverageColor(x, y);

      this.modifiedContext.fillStyle = 'rgba('+color[0]+', '+color[1]+', '+color[2]+', '+color[3]/255+')';
      this.modifiedContext.fillRect (x, y, this.pixelWide, this.pixelWide);

      // this.modifiedContext.fillStyle = '#FF0000';
      // this.modifiedContext.fillRect(x, y, 2, 2);  
    }
  }
  this.clearCanvas();
  this.drawCurrent();
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