let swal = require('sweetalert');
export function sweetAlert(type , msg){
    Lobibox.notify(
        type,
        {
            size: 'mini',
            rounded: false,
            sound: false,
            icon: false,
            delay: 5000,
            position: "top right",
            delayIndicator: true,
            msg: msg
        }
    );
}