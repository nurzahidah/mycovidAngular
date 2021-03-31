import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';
import { BonusService } from '../bonus.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CovidApiService } from '../covidapi.service';

@Component({
  selector: 'app-bonus',
  providers: [BonusService, CovidApiService],
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  public covidTotalDaily: any;

  public covidTotalBonus: any[] = [];

  public bonus: any;

  public bonusObject: any;

  public newBonus: any;

  public updateBonus: any;

  public postBonus: any;
  
  constructor(
    private httpClient: HttpClient,
    public bonusService: BonusService,
    public covidApiService: CovidApiService,
    private confirmationDialogService: ConfirmationDialogService

  ) { }

  ngOnInit(): void {
    this.bonusObject = {}; //{} = creating new object
    this.updateBonus = {};
    this.postBonus = {};
    
    this.getCovidBonusDesc();
    this.getCovid();
    
    console.log("Covid Component Inited");
  }

  //display daily covid cases
  getCovid(): any {
    this.covidTotalDaily = this.covidApiService.getCovid().subscribe((data: any) => {
      console.log(data); this.covidTotalDaily = data;
    }
      ,
      (error: { error: { message: string; }; }) => {
        console.log(error);
        this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
      }
    );

    return this.covidTotalDaily;
  }

  //retrieve data in table trx_covid_case_bonus 
  getCovidBonusDesc(): any {
    this.bonusService.getCovidBonusDesc().subscribe((data: any) => {
      console.log(data);
      this.covidTotalBonus = data;
      console.log("Total of Description Table Rows --->" + this.covidTotalBonus.length);
    });

    return this.covidTotalBonus;
  }
 
  onSelectBonus(bonus: any) {

    console.log("bonus-->" + this.bonus);
    if (this.bonus[0]) {
      this.bonusObject = this.bonus[0];
      console.log("bonus id-->" + this.bonusObject.id);
      console.log("bonus description-->" + this.bonusObject.description);
    }
  }

   //delete data in table trx_covid_case_bonus 
  deleteBonus() {
    console.log("covidTotalBonus length-->" + this.covidTotalBonus.length);

    if (this.covidTotalBonus.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.bonusService.deleteBonus(this.bonusObject.id).then(
        resolve => {
          this.getCovidBonusDesc();
        });
    }


  }
  addBonus() {
    this.bonusService.addBonus(this.newBonus).then(
      resolve => {
        this.getCovidBonusDesc();
      });
  }

  onSelectUpdateBonus(desc: any) {

    console.log("updateBonus-->" + this.updateBonus);
    if (this.bonus[0]) {
    
      let clonedBonus = Object.assign({}, this.bonus[0]);
      // use a new cloned Object to prevent pass by reference value in the class
      this.updateBonus = clonedBonus;
      console.log("updateBonus id-->" + this.updateBonus.id);
      console.log("updateBonus description-->" + this.updateBonus.description);
    }
  }

 //update data
  putBonus() {

    this.bonusService.putBonus(this.updateBonus).then(
      resolve => {
        this.getCovidBonusDesc();
      });
  }

  //add post data
addPostBonus() {

  this.bonusService.addPostBonus(this.postBonus).then(
    resolve => {

  //if the method below being called using async way,then the table desc wont be updated 
  //accordingly after data added
  this.getCovidBonusDesc();
});
}

//delete data with condition
deleteCovidSoap() {

  console.log("covidTotalBonus length-->" + this.covidTotalBonus.length);

    if (this.covidTotalBonus.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.bonusService.deleteCovidSoap(this.bonusObject.bonus).then(
        resolve => {
          this.getCovidBonusDesc();
        });
    }
}
}
