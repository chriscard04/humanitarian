import { Component, ViewEncapsulation, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { getLocaleDateFormat, NgStyle } from '@angular/common';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListService } from '../list.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MergeConfirmationComponent } from './merge-confirmation/merge-confirmation.component';
import { Activity, Beneficiary } from 'src/shared/shared-classess';

@Component({
  selector: 'app-ben-evaluation',
  templateUrl: './ben-evaluation.component.html',
  styleUrls: ['./ben-evaluation.component.scss']

})
export class BenEvaluationComponent implements OnInit, AfterViewInit {
  @ViewChild('myTable') table: DatatableComponent;
  @ViewChild('drawerActivities') drawerActivities: MatDrawer;
  @ViewChild('draweContent') draweContent: MatDrawerContent;

  funder = [];
  calculated = [];
  pending = [];
  groups = [];

  editing = {};
  rows = [];
  data = [];

  ColumnMode = ColumnMode;

  drawer_beneficiary: Beneficiary;
  drawer_activities: Array<Activity>;
  isEditable = {};
  merging = false;

  saveEnabled = false;
  showLoading = false;

  constructor(
    public dialog: MatDialog,
    public service: ListService,
    private _snackBar: MatSnackBar
  ) {
    this.drawer_beneficiary = new Beneficiary();
    this.drawer_activities = [];
    this.getData();
  }

