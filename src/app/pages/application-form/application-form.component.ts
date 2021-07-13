import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebApi } from '../../security/_services/service';
import { GlobalFunctions } from '../../../shared/globalFunctions';
import { Education } from '../../../shared/models/form-application'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger, { static: false }) trigger: MatAutocompleteTrigger;


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
  public countries: Country[] = [];
  public countries_filtered: Observable<Country[]>;
  public form_fields: any;
  public passportFile: File = null;
  public visaFile: File = null;
  public pictureFile: File = null;
  public minDate: Date;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    private service: WebApi,
    private globalFunctions: GlobalFunctions,
  ) {

    this.minDate = new Date()
    this.mainForm = this.fb.group({
      "position": [null],
      "name": [null, Validators.required],
      "identification": [null, Validators.required],
      "address": [null, Validators.required],
      "contact_numbers": [null],
      "email": [null, Validators.compose([Validators.email, Validators.required])],
      "education": this.fb.array([]),
      "work_experience": this.fb.array([]),
      "thematic_experience": this.fb.array([]),
      "consultancies": this.fb.array([]),
      "global_awards": this.fb.array([]),
      "languages": this.fb.array([]),
      "travel": [false],
      "expected_salary": [null, Validators.required],
      "preferred_location": [null],
      "start_date": [new Date()],
      "questions": [null]
    });
    this.countries = this.globalFunctions.getAllCountries();
    this.mainForm.controls['preferred_location'].setValue(this.globalFunctions.getCountryByISO(this.service.getIPLocation()))

  }

  ngOnInit(): void {
    /*     this.service.Get('perfiles').subscribe((result) => {
      this.perfiles = result;
    }); */
    this.addEducation();
    this.addWorkExperience();
    this.addThematicExperience();
    this.addConsultancies();
    this.addLanguages();

    this.countries_filtered = this.mainForm.controls['preferred_location'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit() {
    //  this.settings.loadingSpinner = false;
    // this.checkControlButtons();

    this.trigger.panelClosingActions.subscribe(() => {
      this.mainForm.controls['preferred_location'].setValue(this.trigger.activeOption.value);
    });

  }


  private _filter(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().includes(filterValue));
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

  /* WORK EXPERIENCE */
  work_experience(): FormArray {
    return this.mainForm.get("work_experience") as FormArray
  }
  newWorkExperience(): FormGroup {
    return this.fb.group({
      w_country: [null, Validators.required],
      w_area: [null],
    });
  }
  addWorkExperience() {
    this.work_experience().push(this.newWorkExperience());
  }
  removeWorkExperience(i: number) {
    this.work_experience().removeAt(i);
  }
  /* / WORK EXPERIENCE  */

  /* THEMATIC EXPERIENCE */
  thematic_experience(): FormArray {
    return this.mainForm.get("thematic_experience") as FormArray
  }
  newThematicExperience(): FormGroup {
    return this.fb.group({
      t_area: [null, Validators.required],
      t_project: [null, Validators.required],
      t_position: [null],
    });
  }
  addThematicExperience() {
    this.thematic_experience().push(this.newThematicExperience());
  }
  removeThematicExperience(i: number) {
    this.thematic_experience().removeAt(i);
  }
  /* / THEMATIC EXPERIENCE  */

  /* CONSULTANCIES */
  consultancies(): FormArray {
    return this.mainForm.get("consultancies") as FormArray
  }
  newConsultancy(): FormGroup {
    return this.fb.group({
      c_years: [null, Validators.required],
      c_contributions: [null],
      c_institution: [null]
    });
  }
  addConsultancies() {
    this.consultancies().push(this.newConsultancy());
  }
  removeConsultancies(i: number) {
    this.consultancies().removeAt(i);
  }
  /* / CONSULTANCIES  */

  /* LANGUAGES */
  languages(): FormArray {
    return this.mainForm.get("languages") as FormArray
  }
  newLanguage(): FormGroup {
    return this.fb.group({
      l_language: [null, Validators.required],
      l_level: [null, Validators.required],
    });
  }
  addLanguages() {
    this.languages().push(this.newLanguage());
  }
  removeLanguages(i: number) {
    this.languages().removeAt(i);
  }
  /* / LANGUAGES  */




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

      setTimeout(() => {
        this.message.show = false;
      }, 3500);

      return;
    }

    const formData = new FormData();

    formData.append("data", JSON.stringify(values));
    if (this.passportFile) {
      formData.append("files.passport", this.passportFile);
    }

    if (this.visaFile) {
      formData.append("files.visa", this.visaFile);
    }

    if (this.pictureFile) {
      formData.append("files.picture", this.pictureFile);
    }

    // values.education = { degree: values.education }
    this.service.post('candidates', formData).subscribe(result => {
      console.log(result);

      this.message = this.globalFunctions.successMessage();

      this.showLoading = false;
      setTimeout(() => {
        this.message.show = false;
        this.router.navigate(['home']);
      }, 3500);

      this.mainForm.reset();
      if (closeModal) {
        // this.dialogRef.close(this.data);
      }
    },
      error => {
        this.message = this.globalFunctions.errorMessage(error);
        setTimeout(() => {
          this.message.show = false;
        }, 3500);
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

interface Country {
  name: string,
  code: string
}