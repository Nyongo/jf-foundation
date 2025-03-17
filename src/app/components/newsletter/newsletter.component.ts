import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router } from '@angular/router'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent {
  newsletterForm: FormGroup
  submitted = false
  success = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.newsletterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      organization: [''],
      interests: ['', Validators.required],
    })
  }

  get f() {
    return this.newsletterForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.newsletterForm.valid) {
      // Here you would typically send the form data to your backend
      console.log(this.newsletterForm.value)
      this.success = true
    }
  }

  viewNewsletter(id: string) {
    this.router.navigate(['/newsletter', id])
  }

  newsletters = [
    {
      id: '1',
      title: 'Education Transformation in Rural Kenya',
      date: 'March 2024',
      description:
        "How we're revolutionizing education in rural communities through innovative programs and partnerships.",
      image: 'assets/images/newsletter/4.jpg',
      category: 'Impact Stories',
    },
    {
      id: '2',
      title: 'Digital Learning Success Stories',
      date: 'February 2024',
      description:
        'Real stories from students and teachers who have benefited from our digital learning initiatives.',
      image: 'assets/images/newsletter/5.jpg',
      category: 'Success Stories',
    },
    {
      id: '3',
      title: 'Partnership Spotlight: Local Communities',
      date: 'January 2024',
      description:
        'Highlighting our successful partnerships with local communities and their impact on education.',
      image: 'assets/images/newsletter/3.jpg',
      category: 'Partnerships',
    },
  ]
}
