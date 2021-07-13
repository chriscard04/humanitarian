"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var flex_layout_1 = require("@angular/flex-layout");
var forms_1 = require("@angular/forms");
// Translate
var core_2 = require("@ngx-translate/core");
// Additional components
/* import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel'; */
var core_3 = require("@angular/material/core");
//Angular Material Components
var checkbox_1 = require("@angular/material/checkbox");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var autocomplete_1 = require("@angular/material/autocomplete");
var datepicker_1 = require("@angular/material/datepicker");
var form_field_1 = require("@angular/material/form-field");
var radio_1 = require("@angular/material/radio");
var select_1 = require("@angular/material/select");
var slider_1 = require("@angular/material/slider");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var menu_1 = require("@angular/material/menu");
var sidenav_1 = require("@angular/material/sidenav");
var toolbar_1 = require("@angular/material/toolbar");
var list_1 = require("@angular/material/list");
var grid_list_1 = require("@angular/material/grid-list");
var card_1 = require("@angular/material/card");
var stepper_1 = require("@angular/material/stepper");
var tabs_1 = require("@angular/material/tabs");
var expansion_1 = require("@angular/material/expansion");
var button_toggle_1 = require("@angular/material/button-toggle");
var chips_1 = require("@angular/material/chips");
var icon_1 = require("@angular/material/icon");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var progress_bar_1 = require("@angular/material/progress-bar");
var dialog_1 = require("@angular/material/dialog");
var tooltip_1 = require("@angular/material/tooltip");
var snack_bar_1 = require("@angular/material/snack-bar");
var table_1 = require("@angular/material/table");
var sort_1 = require("@angular/material/sort");
var paginator_1 = require("@angular/material/paginator");
var badge_1 = require("@angular/material/badge");
var confirmation_dialog_component_1 = require("./confirmation_dialog/confirmation_dialog.component");
var alert_dialog_component_1 = require("./alert_dialog/alert_dialog.component");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
// Google Chart
var angular_google_charts_1 = require("angular-google-charts");
var uppercase_directive_1 = require("././directives/uppercase.directive");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: []
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                checkbox_1.MatCheckboxModule,
                checkbox_1.MatCheckboxModule,
                button_1.MatButtonModule,
                input_1.MatInputModule,
                autocomplete_1.MatAutocompleteModule,
                datepicker_1.MatDatepickerModule,
                core_3.MatNativeDateModule,
                form_field_1.MatFormFieldModule,
                radio_1.MatRadioModule,
                select_1.MatSelectModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                menu_1.MatMenuModule,
                sidenav_1.MatSidenavModule,
                toolbar_1.MatToolbarModule,
                list_1.MatListModule,
                grid_list_1.MatGridListModule,
                card_1.MatCardModule,
                stepper_1.MatStepperModule,
                tabs_1.MatTabsModule,
                expansion_1.MatExpansionModule,
                button_toggle_1.MatButtonToggleModule,
                chips_1.MatChipsModule,
                icon_1.MatIconModule,
                progress_spinner_1.MatProgressSpinnerModule,
                progress_bar_1.MatProgressBarModule,
                dialog_1.MatDialogModule,
                tooltip_1.MatTooltipModule,
                snack_bar_1.MatSnackBarModule,
                table_1.MatTableModule,
                sort_1.MatSortModule,
                paginator_1.MatPaginatorModule,
                badge_1.MatBadgeModule,
                ngx_datatable_1.NgxDatatableModule,
                angular_google_charts_1.GoogleChartsModule,
                // MatCarouselModule,
                core_2.TranslateModule
            ],
            exports: [
                flex_layout_1.FlexLayoutModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                checkbox_1.MatCheckboxModule,
                checkbox_1.MatCheckboxModule,
                button_1.MatButtonModule,
                input_1.MatInputModule,
                autocomplete_1.MatAutocompleteModule,
                datepicker_1.MatDatepickerModule,
                form_field_1.MatFormFieldModule,
                radio_1.MatRadioModule,
                select_1.MatSelectModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                menu_1.MatMenuModule,
                sidenav_1.MatSidenavModule,
                toolbar_1.MatToolbarModule,
                list_1.MatListModule,
                grid_list_1.MatGridListModule,
                card_1.MatCardModule,
                stepper_1.MatStepperModule,
                tabs_1.MatTabsModule,
                expansion_1.MatExpansionModule,
                button_toggle_1.MatButtonToggleModule,
                chips_1.MatChipsModule,
                icon_1.MatIconModule,
                progress_spinner_1.MatProgressSpinnerModule,
                progress_bar_1.MatProgressBarModule,
                dialog_1.MatDialogModule,
                tooltip_1.MatTooltipModule,
                snack_bar_1.MatSnackBarModule,
                table_1.MatTableModule,
                sort_1.MatSortModule,
                paginator_1.MatPaginatorModule,
                badge_1.MatBadgeModule,
                confirmation_dialog_component_1.ConfirmationDialogComponent,
                ngx_datatable_1.NgxDatatableModule,
                angular_google_charts_1.GoogleChartsModule,
                /*     MatCarouselModule,
                    MatCarouselComponent, */
                core_2.TranslateModule,
                uppercase_directive_1.UppercaseDirective
            ],
            declarations: [
                confirmation_dialog_component_1.ConfirmationDialogComponent,
                alert_dialog_component_1.AlertDialogComponent,
                uppercase_directive_1.UppercaseDirective
            ],
            entryComponents: [
                alert_dialog_component_1.AlertDialogComponent,
            ],
            providers: [
                datepicker_1.MatDatepickerModule,
                core_3.MatNativeDateModule
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
