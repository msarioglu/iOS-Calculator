import {Component} from '@angular/core';
import {NavController, Platform} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private isUserCurrentlyTyping: boolean;
  private currentOperand: string;
  public displayValue: string;
  private accumulator: number;
  public clearButtonText: string;
  public commaIsSet: boolean;
  public isLandscape: string;
  public orientation: string;
  public errorMessage: string;
  private startRepeatEquals: boolean;
  private _previousValue: string;


  public get previousValue(): number {
    return parseFloat(this._previousValue);
  }

  public get currentValue(): number {
    this.commaIsSet = this.displayValue.indexOf(".") != -1;
    return parseFloat(this.displayValue);
  }

  constructor(private platform: Platform, public NavCtrl: NavController) {
    this.platform.resize.subscribe(() => {
      this.checkRotationEvent()
    })
  }

  ionViewDidLoad() {
    this.checkRotationEvent();
    this.allClear();
  }

  touchDigit(event) {
    let digit = event.srcElement.innerText.trim();
    if (this.displayValue.length < 20) {
      if (!this.isUserCurrentlyTyping) {
        this.displayValue = digit;
        this._previousValue = digit;
        this.isUserCurrentlyTyping = true;
      } else {
        this.displayValue += digit;
        this._previousValue += digit;
      }
    }
    this.startRepeatEquals = false;
    this.clearButtonText = "C";
  }

  touchComma() {
    if (this.isUserCurrentlyTyping && !this.commaIsSet) {
      this.commaIsSet = true;
      this.displayValue += ".";
    }
  }

  touchUnaryOperator(event) {
    this.currentOperand = event.srcElement.innerText.trim();
    switch (this.currentOperand) {
      case "+/-":
        this.displayValue = (-1 * this.currentValue).toString();
        break;
      case "%":
        this.displayValue = (this.currentValue / 100).toString();
        break;
      case "×²":
        this.displayValue = (this.currentValue * this.currentValue).toString();
        break;
      case "X!":
        if (this.currentValue <= 170) {
          this.displayValue = this.factorial(this.currentValue).toString();
        } else {
          this.errorMessage = "Waarde is te groot";
        }
        break;
      case "SIN":
        this.displayValue = Math.sin(this.currentValue).toString();
        break;
      case "SINH":
        this.displayValue = Math.sinh(this.currentValue).toString();
        break;
    }
    this.isUserCurrentlyTyping = false;
    this.commaIsSet = false;
  }

  factorial(value: number) {
    if (value == 0) {
      return 1;
    }
      return (value * this.factorial(value - 1));
  }

  touchBinaryOperator(event) {
    this.currentOperand = event.srcElement.innerText.trim();
    this.accumulator = this.currentValue;
    this.isUserCurrentlyTyping = false;
    this.commaIsSet = false;
  }

  touchEquals() {
    switch (this.currentOperand) {
      case "÷":
        this.displayValue = (this.startRepeatEquals ? (this.currentValue / this.previousValue) : (this.accumulator / this.currentValue)).toString();
        break;
      case "×":
        this.displayValue = (this.startRepeatEquals ? (this.currentValue * this.previousValue) : (this.accumulator * this.currentValue)).toString();
        break;
      case "−":
        this.displayValue = (this.startRepeatEquals ? (this.currentValue - this.previousValue) : (this.accumulator - this.currentValue)).toString();
        break;
      case "+":
        this.displayValue = (this.startRepeatEquals ? (this.currentValue + this.previousValue) : (this.accumulator + this.currentValue)).toString();
        break;
      case undefined:
        this.displayValue = this.currentValue.toString();
        break;
      default:
        this.errorMessage = "Onbekende operator '" + this.currentOperand + "'";
        break;
    }
    this.startRepeatEquals = true;
    this.isUserCurrentlyTyping = false;
  }

  checkRotationEvent() {
    this.platform.ready().then(() => {
      if (this.platform.isPortrait()) {
        this.isLandscape = "hideCol";
      } else {
        this.isLandscape = "";
      }
    }).catch(err => {
      console.log('Error while loading platform', err);
    });
  }


  allClear() {
    this.currentOperand = undefined;
    this.displayValue = "0";
    this.isUserCurrentlyTyping = false;
    this.commaIsSet = false;
    this.clearButtonText = "AC";
    this.errorMessage = "";
  }

}
