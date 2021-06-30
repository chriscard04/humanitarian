export class Activity {
    ID: string;
    info_ID: number;
    info_event_date: Date;
    info_report_date: Date;
    info_training: boolean;

    info_month_code: string;
    info_plan_ID: number;
    info_plan_title: string;
    info_activity_ID: number;
    info_activity_task: string;
    info_activity_title: string;

    list_beneficiaries: Array<string>;

    contructor() {
        this.ID = '';
        this.info_ID = 0;

        this.info_event_date = new Date();
        this.info_report_date = new Date();
        this.info_training = false;

        this.info_month_code = '';
        this.info_plan_ID = 0
        this.info_plan_title = '';
        this.info_activity_ID = 0
        this.info_activity_task = '';
        this.info_activity_title = '';

        this.list_beneficiaries = [];
    }
}



export class Beneficiary {
    id: string;
    ben_ID: number;
    ben_DNI: string;
    ben_first_name: string;
    ben_middle_name: string;
    ben_last_name1: string;
    ben_last_name2: string;
    ben_birthday: Date;
    ben_sex: string;
    ben_country: string;
    ben_beneficiary_type: string;
    duplicated_level: number;
    suggested_duplicates: JSON;
    info_activity_assitance: Array<string>;
    ben_community: string;
    group_id: string;

    contructor() {
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
        this.duplicated_level = 0
        this.suggested_duplicates = null;
        this.info_activity_assitance = [];
        this.ben_community = '';
        this.group_id = '';
    }
}