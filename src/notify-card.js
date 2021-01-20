
import styles from './css/alertify.css';
import 'alertifyjs';

console.log('notify-frontend loaded.');
setTimeout(async () => {
  // Do in delay, jst to be sure its loaded
  let debug = false;

  console.log('\nIn Set Timeout');
  window.hass = document.querySelector('home-assistant').hass;
  let hassConn = (await window.hassConnection).conn;
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

  function event_cb(event) {
    console.log('alertify: ', event);
    if (event.data.wait == null) {
      alertify.notify(event.data.message, 'success');
    } else {
      alertify.notify(event.data.message, 'success', event.data.wait);
    }
  }

  hassConn.subscribeEvents(event_cb, 'll_notify/success').then(cancel_fn => {
    // Get cancel_fn, but don't need it
    if (debug) {
      do_5sec_test();
    }
  });
}, 500);
