import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  css,
  PropertyValues,
  internalProperty,
} from 'lit-element';

export class NotifyCard extends LitElement {

  shouldUpdate(changedProps) {
    return true // TODO Fix 

    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }  

  render() {
    return html`
      <h1>NUMBER: 8</h1>
      <h1>Lovelace Notify Card</h1>
      <h2>Other stuff here</h2>
      <p>Lorem ipsum...</p>
    `;
  }

  static get styles() {
    return css`
    :host {
      background-color: red;
    }
    `
  }

  setConfig(config) {
    //   if (!config.entity) {
    //     throw new Error('You need to define an entity');
    //   }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}
customElements.define('notify-card', NotifyCard);
