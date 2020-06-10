import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  // Constants
  sharesInIssue:number = 3704803929;
  gbpToUsd:number = 1.26;
  troyOz:number = 34.2857;
  onePoundInKilos:number = 2.20462262;
  goldPricePerOz:number = 1700;
  copperPricePerLb:number = 3.82;

  // Ore Body Info
  strikeLength:number = 500;
  depth:number = 200;
  width:number = 100;
  gravity:number = 100;
  avgGradeAu:number = 1.5;
  avgGradeCu:number = 2;

  // Calculated Values
  tonnage:number;
  tonnageByGradeAu:number;
  tonnageByGradeCu:number;
  ounces:number;
  ouncesTroy:number;
  copperLbs:number;

  // Results

  resourceValueCu:number;
  resourceValueAu:number;
  resourceValueAuConverted:number;
  resourceValueCuConverted:number;
  resourceTotalValue:number;
  sharePriceValue:number;


  constructor() { }

  ngOnInit(): void {
    this.updateResourceValue();
  }

  // Full tonnage of the resource
  calcTonnage () {
    this.tonnage = this.strikeLength * this.depth * this.width * this.gravity;
    return this.tonnage = this.strikeLength * this.depth * this.width * this.gravity;
  }

  // Gold
  calcTonnageByGradeAu () {
    this.tonnageByGradeAu = this.tonnage * this.avgGradeAu;
    return this.calcTonnage() * this.avgGradeAu;
  }

  calcTroyOz () {
    this.ouncesTroy = this.calcTonnageByGradeAu() / this.troyOz;
    return this.calcTonnageByGradeAu() / this.troyOz;
  }

  // Copper
  calcTonnageByGradeCu () {
    this.tonnageByGradeCu = ( this.avgGradeCu /  100 ) * this.tonnage;
    return ( this.avgGradeCu /  100 ) * this.calcTonnage();
  }

  calcLbs () {
    this.copperLbs = this.calcTonnageByGradeCu() * this.onePoundInKilos;
    return this.calcTonnageByGradeCu() * this.onePoundInKilos;
  }

  updateResourceValue () {
    this.resourceValueAu = this.calcTroyOz() * this.goldPricePerOz;
    this.resourceValueAuConverted = this.resourceValueAu / this.gbpToUsd;
    this.resourceValueCu = this.calcLbs() * this.copperPricePerLb;
    this.resourceValueCuConverted = this.resourceValueCu / this.gbpToUsd;
    this.resourceTotalValue = this.resourceValueAuConverted + this.resourceValueCuConverted;
    this.sharePriceValue = this.resourceTotalValue / this.sharesInIssue;
  }

}
