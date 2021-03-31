import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CovidComponent } from '../covid/covid.component';
import { CovidApiService } from '../covidapi.service';

@Component({
  selector: 'app-covid-delete',
  providers: [CovidApiService],
  styleUrls: ['../share/share.component.css'],
  templateUrl: './covid-delete.component.html'
  
})
export class CovidDeleteComponent implements OnInit {

  public desc: any;

  public descObject: any;

  constructor(
    private httpClient: HttpClient,
    public covidApiService: CovidApiService,
    public covidComponent: CovidComponent,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {

    this.descObject = {};
  }

  deleteCovidSoap() {

    console.log("covidTotalDesc length-->" + this.covidComponent.covidTotalDesc.length);
  
      if (this.covidComponent.covidTotalDesc.length == 0) {
        this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
      }
      else {
        this.covidApiService.deleteCovidSoap(this.descObject.desc).then(
          resolve => {
            this.covidComponent.getCovidDesc();
          });
      }
  }
  
  //Delete Duplicate Description
  deleteDuplicateDesc(){
  
        this.covidApiService.deleteDuplicateDesc().then(
          resolve => {
            this.covidComponent.getCovidDesc();
          });
      
  }
}
