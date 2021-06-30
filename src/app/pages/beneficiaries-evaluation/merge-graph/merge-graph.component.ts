import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-merge-graph',
    templateUrl: './merge-graph.component.html',
    styleUrls: ['./merge-graph.component.scss'],
})
export class MergeGraphComponent implements OnInit {
    sankey_title = 'Merging Chris';
    sankey_type = 'Sankey';
    sankey_data = [
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
    sankey_columnNames = ['From', 'To', 'Weight'];
    sankey_colors = [
        '#33a02c',
        '#1f78b4',
        '#a6cee3',
        '#b2df8a',
    ]

    sankey_options = {

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

    sankey_height = 200;
    sankey_width = 550;

    constructor() {
    };

    ngOnInit(): void {

    }

}