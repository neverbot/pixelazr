

function Pixelazr()
{
  this.logs       = null;
  this.droppable  = null;
  this.art        = null;
}

Pixelazr.prototype.initialize = function()
{
  this.logs  = new Pixelazr.Logs();
  this.logs.initialize(document.getElementById('info'),
                       document.getElementById('message'));

  this.logs.log('Pixelazr.initialize', 'Initializing starts...');

  this.droppable = new Pixelazr.Droppable();
  this.droppable.initialize(document.getElementById('droppableImage'));

  this.art = new Pixelazr.Art();
  this.art.initialize(document.getElementById('canvas'));
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------


// Global objects
var pixelazr = new Pixelazr();

// Global initialization
addEvent('load', window, function() {
  pixelazr.initialize();
});

function doPixelate(e)
{
  pixelazr.logs.log('Pixelazr.doPixelate', 'Enter doPixelate');

  // var event = e || window.event;
  // pixelazr.logs.log('Pixelazr.doMagic', 'Event info ' + window.event);

  if (pixelazr.art.modifiedCanvas === null)
  {
    pixelazr.logs.inform('Drop an image first, please');
    return false;
  }

  // Select pixelation wide
  var dropDown = document.getElementById('pixelateNumPixels');
  pixelazr.art.pixelWide = parseInt(dropDown.options[dropDown.selectedIndex].value);

  pixelazr.art.doPixelate();

  return false; // do not allow form submission
}

function doDownload(e)
{
  pixelazr.logs.log('Pixelazr.doDownload', 'Enter doDownload');

  // var event = e || window.event;
  // pixelazr.logs.log('Pixelazr.doMagic', 'Event info ' + window.event);

  if (pixelazr.art.modifiedCanvas === null)
  {
    pixelazr.logs.inform('Drop an image first, please');
    return false;
  }

  var data = pixelazr.art.getImage().src.replace("image/png", "image/octet-stream");
  window.location.href = data;

  return false; // do not allow form submission
}

function doReset(e)
{
  pixelazr.logs.log('Pixelazr.doReset', 'Enter doReset');

  // var event = e || window.event;
  // pixelazr.logs.log('Pixelazr.doMagic', 'Event info ' + window.event);

  if (pixelazr.art.modifiedCanvas === null)
  {
    pixelazr.logs.inform('Drop an image first, please');
    return false;
  }

  pixelazr.art.resetImage();

  return false; // do not allow form submission
}