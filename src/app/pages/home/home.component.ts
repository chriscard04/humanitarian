import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { PagesService } from '../pages.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loader: boolean;
  loading: boolean;
  myVariable: string;
  similarityPerc: number;
  assessSimilarity = new FormControl(95, Validators.min(50));

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
