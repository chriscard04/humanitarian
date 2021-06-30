import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public form: FormGroup;
    public settings: Settings;
    returnUrl: string;
    error = '';

    constructor(public appSettings: AppSettings,
        public fb: FormBuilder,
        private route: ActivatedRoute,
        public router: Router,
        public snackBar: MatSnackBar,
        private authenticationService: AuthenticationService) {
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'username': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([Validators.required])]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }

    public onSubmit(values: any): void {
        if (this.form.invalid) {
            return;
        }

        // Auth Call to API
        this.authenticationService.login({ 'identifier': values.username, 'password': values.password })
            .subscribe(
                data => {
                    if (data.user.confirmed || data.jwt || !data.user.blocked) {
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.snackBar.open('Usuario o contraseña inválida.', '', {
                            duration: 8000,
                        });
                    }
                },
                error => {
                    this.snackBar.open(error[0].messages[0].message, '', {
                        duration: 8000,
                    });
                });
    }
}