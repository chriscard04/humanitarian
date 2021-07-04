"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import { AppService } from 'app/core/services/app.services';
var PagesComponent = /** @class */ (function () {
    function PagesComponent(_appSettings, _router, _pages, translate
    // private _menuService: MenuService,
    // private _service: AppService
    ) {
        this._appSettings = _appSettings;
        this._router = _router;
        this._pages = _pages;
        this.translate = translate;
        this.menus = ['vertical', 'horizontal'];
        this.menuTypes = ['default', 'compact', 'mini'];
        this.isStickyMenu = false;
        this.lastScrollTop = 0;
        this.showBackToTop = false;
        this.toggleSearchBar = false;
        this.settings = this._appSettings.settings;
    }
    PagesComponent.prototype.ngOnInit = function () {
        this.loader = this._pages.getLoader();
        if (window.innerWidth <= 768) {
            this.settings.menu = 'vertical';
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
        }
        this.menuOption = this.settings.menu;
        this.menuTypeOption = this.settings.menuType;
        this.defaultMenu = this.settings.menu;
        this.selectedValue = 'en';
        this.translate.setDefaultLang(this.selectedValue);
        /*     const clientObservable = this._service.getClientName();
            clientObservable.subscribe((data: any) => {
              this.ClientName = data.ClientName;
              this.UserName = data.UserName;
            }); */
    };
    PagesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._pages.setLoader();
        this._pages.setDrawer(this.drawer);
        setTimeout(function () {
            _this.settings.loadingSpinner = false;
        }, 1500);
        this._router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                if (!_this.settings.sidenavIsPinned) {
                    _this.sidenav.close();
                }
                if (window.innerWidth <= 768) {
                    _this.sidenav.close();
                }
            }
        });
        // if (this.settings.menu === 'vertical') this._menuService.expandActiveSubMenu(this._menuService.getMenuItems());
    };
    PagesComponent.prototype.chooseMenu = function () {
        this.settings.menu = this.menuOption;
        this.defaultMenu = this.menuOption;
        this._router.navigate(['/']);
    };
    PagesComponent.prototype.chooseMenuType = function () {
        this.settings.menuType = this.menuTypeOption;
    };
    PagesComponent.prototype.changeTheme = function (theme) {
        this.settings.theme = theme;
    };
    PagesComponent.prototype.toggleSidenav = function () {
        this.sidenav.toggle();
    };
    PagesComponent.prototype.onPsScrollY = function (event) {
        this.scrolledContent = event.target;
        this.scrolledContent.scrollTop > 300 ? (this.showBackToTop = true) : (this.showBackToTop = false);
        if (this.settings.menu == 'horizontal') {
            if (this.settings.fixedHeader) {
                var currentScrollTop = this.scrolledContent.scrollTop > 56 ? this.scrolledContent.scrollTop : 0;
                currentScrollTop > this.lastScrollTop ? (this.isStickyMenu = true) : (this.isStickyMenu = false);
                this.lastScrollTop = currentScrollTop;
            }
            else {
                this.scrolledContent.scrollTop > 56 ? (this.isStickyMenu = true) : (this.isStickyMenu = false);
            }
        }
    };
    PagesComponent.prototype.scrollToTop = function () {
        var _this = this;
        var scrollDuration = 200;
        var scrollStep = -this.scrolledContent.scrollTop / (scrollDuration / 20);
        var scrollInterval = setInterval(function () {
            if (_this.scrolledContent.scrollTop != 0) {
                _this.scrolledContent.scrollBy(0, scrollStep);
            }
            else {
                clearInterval(scrollInterval);
            }
        }, 10);
        if (window.innerWidth <= 768) {
            this.scrolledContent.scrollTop = 0;
        }
    };
    PagesComponent.prototype.onWindowResize = function () {
        if (window.innerWidth <= 768) {
            this.settings.sidenavIsOpened = false;
            this.settings.sidenavIsPinned = false;
            this.settings.menu = 'vertical';
        }
        else {
            this.defaultMenu == 'horizontal' ? (this.settings.menu = 'horizontal') : (this.settings.menu = 'vertical');
            this.settings.sidenavIsOpened = true;
            this.settings.sidenavIsPinned = true;
        }
    };
    PagesComponent.prototype.closeSubMenus = function () {
        var menu = document.querySelector('.sidenav-menu-outer');
        if (menu) {
            for (var i = 0; i < menu.children[0].children.length; i++) {
                var child = menu.children[0].children[i];
                if (child) {
                    if (child.children[0].classList.contains('expanded')) {
                        child.children[0].classList.remove('expanded');
                        child.children[1].classList.remove('show');
                    }
                }
            }
        }
    };
    PagesComponent.prototype.getClient = function (clientName) {
        this.ClientName = clientName;
    };
    PagesComponent.prototype.useLanguage = function (language) {
        this.translate.use(language);
    };
    __decorate([
        core_1.ViewChild('sidenav')
    ], PagesComponent.prototype, "sidenav");
    __decorate([
        core_1.ViewChild('drawer')
    ], PagesComponent.prototype, "drawer");
    __decorate([
        core_1.ViewChild('tooltip')
    ], PagesComponent.prototype, "tooltip");
    __decorate([
        core_1.HostListener('window:resize')
    ], PagesComponent.prototype, "onWindowResize");
    PagesComponent = __decorate([
        core_1.Component({
            selector: 'app-pages',
            templateUrl: './pages.component.html',
            styleUrls: ['./pages.component.scss']
        })
    ], PagesComponent);
    return PagesComponent;
}());
exports.PagesComponent = PagesComponent;
