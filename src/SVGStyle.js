// TODO: It would be better to use something standards compliant for this
function SVGStyle(rules) {
  this.rules = rules;
}

SVGStyle.parse = function(text) {
  var pattern = /([\w\.#][^{]+)\{([\s\S]+?)\}/g;

  var result = pattern.exec(text);

  var rules = [];

  while (result) {
    var selector = result[1].trim();

    var attributes = result[2].split(';').reduce(function(ag,cur) {
      var attributeParts = cur.split(':', 2);

      if (attributeParts.length == 2) {
        var key = attributeParts[0].trim();
        var value = attributeParts[1].trim();
        ag[key] = value;
      }

      return ag;
    }, {});

    rules.push({selector: selector, attributes: attributes});

    result = pattern.exec(text);
  }

  return new SVGStyle(rules); 
}

SVGStyle.prototype.getAttributes = function(node) {
  var attributes = {};

  var rules = this.rules;

  var tagRules = rules.filter(function(r) { return r.selector.toLowerCase() == node.tagName.toLowerCase(); }) 
    
  var classAttribute = node.getAttribute('class');

  var classRules = [];

  if (classAttribute && classAttribute.trim()) {
    var classNames = classAttribute.trim().split(' ');

    classRules = classNames.map(function(className) {
      var selector = "." + className;

      return rules.filter(function(r) { return r.selector == selector; })
    });
  }

  classRules = Array.prototype.concat.apply([], classRules);

  var idRules = [];
  
  var id = node.id;

  if (id) {
    var selector = '#' + id;
    idRules = rules.filter(function(r) { return r.selector == selector; });
  }

  var allRules = tagRules.concat(classRules, idRules);

  for (var i=0; i<allRules.length; i++) {
    var rule = allRules[i];

    for (var prop in rule.attributes) {
      attributes[prop] = rule.attributes[prop];
    }
  }

  return attributes;
}

module.exports = SVGStyle;