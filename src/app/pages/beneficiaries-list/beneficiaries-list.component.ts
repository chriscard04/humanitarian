import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ListService } from '../list.service';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { WebApi } from 'src/app/security/_services/service';
import { AddComponent } from './add/add.component';
import { ConfirmationDialogComponent } from 'src/shared/confirmation_dialog/confirmation_dialog.component';
import { Activity, Beneficiary } from 'src/shared/shared-classess';
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-beneficiaries-list',
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.scss'],
})
export class BeneficiariesListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('drawerActivities') drawerActivities: MatDrawer;
  @ViewChild('draweContent') draweContent: MatDrawerContent;

  loadingIndicator = true;
  rows = [];
  data = [];
  temp = [];

  count_unique = 0;
  count_review = 0;
  count_possibles = 0;
  total_beneficiaries = 0;

  public message = {
    show: false,
    status: 'warn',
    text: '',
  };
  showLoading = false;
  drawer_activities: Array<Activity>;
  drawer_beneficiary: Beneficiary;

  rowSelected = [];

  /* Filters */
  filterName = '';
  filterLastName = '';

  constructor(
    public dialog: MatDialog,
    public service: ListService,
  ) {
    this.drawer_beneficiary = new Beneficiary();
    this.drawer_activities = [];
    this.getData();
  }

  ngOnInit() { }

  getData() {
    this.showLoading = true;
    this.service.Get('beneficiaries').subscribe((data) => {
      for (let item of data) {
        item.duplicated_level == 0 ? this.count_unique += 1 : false;
        item.duplicated_level == 1 ? this.count_review += 1 : false;
      }

      this.service.Get('beneficiaries/count').subscribe((data) => {
        this.total_beneficiaries = data;
      });

      this.temp = [...data];
      this.rows = data;
      this.data = data;
      this.showLoading = false;
    });


    /*     this.service.Get('pla_bancos').subscribe((data) => {
          this.temp = [...data];
          this.rows = data;
          this.data = data;
        }); */
  }

  openDrawerActivities(data) {
    this.drawer_activities = []
    !this.drawerActivities.opened ? this.drawerActivities.open() : false;
    this.drawer_beneficiary = data;
    console.table(data)
    this.drawer_beneficiary.info_activity_assitance.forEach(id_activity => {
      this.service.Get('infoactivities/' + id_activity).subscribe((data) => {
        this.drawer_activities.push(data);
      });

    });


    console.log(this.drawer_beneficiary.info_activity_assitance)

    setTimeout(() => {
      this.table.recalculateColumns();
      this.table.recalculate();
      this.table.resize;
    }, 500);
  }

  closeDrawerActivities() {
    this.drawerActivities.opened ? this.drawerActivities.close() : false;
    setTimeout(() => {
      this.table.recalculateColumns();
      this.table.recalculate();
      this.table.resize;
    }, 500);
  }


  onSelect({ selected }) {
    console.log('Select Event', selected, 'Row', this.rowSelected);
    if (selected) {
      this.rowSelected.splice(0, this.rowSelected.length);
      this.rowSelected.push(...selected);
      this.drawerActivities.opened ? this.openDrawerActivities(selected[0]) : false;
    }
  }


  filterByColumn(event, colName) {
    this.data = this.rows;

    if (event.target.value) {
      // get the value of the key pressed and make it lowercase
      const val = event.target.value.toLowerCase();
      // get the amount of columns in the table
      const colsAmt = Object.keys(this.rows[0]).length - 1;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.rows[0]);

      // assign filtered matches to the active datatable
      this.data = this.rows.filter(function (item) {
        // verify the data is not empty to .toString
        if (item[colName] !== null && item[colName] !== undefined) {
          // check for a match
          if (
            item[colName].toString().toLowerCase().indexOf(val) !== -1 ||
            !val
          ) {
            // found match, return true to add to result set
            return true;
          }
        }

      });
    }
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  filterDatatable(event) {
    this.data = this.rows;

    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = Object.keys(this.rows[0]).length - 1;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.rows[0]);
    // assign filtered matches to the active datatable
    this.data = this.rows.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // verify the data is not empty to .toString
        if (item[keys[i]] !== null && item[keys[i]] !== undefined) {
          // check for a match
          if (
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
            !val
          ) {
            // found match, return true to add to result set
            return true;
          }
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  add(): void {
    this.message.show = false;
    const dialogRef = this.dialog.open(AddComponent, {
      data: this.data,
      width: '1300px',
      disableClose: true,
    });

    dialogRef.componentInstance.row = null;
    dialogRef.componentInstance.isUpdate = false;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === null || result === undefined) {
        this.rows = [...this.rows];
      } else {
        this.rows = [...result];
      }

      this.data = this.rows;
    });
  }

  newMerge() {
    let _tempSelectedId = [];

    this.rowSelected.forEach(rowSel => {
      _tempSelectedId.push(rowSel.id);
    });

    this.service.Post('assess-manual?perc=' + 0, { selectedben: _tempSelectedId }).subscribe((data) => {
      console.log("data: ", data)
    });

  }


  update(row): void {/* 
    if (this.showLoading) {
      return;
    }

    this.message.show = false;
    const dialogRef = this.dialog.open(AddComponent, {
      data: this.data,
      width: '1300px',
      disableClose: true,
    });

    dialogRef.componentInstance.row = row;
    dialogRef.componentInstance.isUpdate = true;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === null || result === undefined) {
        this.rows = [...this.rows];
      } else {
        this.rows = [...result];
      }
      this.data = this.rows;
    }); */
  }

  delete(row) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: row.nombre_banco,
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === null || result === undefined) {
        this.rows = [...this.rows];
      } else {
        this.showLoading = true;
        /*         this.service.Delete('pla_bancos', row.idreg_banco).subscribe((data) => {
                  this.message = {
                    show: true,
                    status: 'warn',
                    text: 'Se ha eliminado ' + row.nombre_banco,
                  };
        
                  const index = this.rows.indexOf(row);
                  if (index > -1) {
                    this.rows.splice(index, 1);
                  }
        
                  this.rows = [...this.rows];
        
                  this.data = this.rows;
        
                  this.showLoading = false;
                }); */
      }
    });
  }
}

export class scheduleModel {
  hour: string;
  program: string;
  title: string;
  badge: string;
  length: string;

  constructor() {
    this.hour = '';
    this.program = '';
    this.title = '';
    this.length = '';
    this.badge = '';
  }
}
