require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"input":[function(require,module,exports){
var _inputStyle, calculatePixelRatio, growthRatio, imageHeight,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

_inputStyle = Object.assign({}, Framer.LayerStyle, calculatePixelRatio = function(layer, value) {
  return (value * layer.context.pixelMultiplier) + "px";
}, {
  fontSize: function(layer) {
    return calculatePixelRatio(layer, layer._properties.fontSize);
  },
  lineHeight: function(layer) {
    return layer._properties.lineHeight + "em";
  },
  padding: function(layer) {
    var padding, paddingValue, paddingValues, pixelMultiplier;
    pixelMultiplier = layer.context.pixelMultiplier;
    padding = [];
    paddingValue = layer._properties.padding;
    if (Number.isInteger(paddingValue)) {
      return calculatePixelRatio(layer, paddingValue);
    }
    paddingValues = layer._properties.padding.split(" ");
    switch (paddingValues.length) {
      case 4:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[3]);
        break;
      case 3:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      case 2:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      default:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[0]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[0]);
    }
    return (padding.top * pixelMultiplier) + "px " + (padding.right * pixelMultiplier) + "px " + (padding.bottom * pixelMultiplier) + "px " + (padding.left * pixelMultiplier) + "px";
  }
});

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    if (options.autoCorrect == null) {
      options.autoCorrect = "on";
    }
    if (options.autoComplete == null) {
      options.autoComplete = "on";
    }
    if (options.autoCapitalize == null) {
      options.autoCapitalize = "on";
    }
    if (options.spellCheck == null) {
      options.spellCheck = "on";
    }
    if (options.autofocus == null) {
      options.autofocus = false;
    }
    if (options.textColor == null) {
      options.textColor = "#000";
    }
    if (options.fontFamily == null) {
      options.fontFamily = "-apple-system";
    }
    if (options.fontWeight == null) {
      options.fontWeight = "500";
    }
    Input.__super__.constructor.call(this, options);
    this._properties.fontSize = options.fontSize;
    this._properties.lineHeight = options.lineHeight;
    this._properties.padding = options.padding;
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement("input");
    this.input.id = "input-" + (_.now());
    this.input.style.width = _inputStyle["width"](this);
    this.input.style.height = _inputStyle["height"](this);
    this.input.style.fontSize = _inputStyle["fontSize"](this);
    this.input.style.lineHeight = _inputStyle["lineHeight"](this);
    this.input.style.outline = "none";
    this.input.style.border = "none";
    this.input.style.backgroundColor = options.backgroundColor;
    this.input.style.padding = _inputStyle["padding"](this);
    this.input.style.fontFamily = options.fontFamily;
    this.input.style.color = options.textColor;
    this.input.style.fontWeight = options.fontWeight;
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.input.setAttribute("autocorrect", options.autoCorrect);
    this.input.setAttribute("autocomplete", options.autoComplete);
    this.input.setAttribute("autocapitalize", options.autoCapitalize);
    if (options.autofocus === true) {
      this.input.setAttribute("autofocus", true);
    }
    this.input.setAttribute("spellcheck", options.spellCheck);
    this.form = document.createElement("form");
    if (options.goButton) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.stateCycle();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.animate("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  return Input;

})(Layer);


},{}],"myModule":[function(require,module,exports){
var CancelSearch, SearchCards, addCards, leaveAlerts, viewAlerts, viewAll, viewDashboard;

viewAlerts = function() {
  NavBar.animate("alerts");
  viewController.showNext(Alerts, {
    animate: true
  });
  backArrow.animate("show");
  backArrow.visible = true;
  hamb.animate("hide");
  hamb.visible = false;
  viewController.scroll.backgroundColor = "rgb(0, 188, 240)";
  searchButton.visible = false;
  return Cancel.visible = false;
};

leaveAlerts = function() {
  viewController.showPrevious();
  NavBar.animate("normal");
  backArrow.animate("hide");
  backArrow.visible = false;
  hamb.visible = true;
  hamb.animate("show");
  viewController.scroll.backgroundColor = "rgb(0, 45, 114)";
  searchButton.visible = false;
  return Cancel.visible = false;
};

viewDashboard = function() {
  viewController.showNext(Dashboard);
  NavBar.animate("normal");
  backArrow.animate("hide");
  backArrow.visible = false;
  hamb.visible = true;
  hamb.animate("show");
  viewController.scroll.backgroundColor = "rgb(0, 45, 114)";
  searchButton.animate("hide");
  searchButton.visible = false;
  return Cancel.visible = false;
};

viewAll = function() {
  viewController.showNext(AllCards);
  searchButton.animate("show");
  viewController.scroll.backgroundColor = "rgb(0, 45, 114)";
  searchButton.visible = true;
  return Cancel.visible = false;
};

SearchCards = function() {
  searchButton.animate("hide");
  Cancel.animate("show");
  searchunderline.animate("show");
  searchButton.visible = false;
  Cancel.visible = true;
  pageTitle.animate("hide");
  hamb.animate("hide");
  addCard.animate("hide");
  return input.focus();
};

CancelSearch = function() {
  searchButton.animate("show");
  Cancel.animate("hide");
  searchunderline.animate("hide");
  searchButton.visible = true;
  Cancel.visible = false;
  pageTitle.animate("show");
  hamb.animate("show");
  return addCard.animate("show");
};

addCards = function(amount, timeLeft, cardName) {
  var card, expandanim, fadein, numOfCards;
  card = new Card({
    y: 135 + numOfCards * 135
  });
  card.MakeCard(amount, timeLeft, cardName);
  fadein = new Animation(card, {
    opacity: 1,
    options: {
      time: .4
    }
  });
  fadein.start();
  numOfCards = numOfCards + 1;
  expandanim = new Animation(Dashboard, {
    height: 667 + (numOfCards - 1) * 129,
    options: {
      time: .3
    }
  });
  expandanim.start();
  return viewController.scroll.updateContent();
};

viewAlerts = function() {
  NavBar.animate("alerts");
  viewController.showNext(Alerts, {
    animate: true
  });
  backArrow.animate("show");
  backArrow.visible = true;
  hamb.animate("hide");
  hamb.visible = false;
  viewController.scroll.backgroundColor = "rgb(0, 188, 240)";
  searchButton.visible = false;
  return Cancel.visible = false;
};

leaveAlerts = function() {
  viewController.showPrevious();
  NavBar.animate("normal");
  backArrow.animate("hide");
  backArrow.visible = false;
  hamb.visible = true;
  hamb.animate("show");
  viewController.scroll.backgroundColor = "rgb(0, 45, 114)";
  searchButton.visible = false;
  return Cancel.visible = false;
};

viewDashboard = function() {
  viewController.showNext(Dashboard);
  NavBar.animate("normal");
  backArrow.animate("hide");
  backArrow.visible = false;
  hamb.visible = true;
  hamb.animate("show");
  viewController.scroll.backgroundColor = "rgb(0, 45, 114)";
  searchButton.animate("hide");
  searchButton.visible = false;
  return Cancel.visible = false;
};

viewAll = function() {
  viewController.showNext(AllCards);
  searchButton.animate("show");
  viewController.scroll.backgroundColor = "rgb(0, 45, 114)";
  searchButton.visible = true;
  return Cancel.visible = false;
};

SearchCards = function() {
  searchButton.animate("hide");
  Cancel.animate("show");
  searchunderline.animate("show");
  searchButton.visible = false;
  Cancel.visible = true;
  pageTitle.animate("hide");
  hamb.animate("hide");
  addCard.animate("hide");
  return input.focus();
};

CancelSearch = function() {
  searchButton.animate("show");
  Cancel.animate("hide");
  searchunderline.animate("hide");
  searchButton.visible = true;
  Cancel.visible = false;
  pageTitle.animate("show");
  hamb.animate("show");
  return addCard.animate("show");
};

addCards = function(amount, timeLeft, cardName) {
  var card, expandanim, fadein, numOfCards;
  card = new Card({
    y: 135 + numOfCards * 135
  });
  card.MakeCard(amount, timeLeft, cardName);
  fadein = new Animation(card, {
    opacity: 1,
    options: {
      time: .4
    }
  });
  fadein.start();
  numOfCards = numOfCards + 1;
  expandanim = new Animation(Dashboard, {
    height: 667 + (numOfCards - 1) * 129,
    options: {
      time: .3
    }
  });
  expandanim.start();
  return viewController.scroll.updateContent();
};


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgRnVuY3Rpb25zXG5cbnZpZXdBbGVydHMgPSAoKSAtPlxuXHROYXZCYXIuYW5pbWF0ZShcImFsZXJ0c1wiKVxuXHR2aWV3Q29udHJvbGxlci5zaG93TmV4dChBbGVydHMsIGFuaW1hdGU6IHRydWUpXG5cdGJhY2tBcnJvdy5hbmltYXRlKFwic2hvd1wiKVxuXHRiYWNrQXJyb3cudmlzaWJsZSA9IHRydWVcblx0aGFtYi5hbmltYXRlKFwiaGlkZVwiKVxuXHRoYW1iLnZpc2libGUgPSBmYWxzZVxuXHR2aWV3Q29udHJvbGxlci5zY3JvbGwuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwgMTg4LCAyNDApXCJcblx0c2VhcmNoQnV0dG9uLnZpc2libGUgPSBmYWxzZVxuXHRDYW5jZWwudmlzaWJsZSA9IGZhbHNlXG5cbmxlYXZlQWxlcnRzID0gKCkgLT5cblx0dmlld0NvbnRyb2xsZXIuc2hvd1ByZXZpb3VzKClcblx0TmF2QmFyLmFuaW1hdGUoXCJub3JtYWxcIilcblx0YmFja0Fycm93LmFuaW1hdGUoXCJoaWRlXCIpXG5cdGJhY2tBcnJvdy52aXNpYmxlID0gZmFsc2Vcblx0aGFtYi52aXNpYmxlID0gdHJ1ZVxuXHRoYW1iLmFuaW1hdGUoXCJzaG93XCIpXG5cdHZpZXdDb250cm9sbGVyLnNjcm9sbC5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigwLCA0NSwgMTE0KVwiXG5cdHNlYXJjaEJ1dHRvbi52aXNpYmxlID0gZmFsc2Vcblx0Q2FuY2VsLnZpc2libGUgPSBmYWxzZVxuXG52aWV3RGFzaGJvYXJkID0gKCkgLT5cblx0dmlld0NvbnRyb2xsZXIuc2hvd05leHQoRGFzaGJvYXJkKVxuXHROYXZCYXIuYW5pbWF0ZShcIm5vcm1hbFwiKVxuXHRiYWNrQXJyb3cuYW5pbWF0ZShcImhpZGVcIilcblx0YmFja0Fycm93LnZpc2libGUgPSBmYWxzZVxuXHRoYW1iLnZpc2libGUgPSB0cnVlXG5cdGhhbWIuYW5pbWF0ZShcInNob3dcIilcblx0dmlld0NvbnRyb2xsZXIuc2Nyb2xsLmJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDQ1LCAxMTQpXCJcblx0c2VhcmNoQnV0dG9uLmFuaW1hdGUoXCJoaWRlXCIpXG5cdHNlYXJjaEJ1dHRvbi52aXNpYmxlID0gZmFsc2Vcblx0Q2FuY2VsLnZpc2libGUgPSBmYWxzZVxuXG52aWV3QWxsID0gKCkgLT5cblx0dmlld0NvbnRyb2xsZXIuc2hvd05leHQoQWxsQ2FyZHMpXG5cdHNlYXJjaEJ1dHRvbi5hbmltYXRlKFwic2hvd1wiKVxuXHR2aWV3Q29udHJvbGxlci5zY3JvbGwuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwgNDUsIDExNClcIlxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IHRydWVcblx0Q2FuY2VsLnZpc2libGUgPSBmYWxzZVxuXG5TZWFyY2hDYXJkcyA9ICgpIC0+XG5cdHNlYXJjaEJ1dHRvbi5hbmltYXRlKFwiaGlkZVwiKVxuXHRDYW5jZWwuYW5pbWF0ZShcInNob3dcIilcblx0c2VhcmNodW5kZXJsaW5lLmFuaW1hdGUoXCJzaG93XCIpXG5cdHNlYXJjaEJ1dHRvbi52aXNpYmxlID0gZmFsc2Vcblx0Q2FuY2VsLnZpc2libGUgPSB0cnVlXG5cdHBhZ2VUaXRsZS5hbmltYXRlKFwiaGlkZVwiKVxuXHRoYW1iLmFuaW1hdGUoXCJoaWRlXCIpXG5cdGFkZENhcmQuYW5pbWF0ZShcImhpZGVcIilcblx0aW5wdXQuZm9jdXMoKVxuXG5DYW5jZWxTZWFyY2ggPSAoKSAtPlxuXHRzZWFyY2hCdXR0b24uYW5pbWF0ZShcInNob3dcIilcblx0Q2FuY2VsLmFuaW1hdGUoXCJoaWRlXCIpXG5cdHNlYXJjaHVuZGVybGluZS5hbmltYXRlKFwiaGlkZVwiKVxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IHRydWVcblx0Q2FuY2VsLnZpc2libGUgPSBmYWxzZVxuXHRwYWdlVGl0bGUuYW5pbWF0ZShcInNob3dcIilcblx0aGFtYi5hbmltYXRlKFwic2hvd1wiKVxuXHRhZGRDYXJkLmFuaW1hdGUoXCJzaG93XCIpXG5cbmFkZENhcmRzID0gKGFtb3VudCwgdGltZUxlZnQsIGNhcmROYW1lKSAtPlxuXHRcblx0Y2FyZCA9IG5ldyBDYXJkXG5cdFx0eTogMTM1ICsgbnVtT2ZDYXJkcyAqIDEzNVxuXHRcblx0Y2FyZC5NYWtlQ2FyZChhbW91bnQsIHRpbWVMZWZ0LCBjYXJkTmFtZSlcblx0XG5cdGZhZGVpbiA9IG5ldyBBbmltYXRpb24gY2FyZCxcblx0XHRvcGFjaXR5OiAxXG5cdFx0b3B0aW9uczpcblx0XHRcdHRpbWU6IC40XG5cdFxuXHRmYWRlaW4uc3RhcnQoKVxuXHRcblx0bnVtT2ZDYXJkcyA9IG51bU9mQ2FyZHMgKyAxXG5cdFxuXHRleHBhbmRhbmltID0gbmV3IEFuaW1hdGlvbiBEYXNoYm9hcmQsXG5cdFx0aGVpZ2h0OiA2NjcgKyAobnVtT2ZDYXJkcyAtIDEpICogMTI5XG5cdFx0b3B0aW9uczpcblx0XHRcdHRpbWU6LjNcblx0ZXhwYW5kYW5pbS5zdGFydCgpXG5cdHZpZXdDb250cm9sbGVyLnNjcm9sbC51cGRhdGVDb250ZW50KClcblxuXHQjIEZ1bmN0aW9uc1xuXG52aWV3QWxlcnRzID0gKCkgLT5cblx0TmF2QmFyLmFuaW1hdGUoXCJhbGVydHNcIilcblx0dmlld0NvbnRyb2xsZXIuc2hvd05leHQoQWxlcnRzLCBhbmltYXRlOiB0cnVlKVxuXHRiYWNrQXJyb3cuYW5pbWF0ZShcInNob3dcIilcblx0YmFja0Fycm93LnZpc2libGUgPSB0cnVlXG5cdGhhbWIuYW5pbWF0ZShcImhpZGVcIilcblx0aGFtYi52aXNpYmxlID0gZmFsc2Vcblx0dmlld0NvbnRyb2xsZXIuc2Nyb2xsLmJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDE4OCwgMjQwKVwiXG5cdHNlYXJjaEJ1dHRvbi52aXNpYmxlID0gZmFsc2Vcblx0Q2FuY2VsLnZpc2libGUgPSBmYWxzZVxuXG5sZWF2ZUFsZXJ0cyA9ICgpIC0+XG5cdHZpZXdDb250cm9sbGVyLnNob3dQcmV2aW91cygpXG5cdE5hdkJhci5hbmltYXRlKFwibm9ybWFsXCIpXG5cdGJhY2tBcnJvdy5hbmltYXRlKFwiaGlkZVwiKVxuXHRiYWNrQXJyb3cudmlzaWJsZSA9IGZhbHNlXG5cdGhhbWIudmlzaWJsZSA9IHRydWVcblx0aGFtYi5hbmltYXRlKFwic2hvd1wiKVxuXHR2aWV3Q29udHJvbGxlci5zY3JvbGwuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwgNDUsIDExNClcIlxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IGZhbHNlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2Vcblxudmlld0Rhc2hib2FyZCA9ICgpIC0+XG5cdHZpZXdDb250cm9sbGVyLnNob3dOZXh0KERhc2hib2FyZClcblx0TmF2QmFyLmFuaW1hdGUoXCJub3JtYWxcIilcblx0YmFja0Fycm93LmFuaW1hdGUoXCJoaWRlXCIpXG5cdGJhY2tBcnJvdy52aXNpYmxlID0gZmFsc2Vcblx0aGFtYi52aXNpYmxlID0gdHJ1ZVxuXHRoYW1iLmFuaW1hdGUoXCJzaG93XCIpXG5cdHZpZXdDb250cm9sbGVyLnNjcm9sbC5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigwLCA0NSwgMTE0KVwiXG5cdHNlYXJjaEJ1dHRvbi5hbmltYXRlKFwiaGlkZVwiKVxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IGZhbHNlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2Vcblxudmlld0FsbCA9ICgpIC0+XG5cdHZpZXdDb250cm9sbGVyLnNob3dOZXh0KEFsbENhcmRzKVxuXHRzZWFyY2hCdXR0b24uYW5pbWF0ZShcInNob3dcIilcblx0dmlld0NvbnRyb2xsZXIuc2Nyb2xsLmJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDQ1LCAxMTQpXCJcblx0c2VhcmNoQnV0dG9uLnZpc2libGUgPSB0cnVlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2VcblxuU2VhcmNoQ2FyZHMgPSAoKSAtPlxuXHRzZWFyY2hCdXR0b24uYW5pbWF0ZShcImhpZGVcIilcblx0Q2FuY2VsLmFuaW1hdGUoXCJzaG93XCIpXG5cdHNlYXJjaHVuZGVybGluZS5hbmltYXRlKFwic2hvd1wiKVxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IGZhbHNlXG5cdENhbmNlbC52aXNpYmxlID0gdHJ1ZVxuXHRwYWdlVGl0bGUuYW5pbWF0ZShcImhpZGVcIilcblx0aGFtYi5hbmltYXRlKFwiaGlkZVwiKVxuXHRhZGRDYXJkLmFuaW1hdGUoXCJoaWRlXCIpXG5cdGlucHV0LmZvY3VzKClcblxuQ2FuY2VsU2VhcmNoID0gKCkgLT5cblx0c2VhcmNoQnV0dG9uLmFuaW1hdGUoXCJzaG93XCIpXG5cdENhbmNlbC5hbmltYXRlKFwiaGlkZVwiKVxuXHRzZWFyY2h1bmRlcmxpbmUuYW5pbWF0ZShcImhpZGVcIilcblx0c2VhcmNoQnV0dG9uLnZpc2libGUgPSB0cnVlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2Vcblx0cGFnZVRpdGxlLmFuaW1hdGUoXCJzaG93XCIpXG5cdGhhbWIuYW5pbWF0ZShcInNob3dcIilcblx0YWRkQ2FyZC5hbmltYXRlKFwic2hvd1wiKVxuXG5hZGRDYXJkcyA9IChhbW91bnQsIHRpbWVMZWZ0LCBjYXJkTmFtZSkgLT5cblx0XG5cdGNhcmQgPSBuZXcgQ2FyZFxuXHRcdHk6IDEzNSArIG51bU9mQ2FyZHMgKiAxMzVcblx0XG5cdGNhcmQuTWFrZUNhcmQoYW1vdW50LCB0aW1lTGVmdCwgY2FyZE5hbWUpXG5cdFxuXHRmYWRlaW4gPSBuZXcgQW5pbWF0aW9uIGNhcmQsXG5cdFx0b3BhY2l0eTogMVxuXHRcdG9wdGlvbnM6XG5cdFx0XHR0aW1lOiAuNFxuXHRcblx0ZmFkZWluLnN0YXJ0KClcblx0XG5cdG51bU9mQ2FyZHMgPSBudW1PZkNhcmRzICsgMVxuXHRcblx0ZXhwYW5kYW5pbSA9IG5ldyBBbmltYXRpb24gRGFzaGJvYXJkLFxuXHRcdGhlaWdodDogNjY3ICsgKG51bU9mQ2FyZHMgLSAxKSAqIDEyOVxuXHRcdG9wdGlvbnM6XG5cdFx0XHR0aW1lOi4zXG5cdGV4cGFuZGFuaW0uc3RhcnQoKVxuXHR2aWV3Q29udHJvbGxlci5zY3JvbGwudXBkYXRlQ29udGVudCgpIiwiZXhwb3J0cy5rZXlib2FyZExheWVyID0gbmV3IExheWVyXG5cdHg6MCwgeTpTY3JlZW4uaGVpZ2h0LCB3aWR0aDpTY3JlZW4ud2lkdGgsIGhlaWdodDo0MzJcblx0aHRtbDpcIjxpbWcgc3R5bGU9J3dpZHRoOiAxMDAlOycgc3JjPSdtb2R1bGVzL2tleWJvYXJkLnBuZycvPlwiXG5cbiNzY3JlZW4gd2lkdGggdnMuIHNpemUgb2YgaW1hZ2Ugd2lkdGhcbmdyb3d0aFJhdGlvID0gU2NyZWVuLndpZHRoIC8gNzMyXG5pbWFnZUhlaWdodCA9IGdyb3d0aFJhdGlvICogNDMyXG5cbiMgRXh0ZW5kcyB0aGUgTGF5ZXJTdHlsZSBjbGFzcyB3aGljaCBkb2VzIHRoZSBwaXhlbCByYXRpbyBjYWxjdWxhdGlvbnMgaW4gZnJhbWVyXG5faW5wdXRTdHlsZSA9XG5cdE9iamVjdC5hc3NpZ24oe30sIEZyYW1lci5MYXllclN0eWxlLFxuXHRcdGNhbGN1bGF0ZVBpeGVsUmF0aW8gPSAobGF5ZXIsIHZhbHVlKSAtPlxuXHRcdFx0KHZhbHVlICogbGF5ZXIuY29udGV4dC5waXhlbE11bHRpcGxpZXIpICsgXCJweFwiXG5cblx0XHRmb250U2l6ZTogKGxheWVyKSAtPlxuXHRcdFx0Y2FsY3VsYXRlUGl4ZWxSYXRpbyhsYXllciwgbGF5ZXIuX3Byb3BlcnRpZXMuZm9udFNpemUpXG5cblx0XHRsaW5lSGVpZ2h0OiAobGF5ZXIpIC0+XG5cdFx0XHQobGF5ZXIuX3Byb3BlcnRpZXMubGluZUhlaWdodCkgKyBcImVtXCJcblxuXHRcdHBhZGRpbmc6IChsYXllcikgLT5cblx0XHRcdHsgcGl4ZWxNdWx0aXBsaWVyIH0gPSBsYXllci5jb250ZXh0XG5cdFx0XHRwYWRkaW5nID0gW11cblx0XHRcdHBhZGRpbmdWYWx1ZSA9IGxheWVyLl9wcm9wZXJ0aWVzLnBhZGRpbmdcblxuXHRcdFx0IyBDaGVjayBpZiB3ZSBoYXZlIGEgc2luZ2xlIG51bWJlciBhcyBpbnRlZ2VyXG5cdFx0XHRpZiBOdW1iZXIuaXNJbnRlZ2VyKHBhZGRpbmdWYWx1ZSlcblx0XHRcdFx0cmV0dXJuIGNhbGN1bGF0ZVBpeGVsUmF0aW8obGF5ZXIsIHBhZGRpbmdWYWx1ZSlcblxuXHRcdFx0IyBJZiB3ZSBoYXZlIG11bHRpcGxlIHZhbHVlcyB0aGV5IGNvbWUgYXMgc3RyaW5nIChlLmcuIFwiMSAyIDMgNFwiKVxuXHRcdFx0cGFkZGluZ1ZhbHVlcyA9IGxheWVyLl9wcm9wZXJ0aWVzLnBhZGRpbmcuc3BsaXQoXCIgXCIpXG5cblx0XHRcdHN3aXRjaCBwYWRkaW5nVmFsdWVzLmxlbmd0aFxuXHRcdFx0XHR3aGVuIDRcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzJdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1szXSlcblxuXHRcdFx0XHR3aGVuIDNcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzJdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblxuXHRcdFx0XHR3aGVuIDJcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cblx0XHRcdCMgUmV0dXJuIGFzIDQtdmFsdWUgc3RyaW5nIChlLmcgXCIxcHggMnB4IDNweCA0cHhcIilcblx0XHRcdFwiI3twYWRkaW5nLnRvcCAqIHBpeGVsTXVsdGlwbGllcn1weCAje3BhZGRpbmcucmlnaHQgKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLmJvdHRvbSAqIHBpeGVsTXVsdGlwbGllcn1weCAje3BhZGRpbmcubGVmdCAqIHBpeGVsTXVsdGlwbGllcn1weFwiXG5cdClcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcyA9XG5cdHNob3duOlxuXHRcdHk6IFNjcmVlbi5oZWlnaHQgLSBpbWFnZUhlaWdodFxuXG5leHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDE1KVwiXG5cbmNsYXNzIGV4cG9ydHMuSW5wdXQgZXh0ZW5kcyBMYXllclxuXHRAZGVmaW5lIFwic3R5bGVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC5zdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0Xy5leHRlbmQgQGlucHV0LnN0eWxlLCB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQGlucHV0LnZhbHVlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAaW5wdXQudmFsdWUgPSB2YWx1ZVxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuc2V0dXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLndpZHRoID89IFNjcmVlbi53aWR0aFxuXHRcdG9wdGlvbnMuY2xpcCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID89IDYwXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwicmdiYSgyNTUsIDYwLCA0NywgLjUpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmZvbnRTaXplID89IDMwXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDFcblx0XHRvcHRpb25zLnBhZGRpbmcgPz0gMTBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJcIlxuXHRcdG9wdGlvbnMucGxhY2Vob2xkZXIgPz0gXCJcIlxuXHRcdG9wdGlvbnMudmlydHVhbEtleWJvYXJkID89IGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBmYWxzZSBlbHNlIHRydWVcblx0XHRvcHRpb25zLnR5cGUgPz0gXCJ0ZXh0XCJcblx0XHRvcHRpb25zLmdvQnV0dG9uID89IGZhbHNlXG5cdFx0b3B0aW9ucy5hdXRvQ29ycmVjdCA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9Db21wbGV0ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9DYXBpdGFsaXplID89IFwib25cIlxuXHRcdG9wdGlvbnMuc3BlbGxDaGVjayA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9mb2N1cyA/PSBmYWxzZVxuXHRcdG9wdGlvbnMudGV4dENvbG9yID89IFwiIzAwMFwiXG5cdFx0b3B0aW9ucy5mb250RmFtaWx5ID89IFwiLWFwcGxlLXN5c3RlbVwiXG5cdFx0b3B0aW9ucy5mb250V2VpZ2h0ID89IFwiNTAwXCJcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCMgQWRkIGFkZGl0aW9uYWwgcHJvcGVydGllc1xuXHRcdEBfcHJvcGVydGllcy5mb250U2l6ZSA9IG9wdGlvbnMuZm9udFNpemVcblx0XHRAX3Byb3BlcnRpZXMubGluZUhlaWdodCA9IG9wdGlvbnMubGluZUhlaWdodFxuXHRcdEBfcHJvcGVydGllcy5wYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nXG5cblx0XHRAcGxhY2Vob2xkZXJDb2xvciA9IG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvciBpZiBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3I/XG5cdFx0QGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImlucHV0XCJcblx0XHRAaW5wdXQuaWQgPSBcImlucHV0LSN7Xy5ub3coKX1cIlxuXG5cdFx0IyBBZGQgc3R5bGluZyB0byB0aGUgaW5wdXQgZWxlbWVudFxuXHRcdEBpbnB1dC5zdHlsZS53aWR0aCA9IF9pbnB1dFN0eWxlW1wid2lkdGhcIl0oQClcblx0XHRAaW5wdXQuc3R5bGUuaGVpZ2h0ID0gX2lucHV0U3R5bGVbXCJoZWlnaHRcIl0oQClcblx0XHRAaW5wdXQuc3R5bGUuZm9udFNpemUgPSBfaW5wdXRTdHlsZVtcImZvbnRTaXplXCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmxpbmVIZWlnaHQgPSBfaW5wdXRTdHlsZVtcImxpbmVIZWlnaHRcIl0oQClcblx0XHRAaW5wdXQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiXG5cdFx0QGlucHV0LnN0eWxlLmJvcmRlciA9IFwibm9uZVwiXG5cdFx0QGlucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yXG5cdFx0QGlucHV0LnN0eWxlLnBhZGRpbmcgPSBfaW5wdXRTdHlsZVtcInBhZGRpbmdcIl0oQClcblx0XHRAaW5wdXQuc3R5bGUuZm9udEZhbWlseSA9IG9wdGlvbnMuZm9udEZhbWlseVxuXHRcdEBpbnB1dC5zdHlsZS5jb2xvciA9IG9wdGlvbnMudGV4dENvbG9yXG5cdFx0QGlucHV0LnN0eWxlLmZvbnRXZWlnaHQgPSBvcHRpb25zLmZvbnRXZWlnaHRcblxuXHRcdEBpbnB1dC52YWx1ZSA9IG9wdGlvbnMudGV4dFxuXHRcdEBpbnB1dC50eXBlID0gb3B0aW9ucy50eXBlXG5cdFx0QGlucHV0LnBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlclxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29ycmVjdFwiLCBvcHRpb25zLmF1dG9Db3JyZWN0XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jb21wbGV0ZVwiLCBvcHRpb25zLmF1dG9Db21wbGV0ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY2FwaXRhbGl6ZVwiLCBvcHRpb25zLmF1dG9DYXBpdGFsaXplXG5cdFx0aWYgb3B0aW9ucy5hdXRvZm9jdXMgPT0gdHJ1ZVxuXHRcdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9mb2N1c1wiLCB0cnVlXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcInNwZWxsY2hlY2tcIiwgb3B0aW9ucy5zcGVsbENoZWNrXG5cdFx0QGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZm9ybVwiXG5cblx0XHRpZiBvcHRpb25zLmdvQnV0dG9uXG5cdFx0XHRAZm9ybS5hY3Rpb24gPSBcIiNcIlxuXHRcdFx0QGZvcm0uYWRkRXZlbnRMaXN0ZW5lciBcInN1Ym1pdFwiLCAoZXZlbnQpIC0+XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdEBmb3JtLmFwcGVuZENoaWxkIEBpbnB1dFxuXHRcdEBfZWxlbWVudC5hcHBlbmRDaGlsZCBAZm9ybVxuXG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuXHRcdEB1cGRhdGVQbGFjZWhvbGRlckNvbG9yIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvciBpZiBAcGxhY2Vob2xkZXJDb2xvclxuXG5cdFx0I29ubHkgc2hvdyBob25vciB2aXJ0dWFsIGtleWJvYXJkIG9wdGlvbiB3aGVuIG5vdCBvbiBtb2JpbGUsXG5cdFx0I290aGVyd2lzZSBpZ25vcmVcblx0XHRpZiAhVXRpbHMuaXNNb2JpbGUoKSAmJiBvcHRpb25zLnZpcnR1YWxLZXlib2FyZCBpcyB0cnVlXG5cdFx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImZvY3VzXCIsIC0+XG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5icmluZ1RvRnJvbnQoKVxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVDeWNsZSgpXG5cdFx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmFuaW1hdGUoXCJkZWZhdWx0XCIpXG5cblx0dXBkYXRlUGxhY2Vob2xkZXJDb2xvcjogKGNvbG9yKSAtPlxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gY29sb3Jcblx0XHRpZiBAcGFnZVN0eWxlP1xuXHRcdFx0ZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZCBAcGFnZVN0eWxlXG5cdFx0QHBhZ2VTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJzdHlsZVwiXG5cdFx0QHBhZ2VTdHlsZS50eXBlID0gXCJ0ZXh0L2Nzc1wiXG5cdFx0Y3NzID0gXCIjI3tAaW5wdXQuaWR9Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QHBsYWNlaG9sZGVyQ29sb3J9OyB9XCJcblx0XHRAcGFnZVN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlIGNzcylcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkIEBwYWdlU3R5bGVcblxuXHRmb2N1czogKCkgLT5cblx0XHRAaW5wdXQuZm9jdXMoKVxuXG5cdG9uRm9jdXM6IChjYikgLT5cblx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImZvY3VzXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuXG5cdG9uQmx1cjogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0Y2IuYXBwbHkoQClcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FEQUEsSUFBQSwwREFBQTtFQUFBOzs7QUFBQSxPQUFPLENBQUMsYUFBUixHQUE0QixJQUFBLEtBQUEsQ0FDM0I7RUFBQSxDQUFBLEVBQUUsQ0FBRjtFQUFLLENBQUEsRUFBRSxNQUFNLENBQUMsTUFBZDtFQUFzQixLQUFBLEVBQU0sTUFBTSxDQUFDLEtBQW5DO0VBQTBDLE1BQUEsRUFBTyxHQUFqRDtFQUNBLElBQUEsRUFBSyx3REFETDtDQUQyQjs7QUFLNUIsV0FBQSxHQUFjLE1BQU0sQ0FBQyxLQUFQLEdBQWU7O0FB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
