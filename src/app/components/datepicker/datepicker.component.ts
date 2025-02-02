import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  forwardRef,
  Inject,
  PLATFORM_ID,
  Input,
} from '@angular/core'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css' // Directly import Flatpickr CSS
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'app-datepicker',
  standalone: true,
  template: `
    <input
      #datepickerInput
      type="text"
      class="border text-sm p-1.5 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Select a date"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  @ViewChild('datepickerInput', { static: true }) datepickerInput!: ElementRef

  @Input() minDate: string | null = null // Optional minDate, defaults to null

  private onChange: (date: string) => void = () => {}
  private onTouched: () => void = () => {}
  private flatpickrInstance: any

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const flatpickrOptions: any = {
        enableTime: false,
        dateFormat: 'Y-m-d',
        onChange: (selectedDates: Date[], dateStr: string) => {
          if (selectedDates.length > 0 && selectedDates[0]) {
            const localDate = new Date(
              selectedDates[0].getTime() -
                selectedDates[0].getTimezoneOffset() * 60000,
            )
              .toISOString()
              .split('T')[0]
            this.onChange(localDate)
            this.onTouched()
          }
        },
      }

      // Apply minDate only if it's defined
      if (this.minDate) {
        flatpickrOptions.minDate = this.minDate
      }

      // Initialize Flatpickr with the appropriate options
      this.flatpickrInstance = flatpickr(
        this.datepickerInput.nativeElement,
        flatpickrOptions,
      )
    }
  }

  writeValue(value: string | null): void {
    if (this.flatpickrInstance) {
      if (value) {
        this.flatpickrInstance.setDate(value)
      } else {
        this.flatpickrInstance.clear()
      }
    }
  }

  registerOnChange(fn: (date: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
}
