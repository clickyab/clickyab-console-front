// we where in need of props in our event handlers
// in state less components whitout creating event handlers
// functions by each re render. this method helps us to
// append props to handler function so we can
// get props from function.
//////////////////////////////////
// be careful about props names. this function doesnt override
// handler main function ;)
//////////////////////////////////
export function mapPropsToHandler(handler, props) {
    for (let property in props) {
        if (props.hasOwnProperty(property)) {
            if(handler.hasOwnProperty(property)) {
                throw new Error(`you are trying to override a property which already exist on handler
                 function you have just passed to mapPropsToHandler function or you repeat an element of props.
                 error was thrown at ${property} property name`);
            }
            handler[property] = props[property];
        }
    }
}