import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '@app/data/schema/employee';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  public action: string;
  public form: FormGroup;
  public local_data: any;
  public tags: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee,
    private formBuilder: FormBuilder
  ) {
    this.tags = new Set(data.tags);
    this.form = this.formBuilder.group({
      first_name: [data.first_name, Validators.required],
      last_name: [data.last_name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      office: [data.office, Validators.required],
      dob: [data.dob, Validators.required],
      phone_number: [data.phone_number, [Validators.required, Validators.pattern('[- +()0-9]+')]]
    });

    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  private get formData() {
    const data = this.form.getRawValue();
    if (this.local_data.id) {
      data.id = this.local_data.id;
    }
    data.tags = Array.from(this.tags);
    return data;
  }

  addTagFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.tags.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeTag(keyword: string) {
    this.tags.delete(keyword);
  }

  doAction() {
    if (!this.form.invalid) {
      this.dialogRef.close({ event: this.action, data: this.formData });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}