import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class MiningService {

  constructor(
    private httpClient: HttpClient,
  private confirmationDialogService: ConfirmationDialogService
  ) { }
  
}
