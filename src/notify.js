import alertify from 'alertifyjs';

export function doNotifySuccess(event) {
    event.data.type = "success"
    doNotify(event)
  }
  
export function doNotify(event) {
    let type = event.data.type
    if (! type) {
        console.error('Invalid usage: doNotify requires a type.')
        return
    }
    let wait = event.data.wait
    if (typeof wait !== "number") {
        wait = alertify.defaults.notifier.delay
    }
    let message = event.data.message
    if (! message) {
        message = "Invalid usage: No message set!"
    }

    console.log('doNotify', message, type, wait)
    alertify.notify(message, type, wait)
}


