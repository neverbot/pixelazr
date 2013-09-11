

Pixelazr.Art = function()
{
  this.canvas           = null;
  this.context          = null;
  this.originalImage    = null;
  this.modifiedCanvas   = null;
  this.modifiedContext  = null;

  this.pixelWide = 3;

  this.currentXRender = 0;
  this.currentYRender = 0;
  this.isRendering = false;
}

Pixelazr.Art.prototype.initialize = function (canvasElement)
{
  this.canvas  = canvasElement;
  this.context = this.canvas.getContext('2d');
  this.currentXRender = 0;
  this.currentYRender = 0;
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
  this.currentXRender = 0;
  this.currentYRender = 0;
  this.isRendering = false;

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
  var data = this.modifiedContext.getImageData(x, y, this.pixelWide, this.pixelWide).data;
  var result = [0, 0, 0, 0];

  // var len = data.length;

  // // Loop for each pixel
  // for (var i = 0; i < len; i+=4)
  // {
  //   // R,G,B,Alpha
  //   result[0] += data[i];
  //   result[1] += data[i+1];
  //   result[2] += data[i+2];
  //   result[3] += data[i+3];
  // }

  // Surprinsingly for-in is faster than for, even having 
  // to check if each element is really a number

  var i = 0;
  var what = 0;

  for (element in data)
  {
    // Only numbers
    what = parseInt(data[element]) || 0;
    result[i%4] += what;
    ++i;
  }


  // The average
  result[0] = Math.floor(result[0] / (this.pixelWide * this.pixelWide));
  result[1] = Math.floor(result[1] / (this.pixelWide * this.pixelWide));
  result[2] = Math.floor(result[2] / (this.pixelWide * this.pixelWide));
  result[3] = Math.floor(result[3] / (this.pixelWide * this.pixelWide));

  return result;
}

Pixelazr.Art.prototype.doPixelateAux = function ()
{
  // pixelazr.logs.log('lala', 'x '+pixelazr.art.x + ' y '+pixelazr.art.y);

  // Stop if the reset button has been pressed
  if (this.isRendering == false)
    return;

  var color = this.getAverageColor(this.currentXRender, this.currentYRender);
  this.modifiedContext.fillStyle = 'rgba('+color[0]+', '+color[1]+', '+color[2]+', '+color[3]/255+')';
  this.modifiedContext.fillRect (this.currentXRender, this.currentYRender, this.pixelWide, this.pixelWide);  

  this.currentYRender += this.pixelWide;

  if (this.currentYRender > this.modifiedCanvas.height)
  {
    this.currentYRender = 0;
    this.currentXRender += this.pixelWide;
    this.clearCanvas();
    this.drawCurrent();
  }

  if (this.currentXRender > this.modifiedCanvas.width)
  {
    this.clearCanvas();
    this.drawCurrent();    
    // Finish, do not call again
    this.isRendering = false;
  }
  else
  {
    setTimeout(function() { pixelazr.art.doPixelateAux(); }, 1);
  }
}

Pixelazr.Art.prototype.doPixelate = function ()
{
  if (this.isRendering == true)
  {
    pixelazr.logs.inform('Already pixelating, wait until finish or press reset');
    return;
  }

  this.currentXRender = 0;
  this.currentYRender = 0;
  this.isRendering = true;

  setTimeout(function() { pixelazr.art.doPixelateAux(); }, 1);

  // Old system, before per-row rasterization

  // for (var x = 0; x < this.modifiedCanvas.width; x+=this.pixelWide)
  // {
  //   for (var y = 0; y < this.modifiedCanvas.height; y+=this.pixelWide)
  //   {
  //     var color = this.getAverageColor(x, y);

  //     this.modifiedContext.fillStyle = 'rgba('+color[0]+', '+color[1]+', '+color[2]+', '+color[3]/255+')';
  //     this.modifiedContext.fillRect (x, y, this.pixelWide, this.pixelWide);

  //     // this.modifiedContext.fillStyle = '#FF0000';
  //     // this.modifiedContext.fillRect(x, y, 2, 2);  
  //   }
  // }
  // this.clearCanvas();
  // this.drawCurrent();
}

Pixelazr.Art.prototype.resetImage = function()
{
  this.currentXRender = 0;
  this.currentYRender = 0;
  this.isRendering = false;

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


