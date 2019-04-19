

Pixelazr.Droppable = function()
{
  this.dropboxElement = null;
  this.reader = null;
};

Pixelazr.Droppable.prototype.initialize = function (element)
{
  this.dropboxElement = element;

  // Setup drag and drop handlers
  addEvent('dragenter', this.dropboxElement, this.stopDefault);
  addEvent('dragover', this.dropboxElement, this.stopDefault);
  addEvent('dragleave', this.dropboxElement, this.stopDefault);
  addEvent('drop', this.dropboxElement, this.onDrop);

  this.reader = new FileReader();

  this.reader.onerror = function(e)
  {
    var evt = e || window.event;
    pixelazr.logs.inform('Error code: ' + evt.target.error);
  };

  // Create a closure to capture the file information.
  this.reader.onload = function(e)
  {
    pixelazr.logs.inform('Image loaded');

    var evt = e || window.event;
    var image = new Image();
    image.src = evt.target.result;

    // to solve weird bug in firefox: although the image arrives
    // correctly, we are not capable to build a canvas with this image.
    // Let's use a timeout to force the uploading event to be finished
    // pixelazr.art.setImage(image);
    setTimeout(function(){ pixelazr.art.setImage(image); }, 1);
  };
};

Pixelazr.Droppable.prototype.stopDefault = function(e)
{
  var evt = e || window.event;
  evt.stopPropagation();
  evt.preventDefault();
};

Pixelazr.Droppable.prototype.onDrop = function(e)
{
  pixelazr.logs.log('Droppable.onDrop', 'Image onDrop');

  // Clear DOM log elements
  pixelazr.logs.clearMessages();

  var evt = e || window.event;
  evt.stopPropagation();
  evt.preventDefault();

  var readFileSize = 0;
  var files = e.dataTransfer.files;

  var file = files[0];
  readFileSize += file.fileSize;

  // Only process image files
  var imageType = /image.*/;

  if (!file.type.match(imageType))
  {
    pixelazr.logs.inform('Drop only image files, please');
    return;
  }

  // Read in the image file as a data url
  pixelazr.droppable.reader.readAsDataURL(file);
};
