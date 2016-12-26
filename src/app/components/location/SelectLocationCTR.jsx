import React, {Component} from 'react';
import SelectLocationPTR from './SelectLocationPTR';
import swagger from './../../swagger/index';
import {getToken} from "../../redux/helpers";
import {ifInvalidToken} from "../../functions/helpers";

export default class SelectLocationCTR extends Component {


    componentDidMount() {
        function getCountryList({error, data, response}) {
            if (response.statusCode == 200) {
                response.body.forEach( function( item )
                {
                    $(".select-country").append('<option value=' + item.id + '>' + item.name + '</option>');
                });
            } else if (response.statusCode == 400) {

            }
            }
            ifInvalidToken(response);

        function getProvinceList({error, data, response}) {
            if (response.statusCode == 200) {
                response.body.forEach( function( item )
                {
                    $(".select-province").append('<option value=' + item.id + '>' + item.name + '</option>');
                });
            } else if (response.statusCode == 400) {
            }
            ifInvalidToken(response)
        }
        function getCityList({error, data, response}) {
            if (response.statusCode == 200) {
                response.body.forEach( function( item )
                {
                    $(".select-city").append('<option value=' + item.id + '>' + item.name + '</option>');
                });
            } else if (response.statusCode == 400) {
            }
            ifInvalidToken(response)
        }
        function locationCountryGetCallback({error, data, response}) {
            if (response.statusCode == '200') {
                getCountryList(response);
            } else if (response.statusCode == '400') {

            }
        }
        function getLocationCountry() {
            (new swagger.LocationApi())
                .locationCountryGet(getToken())
                .then(response => locationCountryGetCallback(response));
        }

        function requestToGetCountry() {
            (new swagger.LocationApi())
                .locationCountryGet(getToken())
                .then(response => getCountryList(response));
        }
        requestToGetCountry();

        $(document).on('change','.select-country',function() {
                var countryID = $(this).val();
                if(countryID){
                    (new swagger.LocationApi())
                        .locationProvinceGet(getToken())
                        .then(response => getProvinceList(response));
                }
        });
        $(document).on('change','.select-province',function() {
            console.log("milad");
            let provinceID = $(this).val();
            if(provinceID){
                (new swagger.LocationApi())
                    .locationCityIdGet(provinceID,getToken())
                    .then(response => getCityList(response));
            }
        })
    }


    render() {
        return (<SelectLocationPTR/>);
    }
}
