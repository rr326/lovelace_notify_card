import './css/alertify.css';

import { doSetDefaults } from './setDefaults';
import {
  doNotifySuccess,
  doNotifyError,
  doNotifyDismissAll,
  doNotifyWarning,
  doNotifyMessage,
  doNotify,
} from './notify';
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
    hassConn.subscribeEvents(doNotifyError, 'll_notify/error');
    hassConn.subscribeEvents(doNotifyWarning, 'll_notify/warning');
    hassConn.subscribeEvents(doNotifyMessage, 'll_notify/message');
    hassConn.subscribeEvents(doNotify, 'll_notify/notify');
    hassConn.subscribeEvents(doNotifyDismissAll, 'll_notify/dismiss_all');
  })
  .then(() => {
    // debugging
    debug.set_globals();
    // debug.do_5sec_test();
  });
