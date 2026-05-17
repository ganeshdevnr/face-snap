import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.html',
})
export class ContactPage {
  submitForm(event: SubmitEvent): void {
    event.preventDefault();
    console.log('Contact form submitted');
  }
}
