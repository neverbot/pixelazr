

Pixelazr.Logs = function()
{
  this.shouldDebug = true;
  this.shouldDebugFunctionNames = true;

  this.informElement = null;
  this.messageElement = null;
}

Pixelazr.Logs.prototype.initialize = function (informEl, messageEl)
{
  this.informElement = informEl;
  this.messageElement = messageEl;
}

Pixelazr.Logs.prototype.clearMessages = function()
{
  this.informElement.style.display = 'none';
  this.informElement.innerHTML = '';

  this.messageElement.style.display = 'none';
  this.messageElement.innerHTML = '';
}

Pixelazr.Logs.prototype.inform = function (text)
{
  if (this.informElement != null)
  {
    this.informElement.innerHTML = text;
    // visible again
    this.informElement.style.display = '';
  }
} 

Pixelazr.Logs.prototype.log = function (fileName, message, object) 
{
  var result = [];

  if (this.shouldDebug == false)
    return;

  if (this.shouldDebugFunctionNames)
    result.push(fileName);

  if (Array.isArray(message))
    result.push(message.join(' '));
  else
    result.push(message);
  if (object)
    result.push(object);

  // Old IE, console is not initialized by default
  if (typeof console === "undefined" || typeof console.log === "undefined")
  {
    // Do nothing?
  }
  else
  {
    console.log(result);
  }
}
