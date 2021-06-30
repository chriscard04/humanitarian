import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { PagesService } from '../pages.service'
import { FormControl, Validators } from '@angular/forms';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.scss']
})
export class HistoriaComponent implements OnInit {
  loader: boolean;
  loading: boolean;
  myVariable: string;
  similarityPerc: number;
  assessSimilarity = new FormControl(95, Validators.min(50));

  slides = [
    { 'image': '../../../assets/banner_img/img1.jpg' },
    { 'image': '../../../assets/banner_img/img2.jpg' },
    { 'image': '../../../assets/banner_img/img3.jpg' },
  ]


  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];



  constructor(public pages: PagesService, public service: ListService) {
  }

  ngOnInit() {
    this.loading = false;
    this.pages.setLoader();
  }

  assessBeneficiaries() {
    this.loading = true;
    this.service.Get('assess-all?perc=' + (this.similarityPerc / 100)).subscribe((assess) => {
      console.log(assess)
      this.service.Get('processes/' + assess.id_process).subscribe((data) => {
        this.loading = false;
      });
    });
  }

}
