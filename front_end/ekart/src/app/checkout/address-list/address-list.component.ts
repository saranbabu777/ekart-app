import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../../profile/services/user.service';
import { OrdersService } from '../../orders/orders.service';


@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: [ './address-list.component.scss' ]
})
export class AddressListComponent implements OnInit {

  public editableIndex: number;
  public addressForm: FormGroup;
  public userDetails: any;
  public username: string;
  get address(): FormArray { return this.addressForm.get('address') as FormArray; }

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private ordersService: OrdersService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.username = this.userService.getActiveUser();
    this.userService.getUser(this.username).then(details => {
      this.userDetails = details;
      this.userDetails.address = this.userDetails.address ? this.userDetails.address : [];
      this.addressForm = this.createForm();
    });
  }

  createForm() {
    const group = this.formBuilder.group({
      address: this.formBuilder.array([])
    });
    const control = <FormArray> group.controls[ 'address' ];
    this.userDetails.address.forEach(address => {
      control.push(this.initAddress(address));
    });
    return group;
  }

  initAddress(params?: any) {
    const name = params ? params.name : '';
    const address = params ? params.address : '';
    const city = params ? params.city : '';
    const state = params ? params.state : '';
    const pincode = params ? params.pincode : '';
    const phoneNumber = params ? params.phoneNumber : '';

    return this.formBuilder.group({
      name: [ name ],
      address: [ address ],
      city: [ city ],
      state: [ state ],
      pincode: [ pincode ],
      phoneNumber: [ phoneNumber ]
    });
  }

  addNewAddress() {
    const control = <FormArray> this.addressForm.controls[ 'address' ];
    control.insert(0, this.initAddress());
    this.editableIndex = 0;
  }

  removeAddress(i: number) {
    const control = <FormArray> this.addressForm.controls[ 'address' ];
    control.removeAt(i);
    this.save();
  }

  selectAddress(index: number) {
    const addressArray = this.address.getRawValue();
    this.ordersService.setOrderParams(addressArray[ index ], 'shippingAddress');
  }

  onModifyAddress(index: number) {
    this.editableIndex = index;
  }

  save() {
    this.editableIndex = -1;
    delete this.userDetails._id;/*work around to remove _id in mongo*/
    this.userDetails.address = this.addressForm.get('address').value;
    this.userService.update(this.userDetails);
  }
}
