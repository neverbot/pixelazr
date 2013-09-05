

Pixelazr.Droppable = function()
{
  this.dropboxElement = null;
  this.reader = null;
}

Pixelazr.Droppable.prototype.initialize = function (element)
{
  this.dropboxElement = element;

  // Setup drag and drop handlers
  this.dropboxElement.addEventListener('dragenter', this.stopDefault, false); 
  this.dropboxElement.addEventListener('dragover', this.stopDefault, false); 
  this.dropboxElement.addEventListener('dragleave', this.stopDefault, false); 
  this.dropboxElement.addEventListener('drop', this.onDrop, false); 

  this.reader = new FileReader(); 

  this.reader.onerror = function(e)  
  { 
    pixelazr.logs.inform('Error code: ' + e.target.error); 
  }

  // Create a closure to capture the file information. 
  this.reader.onload = function(e)  
  { 
    pixelazr.logs.inform('Image loaded');

    var image = new Image();
    image.src = e.target.result;  

    pixelazr.art.setImage(image);
  } 
} 

Pixelazr.Droppable.prototype.stopDefault = function(e)  
{ 
  e.stopPropagation(); 
  e.preventDefault(); 
} 

Pixelazr.Droppable.prototype.onDrop = function(e)  
{ 
  pixelazr.logs.log('Droppable.onDrop', 'Image onDrop');

  // Clear DOM log elements
  pixelazr.logs.clearMessages();

  e.stopPropagation(); 
  e.preventDefault(); 

  var readFileSize = 0; 
  var files = e.dataTransfer.files; 

  var file = files[0]; 
  readFileSize += file.fileSize; 

  // Only process image files
  var imageType = /image.*/; 

  if (!file.type.match(imageType))  
  { 
    alert('Drop only image files, please'); 
    return; 
  } 

  // Read in the image file as a data url
  pixelazr.droppable.reader.readAsDataURL(file); 
} 
