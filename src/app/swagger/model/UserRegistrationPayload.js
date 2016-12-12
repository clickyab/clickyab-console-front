/**
 * The Cyrest API
 * Auto genertaed Cyrest API
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

    // CommonJS-like environments that support module.exports, like Node.
    const ApiClient = require('../ApiClient')
    , UserCorporation = require('./UserCorporation'), UserPersonal = require('./UserPersonal')





  /**
   * The UserRegistrationPayload model module.
   * @module model/UserRegistrationPayload
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>UserRegistrationPayload</code>.
   * @alias module:model/UserRegistrationPayload
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>UserRegistrationPayload</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserRegistrationPayload} obj Optional instance to populate.
   * @return {module:model/UserRegistrationPayload} The populated <code>UserRegistrationPayload</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('corporation')) {
        obj['corporation'] = UserCorporation.constructFromObject(data['corporation']);
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = ApiClient.convertToType(data['password'], 'String');
      }
      if (data.hasOwnProperty('personal')) {
        obj['personal'] = UserPersonal.constructFromObject(data['personal']);
      }
      if (data.hasOwnProperty('source')) {
        obj['source'] = ApiClient.convertToType(data['source'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/UserCorporation} corporation
   */
  exports.prototype['corporation'] = undefined;
  /**
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * @member {String} password
   */
  exports.prototype['password'] = undefined;
  /**
   * @member {module:model/UserPersonal} personal
   */
  exports.prototype['personal'] = undefined;
  /**
   * @member {String} source
   */
  exports.prototype['source'] = undefined;



  module.exports = exports;



