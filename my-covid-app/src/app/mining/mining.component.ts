import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.css']
})
export class MiningComponent implements OnInit {

  constructor(
    // Inject your HTTP Client Service here
    //Class object name:
    private httpClient: HttpClient,

  )
 { }

  ngOnInit(): void {

      }
      mining: string = '';

       // related to mining component exercise 
  // Method with response data subscription and assign hello variable with response data
  // Get Method without Service
  public getBasicMiningSubscribe(): any {
    this.httpClient.get(`http://localhost:8091/covid/mining/my`, { responseType: 'text' })
      .subscribe((data: any) => 
                  {
                    // assign HTTP response with local variable
                    this.mining = data; 
                  }
                );   
  }

}
