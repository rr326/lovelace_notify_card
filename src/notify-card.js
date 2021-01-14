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
  constructor() {
    super()
    window._ross = this
    console.log('hass', this.hass)
  }
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
    window._ross = this
    console.log('hass', this.hass)

    return html`
      <h1>NUMBER: 9</h1>
      <h1>Lovelace Notify Card</h1>
      <h2>hass</h2>
      <p>${this.hass}</p>
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
