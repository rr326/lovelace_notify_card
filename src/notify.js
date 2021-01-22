import alertify from 'alertifyjs';
window.alertify = alertify;

export function doNotifyDismissAll() {
  alertify.dismissAll();
}

export function doNotify(event, event_type) {
  let type = event_type ? event_type : event.data.type;
  if (typeof type === 'undefined') {
    console.error('Invalid usage: doNotify requires a type or empty string.');
    return;
  }
  let wait = event.data.wait;
  if (typeof wait !== 'number') {
    wait = alertify.defaults.notifier.delay;
  }
  let message = event.data.message;
  if (!message) {
    message = 'Invalid usage: No message set!';
  }

  console.log('doNotify', message, type, wait);
  alertify.notify(message, type, wait);
}

export function subscribeNotifyEvents(hassConn) {
  hassConn.subscribeEvents(doNotifyDismissAll, 'll_notify/dismiss_all');
  hassConn.subscribeEvents(doNotify, 'll_notify/notify');

  let wsEvents = ['success', 'error', 'warning', 'message'];
  wsEvents.forEach(eventName => {
    hassConn.subscribeEvents(event => {
      return doNotify(event, eventName);
    }, `ll_notify/${eventName}`);
  });
}
