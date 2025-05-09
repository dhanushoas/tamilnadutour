import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  bookForm: FormGroup;
  book: Book = new Book();
  baseCost: number = 1000;
  additionalCostPerMember: number = 200;
  additionalCostPerDay: number = 1000;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      customId: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      nameOfVisitor: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[9876]\d{9}$/)]],
      date: [this.getTodayDate(), Validators.required],
      visitingPlaces: ['', Validators.required],
      noOfDays: [
        '', 
        [Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.max(7)]
      ],  
      noOfMembers: [
        '', 
        [Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.max(30)]
      ],
      totalCost: [{ value: this.baseCost, disabled: true }, Validators.required],  // Not editable
    });
  }

  private getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
  }
  

  ngOnInit(): void {
    this.getBookByCustomId();

    // Auto-update total cost when noOfDays or noOfMembers change
    this.bookForm.valueChanges.subscribe(() => {
      this.updateTotalCost();
    });
  }

  getBookByCustomId(): void {
    const customId = this.route.snapshot.params['customId'];

    if (customId) {
      this.bookService.getBookByCustomId(Number(customId)).subscribe(
        (book: Book) => {
          this.book = book;
          this.bookForm.patchValue(book); // Fill form fields with retrieved data
          this.updateTotalCost();  // Update total cost on load
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      console.error('Invalid or missing customId');
    }
  }

  updateTotalCost(): void {
    const noOfDays = this.bookForm.get('noOfDays')?.value || 0;
    const noOfMembers = this.bookForm.get('noOfMembers')?.value || 0;
    const totalCost = this.baseCost + (noOfMembers * this.additionalCostPerMember) + (noOfDays * this.additionalCostPerDay);

    this.bookForm.patchValue({ totalCost: totalCost }, { emitEvent: false });
  }

  goToUpdate(): void {
    if (this.bookForm.valid) {
      this.bookService.updateBook(this.bookForm.value.customId, this.bookForm.value).subscribe(
        (res: Book) => {
          console.log('Update successful:', res);
          this.router.navigate(['getall']);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  validateNumberInput(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validateNumericInput(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();
  }
}
}
