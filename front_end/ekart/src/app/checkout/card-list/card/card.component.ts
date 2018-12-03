import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.scss' ]
})
export class CardComponent implements OnInit {

  @Input() cardForm: FormGroup;
  @Input() isEdit: boolean;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() modify: EventEmitter<any> = new EventEmitter<any>();
  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onModify() {
    this.modify.emit();
  }

  onDelete() {
    //api call
    this.delete.emit();
  }

  saveForm() {
    //api call
    this.save.emit();
  }

}
