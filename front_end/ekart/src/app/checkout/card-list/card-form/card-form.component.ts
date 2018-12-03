import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: [ './card-form.component.scss' ]
})
export class CardFormComponent implements OnInit {

  public cardTypes = [ 'Credit card', 'Debit card' ];
  public expiryMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() cardForm: FormGroup;

  constructor() { }

  ngOnInit() { }

  onCancel() {
    this.cancelForm.emit();
  }

  onSave() {
    this.saveForm.emit();
  }
}
