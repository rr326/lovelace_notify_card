import styles from './css/alertify.css';
import 'alertifyjs';
import merge from 'lodash.merge'

console.log('notify-frontend loaded.');
let hassConn = document.querySelector('home-assistant').hass.connection;

/**
 * Debugging code
 */
let debug = false;
window.hass = document.querySelector('home-assistant').hass;
window.hassConn = hassConn;

function do_5sec_test() {
  window.setInterval(() => {
    hassConn.sendMessage({
      type: 'call_service',
      domain: 'll_notify',
      service: 'success',
      service_data: {
        message: 'TEST: from FRONTEND',
        wait: 5,
      },
    });
  }, 5000);
}

/**
 *
 * Callbacks
 */
function doNotifySuccess(event) {
  console.log('alertify: ', event);
  if (event.data.wait == null) {
    alertify.notify(event.data.message, 'success');
  } else {
    alertify.notify(event.data.message, 'success', event.data.wait);
  }
}

function doSetDefaults(event) {
  // alertify.defaults = { ...alertify.defaults, ...event.data };
  alertify.defaults = merge(alertify.defaults, event.data);
}


/**
 * Initialize alertify & websocket listeners
 */
hassConn
  .subscribeEvents(doSetDefaults, 'll_notify/get_defaults')
  .then(() => {
    hassConn.sendMessage({
      type: 'call_service',
      domain: 'll_notify',
      service: 'get_defaults',
    });
  })
  .then(() => {
    hassConn.subscribeEvents(doNotifySuccess, 'll_notify/success').then(cancel_fn => {});
  })
  .then(() => {
    if (debug) {
      do_5sec_test();
    }
  });
