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
    





  /**
   * The UserCorporation model module.
   * @module model/UserCorporation
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>UserCorporation</code>.
   * @alias module:model/UserCorporation
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>UserCorporation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserCorporation} obj Optional instance to populate.
   * @return {module:model/UserCorporation} The populated <code>UserCorporation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('company_name')) {
        obj['company_name'] = ApiClient.convertToType(data['company_name'], 'String');
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} company_name
   */
  exports.prototype['company_name'] = undefined;
  /**
   * @member {String} phone
   */
  exports.prototype['phone'] = undefined;



  module.exports = exports;



