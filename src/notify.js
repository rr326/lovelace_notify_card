import alertify from 'alertifyjs';
window.alertify = alertify;

export function doNotifySuccess(event) {
  event.data.type = 'success';
  doNotify(event);
}

export function doNotifyError(event) {
  event.data.type = 'error';
  doNotify(event);
}

export function doNotifyMessage(event) {
  event.data.type = '';
  doNotify(event);
}

export function doNotifyWarning(event) {
  event.data.type = 'warning';
  doNotify(event);
}

export function doNotifyDismissAll() {
  alertify.dismissAll();
}

export function doNotify(event) {
  let type = event.data.type;
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

