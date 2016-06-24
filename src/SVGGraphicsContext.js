function SVGGraphicsContext(parentCtx) {
  this._parentCtx = parentCtx;
  this._style = null;
  this._defs = {};
}

SVGGraphicsContext.prototype.appendStyles = function(svgStyle) {
  if (this._styles) {
    this._styles.rules = this._styles.rules.concat(svgStyle.rules);
  } else {
    this._styles = svgStyle; 
  }
}

SVGGraphicsContext.prototype.addDef = function(id, node) {
  this._defs[id] = node;
}

SVGGraphicsContext.prototype.getDef = function(id) {
  if (this._defs[id])
    return this._defs[id];

  return this._parentCtx ? this._parentCtx.getDef(id) : null;
}

SVGGraphicsContext.prototype.getParent = function() {
  return this._parentCtx;
}

SVGGraphicsContext.prototype.getAttributes = function(node) {
  var attributes = this._parentCtx ? this._parentCtx.getAttributes(node) : {};

  if (this._styles) {
    var styleAttributes = this._styles.getAttributes(node);

    for (var prop in styleAttributes) {
      attributes[prop] = styleAttributes[prop];
    } 
  }

  return attributes;
    
}

module.exports = SVGGraphicsContext;