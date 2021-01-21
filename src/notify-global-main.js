import './css/alertify.css';
import alertify from 'alertifyjs';
import merge from 'lodash.merge';
import { doSetDefaults } from './setDefaults';
import { doNotifySuccess } from './notify';
import * as debug from './debug';

console.log('notify-frontend loaded.');
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
    hassConn.subscribeEvents(doNotifySuccess, 'll_notify/success');
  })
  .then(() => {
    // debugging
    debug.set_globals();
    if (false) debug.do_5sec_test();
  });
