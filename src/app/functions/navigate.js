import {dispatch} from "./dispatch";
import {push} from "react-router-redux";
export function navigate(path) {
    dispatch(push(path));
}