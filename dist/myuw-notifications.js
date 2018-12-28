(function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var tpl = "<style> :host([hidden]) {\n  display: none;\n}\n\n#wrapper {\n  position: var( --myuw-menu-wrapper-position, relative );\n  display: var( --myuw-menu-wrapper-display, inline-block );\n  margin: var( --myuw-menu-wrapper-margin, 0 6px );\n}\n\n#wrapper.hidden {\n  display: none;\n}\n\n#bell-button {\n  display: flex;\n  justify-content: var( --myuw-icon-button-justify, center );\n  align-content: var( --myuw-icon-button-align-content, center );\n  align-items: var( --myuw-icon-button-align-items, center );\n  position: relative;\n  cursor: pointer;\n  min-height: var( --myuw-icon-button-height, 42px );\n  min-width: var( --myuw-icon-button-width, 42px );\n  height: var( --myuw-icon-button-height, 42px );\n  width: var( --myuw-icon-button-width, 42px );\n  user-select: none;\n  outline: none;\n  padding: var( --myuw-icon-button-padding, 0 );\n  margin: var( --myuw-icon-button-padding, 0 6px );\n  border: var( --myuw-icon-button-border, 0 );\n  border-radius: var( --myuw-icon-border-radius, 50% );\n  background-color: var( --myuw-icon-button-bg, transparent );\n  -webkit-transition: var( --myuw-icon-button-transition, background-color .3s cubic-bezier(.35,0,.25,1) );\n  transition: var( --myuw-icon-button-transition, background-color .3s cubic-bezier(.35,0,.25,1) );\n}\n\n#bell-button:hover {\n  background-color: var( --myuw-icon-button-hover-bg, rgba(0,0,0,0.2) );\n}\n\n#bell-icon {\n  color: var(--myuw-primary-color, #fff);\n  fill: var(--myuw-primary-color, #fff);\n  height: var( --myuw-icon-button-icon-height, 30px );\n  width: var( --myuw-icon-button-icon-width, 30px );\n}\n\n#count {\n\n}\n\n#count.hidden {\n  display: none;\n}\n\n#list {\n  position: var( --myuw-menu-position, absolute );\n  top: var( --myuw-menu-position-top, 45px );\n  right: var( --myuw-menu-position-right, 0 );\n  min-width: var( --myuw-menu-width, 320px );\n  list-style: var( --myuw-menu-list-style, none );\n  margin: var( --myuw-menu-margin, 0 );\n  padding: var( --myuw-menu-padding, 0 );\n  font-size: var( --myuw-font-size, 14px );\n  z-index: var( --myuw-menu-depth, 101 );\n\n  transform-origin: var( --myuw-transform-origin, top right );\n  transform: var( --myuw-menu-transform, scale(0) );\n  opacity: var( --myuw-menu-opacity, 0 );\n  visibility: var( --myuw-menu-visibility, hidden );\n  transition: var( --myuw-menu-transition, visibility 0s, opacity .25s cubic-bezier(0.0, 0.0, 0.2, 1), transform .25s cubic-bezier(0.0, 0.0, 0.2, 1)  );\n\n  -webkit-box-shadow: var( --myuw-menu-shadow,  0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12) );\n  -moz-box-shadow:    var( --myuw-menu-shadow,  0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12) );\n  box-shadow:         var( --myuw-menu-shadow,  0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12) );\n}\n\n#list.visible {\n  transform: scale(1);\n  opacity: 1;\n  visibility: visible;\n}\n\n#list li,\n#list p {\n  padding: 0;\n  margin: 0;\n}\n\n::slotted(li) {\n  transition: var( --myuw-menu-item-transition, all .3s ease );\n  position: relative;\n  font-size: var( --myuw-menu-item-font-size, 15px );\n  font-family: var( --myuw-profile-font, var(--myuw-font, 'Montserrat', 'Roboto', Arial, sans-serif) );\n  padding: var( --myuw-menu-item-padding, 3px 16px );\n  color: var(--myuw-menu-color, rgba(0,0,0,0.87));\n  text-decoration: none;\n  background-color: var(--myuw-menu-item-bg-color, #f5f5f5 );\n  border-bottom: var(--myuw-menu-item-divider, 1px solid #e5e5e5 );\n  user-select: none;\n  outline: none;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n  min-height: var( --myuw-menu-item-height, 48px );\n  height: var( --myuw-menu-item-height, 48px );\n  -webkit-align-content: center;\n  align-content: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  justify-content: flex-start;\n}\n\n/* \n  Styles need to be duplicated separate from ::slotted in order for \n  Firefox to do it's job\n*/\n#list li {\n  transition: var( --myuw-menu-item-transition, all .3s ease );\n  position: relative;\n  font-size: var( --myuw-menu-item-font-size, 15px );\n  font-family: var( --myuw-profile-font, var(--myuw-font, 'Montserrat', 'Roboto', Arial, sans-serif) );\n  padding: var( --myuw-notification-padding, 12px 0 8px 16px );\n  color: var(--myuw-menu-color, rgba(0,0,0,0.87));\n  text-decoration: none;\n  background-color: var(--myuw-menu-item-bg-color, #f5f5f5 );\n  border-bottom: var(--myuw-menu-item-divider, 1px solid #e5e5e5 );\n  user-select: none;\n  outline: none;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n  min-height: var( --myuw-menu-item-min-height, 48px );\n  height: var( --myuw-menu-item-height, auto );\n  -webkit-align-content: center;\n  align-content: center;\n  -webkit-align-items: center;\n  align-items: center;\n  justify-content: space-between;\n}\n\n::slotted(li:hover),\n::slotted(li:focus)  {\n  background-color: var( --myuw-menu-item-hover-bg, #ececec );\n}\n\n#list li:hover,\n#list li:focus {\n  background-color: var( --myuw-menu-item-hover-bg, #ececec );\n}\n\n#list #see-all {\n  display: flex;\n  font-size: 16px;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n  justify-content: space-between;\n  -webkit-align-items: center;\n  align-items: center;\n  background-color: rgb(255,255,255);\n  border-bottom: none;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n  min-height: var( --myuw-menu-item-min-height, 48px );\n  height: var( --myuw-menu-item-height, auto );\n  color: #222;\n  padding: 0 16px;\n}\n\n#list #see-all h1 {\n  font-size: 16px;\n  margin: 0;\n  font-weight: 400;\n}\n\n#list #see-all.hidden {\n  display: none;\n}\n\n#list #see-all:hover {\n  background-color: rgb(255,255,255);\n}\n\n#list .content {\n  width: var( --myuw-notification-content-width, 80% );\n  max-width: var( --myuw-notification-content-width, 80% );\n  -webkit-flex-direction: var( --myuw-notification-content-flex-direction, column );\n  flex-direction: var( --myuw-notification-content-flex-direction, column );\n}\n\n#list .content .source {\n  color: var( --myuw-link-color, #0479a8 );\n  font-weight: var( --myuw-notification-source-weight, 500 );\n  font-size: var( --myuw-notification-source-font-size, 12px );\n  display: block;\n  margin-bottom: 6px;\n}\n\n#list .content .body {\n  font-size: var( --myuw-notification-body-font-size, 15px );\n  margin-bottom: 6px;\n}\n\n#list .content .actions a {\n  /* general material button css */\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  text-align: center;\n  border-radius: 3px;\n  border: 0;\n  padding: 0 6px;\n  margin: 6px 8px;\n  background: transparent;\n  white-space: nowrap;\n  overflow: hidden;\n  color: var( --myuw-accent-button-color, #fafafa );\n  background-color: var( --myuw-accent-button-bg, #0479a8 );\n  box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);\n  -webkit-transition: box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1);\n  transition: box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1);\n  text-decoration: none;\n  /* notifications-specific css */\n  line-height: 28px;\n  min-width: 60px;\n  min-height: 28px;\n  font-size: 12px;\n  font-weight: 500;\n  margin-left: 0;\n}\n\n#list .content .actions a:hover {\n  background-color: var( --myuw-accent-button-hover-bg, rgb(3,78,108) );\n}\n\n#list .content .actions a.flat {\n  box-shadow: none;\n  background-color: transparent;\n  color: #222;\n}\n\n#list .content .actions a.flat:hover {\n  background-color: #0000001c;\n}\n\n#list li .dismiss {\n  display: flex;\n  justify-content: var( --myuw-icon-button-justify, center );\n  align-content: var( --myuw-icon-button-align-content, center );\n  align-items: var( --myuw-icon-button-align-items, center );\n  position: relative;\n  cursor: pointer;\n  min-height: var( --myuw-icon-button-height, 42px );\n  min-width: var( --myuw-icon-button-width, 42px );\n  height: var( --myuw-icon-button-height, 42px );\n  width: var( --myuw-icon-button-width, 42px );\n  max-width: var( --myuw-notification-dismiss-width, 20% );\n  user-select: none;\n  outline: none;\n  padding: var( --myuw-icon-button-padding, 0 );\n  margin: var( --myuw-icon-button-padding, 0 6px );\n  border: var( --myuw-icon-button-border, 0 );\n  background-color: var( --myuw-icon-button-bg, transparent );\n}\n\n#list li .dismiss svg {\n  fill: var( --myuw-notification-dismiss-color, rgba(0,0,0,0.54) );\n  -webkit-transition: color .3s cubic-bezier(.35,0,.25,1);\n  transition: color .3s cubic-bezier(.35,0,.25,1);\n}\n\n#list li .dismiss svg:hover {\n  fill: var( --myuw-notification-dismiss-hover-color, #333 );\n}\n\n#list #empty-state {\n  justify-content: center;\n  align-items: center;\n  font-size: 16px;\n  min-height: 140px;\n  color: #696969;\n}\n\n#list #empty-state.hidden {\n  display: none;\n}\n\n@media all and (min-width: 841px) {\n  #list {\n    width: 525px;\n  }\n} </style> <div id=\"wrapper\"> <button id=\"bell-button\" aria-label=\"notifications list\" aria-haspopup=\"true\" aria-controls=\"list\" aria-expanded=\"false\"> <!-- bell svg --> <svg id=\"bell-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z\"/></svg> <span id=\"count\" class=\"hidden\"></span> </button> <ul id=\"list\" role=\"menu\" tabindex=\"-1\" aria-labelledby=\"bell-button\"> <div id=\"see-all\"> <h1>Notifications</h1> </div> <!-- menu items for each notification --> <!-- empty state --> <li id=\"empty-state\"> <slot name=\"myuw-notifications-empty\"></slot> </li> </ul> </div> ";

  var MyUWNotifications =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(MyUWNotifications, _HTMLElement);

    function MyUWNotifications() {
      var _this;

      _classCallCheck(this, MyUWNotifications);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MyUWNotifications).call(this)); // Create a shadowroot for this element

      _this.attachShadow({
        mode: 'open'
      }); // Append the custom HTML to the shadowroot


      _this.shadowRoot.appendChild(MyUWNotifications.template.content.cloneNode(true));

      return _this;
    }

    _createClass(MyUWNotifications, [{
      key: "attributeChangedCallback",

      /* Currently unused except for demo/code generation purposes
         as there is no obvious need for the see-all-url to ever change while a user
         is interacting with the component
      */
      value: function attributeChangedCallback(name, oldValue, newValue) {
        // Update the attribute internally
        this[name] = newValue; // Update the component with new att value

        this.updateAttribute(name);
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        // Get all attributes
        this['see-all-url'] = this.getAttribute('see-all-url'); // Element variables

        this.$list = this.shadowRoot.getElementById('list');
        this.$bell = this.shadowRoot.getElementById('bell-button');
        this.$count = this.shadowRoot.getElementById('count');
        this.$wrapper = this.shadowRoot.getElementById('wrapper');
        this.$seeAllWrapper = this.shadowRoot.getElementById('see-all');
        this.$seeAllLink = document.createElement('a');
        this.$emptyState = this.shadowRoot.getElementById('empty-state');
        this.$notificationsCount = 0;

        if (this['see-all-url']) {
          this.$seeAllLink.setAttribute('href', this['see-all-url']);
          this.$seeAllLink.innerText = "See all";
          this.$seeAllWrapper.appendChild(this.$seeAllLink);
        }
        /**
         * @typedef {Object} notification
         * @property {String} message
         */

        /**
         * Listen for custom event to indicate there are notifications ready to display
         * @param {CustomEvent} event Event that should pass notification information to display
         */


        document.addEventListener('myuw-has-notifications', function (event) {
          // Process data passed with event
          if (event.detail.notifications) {
            _this2.componentReady(event.detail.notifications);
          } else {
            _this2.componentReady();
          }
        }, false);
        /*
            Add an on click event to the window.
            This allows us to close the menu if the user
            clicks anywhere but on the menu.
        */

        window.addEventListener('click', function (e) {
          if (_this2.$list.classList.contains('visible')) {
            _this2.$list.classList.remove('visible');

            _this2.$bell.setAttribute('aria-expanded', 'false');
          }
        });
        /*
            Add an on click event to the notifications menu.
            We need to do this in order to stop the propagation
            of click events on the menu specifically.
             If a user clicks on the list menu, the window on click
            event will not fire, and it will not close the menu
        */

        this.$list.addEventListener('click', function (e) {
          e.stopPropagation();
        });
        /*
            Add an on click event to the bell button
             We need to make sure that we stop propagation on
            this event or else the window on click will always fire
            and the menu will never open.
        */

        this.$bell.addEventListener('click', function (e) {
          e.stopPropagation();

          _this2.$list.classList.toggle('visible'); // Focus the menu upon opening, blur on close


          if (_this2.$list.classList.contains('visible')) {
            _this2.$list.focus();

            _this2.$bell.setAttribute('aria-expanded', 'true');
          } else {
            _this2.$list.blur();

            _this2.$bell.setAttribute('aria-expanded', 'false');
          }
        });
      }
    }, {
      key: "updateAttribute",
      value: function updateAttribute() {} // TODO: Ensure see-all-url is a valid url, update it

      /**
       * TODO: 
       *   - Keep an internal list of notifications to add to/remove from. 
       *   - Use 'myuw-has-notifications' event to add to the internal list.
       *       - Prior to adding, filter out duplicate/existing entries
       *   - Update DOM in response to internal list changes, instead of directly translating
       *     received data into DOM elements
       * 
       * Runs after component detects the 'myuw-has-notifications' event and receives
       * the required parameter
       * @param {*} notifications 
       */

    }, {
      key: "componentReady",
      value: function componentReady(notifications) {
        // Check for notifications
        if (_typeof(notifications) === 'object' && notifications.length > 0) {
          this.$notificationsCount += notifications.length;
          var notificationItem;
          var notificationContentWrapper;
          var body;
          var actionButtonsWrapper;
          var actionButton;
          var infoButton;
          var dismissButton; // create html structure for each notification

          for (var i in notifications) {
            console.log(notifications[i]); // Abort if id not present

            if (!notifications[i].id) {
              return;
            }
            /* Create elements that don't depend on data model for information */


            notificationItem = document.createElement('li');
            notificationItem.setAttribute('role', 'menuitem');
            notificationItem.setAttribute('id', 'myuw-notification-id=' + notifications[i].id);
            notificationContentWrapper = document.createElement('div');
            notificationContentWrapper.setAttribute('class', 'content');
            actionButtonsWrapper = document.createElement('div');
            actionButtonsWrapper.setAttribute('class', 'actions');
            dismissButton = document.createElement('button');
            dismissButton.setAttribute('class', 'dismiss');
            dismissButton.setAttribute('aria-label', 'dismiss notification');
            dismissButton.innerHTML = "\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n            <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n          </svg>"; // Bind dismiss event using the notification's id value

            dismissButton.addEventListener('click', this.dismissNotification.bind(this, notifications[i].id));
            notificationItem.appendChild(notificationContentWrapper);
            /* 
              Assemble source and body rows 
            */

            if (notifications[i].title) {
              body = document.createElement('p');
              body.setAttribute('class', 'body');
              body.innerText = notifications[i].title; // Add to html structure

              notificationContentWrapper.appendChild(body);
            }

            notificationContentWrapper.appendChild(actionButtonsWrapper);
            /* 
              Assemble action buttons row 
            */

            if (notifications[i].actionButton) {
              actionButton = document.createElement('a');
              actionButton.innerText = notifications[i].actionButton.label;
              actionButton.setAttribute('href', notifications[i].actionButton.url);
              actionButton.setAttribute('target', '_blank');
              actionButton.setAttribute('rel', 'noopener noreferrer');
              actionButtonsWrapper.appendChild(actionButton);
            }

            if (notifications[i].moreInfoButton) {
              infoButton = document.createElement('a');
              infoButton.innerText = notifications[i].moreInfoButton.label;
              infoButton.setAttribute('class', 'flat');
              infoButton.setAttribute('href', notifications[i].moreInfoButton.url);
              infoButton.setAttribute('target', '_blank');
              infoButton.setAttribute('rel', 'noopener noreferrer');
              actionButtonsWrapper.appendChild(infoButton);
            }
            /*
              Append assembled notification html to the list
            */


            notificationItem.appendChild(notificationContentWrapper);
            notificationItem.appendChild(dismissButton);
            this.$list.appendChild(notificationItem);
          } // Update count value


          this.$bell.innerHTML = "\n          <svg id=\"bell-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z\"/>\n          </svg>"; // Hide empty state

          this.$emptyState.classList.add('hidden');
        } // Check if "see all" slot is in use

      }
    }, {
      key: "dismissNotification",
      value: function dismissNotification(id) {
        // Dispatch custom event notifying client that a notification was marked for dismissal
        var dismissalEvent = new CustomEvent('myuw-notification-dismissed', {
          bubbles: true,
          detail: {
            notificationId: id
          }
        });
        document.dispatchEvent(dismissalEvent); // Remove entry from DOM

        if (_typeof(this.shadowRoot.getElementById('myuw-notification-id=' + id)) === 'object') {
          // Animate removal of the list item
          this.shadowRoot.getElementById('myuw-notification-id=' + id).style.display = 'none';
        } // Decrement notifications count and check if empty


        this.$notificationsCount--;

        if (this.$notificationsCount <= 0) {
          this.$emptyState.classList.remove('hidden');
          this.$bell.innerHTML = "\n          <svg id=\"bell-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z\"/>\n          </svg>";
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['see-all-url'];
      }
    }]);

    return MyUWNotifications;
  }(_wrapNativeSuper(HTMLElement));

  MyUWNotifications.template = function template(src) {
    var template = document.createElement('template');
    template.innerHTML = src;
    return template;
  }(tpl);
  /**
   * Polyfill for supporting the CustomEvent constructor in IE9+
   * From: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
   */


  (function () {
    if (typeof window.CustomEvent === 'function') {
      return false;
    }

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  })();

  window.customElements.define('myuw-notifications', MyUWNotifications);

}());
