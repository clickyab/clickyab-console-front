import {sync} from "../../functions/sync";
import {loading} from "../../functions/loading";
import {handleError} from "../../functions/catchError";
import {redirectIfLogin} from "../redirectIfLogin";

export default () => sync(function*() {
    try {
        loading(true);
        yield* redirectIfLogin('/v1/advertiser');

        window.location = '/v1/login';
    } catch (error) {
        handleError(error);
    }
});
