import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Luv2ShopForm } from '../../services/luv2-shop-form';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { CartService } from '../../services/cartService';
import { Luv2ShopValidators } from '../../Validators/luv2-shop-validators';
import { CheckoutService } from '../../services/checkout-service';
import { Router } from '@angular/router';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';
import { Order } from '../../common/order';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  checkoutFormGroup!:FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0.00;
  creditCardMonth: number[] = [];
  creditCardYear: number[] = [];
  countries:Country[] = [];
  shippingAddressStates:State[] = [];
  billingAddressStates:State[] = [];
  
  constructor(private formBuilder: FormBuilder,
              private luv2ShopForm: Luv2ShopForm,
              private cartService:CartService,
              private checkoutService:CheckoutService,
              private router: Router
  ) {
   this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                                [Validators.required,Luv2ShopValidators.checkTwoChars,
                                 ]),
        lastName: new FormControl('', 
                                [Validators.required,Luv2ShopValidators.checkTwoChars]),
        email: new FormControl('', 
                            [Validators.required, 
                             Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                             Luv2ShopValidators.notOnlyWhitespace])
      }),

      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', 
                                [Validators.required,Luv2ShopValidators.checkTwoChars,
                                 Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', 
                                [Validators.required,Luv2ShopValidators.checkTwoChars,
                                 Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        zipCode:new FormControl('', 
                                [Validators.required,Luv2ShopValidators.checkTwoChars,
                                 Luv2ShopValidators.notOnlyWhitespace])
      }),

      billingAddress: this.formBuilder.group({
           country: new FormControl('', [Validators.required]),
        street: new FormControl('', 
                                [Validators.required,Luv2ShopValidators.checkTwoChars,
                                 Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', 
                                [Validators.required,Luv2ShopValidators.checkTwoChars,
                                 Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        zipCode:new FormControl('', 
                                [Validators.required,Luv2ShopValidators.checkTwoChars,
                                 Luv2ShopValidators.notOnlyWhitespace])
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', Validators.required),
        nameOnCard: new FormControl('', [Validators.required,Luv2ShopValidators.checkTwoChars, Luv2ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth:['',Validators.required],
        expirationYear:['',Validators.required]
      })

    });

    const startMonth: number = new Date().getMonth() + 1;
    this.luv2ShopForm.getCreditCardMonth(startMonth).subscribe(
      data =>{
        this.creditCardMonth = data;
      }
    );

    this.luv2ShopForm.getCreditCardYear().subscribe(
      data =>{
        this.creditCardYear = data;
      }
    )
  }

  ngOnInit() : void {
    this.luv2ShopForm.getCountries().subscribe(
      data =>{
        this.countries = data;
      });

    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data=> this.totalQuantity = data
    );

  }

  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.invalid);
     if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
        return;
    }

    const cartItem = this.cartService.cartItems;

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    let orderItems: OrderItem[] = cartItem.map(tempCartItem => new OrderItem(tempCartItem));
    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name
    purchase.shippingAddress.country = shippingCountry.name

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name
    purchase.billingAddress.country = billingCountry.name

    // populate purchase -  order and order items
    purchase.order = order;
    purchase.orderItems = orderItems

    // call Resp Api via the checkout service
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next:response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
          //reset cart
          this.resetCart();
        },
        error: err =>{
          alert(`There was an error: ${err.message}`)
        }
        
      }
    );
  }

    resetCart() {
    //reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //reset the form
    this.checkoutFormGroup.reset();
    //navigate back to product page
    this.router.navigateByUrl("/products");
  }


  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}


  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}

  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}




  copyShippingAddressToBillingAddress(event:any) {
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
          .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    }else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];

    }
  }

  handleMonthsAndYears() {
    const creditCardFromGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFromGroup?.value.expirationYear);

    let startMonth: number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }
       this.luv2ShopForm.getCreditCardMonth(startMonth).subscribe(
      data =>{
        this.creditCardMonth = data;
      }
    );
  }

  getStates(formGroupName:string){
    const formGroup = this.checkoutFormGroup.get(formGroupName)!;
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    this.luv2ShopForm.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else{
          this.billingAddressStates = data;
        }

        formGroup.get('state')!.setValue(data[0])
      }
    )
  }


}
