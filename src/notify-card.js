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
  setConfig(config) {
    //   if (!config.entity) {
    //     throw new Error('You need to define an entity');
    //   }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }

  static get styles() {
    return css`
      :host {
        background-color: red;
      }
    `;
  }

  render() {
    return html`
      <h1>NUMBER: 9</h1>
      <h1>Lovelace Notify Card</h1>
      <h2>Other stuff here</h2>
      <p>Lorem ipsum...</p>
    `;
  }

  shouldUpdate(changedProps) {
    return true; // TODO Fix

    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }
}
customElements.define('notify-card', NotifyCard);
