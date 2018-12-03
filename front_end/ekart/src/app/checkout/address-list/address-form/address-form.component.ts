import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: [ './address-form.component.scss' ]
})
export class AddressFormComponent implements OnInit {

  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() addressForm: FormGroup;

  constructor() { }

  ngOnInit() { }

  onCancel() {
    this.cancelForm.emit();
  }

  onSave() {
    this.saveForm.emit();
  }
}
