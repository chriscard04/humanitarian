"use strict";
exports.__esModule = true;
exports.routing = exports.routes = void 0;
var router_1 = require("@angular/router");
var pages_component_1 = require("../app/pages/pages.component");
var error_component_1 = require("../app/pages/others/errors/error/error.component");
var not_found_component_1 = require("../app/pages/others/errors/not-found/not-found.component");
var auth_guard_1 = require("./security/_guards/auth.guard");
exports.routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        data: { title: 'Inicio' },
        component: pages_component_1.PagesComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/home/home.module'); }).then(function (m) { return m.HomeModule; }); }
            },
        ]
    },
    {
        path: 'application-form',
        data: { title: 'Application Form' },
        component: pages_component_1.PagesComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/application-form/application-form.module'); }).then(function (m) { return m.ApplicationFormModule; }); }
            },
        ]
    },
    {
        path: 'about',
        data: { title: 'Acerca de' },
        component: pages_component_1.PagesComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                data: {},
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/about/about.module'); }).then(function (m) { return m.AboutModule; }); }
            },
        ]
    },
    // ------------------------------------------------- Redirect Routes
    {
        path: 'inicio', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'acerca', redirectTo: 'about', pathMatch: 'full'
    },
    // ------------------------------------------------- Other Modules
    {
        path: 'blank',
        data: { title: 'En Blanco' },
        component: pages_component_1.PagesComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: '',
                loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/pages/others/blank/blank.module'); }).then(function (m) { return m.BlankModule; }); }
            },
        ]
    },
    // Login
    {
        path: 'login',
        loadChildren: function () { return Promise.resolve().then(function () { return require('src/app/security/login/login.module'); }).then(function (m) { return m.LoginModule; }); }
    },
    // Additionals
    { path: 'error', component: error_component_1.ErrorComponent, data: { title: 'Error' } },
    { path: '**', component: not_found_component_1.NotFoundComponent, data: { title: 'Página no encontrada' } },
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, {
    preloadingStrategy: router_1.PreloadAllModules,
    relativeLinkResolution: 'legacy'
});
