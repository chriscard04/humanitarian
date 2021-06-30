"use strict";
exports.__esModule = true;
exports.Beneficiary = exports.Activity = void 0;
var Activity = /** @class */ (function () {
    function Activity() {
    }
    Activity.prototype.contructor = function () {
        this.ID = '';
        this.info_ID = 0;
        this.info_event_date = new Date();
        this.info_report_date = new Date();
        this.info_training = false;
        this.info_month_code = '';
        this.info_plan_ID = 0;
        this.info_plan_title = '';
        this.info_activity_ID = 0;
        this.info_activity_task = '';
        this.info_activity_title = '';
        this.list_beneficiaries = [];
    };
    return Activity;
}());
exports.Activity = Activity;
var Beneficiary = /** @class */ (function () {
    function Beneficiary() {
    }
    Beneficiary.prototype.contructor = function () {
        this.id = '';
        this.ben_ID = 0;
        this.ben_DNI = '';
        this.ben_first_name = '';
        this.ben_middle_name = '';
        this.ben_last_name1 = '';
        this.ben_last_name2 = '';
        this.ben_birthday = new Date();
        this.ben_sex = '';
        this.ben_country = '';
        this.ben_beneficiary_type = '';
        this.duplicated_level = 0;
        this.suggested_duplicates = null;
        this.info_activity_assitance = [];
        this.ben_community = '';
        this.group_id = '';
    };
    return Beneficiary;
}());
exports.Beneficiary = Beneficiary;
