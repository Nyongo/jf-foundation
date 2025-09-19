import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { HeaderComponent } from '../header/header.component'

interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
})
export class LoanCalculatorComponent implements OnInit {
  loanForm: FormGroup
  loanTermOptions = [3, 6, 12, 18, 24, 36, 48, 60]
  showSchedule = false
  amortizationSchedule: any[] = []
  processingFee = 0
  insuranceFee = 0
  actualPrincipal = 0
  monthlyPayment = 0
  totalPayment = 0
  totalInterest = 0

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      loanAmount: ['', [Validators.required, Validators.min(0)]],
      loanTerm: [12, Validators.required],
      interestRate: [40, Validators.required],
    })

    // Subscribe to form value changes
    this.loanForm.valueChanges.subscribe(() => {
      if (this.loanForm.valid) {
        this.calculateLoan()
      }
    })
  }

  ngOnInit() {
    // Set initial values
    this.loanForm.patchValue({
      loanAmount: '',
      loanTerm: 12,
      interestRate: 40,
    })
  }

  formatCurrency(value: number): string {
    if (!value || isNaN(value)) return 'Ksh 0'
    return `Ksh ${value.toLocaleString('en-US')}`
  }

  formatLoanAmount(event: Event): void {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/[^0-9]/g, '') // Remove all non-numeric characters

    // Convert to number and update form control
    const numericValue = value ? parseInt(value, 10) : 0
    this.loanForm.patchValue({
      loanAmount: numericValue,
    }) // Removed { emitEvent: false } to trigger calculations

    // Format display value with commas
    if (value) {
      input.value = numericValue.toLocaleString('en-US')
    } else {
      input.value = ''
    }
  }

  onLoanAmountBlur(event: Event): void {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/[^0-9]/g, '')

    if (value) {
      const numericValue = parseInt(value, 10)
      input.value = numericValue.toLocaleString('en-US')
      this.loanForm.patchValue({
        loanAmount: numericValue,
      }) // Added to ensure form value is updated
    } else {
      input.value = ''
      this.loanForm.patchValue({
        loanAmount: 0,
      })
    }
  }

  calculateLoan() {
    if (this.loanForm.valid) {
      const { loanAmount, loanTerm, interestRate } = this.loanForm.value

      if (!loanAmount || loanAmount <= 0) {
        this.resetValues()
        return
      }

      const monthlyRate = interestRate / 12 / 100
      const numberOfPayments = loanTerm

      // Calculate fees based on the desired take-home amount
      const takeHomeAmount = loanAmount
      const processingFeeRate = 0.05
      const insuranceFeeRate = 0.0095

      // Calculate the actual loan amount needed to achieve the desired take-home amount
      // Formula: takeHomeAmount = actualLoanAmount - (actualLoanAmount * processingFeeRate) - (actualLoanAmount * insuranceFeeRate)
      // Solving for actualLoanAmount:
      // actualLoanAmount = takeHomeAmount / (1 - processingFeeRate - insuranceFeeRate)
      const actualLoanAmount = Math.round(
        takeHomeAmount / (1 - processingFeeRate - insuranceFeeRate),
      )

      // Calculate fees based on the actual loan amount
      this.processingFee = Math.round(actualLoanAmount * processingFeeRate)
      this.insuranceFee = Math.round(
        (actualLoanAmount * insuranceFeeRate * loanTerm) / 12,
      )
      this.actualPrincipal = actualLoanAmount

      // Monthly payment formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
      const monthlyPaymentCalc =
        (this.actualPrincipal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

      this.monthlyPayment = Math.round(monthlyPaymentCalc)
      this.totalPayment = this.monthlyPayment * numberOfPayments
      this.totalInterest = this.totalPayment - this.actualPrincipal

      // Calculate amortization schedule
      this.calculateAmortizationSchedule(
        this.actualPrincipal,
        monthlyRate,
        numberOfPayments,
      )
    } else {
      this.resetValues()
    }
  }

  resetValues() {
    this.processingFee = 0
    this.insuranceFee = 0
    this.actualPrincipal = 0
    this.monthlyPayment = 0
    this.totalPayment = 0
    this.totalInterest = 0
    this.amortizationSchedule = []
  }

  calculateAmortizationSchedule(
    principal: number,
    monthlyRate: number,
    numberOfPayments: number,
  ) {
    this.amortizationSchedule = []
    let balance = principal
    let totalPrincipal = 0
    let totalInterest = 0

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = Math.round(balance * monthlyRate)
      const principalPayment = this.monthlyPayment - interestPayment
      balance -= principalPayment
      totalPrincipal += principalPayment
      totalInterest += interestPayment

      this.amortizationSchedule.push({
        month,
        payment: this.monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      })
    }
  }

  toggleSchedule() {
    this.showSchedule = !this.showSchedule
  }
}
