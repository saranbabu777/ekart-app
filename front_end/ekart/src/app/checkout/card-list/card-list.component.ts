import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../profile/services/user.service';
import { OrdersService } from '../../orders/orders.service';
import { DatePipe } from '@angular/common';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MessagesComponent } from 'src/app/core/messages/messages.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: [ './card-list.component.scss' ]
})
export class CardListComponent implements OnInit {

  public editableIndex: number;
  public cardForm: FormGroup;
  public activeCard: number;
  public userDetails: any;
  public username: string;
  get cards(): FormArray { return this.cardForm.get('cards') as FormArray; }

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private ordersService: OrdersService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    public router: Router) { }

  ngOnInit() {
    this.username = this.userService.getActiveUser();
    this.userService.getUser(this.username).then(details => {
      this.userDetails = details;
      this.userDetails.cards = this.userDetails.cards ? this.userDetails.cards : [];
      this.cardForm = this.createForm();
    });
  }

  createForm() {
    const group = this.formBuilder.group({
      cards: this.formBuilder.array([])
    });
    const control = <FormArray> group.controls[ 'cards' ];
    this.userDetails.cards.forEach(card => {
      control.push(this.initCard(card));
    });
    return group;
  }

  initCard(params?: any) {
    const cardNumber = params ? params.cardNumber : '';
    const nameOnCard = params ? params.nameOnCard : '';
    const expiryMonth = params ? params.expiryMonth : '';
    const expiryYear = params ? params.expiryYear : '';
    const cardType = params ? params.cardType : '';

    return this.formBuilder.group({
      cardNumber: [ cardNumber ],
      nameOnCard: [ nameOnCard ],
      expiryMonth: [ expiryMonth ],
      expiryYear: [ expiryYear ],
      cardType: [ cardType ]
    });
  }

  addNewCard() {
    const control = <FormArray> this.cardForm.controls[ 'cards' ];
    control.insert(0, this.initCard());
    this.editableIndex = 0;
  }

  removeCard(i: number) {
    const control = <FormArray> this.cardForm.controls[ 'cards' ];
    control.removeAt(i);
    this.save();
  }

  selectCard(index: number) {
    this.activeCard = index;
  }

  onProceed() {
    const cardArray = this.cards.getRawValue();
    this.ordersService.setOrderParams(cardArray[ this.activeCard ], 'paymentMethod');
    const today = new Date();
    let order = this.ordersService.getOrderObject();
    order.username = this.username;
    order.orderDate = this.datePipe.transform(today, 'yyyy-MM-dd');
    order.status = "open";
    this.ordersService.create(order).then(response => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = 'Order placed successfully';
      let dialogRef = this.dialog.open(MessagesComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          this.router.navigate([ './orders' ]);
        }
      );
    });
  }

  onModifyCard(index: number) {
    this.editableIndex = index;
  }

  save() {
    this.editableIndex = -1;
    delete this.userDetails._id;/*work around to remove _id in mongo*/
    this.userDetails.cards = this.cardForm.get('cards').value;
    this.userService.update(this.userDetails);
  }
}
