import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalService } from '../../app/security/_services/localService';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {

    public userImage = '../assets/img/users/user.jpg';
    public ClientName: string;
    public UserName: string;
    private oCurrentUser = this.localService.getJsonValue('currentUser') ? JSON.parse(this.localService.getJsonValue('currentUser')): {user: {email: 'nuevo@usuario.com', username: 'Nuevo'}};

    constructor(
        public dialog: MatDialog,
        private localService: LocalService) {
    }

    ngOnInit() {
        this.ClientName = this.oCurrentUser.user.email;
        this.UserName = this.oCurrentUser.user.username;
    }
}
