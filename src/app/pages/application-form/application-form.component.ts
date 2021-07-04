import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { AlertDialogComponent } from '../../../shared/alert_dialog/alert_dialog.component';
import { WebApi } from '../../security/_services/service';
import { GlobalFunctions } from '../../../shared/globalFunctions';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  public isUpdate: boolean = false;
  public row: any;
  public form: FormGroup;
  public data: any;

  public title = 'Nuevo registro';
  public previousRow = false;
  public nextRow = false;
  public message = {
    show: false,
    status: 'primary',
    text: ''
  };
  showLoading = false;
  public perfiles = [];
  public personas = [];
  public form_fields: any;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    private service: WebApi,
    private globalFunctions: GlobalFunctions,
  ) {

    this.form = this.fb.group({
      "position": [null, Validators.required],
      "name": [null, Validators.required],
      "identification": [null, Validators.required],
      "address": [null, Validators.required],
      "contact_number": [null, Validators.required],
      "email": [null, Validators.required],
      "travel": [false, Validators.required],
      "expected_salary": [null, Validators.required],
      "preferred_location": [null, Validators.required],
      "start_date": [new Date()],
      "questions": [null],
    });
  }

  ngOnInit(): void {
    /*     this.service.Get('perfiles').subscribe((result) => {
          this.perfiles = result;
        }); */
    let temp = this.globalFunctions.getFormFields();
  }

  public closeModal(): void {
    if (this.form.valid) {
      // this.dialogRef.close();
    }
  }

  public onSubmit(values: any, closeModal = false): void {
    this.showLoading = true;
    this.message.show = false;

    if (!this.form.valid) {
      this.globalFunctions.validateAllFormFields(this.form);

      this.message = this.globalFunctions.errorMessage();
      this.showLoading = false;
      return;
    }

    this.service.post('candidates', values).subscribe(result => {
      console.log(result);

      this.message = this.globalFunctions.successMessage();

      this.showLoading = false;

      this.form.reset();
      if (closeModal) {
        // this.dialogRef.close(this.data);
      }
    },
      error => {
        this.message = this.globalFunctions.errorMessage(error);

        this.showLoading = false;
      });
  }



  setValues(row) {
    this.form.controls['cod_usuario'].setValue(row.cod_usuario);
    this.form.controls['usuario_nombre'].setValue(row.usuario_nombre);
    this.form.controls['contrasena'].setValue(row.contrasena);
    this.form.controls['cod_perfil'].setValue(row.cod_perfil);
    this.form.controls['email'].setValue(row.email);
    this.form.controls['sn_activo'].setValue(row.sn_activo);
  }

  ngAfterViewInit() {
    //  this.settings.loadingSpinner = false;
    this.checkControlButtons();
  }

  checkControlButtons() {
    // ACTIVAR O DESACTIVAR BOTONES ATRAS Y SIGUIENTE
    const actualPosition = this.data.indexOf(this.row) + 1;
    const maxPosition = this.data.length;
    if (actualPosition === 1 && maxPosition === 1) {
      this.previousRow = true;
      this.nextRow = true;
    } else if (actualPosition > 1 && actualPosition < maxPosition) {
      this.previousRow = false;
      this.nextRow = false;
    } else if (actualPosition === 1 && actualPosition < maxPosition) {
      this.previousRow = true;
      this.nextRow = false;
    } else if (actualPosition === maxPosition && actualPosition > 1) {
      this.previousRow = false;
      this.nextRow = true;
    }
  }
}