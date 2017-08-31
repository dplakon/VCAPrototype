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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0RvY3VtZW50cy9GcmFtZXIvVkNBUHJvdG84LW5hdmJhcnJld29yay5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Eb2N1bWVudHMvRnJhbWVyL1ZDQVByb3RvOC1uYXZiYXJyZXdvcmsuZnJhbWVyL21vZHVsZXMvaW5wdXQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEZ1bmN0aW9uc1xuXG52aWV3QWxlcnRzID0gKCkgLT5cblx0TmF2QmFyLmFuaW1hdGUoXCJhbGVydHNcIilcblx0dmlld0NvbnRyb2xsZXIuc2hvd05leHQoQWxlcnRzLCBhbmltYXRlOiB0cnVlKVxuXHRiYWNrQXJyb3cuYW5pbWF0ZShcInNob3dcIilcblx0YmFja0Fycm93LnZpc2libGUgPSB0cnVlXG5cdGhhbWIuYW5pbWF0ZShcImhpZGVcIilcblx0aGFtYi52aXNpYmxlID0gZmFsc2Vcblx0dmlld0NvbnRyb2xsZXIuc2Nyb2xsLmJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDE4OCwgMjQwKVwiXG5cdHNlYXJjaEJ1dHRvbi52aXNpYmxlID0gZmFsc2Vcblx0Q2FuY2VsLnZpc2libGUgPSBmYWxzZVxuXG5sZWF2ZUFsZXJ0cyA9ICgpIC0+XG5cdHZpZXdDb250cm9sbGVyLnNob3dQcmV2aW91cygpXG5cdE5hdkJhci5hbmltYXRlKFwibm9ybWFsXCIpXG5cdGJhY2tBcnJvdy5hbmltYXRlKFwiaGlkZVwiKVxuXHRiYWNrQXJyb3cudmlzaWJsZSA9IGZhbHNlXG5cdGhhbWIudmlzaWJsZSA9IHRydWVcblx0aGFtYi5hbmltYXRlKFwic2hvd1wiKVxuXHR2aWV3Q29udHJvbGxlci5zY3JvbGwuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwgNDUsIDExNClcIlxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IGZhbHNlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2Vcblxudmlld0Rhc2hib2FyZCA9ICgpIC0+XG5cdHZpZXdDb250cm9sbGVyLnNob3dOZXh0KERhc2hib2FyZClcblx0TmF2QmFyLmFuaW1hdGUoXCJub3JtYWxcIilcblx0YmFja0Fycm93LmFuaW1hdGUoXCJoaWRlXCIpXG5cdGJhY2tBcnJvdy52aXNpYmxlID0gZmFsc2Vcblx0aGFtYi52aXNpYmxlID0gdHJ1ZVxuXHRoYW1iLmFuaW1hdGUoXCJzaG93XCIpXG5cdHZpZXdDb250cm9sbGVyLnNjcm9sbC5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigwLCA0NSwgMTE0KVwiXG5cdHNlYXJjaEJ1dHRvbi5hbmltYXRlKFwiaGlkZVwiKVxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IGZhbHNlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2Vcblxudmlld0FsbCA9ICgpIC0+XG5cdHZpZXdDb250cm9sbGVyLnNob3dOZXh0KEFsbENhcmRzKVxuXHRzZWFyY2hCdXR0b24uYW5pbWF0ZShcInNob3dcIilcblx0dmlld0NvbnRyb2xsZXIuc2Nyb2xsLmJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDQ1LCAxMTQpXCJcblx0c2VhcmNoQnV0dG9uLnZpc2libGUgPSB0cnVlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2VcblxuU2VhcmNoQ2FyZHMgPSAoKSAtPlxuXHRzZWFyY2hCdXR0b24uYW5pbWF0ZShcImhpZGVcIilcblx0Q2FuY2VsLmFuaW1hdGUoXCJzaG93XCIpXG5cdHNlYXJjaHVuZGVybGluZS5hbmltYXRlKFwic2hvd1wiKVxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IGZhbHNlXG5cdENhbmNlbC52aXNpYmxlID0gdHJ1ZVxuXHRwYWdlVGl0bGUuYW5pbWF0ZShcImhpZGVcIilcblx0aGFtYi5hbmltYXRlKFwiaGlkZVwiKVxuXHRhZGRDYXJkLmFuaW1hdGUoXCJoaWRlXCIpXG5cdGlucHV0LmZvY3VzKClcblxuQ2FuY2VsU2VhcmNoID0gKCkgLT5cblx0c2VhcmNoQnV0dG9uLmFuaW1hdGUoXCJzaG93XCIpXG5cdENhbmNlbC5hbmltYXRlKFwiaGlkZVwiKVxuXHRzZWFyY2h1bmRlcmxpbmUuYW5pbWF0ZShcImhpZGVcIilcblx0c2VhcmNoQnV0dG9uLnZpc2libGUgPSB0cnVlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2Vcblx0cGFnZVRpdGxlLmFuaW1hdGUoXCJzaG93XCIpXG5cdGhhbWIuYW5pbWF0ZShcInNob3dcIilcblx0YWRkQ2FyZC5hbmltYXRlKFwic2hvd1wiKVxuXG5hZGRDYXJkcyA9IChhbW91bnQsIHRpbWVMZWZ0LCBjYXJkTmFtZSkgLT5cblx0XG5cdGNhcmQgPSBuZXcgQ2FyZFxuXHRcdHk6IDEzNSArIG51bU9mQ2FyZHMgKiAxMzVcblx0XG5cdGNhcmQuTWFrZUNhcmQoYW1vdW50LCB0aW1lTGVmdCwgY2FyZE5hbWUpXG5cdFxuXHRmYWRlaW4gPSBuZXcgQW5pbWF0aW9uIGNhcmQsXG5cdFx0b3BhY2l0eTogMVxuXHRcdG9wdGlvbnM6XG5cdFx0XHR0aW1lOiAuNFxuXHRcblx0ZmFkZWluLnN0YXJ0KClcblx0XG5cdG51bU9mQ2FyZHMgPSBudW1PZkNhcmRzICsgMVxuXHRcblx0ZXhwYW5kYW5pbSA9IG5ldyBBbmltYXRpb24gRGFzaGJvYXJkLFxuXHRcdGhlaWdodDogNjY3ICsgKG51bU9mQ2FyZHMgLSAxKSAqIDEyOVxuXHRcdG9wdGlvbnM6XG5cdFx0XHR0aW1lOi4zXG5cdGV4cGFuZGFuaW0uc3RhcnQoKVxuXHR2aWV3Q29udHJvbGxlci5zY3JvbGwudXBkYXRlQ29udGVudCgpXG5cblx0IyBGdW5jdGlvbnNcblxudmlld0FsZXJ0cyA9ICgpIC0+XG5cdE5hdkJhci5hbmltYXRlKFwiYWxlcnRzXCIpXG5cdHZpZXdDb250cm9sbGVyLnNob3dOZXh0KEFsZXJ0cywgYW5pbWF0ZTogdHJ1ZSlcblx0YmFja0Fycm93LmFuaW1hdGUoXCJzaG93XCIpXG5cdGJhY2tBcnJvdy52aXNpYmxlID0gdHJ1ZVxuXHRoYW1iLmFuaW1hdGUoXCJoaWRlXCIpXG5cdGhhbWIudmlzaWJsZSA9IGZhbHNlXG5cdHZpZXdDb250cm9sbGVyLnNjcm9sbC5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigwLCAxODgsIDI0MClcIlxuXHRzZWFyY2hCdXR0b24udmlzaWJsZSA9IGZhbHNlXG5cdENhbmNlbC52aXNpYmxlID0gZmFsc2VcblxubGVhdmVBbGVydHMgPSAoKSAtPlxuXHR2aWV3Q29udHJvbGxlci5zaG93UHJldmlvdXMoKVxuXHROYXZCYXIuYW5pbWF0ZShcIm5vcm1hbFwiKVxuXHRiYWNrQXJyb3cuYW5pbWF0ZShcImhpZGVcIilcblx0YmFja0Fycm93LnZpc2libGUgPSBmYWxzZVxuXHRoYW1iLnZpc2libGUgPSB0cnVlXG5cdGhhbWIuYW5pbWF0ZShcInNob3dcIilcblx0dmlld0NvbnRyb2xsZXIuc2Nyb2xsLmJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDQ1LCAxMTQpXCJcblx0c2VhcmNoQnV0dG9uLnZpc2libGUgPSBmYWxzZVxuXHRDYW5jZWwudmlzaWJsZSA9IGZhbHNlXG5cbnZpZXdEYXNoYm9hcmQgPSAoKSAtPlxuXHR2aWV3Q29udHJvbGxlci5zaG93TmV4dChEYXNoYm9hcmQpXG5cdE5hdkJhci5hbmltYXRlKFwibm9ybWFsXCIpXG5cdGJhY2tBcnJvdy5hbmltYXRlKFwiaGlkZVwiKVxuXHRiYWNrQXJyb3cudmlzaWJsZSA9IGZhbHNlXG5cdGhhbWIudmlzaWJsZSA9IHRydWVcblx0aGFtYi5hbmltYXRlKFwic2hvd1wiKVxuXHR2aWV3Q29udHJvbGxlci5zY3JvbGwuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwgNDUsIDExNClcIlxuXHRzZWFyY2hCdXR0b24uYW5pbWF0ZShcImhpZGVcIilcblx0c2VhcmNoQnV0dG9uLnZpc2libGUgPSBmYWxzZVxuXHRDYW5jZWwudmlzaWJsZSA9IGZhbHNlXG5cbnZpZXdBbGwgPSAoKSAtPlxuXHR2aWV3Q29udHJvbGxlci5zaG93TmV4dChBbGxDYXJkcylcblx0c2VhcmNoQnV0dG9uLmFuaW1hdGUoXCJzaG93XCIpXG5cdHZpZXdDb250cm9sbGVyLnNjcm9sbC5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigwLCA0NSwgMTE0KVwiXG5cdHNlYXJjaEJ1dHRvbi52aXNpYmxlID0gdHJ1ZVxuXHRDYW5jZWwudmlzaWJsZSA9IGZhbHNlXG5cblNlYXJjaENhcmRzID0gKCkgLT5cblx0c2VhcmNoQnV0dG9uLmFuaW1hdGUoXCJoaWRlXCIpXG5cdENhbmNlbC5hbmltYXRlKFwic2hvd1wiKVxuXHRzZWFyY2h1bmRlcmxpbmUuYW5pbWF0ZShcInNob3dcIilcblx0c2VhcmNoQnV0dG9uLnZpc2libGUgPSBmYWxzZVxuXHRDYW5jZWwudmlzaWJsZSA9IHRydWVcblx0cGFnZVRpdGxlLmFuaW1hdGUoXCJoaWRlXCIpXG5cdGhhbWIuYW5pbWF0ZShcImhpZGVcIilcblx0YWRkQ2FyZC5hbmltYXRlKFwiaGlkZVwiKVxuXHRpbnB1dC5mb2N1cygpXG5cbkNhbmNlbFNlYXJjaCA9ICgpIC0+XG5cdHNlYXJjaEJ1dHRvbi5hbmltYXRlKFwic2hvd1wiKVxuXHRDYW5jZWwuYW5pbWF0ZShcImhpZGVcIilcblx0c2VhcmNodW5kZXJsaW5lLmFuaW1hdGUoXCJoaWRlXCIpXG5cdHNlYXJjaEJ1dHRvbi52aXNpYmxlID0gdHJ1ZVxuXHRDYW5jZWwudmlzaWJsZSA9IGZhbHNlXG5cdHBhZ2VUaXRsZS5hbmltYXRlKFwic2hvd1wiKVxuXHRoYW1iLmFuaW1hdGUoXCJzaG93XCIpXG5cdGFkZENhcmQuYW5pbWF0ZShcInNob3dcIilcblxuYWRkQ2FyZHMgPSAoYW1vdW50LCB0aW1lTGVmdCwgY2FyZE5hbWUpIC0+XG5cdFxuXHRjYXJkID0gbmV3IENhcmRcblx0XHR5OiAxMzUgKyBudW1PZkNhcmRzICogMTM1XG5cdFxuXHRjYXJkLk1ha2VDYXJkKGFtb3VudCwgdGltZUxlZnQsIGNhcmROYW1lKVxuXHRcblx0ZmFkZWluID0gbmV3IEFuaW1hdGlvbiBjYXJkLFxuXHRcdG9wYWNpdHk6IDFcblx0XHRvcHRpb25zOlxuXHRcdFx0dGltZTogLjRcblx0XG5cdGZhZGVpbi5zdGFydCgpXG5cdFxuXHRudW1PZkNhcmRzID0gbnVtT2ZDYXJkcyArIDFcblx0XG5cdGV4cGFuZGFuaW0gPSBuZXcgQW5pbWF0aW9uIERhc2hib2FyZCxcblx0XHRoZWlnaHQ6IDY2NyArIChudW1PZkNhcmRzIC0gMSkgKiAxMjlcblx0XHRvcHRpb25zOlxuXHRcdFx0dGltZTouM1xuXHRleHBhbmRhbmltLnN0YXJ0KClcblx0dmlld0NvbnRyb2xsZXIuc2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKSIsImV4cG9ydHMua2V5Ym9hcmRMYXllciA9IG5ldyBMYXllclxuXHR4OjAsIHk6U2NyZWVuLmhlaWdodCwgd2lkdGg6U2NyZWVuLndpZHRoLCBoZWlnaHQ6NDMyXG5cdGh0bWw6XCI8aW1nIHN0eWxlPSd3aWR0aDogMTAwJTsnIHNyYz0nbW9kdWxlcy9rZXlib2FyZC5wbmcnLz5cIlxuXG4jc2NyZWVuIHdpZHRoIHZzLiBzaXplIG9mIGltYWdlIHdpZHRoXG5ncm93dGhSYXRpbyA9IFNjcmVlbi53aWR0aCAvIDczMlxuaW1hZ2VIZWlnaHQgPSBncm93dGhSYXRpbyAqIDQzMlxuXG4jIEV4dGVuZHMgdGhlIExheWVyU3R5bGUgY2xhc3Mgd2hpY2ggZG9lcyB0aGUgcGl4ZWwgcmF0aW8gY2FsY3VsYXRpb25zIGluIGZyYW1lclxuX2lucHV0U3R5bGUgPVxuXHRPYmplY3QuYXNzaWduKHt9LCBGcmFtZXIuTGF5ZXJTdHlsZSxcblx0XHRjYWxjdWxhdGVQaXhlbFJhdGlvID0gKGxheWVyLCB2YWx1ZSkgLT5cblx0XHRcdCh2YWx1ZSAqIGxheWVyLmNvbnRleHQucGl4ZWxNdWx0aXBsaWVyKSArIFwicHhcIlxuXG5cdFx0Zm9udFNpemU6IChsYXllcikgLT5cblx0XHRcdGNhbGN1bGF0ZVBpeGVsUmF0aW8obGF5ZXIsIGxheWVyLl9wcm9wZXJ0aWVzLmZvbnRTaXplKVxuXG5cdFx0bGluZUhlaWdodDogKGxheWVyKSAtPlxuXHRcdFx0KGxheWVyLl9wcm9wZXJ0aWVzLmxpbmVIZWlnaHQpICsgXCJlbVwiXG5cblx0XHRwYWRkaW5nOiAobGF5ZXIpIC0+XG5cdFx0XHR7IHBpeGVsTXVsdGlwbGllciB9ID0gbGF5ZXIuY29udGV4dFxuXHRcdFx0cGFkZGluZyA9IFtdXG5cdFx0XHRwYWRkaW5nVmFsdWUgPSBsYXllci5fcHJvcGVydGllcy5wYWRkaW5nXG5cblx0XHRcdCMgQ2hlY2sgaWYgd2UgaGF2ZSBhIHNpbmdsZSBudW1iZXIgYXMgaW50ZWdlclxuXHRcdFx0aWYgTnVtYmVyLmlzSW50ZWdlcihwYWRkaW5nVmFsdWUpXG5cdFx0XHRcdHJldHVybiBjYWxjdWxhdGVQaXhlbFJhdGlvKGxheWVyLCBwYWRkaW5nVmFsdWUpXG5cblx0XHRcdCMgSWYgd2UgaGF2ZSBtdWx0aXBsZSB2YWx1ZXMgdGhleSBjb21lIGFzIHN0cmluZyAoZS5nLiBcIjEgMiAzIDRcIilcblx0XHRcdHBhZGRpbmdWYWx1ZXMgPSBsYXllci5fcHJvcGVydGllcy5wYWRkaW5nLnNwbGl0KFwiIFwiKVxuXG5cdFx0XHRzd2l0Y2ggcGFkZGluZ1ZhbHVlcy5sZW5ndGhcblx0XHRcdFx0d2hlbiA0XG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1syXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbM10pXG5cblx0XHRcdFx0d2hlbiAzXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1syXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cblx0XHRcdFx0d2hlbiAyXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHBhZGRpbmcudG9wID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcucmlnaHQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5ib3R0b20gPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5sZWZ0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXG5cdFx0XHQjIFJldHVybiBhcyA0LXZhbHVlIHN0cmluZyAoZS5nIFwiMXB4IDJweCAzcHggNHB4XCIpXG5cdFx0XHRcIiN7cGFkZGluZy50b3AgKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLnJpZ2h0ICogcGl4ZWxNdWx0aXBsaWVyfXB4ICN7cGFkZGluZy5ib3R0b20gKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLmxlZnQgKiBwaXhlbE11bHRpcGxpZXJ9cHhcIlxuXHQpXG5cbmV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMgPVxuXHRzaG93bjpcblx0XHR5OiBTY3JlZW4uaGVpZ2h0IC0gaW1hZ2VIZWlnaHRcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0Y3VydmU6IFwic3ByaW5nKDUwMCw1MCwxNSlcIlxuXG5jbGFzcyBleHBvcnRzLklucHV0IGV4dGVuZHMgTGF5ZXJcblx0QGRlZmluZSBcInN0eWxlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQuc3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdF8uZXh0ZW5kIEBpbnB1dC5zdHlsZSwgdmFsdWVcblxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QGlucHV0LnZhbHVlID0gdmFsdWVcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNldHVwID89IGZhbHNlXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBTY3JlZW4ud2lkdGhcblx0XHRvcHRpb25zLmNsaXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmhlaWdodCA/PSA2MFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcInJnYmEoMjU1LCA2MCwgNDcsIC41KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAzMFxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAxXG5cdFx0b3B0aW9ucy5wYWRkaW5nID89IDEwXG5cdFx0b3B0aW9ucy50ZXh0ID89IFwiXCJcblx0XHRvcHRpb25zLnBsYWNlaG9sZGVyID89IFwiXCJcblx0XHRvcHRpb25zLnZpcnR1YWxLZXlib2FyZCA/PSBpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gZmFsc2UgZWxzZSB0cnVlXG5cdFx0b3B0aW9ucy50eXBlID89IFwidGV4dFwiXG5cdFx0b3B0aW9ucy5nb0J1dHRvbiA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuYXV0b0NvcnJlY3QgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvQ29tcGxldGUgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLnNwZWxsQ2hlY2sgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5hdXRvZm9jdXMgPz0gZmFsc2Vcblx0XHRvcHRpb25zLnRleHRDb2xvciA/PSBcIiMwMDBcIlxuXHRcdG9wdGlvbnMuZm9udEZhbWlseSA/PSBcIi1hcHBsZS1zeXN0ZW1cIlxuXHRcdG9wdGlvbnMuZm9udFdlaWdodCA/PSBcIjUwMFwiXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjIEFkZCBhZGRpdGlvbmFsIHByb3BlcnRpZXNcblx0XHRAX3Byb3BlcnRpZXMuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplXG5cdFx0QF9wcm9wZXJ0aWVzLmxpbmVIZWlnaHQgPSBvcHRpb25zLmxpbmVIZWlnaHRcblx0XHRAX3Byb3BlcnRpZXMucGFkZGluZyA9IG9wdGlvbnMucGFkZGluZ1xuXG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yP1xuXHRcdEBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJpbnB1dFwiXG5cdFx0QGlucHV0LmlkID0gXCJpbnB1dC0je18ubm93KCl9XCJcblxuXHRcdCMgQWRkIHN0eWxpbmcgdG8gdGhlIGlucHV0IGVsZW1lbnRcblx0XHRAaW5wdXQuc3R5bGUud2lkdGggPSBfaW5wdXRTdHlsZVtcIndpZHRoXCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmhlaWdodCA9IF9pbnB1dFN0eWxlW1wiaGVpZ2h0XCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmZvbnRTaXplID0gX2lucHV0U3R5bGVbXCJmb250U2l6ZVwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5saW5lSGVpZ2h0ID0gX2lucHV0U3R5bGVbXCJsaW5lSGVpZ2h0XCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIlxuXHRcdEBpbnB1dC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIlxuXHRcdEBpbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuXHRcdEBpbnB1dC5zdHlsZS5wYWRkaW5nID0gX2lucHV0U3R5bGVbXCJwYWRkaW5nXCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmZvbnRGYW1pbHkgPSBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRAaW5wdXQuc3R5bGUuY29sb3IgPSBvcHRpb25zLnRleHRDb2xvclxuXHRcdEBpbnB1dC5zdHlsZS5mb250V2VpZ2h0ID0gb3B0aW9ucy5mb250V2VpZ2h0XG5cblx0XHRAaW5wdXQudmFsdWUgPSBvcHRpb25zLnRleHRcblx0XHRAaW5wdXQudHlwZSA9IG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXJcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NvcnJlY3RcIiwgb3B0aW9ucy5hdXRvQ29ycmVjdFxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29tcGxldGVcIiwgb3B0aW9ucy5hdXRvQ29tcGxldGVcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NhcGl0YWxpemVcIiwgb3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZVxuXHRcdGlmIG9wdGlvbnMuYXV0b2ZvY3VzID09IHRydWVcblx0XHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvZm9jdXNcIiwgdHJ1ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJzcGVsbGNoZWNrXCIsIG9wdGlvbnMuc3BlbGxDaGVja1xuXHRcdEBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImZvcm1cIlxuXG5cdFx0aWYgb3B0aW9ucy5nb0J1dHRvblxuXHRcdFx0QGZvcm0uYWN0aW9uID0gXCIjXCJcblx0XHRcdEBmb3JtLmFkZEV2ZW50TGlzdGVuZXIgXCJzdWJtaXRcIiwgKGV2ZW50KSAtPlxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRAZm9ybS5hcHBlbmRDaGlsZCBAaW5wdXRcblx0XHRAX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQGZvcm1cblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblx0XHRAdXBkYXRlUGxhY2Vob2xkZXJDb2xvciBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgQHBsYWNlaG9sZGVyQ29sb3JcblxuXHRcdCNvbmx5IHNob3cgaG9ub3IgdmlydHVhbCBrZXlib2FyZCBvcHRpb24gd2hlbiBub3Qgb24gbW9iaWxlLFxuXHRcdCNvdGhlcndpc2UgaWdub3JlXG5cdFx0aWYgIVV0aWxzLmlzTW9iaWxlKCkgJiYgb3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgaXMgdHJ1ZVxuXHRcdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYnJpbmdUb0Zyb250KClcblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlQ3ljbGUoKVxuXHRcdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5hbmltYXRlKFwiZGVmYXVsdFwiKVxuXG5cdHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3I6IChjb2xvcikgLT5cblx0XHRAcGxhY2Vob2xkZXJDb2xvciA9IGNvbG9yXG5cdFx0aWYgQHBhZ2VTdHlsZT9cblx0XHRcdGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQgQHBhZ2VTdHlsZVxuXHRcdEBwYWdlU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwic3R5bGVcIlxuXHRcdEBwYWdlU3R5bGUudHlwZSA9IFwidGV4dC9jc3NcIlxuXHRcdGNzcyA9IFwiIyN7QGlucHV0LmlkfTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BwbGFjZWhvbGRlckNvbG9yfTsgfVwiXG5cdFx0QHBhZ2VTdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSBjc3MpXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCBAcGFnZVN0eWxlXG5cblx0Zm9jdXM6ICgpIC0+XG5cdFx0QGlucHV0LmZvY3VzKClcblxuXHRvbkZvY3VzOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCAtPlxuXHRcdFx0Y2IuYXBwbHkoQClcblxuXHRvbkJsdXI6IChjYikgLT5cblx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTtBREFBLElBQUEsMERBQUE7RUFBQTs7O0FBQUEsT0FBTyxDQUFDLGFBQVIsR0FBNEIsSUFBQSxLQUFBLENBQzNCO0VBQUEsQ0FBQSxFQUFFLENBQUY7RUFBSyxDQUFBLEVBQUUsTUFBTSxDQUFDLE1BQWQ7RUFB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
