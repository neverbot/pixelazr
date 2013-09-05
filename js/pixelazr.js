

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

}

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------


// Global objects
var pixelazr = new Pixelazr();

// Global initialization
addEvent('load', window, function() {
  pixelazr.initialize();
});

