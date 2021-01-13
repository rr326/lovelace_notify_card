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

@customElement('notify-card')
export class NotifyCard extends LitElement {
    set hass(hass) {
      if (!this.content) {
        const card = document.createElement('ha-card');
        card.header = 'Example card';
        this.content = document.createElement('div');
        this.content.style.padding = '0 16px 16px';
        card.appendChild(this.content);
        this.appendChild(card);
      }
  
      const entityId = this.config.entity;
      const state = hass.states[entityId];
      const stateStr = state ? state.state : 'unavailable';
  
      this.content.innerHTML = `
        <h1>Lovelace Notify Card</h1>
        <h2>Other stuff here</h2>
        <p>Lorem ipsum...</p>
      `;
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
  
