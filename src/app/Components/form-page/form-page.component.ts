import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  animations: [
    trigger('slideInLogin', [
      transition(':enter', [
        style({transform: 'translateY(-10%)'}),
        animate('400ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
    ]),
    trigger('slideInMsg', [
      transition(':enter', [
        style({transform: 'translateY(-10%)'}),
        animate('400ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
    ]),
  ]
})
export class FormPageComponent implements OnInit {
  fg: FormGroup;
  ifPregnant = null;
  dropdownList = [
    { id: 1, name: 'Yes, I have had children before' },
    {
      id: 2,
      name: 'Yes, but the pregnancy was not carried to term due to miscarriage(s)',
    },
    {
      id: 3,
      name: 'Yes, but the pregnancy was not carried to term due to ectopic miscarriage(s)',
    },
    { id: 4, name: 'Yes, I had a stillbirth' },
  ];
  dropdownSettings: IDropdownSettings = {};

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      everBeenPregnant: ['' || null],
      optionIfPregnant: ['' || null],
      firtPeriodAge: ['' || null],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  /**
   * Check to know if client is pregnant or not
   */
  everPregnant() {
    const everPre = this.fg.get('everBeenPregnant').value;
    if (everPre === 'YES') {
      this.ifPregnant = 'YES';
      this.fg.get('firtPeriodAge').setValue(null);
    } else if (everPre === 'NO') {
      this.ifPregnant = 'NO';
      this.fg.get('optionIfPregnant').setValue(null);
    } else {
      this.ifPregnant = null;
      this.fg.reset();
    }
  }
  /**
   * Submit form event.
   */
  submit() {
    const obj = this.fg.getRawValue();
    console.log('Saved Object: ', obj);
    this.toastr.success("We'll get back to you.", 'Thank you!');
    this.cancel();
  }

  /**
   * Cancel form event, this also resets the form.
   */
  cancel() {
    this.ifPregnant = null;
    this.fg.reset();
  }
}
