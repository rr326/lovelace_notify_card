import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  css,
  internalProperty,
} from 'lit-element';

import styles from './css/alertify.css';
import 'alertifyjs'
// import alertify from 'alertifyjs';

// export class NotifyCard extends LitElement {
//   static get properties() {
//     return {
//       hass: {},
//       config: {},
//       count: { type: Number, hasChanged: () => false },
//     };
//   }

//   get_notify_state(obj) {
//     return obj && obj.states && obj.states["ll_notify.state"]
//   }

//   constructor() {
//     super();
//     this.count = 0;
//   }
//   setConfig(config) {
//     //   if (!config.entity) {
//     //     throw new Error('You need to define an entity');
//     //   }
//     this.config = config;
//   }

//   getCardSize() {
//     return 3;
//   }

//   static get styles() {
//     return css`
//       :host {
//         background-color: red;
//       }
//     `;
//   }

//   shouldUpdate(changedProps) {
//     if (changedProps.get("hass")) {
//       let oldval = this.get_notify_state(changedProps.get("hass"))
//       let newval = this.get_notify_state(this.hass)
//       if (newval !== oldval) {
//         return true
//       }
//     }
//     console.log('shouldUpdate - false', changedProps)
//     return false
//   }

//   render() {
//     window._ross = this;
//     let ll_notify = this.get_notify_state(this.hass),
//       attributes = ll_notify && ll_notify.attributes,
//       att_ar = attributes && Object.entries(attributes);
//     // console.log('hass', this.hass);
//     // console.log(`attributes`, ll_notify, att_ar);
//     ++this.count;
//     console.log(`${this.count} - Rendered`);
//     alertify.notify('Hello')

//     return html`
//       <h1>NUMBER: 0</h1>
//       <h1>Lovelace Notify Card</h1>
//       <h2>Current count: ${this.count}</h2>
//       <ul>
//         ${att_ar.map(
//           item =>
//             html`
//               <li>${item}</li>
//             `,
//         )}
//       </ul>
//     `;
//   }
// }
// customElements.define('notify-card', NotifyCard);

console.log('Setting timeout');
setTimeout(async () => {
  console.log('\nIn Set Timeout');
  window.hass = document.querySelector('home-assistant').hass;
  let hassConn = (await window.hassConnection).conn;
  window.hassConn = hassConn;

  function event_cb(event) {
    console.log('alertify: ', event);
    alertify.notify(event.data.message, 'success', event.data.wait)
  }

  hassConn
  .subscribeEvents(event_cb, 'll_notify/message')
  // .subscribeEvents(event_cb)
  .then(cancel_fn => {
      ; // Get cancel_fn, but don't need it
    })
    .then(() => {
      hassConn.sendMessage({
        type: 'll_notify/message',
        message: 'test',
        wait: 10,
      });
    });
}, 500);
