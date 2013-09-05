

function Pixelazr()
{
  this.image     = null;
  this.logs      = null;
  this.droppable = null;
}

Pixelazr.prototype.initialize = function()
{
  this.logs  = new Pixelazr.Logs();
  this.logs.initialize(document.getElementById('info'),
                       document.getElementById('message'));

  this.logs.log('Pixelazr.initialize', 'Initializing starts...');

  this.droppable = new Pixelazr.Droppable();
  this.droppable.initialize(document.getElementById('droppableImage'));

  // this.image = new Pixelazr.Image();

}

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------


// Global objects
var pixelazr = new Pixelazr();

// Game initialization
addEvent('load', window, function() {
  pixelazr.initialize();
});

