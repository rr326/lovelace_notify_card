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
  static get properties() {
    return {
      hass: {},
      config: {},
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;
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
    window._ross = this;
    let ll_notify = this.hass.states['ll_notify.state'],
      attributes = ll_notify ? ll_notify.attributes : null,
      att_ar = attributes ? Object.entries(attributes) : null;
    // console.log('hass', this.hass);
    // console.log(`attributes`, ll_notify, att_ar);
    ++this.count;
    console.log(`${this.count} - Rendered`);

    return html`
      <h1>NUMBER: 9</h1>
      <h1>Lovelace Notify Card</h1>
      <h2>Current count: ${this.count}</h2>
      <ul>
        ${att_ar.map(
          item =>
            html`
              <li>${item}</li>
            `,
        )}
      </ul>
    `;
  }

  // shouldUpdate(changedProps) {
  //   console.log(`shouldUpdate: `, changedProps)
  //   return true; // TODO Fix

  //   if (!this.config) {
  //     return false;
  //   }

  //   return hasConfigOrEntityChanged(this, changedProps, false);
  // }
}
customElements.define('notify-card', NotifyCard);
