import tpl from './myuw-notifications.html';

class MyUWNotifications extends HTMLElement {
    constructor() {
        super();

        // Create a shadowroot for this element
        this.attachShadow({mode: 'open'});

        // Append the custom HTML to the shadowroot
        this.shadowRoot.appendChild(MyUWNotifications.template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return [
          'see-all-url'
        ];
    }

    /* Currently unused except for demo/code generation purposes
       as there is no obvious need for the see-all-url to ever change while a user
       is interacting with the component
    */
    attributeChangedCallback(name, oldValue, newValue){
        // Update the attribute internally
        this[name] = newValue;

        // Update the component with new att value
        this.updateAttribute(name);
    }

    connectedCallback() {
        // Get all attributes
        this['see-all-url']       = this.getAttribute('see-all-url');

        // Element variables
        this.$list          = this.shadowRoot.getElementById('list');
        this.$bell          = this.shadowRoot.getElementById('bell-button');
        this.$count         = this.shadowRoot.getElementById('count');
        this.$wrapper       = this.shadowRoot.getElementById('wrapper');
        this.$seeAllWrapper = this.shadowRoot.getElementById('see-all');
        this.$seeAllLink    = document.createElement('a');
        this.$emptyState    = this.shadowRoot.getElementById('empty-state');

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
        document.addEventListener('myuw-has-notifications', (event) => {
          // Process data passed with event
          if (event.detail.notifications) {
            this.componentReady(event.detail.notifications);
          } else {
            this.componentReady();
          }
        }, false);

        /*
            Add an on click event to the window.
            This allows us to close the menu if the user
            clicks anywhere but on the menu.
        */
        window.addEventListener('click', e => {
            if (this.$list.classList.contains('visible')) {
                this.$list.classList.remove('visible');
                this.$bell.setAttribute('aria-expanded', 'false');
            }
        });

        /*
            Add an on click event to the notifications menu.
            We need to do this in order to stop the propagation
            of click events on the menu specifically.

            If a user clicks on the list menu, the window on click
            event will not fire, and it will not close the menu
        */
        this.$list.addEventListener('click', e => {
            e.stopPropagation();
        });

        /*
            Add an on click event to the bell button

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
                this.$bell.setAttribute('aria-expanded', 'true');
            } else {
                this.$list.blur();
                this.$bell.setAttribute('aria-expanded', 'false');
            }
        });

    }

    updateAttribute() { 
      // TODO: Ensure see-all-url is a valid url, update it
      
    }

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
    componentReady(notifications) {
      // Check for notifications
      if (typeof notifications === 'object' && notifications.length > 0) {
        this.$notificationsCount += notifications.length;

        var notificationItem;
        var notificationContentWrapper;
        var source;
        var body;
        var actionButtonsWrapper;
        var actionButton;
        var infoButton;
        var dismissButton;

        // create html structure for each notification
        for (var i in notifications) {
          console.log(notifications[i]);

          // Abort if id not present
          if (!notifications[i].id) { return; }


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
          dismissButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>`;
          // Bind dismiss event using the notification's id value
          dismissButton.addEventListener('click', this.dismissNotification.bind(this, notifications[i].id));
          
          notificationItem.appendChild(notificationContentWrapper);

          /* 
            Assemble source and body rows 
          */
          if (notifications[i].title) {
            body = document.createElement('p');
            body.setAttribute('class', 'body');
            body.innerText = notifications[i].title;

            // Add to html structure
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

        }

        // Update count value
        this.$bell.innerHTML = `
          <svg id="bell-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>`;
        

        // Hide empty state
        this.$emptyState.classList.add('hidden');
      }

      // Check if "see all" slot is in use
    }

    dismissNotification(id) {
      // Dispatch custom event notifying client that a notification was marked for dismissal
      var dismissalEvent = new CustomEvent('myuw-notification-dismissed', {
        bubbles: true,
        detail: {
          notificationId: id
        }
      });
      document.dispatchEvent(dismissalEvent);

      // Remove entry from DOM
      if (typeof this.shadowRoot.getElementById('myuw-notification-id=' + id) === 'object') {
        // Animate removal of the list item
        this.shadowRoot.getElementById('myuw-notification-id=' + id).style.display = 'none';
      }

      // Decrement notifications count and check if empty
      this.$notificationsCount--;
      if (this.$notificationsCount <= 0) {
        this.$emptyState.classList.remove('hidden');
        this.$bell.innerHTML = `
          <svg id="bell-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
          </svg>`;
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
