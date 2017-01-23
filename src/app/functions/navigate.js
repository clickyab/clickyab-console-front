import {browserHistory} from "react-router";

export function navigate(path, parameters) {
    if (parameters) {
        let routeParameters = path.match(/:([a-zA-Z_]+):/g);
        let parsedParameters = routeParameters.map(parameter => parameter.replace(/:/g, ''));
        for (let i = 0; i < parsedParameters.length; i++) {
            let valueOfGivenParameter = parameters[parsedParameters[i]];
            let theKeyToReplaceWithValue = routeParameters[i];
            path = path.replace(theKeyToReplaceWithValue, valueOfGivenParameter);
        }
    }

    browserHistory.push(path);
}