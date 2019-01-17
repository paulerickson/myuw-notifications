import tpl from './myuw-notifications.html';

export class MyUWNotifications extends HTMLElement {
    constructor() {
        super();

        // Create a shadowroot for this element
        this.attachShadow({mode: 'open'});

        // Append the custom HTML to the shadowroot
        this.shadowRoot.appendChild(MyUWNotifications.template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return [];
    }

    /* Currently unused except for demo/code generation purposes
       as there is no obvious need for the see-all-url to ever change while a user
       is interacting with the component
    */
    attributeChangedCallback(name, oldValue, newValue) {
        // Update the attribute internally
        this[name] = newValue;
    }

    connectedCallback() {
        // Get all attributes
        this['see-all-url']       = this.getAttribute('see-all-url');

        // Element variables
        this.$list                = this.shadowRoot.getElementById('list');
        this.$bell                = this.shadowRoot.getElementById('bell-button');
        this.$itemSlot            = this.shadowRoot.querySelector('slot[name="myuw-notification-items"]');
        this.$count               = this.shadowRoot.getElementById('count');
        this.$wrapper             = this.shadowRoot.getElementById('wrapper');
        this.$seeAllWrapper       = this.shadowRoot.getElementById('see-all');
        this.$seeAllLink          = document.createElement('a');
        this.$emptyState          = this.shadowRoot.getElementById('empty-state');
        this.$notificationIds     = [];
        this.$notificationsCount  = this.$notificationIds.length;

        // Display "see all" only if URL attribute was provided
        if (this['see-all-url']) {
          this.$seeAllLink.setAttribute('href', this['see-all-url']);
          this.$seeAllLink.innerText = "See all";
          this.$seeAllWrapper.appendChild(this.$seeAllLink);
        }

        /**
         * Listen for custom event to indicate there are notifications ready to display
         * @param {CustomEvent} event Event that should pass notification information to display
         */
        document.addEventListener('myuw-has-notifications', (event) => {
          // Process data passed with event
          if (event.detail.notifications) {
            this.componentReady(event.detail.notifications);
          } else {
            this.componentReady();
          }
        }, false);

        /**
         * Listen for custom event from child component(s) indicating that a notification's 
         * "dismiss" button was clicked. Remove the notification with received ID from 
         * internal list.
         */
        document.addEventListener('myuw-notification-dismissed', (event) => {
          // Process data passed with event
          if (event.detail.notificationId) {
            // Remove notification
            var index = this.$notificationIds.indexOf(event.detail.notificationId);
            this.$notificationIds.splice(index, 1);
            // Update for empty state
            if (this.$notificationIds.length <= 0) {
              this.$emptyState.classList.remove('hidden');
            }
          }
        }, false);

        /*
            Add an on-click event to the window.
            This allows us to close the menu if the user
            clicks anywhere but on the menu.
        */
        window.addEventListener('click', e => {
            if (this.$list.classList.contains('visible')) {
                this.$list.classList.remove('visible');
                this.$bell.setAttribute('aria-expanded', 'false');
                this.$list.setAttribute('tabindex', '-1');
            }
        });

        /*
            Add an on-click event to the notifications menu.
            We need to do this in order to stop the propagation
            of click events on the menu specifically.

            If a user clicks on the list menu, the window on click
            event will not fire, and it will not close the menu
        */
        this.$list.addEventListener('click', e => {
            e.stopPropagation();
        });

        /*
            Add an on-click event to the bell button

            We need to make sure that we stop propagation on
            this event or else the window on click will always fire
            and the menu will never open.
        */
        this.$bell.addEventListener('click', e => {
            e.stopPropagation();
            this.$list.classList.toggle('visible');

            // Focus the menu upon opening, blur on close
            if (this.$list.classList.contains('visible')) {
                this.$list.focus();
                this.$list.removeAttribute('tabindex');
                this.$bell.setAttribute('aria-expanded', 'true');
            } else {
                this.$list.blur();
                this.$list.setAttribute('tabindex', '-1');
                this.$bell.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    /**
     * TODO: 
     *   - Update DOM in response to internal list changes, instead of directly translating
     *     received data into DOM elements
     * 
     * Runs after component detects the 'myuw-has-notifications' event and receives
     * the required parameter
     * @param {*} notifications 
     */
    componentReady(notifications) {
      // Check for notifications
      if (typeof notifications === 'object' && notifications.length > 0) {

        var notificationItem;
        var notificationContentWrapper;
        var body;
        var actionButtonsWrapper;
        var actionButton;
        var infoButton;
        var dismissButton;

        // Console log wrapper so debug message is safely posted 
        // if the browser doesn't have a console
        var log = Function.prototype.bind.call(console.debug, console);

        // create html structure for each notification
        for (var i in notifications) {

          // Abort if id not present
          if (!notifications[i].id) { return; }

          // If new unique id, add to internal list and DOM, or log a message and return
          if (this.$notificationIds.indexOf(notifications[i].id) === -1) {
            this.$notificationIds.push(notifications[i].id);
          } else { 
            // QUESTION: Is there a use case for instead broadcasting an event so the client 
            // can respond to it (e.g. if new notifications are being added via GUI by a non-
            // expert)?
            log.apply(console, ["Received duplicate notification id"]);
            return; 
          }

          /* Create elements that don't depend on data model for information */
          notificationItem = document.createElement('myuw-notification');
          notificationItem.setAttribute('myuw-notification-id', notifications[i].id);
          notificationItem.setAttribute('slot', 'myuw-notification-items');

          /* 
            Set notification body
          */
          if (notifications[i].title) {
            notificationItem.setAttribute('body', notifications[i].title);
          }

          /* 
            Assemble action buttons row 
          */ 
          if (notifications[i].actionButton) {
            notificationItem.setAttribute('action-button-url', notifications[i].actionButton.url);
            notificationItem.setAttribute('action-button-label', notifications[i].actionButton.label);
          }

          if (notifications[i].moreInfoButton) {
            notificationItem.setAttribute('info-button-url', notifications[i].moreInfoButton.url);
            notificationItem.setAttribute('info-button-label', notifications[i].moreInfoButton.label);
          }

          if (notifications[i].confirmButton) {
            notificationItem.setAttribute('confirm-button-url', notifications[i].confirmButton.url);
            notificationItem.setAttribute('confirm-button-label', notifications[i].confirmButton.label);
          }
          
          this.$list.appendChild(notificationItem);
        }

        // Update to non-empty
        this.$bell.innerHTML = `
          <svg id="bell-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>`;

        // Hide empty state
        this.$emptyState.classList.add('hidden');
      }
    }

}
MyUWNotifications.template = (function template(src) {
  const template = (document.createElement('template'));
  template.innerHTML = src;
  return template;
})(tpl);

/**
 * Polyfill for supporting the CustomEvent constructor in IE9+
 * From: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
(function () {
  if (typeof window.CustomEvent === 'function') {
    return false;
  }
  
  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

window.customElements.define('myuw-notifications', MyUWNotifications);
