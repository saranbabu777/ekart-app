import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.scss' ]
})
export class MessagesComponent implements OnInit {

  public message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<MessagesComponent>) {
    this.message = data;
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
