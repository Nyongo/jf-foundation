import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

// Custom validator for phone number format
export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = control.value
    const regex = /^\+\d{1,3}\d{9}$/ // Adjust the regex to your desired format

    return phoneNumber && !regex.test(phoneNumber)
      ? { invalidPhoneNumber: true }
      : null
  }
}
