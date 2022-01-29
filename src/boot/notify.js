import { Notify } from 'quasar'
//Configurations 
var timeout = 5000;

//Notifications

Notify.registerType('success', {
    progress: true,
    icon: "check_circle_outline",
    multiLine: true,
    position :'top',
    color: "green-7",
    html:true,
    textColor: "white",
    timeout: timeout + 5000,
    actions: [
      { label: 'Dismiss', color: 'white', handler: () => { /* console.log('wooow') */ } }
    ]
})

Notify.registerType('error', {
    progress: true,
    icon: "highlight_off",
    multiLine: true,
    position :'top',
    color: "red-7",
    html:true,
    textColor: "white",
    timeout: timeout + 10000,
    actions: [
      { label: 'Dismiss', color: 'white', handler: () => { /* console.log('wooow') */ } }
    ]
})

Notify.registerType('info', {
    progress: true,
    icon: "warning",
    multiLine: true,
    position :'top',
    html:true,
    color: "blue-7",
    textColor: "white",
    timeout: timeout + 15000,
    actions: [
      { label: 'Dismiss', color: 'white', handler: () => { /* console.log('wooow') */ } }
    ]
})