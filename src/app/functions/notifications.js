let Lobibox = require('./../../../public/vendor/lobibox');
export function AlertBox(type , msg){
    Lobibox.notify(
        type,
        {
            size: 'mini',
            rounded: false,
            sound: false,
            icon: false,
            delay: 4000,
            position: "top right",
            delayIndicator: true,
            msg: msg
        }
    );
}