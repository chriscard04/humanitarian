"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MergeGraphComponent = void 0;
var core_1 = require("@angular/core");
var MergeGraphComponent = /** @class */ (function () {
    function MergeGraphComponent() {
        this.sankey_title = 'Merging Chris';
        this.sankey_type = 'Sankey';
        this.sankey_data = [
            ["Chris", "Cod 1.1.1", 1],
            ["Cod 1.1.1", "Christofher", 1],
            ["Christian", "Cod 1.1.1", 1],
            ["Cod 1.1.1", "Christofher", 1],
            ["Cris", "Cod 1.1.1", 1],
            ["Cod 1.1.1", "Christofher", 1],
            ["Cris", "Cod 1.1.3", 1],
            ["Cod 1.1.3", "Christofher", 1],
            ["John", "Cod 1.1.7", 1],
            ["Cod 1.1.7", "Christofher", 1],
            ["Javier", "Cod 1.1.8", 1],
            ["Cod 1.1.8", "Christofher", 1],
        ];
        this.sankey_columnNames = ['From', 'To', 'Weight'];
        this.sankey_colors = [
            '#33a02c',
            '#1f78b4',
            '#a6cee3',
            '#b2df8a',
        ];
        this.sankey_options = {
            sankey: {
                node: {
                    colors: this.sankey_colors,
                    label: {
                        fontName: 'Arial Nova',
                        fontSize: 14,
                        color: 'Black',
                        bold: true,
                        italic: false
                    },
                    width: 10
                },
                link: {
                    colorMode: 'gradient',
                    colors: this.sankey_colors
                }
            }
        };
        this.sankey_height = 200;
        this.sankey_width = 550;
    }
    ;
    MergeGraphComponent.prototype.ngOnInit = function () {
    };
    MergeGraphComponent = __decorate([
        core_1.Component({
            selector: 'app-merge-graph',
            templateUrl: './merge-graph.component.html',
            styleUrls: ['./merge-graph.component.scss']
        })
    ], MergeGraphComponent);
    return MergeGraphComponent;
}());
exports.MergeGraphComponent = MergeGraphComponent;
