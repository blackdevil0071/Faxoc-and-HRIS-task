import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServService } from './serv.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'autocomplete';

  options: string[] = ['Sam', 'Varun', 'Jasmine'];
  filteredOptions: string[] = [];

  selectedIndex = -1;
  formGroup: FormGroup;

  constructor(private service: ServService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.getNames();
  }

  initForm() {
    this.formGroup = this.fb.group({
      employee: ['Ervin Howell'],
    });
    this.formGroup.get('employee').valueChanges.subscribe((response) => {
      console.log('Enterd data is :', response);
      if (response && response.length) {
        this.filterData(response);
      } else {
        this.filteredOptions = [];
      }
    });
  }


  filterData(enteredData: string) {
    const enteredValue = enteredData.toLowerCase().trim();
    if (enteredValue.length === 0) {
      this.filteredOptions = this.options;
    } else {
      const matchingOptions = this.options.filter((option) =>
        option.toLowerCase().includes(enteredValue)
      );
      if (!matchingOptions.includes(enteredData)) {
        matchingOptions.push(enteredData);
      }
      this.filteredOptions = matchingOptions;
    }
  }

  getNames() {
    this.service.getData().subscribe((response) => {
      this.options = response;
      this.filteredOptions = response;
    });
  }
}
