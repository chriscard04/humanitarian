import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebApi } from '../../security/_services/service';
import { GlobalFunctions } from '../../../shared/globalFunctions';
import { Education } from '../../../shared/models/form-application'

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  public isUpdate: boolean = false;
  public row: any;
  public mainForm: FormGroup;
  public data: any;
  public appearance = 'fill'

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

    this.mainForm = this.fb.group({
      "position": [null],
      "name": [null, Validators.required],
      "identification": [null],
      "address": [null],
      "contact_numbers": [null],
      "email": [null, Validators.compose([Validators.email, Validators.required])],
      "education": this.fb.array([]),
      "travel": [false],
      "expected_salary": [null],
      "preferred_location": [null],
      "start_date": [new Date()],
      "questions": [null],
    });

  }

  ngOnInit(): void {
    /*     this.service.Get('perfiles').subscribe((result) => {
      this.perfiles = result;
    }); */
    this.addEducation();
  }

  /* EDUCATION */

  education(): FormArray {
    return this.mainForm.get("education") as FormArray
  }

  newEducation(): FormGroup {
    return this.fb.group({
      e_degree: [null, Validators.required],
      e_title: [null, Validators.required],
      e_year: [null, Validators.required],
    });
  }

  addEducation() {
    this.education().push(this.newEducation());
  }

  removeEducation(i: number) {
    this.education().removeAt(i);
  }

  /* / EDUCATION */




  public closeModal(): void {
    if (this.mainForm.valid) {
      // this.dialogRef.close();
    }
  }

  public onSubmit(values: any, closeModal = false): void {
    this.showLoading = true;
    this.message.show = false;

    if (!this.mainForm.valid) {
      this.globalFunctions.validateAllFormFields(this.mainForm);

      this.message = this.globalFunctions.errorMessage();
      this.showLoading = false;
      return;
    }

    // values.education = { degree: values.education }
    this.service.post('candidates', values).subscribe(result => {
      console.log(result);

      this.message = this.globalFunctions.successMessage();

      this.showLoading = false;

      this.mainForm.reset();
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
    this.mainForm.controls['cod_usuario'].setValue(row.cod_usuario);
    this.mainForm.controls['usuario_nombre'].setValue(row.usuario_nombre);
    this.mainForm.controls['contrasena'].setValue(row.contrasena);
    this.mainForm.controls['cod_perfil'].setValue(row.cod_perfil);
    this.mainForm.controls['email'].setValue(row.email);
    this.mainForm.controls['sn_activo'].setValue(row.sn_activo);
  }

  ngAfterViewInit() {
    //  this.settings.loadingSpinner = false;
    // this.checkControlButtons();
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