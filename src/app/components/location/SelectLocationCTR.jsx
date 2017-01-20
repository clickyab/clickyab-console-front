import React, {Component} from 'react';
import SelectLocationPTR from './SelectLocationPTR';
import swagger from './../../swagger/index';
import {getToken} from "../../redux/helpers";
import {ifInvalidToken} from "../../functions/helpers";
import {sync} from "../../functions/sync";
import {select} from "../../functions/select";

export default class SelectLocationCTR extends Component {
    callProvinceName(id) {
        sync(function* (){
            let {data, response, error } = yield (new swagger.LocationApi())
                .locationProvinceGetIdGet(id, select('user.token', 'no token'))

            if(response.statusCode == '200') {
                $(".select-province").html('<option value=' + data.id + '>' + data.name + '</option>')
                    .prop('disabled', true);
            }
        })
    }

    callCityName(id) {
        sync(function* (){
            let {data, response, error } = yield (new swagger.LocationApi())
                .locationCityGetIdGet(id, select('user.token', 'no token'))

            if(response.statusCode == '200') {
                $(".select-city").html('<option value=' + data.id + '>' + data.name + '</option>')
                    .prop('disabled', true);
            }
        })
    }
    componentDidMount() {
        function getCountryList({error, data, response}) {
            if (response.statusCode == 200) {
                response.body.forEach( function( item )
                {
                    $(".select-country").append('<option value=' + item.id + '>' + item.name + '</option>');
                });
            } else if (response.statusCode == 400) {

            }
             ifInvalidToken(response);
            }


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

        function requestToGetCountry() {
            (new swagger.LocationApi())
                .locationCountryGet(getToken())
                .then(response => getCountryList(response));
        }
        requestToGetCountry();

        $(document).on('change','.select-country',function() {
            $(".select-province").prop('disabled', false);
            var countryID = $(this).val();
            if(countryID){
                (new swagger.LocationApi())
                    .locationProvinceGet(getToken())
                    .then(response => getProvinceList(response));
            }
        });
        $(document).on('change','.select-province',function() {
            $(".select-city").prop('disabled', false);
            let provinceID = $(this).val();
            if(provinceID){
                (new swagger.LocationApi())
                    .locationCityIdGet(provinceID,getToken())
                    .then(response => getCityList(response));
            }
        })
    }

    render() {
        return (<SelectLocationPTR callCityName={this.callCityName} callProvinceName={this.callProvinceName} />);
    }
}
