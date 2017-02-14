import {select} from "./select";
import {NotifyBox} from "./notifications";

export default function checkSubmitProfile() {
    const msg = '<a href="/v1/profile" style="color:white">لطفا برای نکمیل اطلاعات حساب خود کلیک نمایید.</a>';
    if (select('user.personal') == null && select('user.corporation') == null)
        NotifyBox('warning', msg, 0);
}