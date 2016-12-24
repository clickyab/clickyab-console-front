import {UPDATE_USER} from '../actions/user';


const initial = {
    "corporation": {
        "address": "string",
        "city_id": {
            "Int64": 0,
            "Valid": true
        },
        "country_id": {
            "Int64": 0,
            "Valid": true
        },
        "created_at": "string",
        "economic_code": "string",
        "phone": "string",
        "province_id": {
            "Int64": 0,
            "Valid": true
        },
        "register_code": "string",
        "title": "string",
        "updated_at": "string",
        "user_id": 0
    },
    "email": "string",
    "perm": {},
    "personal": {
        "address": "string",
        "birthday": "string",
        "cellphone": "string",
        "city_id": {
            "Int64": 0,
            "Valid": true
        },
        "country_id": {
            "Int64": 0,
            "Valid": true
        },
        "created_at": "string",
        "first_name": "string",
        "gender": "string",
        "last_name": "string",
        "national_code": "string",
        "phone": "string",
        "province_id": {
            "Int64": 0,
            "Valid": true
        },
        "updated_at": "string",
        "user_id": 0,
        "zip_code": "string"
    },
    "token": "string",
    "user_id": 0
};
export default function userReducer(state = initial, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, action.user);
    }

    return state;
}