  getData() {
    this.showLoading = true;
    this.service.Get('group-beneficiaries').subscribe((data) => {
      for (let item of data) {
        if (item.ben_birthday) {
          if (moment(new Date()).month() >= moment(item.ben_birthday).month()) {
            item.age = moment(new Date()).year() - moment(item.ben_birthday).year()
          } else {
            item.age = moment(new Date()).year() - moment(item.ben_birthday).year() - 1
          }
        }
        item.merging = false;
        item.separating = false;
        item.flagging = false;
        this.getDuplicatesQty(item);
      }
      this.rows = data;
      this.showLoading = false;
    });
  }


  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.table.groupHeader.toggleExpandGroup(this.table.bodyComponent.groupedRows[0]);
    }, 1500);
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

  updateValue(event, cell, rowIndex) {

    let _rowindex = [];
    _rowindex = rowIndex.split('-');

    console.log('Event>: ', event)
    console.log('Cell>: ', cell)
    console.log('rowIndex>: ', _rowindex[0], _rowindex[1])

    // this.editing[rowIndex + '-' + cell] = false;

    // console.table(this.rows[rowIndex][cell]);
    // this.rows[rowIndex][cell] = event.target.value;

    this.rows = [...this.rows];
  }

  toggleGroup(group) {
    // Collapse all open groups
    this.table.bodyComponent.rowExpansions.forEach(row => {
      this.table.groupHeader.toggleExpandGroup(row);
    });
    // open the current clicked group
    this.table.groupHeader.toggleExpandGroup(group);
  }

  saveMerge(group): void {
    const dialogRef = this.dialog.open(MergeConfirmationComponent, {
      data: group,
      width: '1300px',
      disableClose: true,
    });

    dialogRef.componentInstance.row = group;
    dialogRef.componentInstance.isUpdate = true;

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Result', result);
      this.getData()
    });


  }
  cancelMerge(group, event) {
    event.stopPropagation()
    this.table.groupHeader.toggleExpandGroup(group);
    /* 
    this._snackBar.open('Changes Canceled!', '', {
      duration: 4500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }); */
  }

  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }

  getDuplicatesQty(itemRow) {
    if (itemRow.suggested_duplicates) {
      itemRow.duplicates_qty = itemRow.suggested_duplicates.length;
    } else {
      itemRow.duplicates_qty = 0;
    }
  }

  checkGroup(event, row, rowIndex, group) {

    if (event != undefined) {

      /*   console.log("Event: ", event)
          console.log("Row: ", row)
          console.log("RIndex: ", rowIndex)
          console.log("Group: ", group)
       */
      if (event.checked) {
        if (event.source.id == 'merging' + rowIndex) {
          row.separating = false;
          row.flagging = false;
        } else if (event.source.id == 'separating' + rowIndex) {
          row.merging = false;
          row.flagging = false;
        } else {
          row.merging = false;
          row.separating = false;
        }
      }

      // Count check in a group
      let checkcount = 0;
      group.forEach(row => {
        if (row.separating == true || row.merging == true || row.flagging == true) {
          checkcount += 1;
        }
      });

      // Enable save in a group once the checks are complete within the group
      if (checkcount == group.length) {
        this.saveEnabled = true;
      } else {
        this.saveEnabled = false;
      }

    }
    /* 
    let groupStatus = 'Pending';
    let expectedPaymentDealtWith = true;

    row.exppayyes = 0;
    row.exppayno = 0;
    row.exppaypending = 0;

    if (event.target.checked) {
      if (event.target.value === '0') {
        // expected payment yes selected
        row.exppayyes = 1;
      } else if (event.target.value === '1') {
        // expected payment yes selected
        row.exppayno = 1;
      } else if (event.target.value === '2') {
        // expected payment yes selected
        row.exppaypending = 1;
      }
    }

    if (group.length === 2) {
      // There are only 2 lines in a group
      // tslint:disable-next-line:max-line-length
      if (
        ['Calculated', 'Funder'].indexOf(group[0].source) > -1 &&
        ['Calculated', 'Funder'].indexOf(group[1].source) > -1
      ) {
        // Sources are funder and calculated
        // tslint:disable-next-line:max-line-length
        if (group[0].startdate === group[1].startdate && group[0].enddate === group[1].enddate) {
          // Start dates and end dates match
          for (let index = 0; index < group.length; index++) {
            if (group[index].source !== row.source) {
              if (event.target.value === '0') {
                // expected payment yes selected
                group[index].exppayyes = 0;
                group[index].exppaypending = 0;
                group[index].exppayno = 1;
              }
            }

            if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0) {
              expectedPaymentDealtWith = false;
            }
            console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
          }
        }
      }
    } else {
      for (let index = 0; index < group.length; index++) {
        if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0) {
          expectedPaymentDealtWith = false;
        }
        console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
      }
    }

    // check if there is a pending selected payment or a row that does not have any expected payment selected
    if (
      group.filter(rowFilter => rowFilter.exppaypending === 1).length === 0 &&
      group.filter(rowFilter => rowFilter.exppaypending === 0 && rowFilter.exppayyes === 0 && rowFilter.exppayno === 0)
        .length === 0
    ) {
      console.log('expected payment dealt with');

      // check if can set the group status
      const numberOfExpPayYes = group.filter(rowFilter => rowFilter.exppayyes === 1).length;
      const numberOfSourceFunder = group.filter(rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Funder')
        .length;
      const numberOfSourceCalculated = group.filter(
        rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Calculated'
      ).length;
      const numberOfSourceManual = group.filter(rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Manual')
        .length;

      console.log('numberOfExpPayYes', numberOfExpPayYes);
      console.log('numberOfSourceFunder', numberOfSourceFunder);
      console.log('numberOfSourceCalculated', numberOfSourceCalculated);
      console.log('numberOfSourceManual', numberOfSourceManual);

      if (numberOfExpPayYes > 0) {
        if (numberOfExpPayYes === numberOfSourceFunder) {
          groupStatus = 'Funder Selected';
        } else if (numberOfExpPayYes === numberOfSourceCalculated) {
          groupStatus = 'Calculated Selected';
        } else if (numberOfExpPayYes === numberOfSourceManual) {
          groupStatus = 'Manual Selected';
        } else {
          groupStatus = 'Hybrid Selected';
        }
      }
    }

    group[0].groupstatus = groupStatus; */
  }

}