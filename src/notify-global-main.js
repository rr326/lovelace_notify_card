import './css/alertify.css';

import { doSetDefaults } from './setDefaults';
import { subscribeNotifyEvents } from './notify';
import * as debug from './debug';

import alertify from 'alertifyjs';
window.alertify = alertify; // Needed as a window global

let hassConn = document.querySelector('home-assistant').hass.connection;

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
    subscribeNotifyEvents(hassConn);
  })
  .then(() => {
    // debugging
    debug.set_globals();
    // debug.do_5sec_test();
  });
