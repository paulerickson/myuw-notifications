import tpl from './myuw-notification.html';

export class MyUWNotification extends HTMLElement {
  constructor() {
    super();

    this.connected = false;

    // Create a shadow-root for this element.
    this.attachShadow({ mode: 'open' });

    // Append the custom HTML template to the shadow-root.
    this.shadowRoot.appendChild(MyUWNotification.template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [];
  }

  /**
   * Web component lifecycle hook to updated changed properties.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue !== newValue){
      this[name] = newValue;
      this.updateComponent(name, newValue);
    }
  }

  /**
   * When the component is first attached to the DOM, get its defined
   * attributes and listen for scrolling.
   */
  connectedCallback() {
    this.notificationId = this.getAttribute('myuw-notification-id') || null;
    this.body = this.getAttribute('body') || null;
    this.actionUrl = this.getAttribute('action-button-url') || null;
    this.actionLabel = this.getAttribute('action-button-label') || null;
    this.infoUrl = this.getAttribute('info-button-url') || null;
    this.infoLabel = this.getAttribute('info-button-label') || null;
    this.confirmUrl = this.getAttribute('confirm-button-url') || null;
    this.confirmLabel = this.getAttribute('confirm-button-label') || null;

    this.$dismissButton   = this.shadowRoot.getElementById('dismiss');
    this.$body            = this.shadowRoot.querySelector('p#body');
    this.$actionButton    = this.shadowRoot.querySelector('a#action');
    this.$infoButton      = this.shadowRoot.querySelector('a#moreInfo');
    this.$confirmButton   = this.shadowRoot.querySelector('a#confirm');

    this.$body.innerText = this.body;

    if (this.actionUrl && this.actionLabel) {
      this.$actionButton.innerText = this.actionLabel;
      this.$actionButton.setAttribute('href', this.actionUrl);
      this.$actionButton.hidden = false;
    }

    if (this.infoUrl && this.infoLabel) {
      this.$infoButton.innerText = this.infoLabel;
      this.$infoButton.setAttribute('href', this.infoUrl);
      this.$infoButton.hidden = false;
    }

    if (this.confirmUrl && this.confirmLabel) {
      this.$confirmButton.innerText = this.confirmLabel;
      this.$confirmButton.setAttribute('href', this.confirmUrl);
      this.$confirmButton.hidden = false;
    }

    // Bind dismiss event using the notification's id value
    this.$dismissButton.addEventListener('click', this.dismissNotification.bind(this, this.notificationId));

    this.connected = true;
  }

  /**
   * Clean-up listeners if the component is removed from the DOM.
   */
  disconnectedCallback() {
    // ...
  }

  /**
   * Update the component state depending on changed properties and/or
   * font loading.
   */
  updateComponent(prop, value) {
    if( !this.connected ){ return; }
  }

  /**
   * 
   * TODO:
   *     - Animate removal from DOM
   * @param {String} id 
   */
  dismissNotification(id) {
    // Remove self from DOM
    this.parentNode.removeChild(this);

    // Dispatch custom event notifying client that a notification was dismissed
    // so it can be tracked in the parent list
    var dismissalEvent = new CustomEvent('myuw-notification-dismissed', {
      bubbles: true,
      detail: {
        notificationId: id
      }
    });
    document.dispatchEvent(dismissalEvent);
  }
}

MyUWNotification.template = (function template(src) {
  const template = (document.createElement('template'));
  template.innerHTML = src;
  return template;
})(tpl);

window.customElements.define('myuw-notification', MyUWNotification);
