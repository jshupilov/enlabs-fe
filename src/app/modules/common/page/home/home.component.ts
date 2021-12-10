import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '@app/data/schema/employee';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogBoxComponent } from '@app/modules/common/component/dialog-box/dialog-box.component';
import { EmployeeService } from '@app/data/service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public EmpData: Employee[] = [];

  public displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'office', 'dob', 'phone_number', 'tags', 'action'];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((employees: Employee[]) => {
      this.EmpData = employees;
    }, error => {
      this.snackBar.open('Sorry something goes wrong', null, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'bg-danger'
      });
    })
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event == 'Add') {
          this.addRowData(result.data);
        } else if (result.event == 'Update') {
          this.updateRowData(result.data);
        } else if (result.event == 'Delete') {
          this.deleteRowData(result.data);
        }
      }
    });
  }

  addRowData(row_obj) {
    this.employeeService.add(row_obj).subscribe((employee: Employee) => {
      this.EmpData.push(employee);
      this.table.renderRows();
      this.snackBar.open('Employee added succesfully', null, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'bg-success'
      });
    }, error => {
      this.snackBar.open('Sorry something goes wrong', null, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'bg-danger'
      });
    });

  }
  updateRowData(row_obj) {
    this.employeeService.update(row_obj).subscribe((employee: Employee) => {
      this.EmpData = this.EmpData.map((emp: Employee) => {
        if (emp.id === employee.id) {
          return employee;
        }
        return emp;
      });
      this.snackBar.open('Employee updated succesfully', null, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'bg-success'
      });
    }, error => {
      this.snackBar.open('Sorry something goes wrong', null, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'bg-danger'
      });
    });
  }
  deleteRowData(row_obj) {
    this.employeeService.remove(row_obj.id).subscribe((response: boolean) => {
      if (response) {
        this.EmpData = this.EmpData.filter((value, key) => {
          return value.id != row_obj.id;
        });
        this.snackBar.open('Employee deleted succesfully', null, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: 'bg-success'
        });
      } else {
        this.snackBar.open('Sorry something goes wrong', null, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: 'bg-danger'
        });
      }
    }, error => {
      this.snackBar.open('Sorry something goes wrong', null, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'bg-danger'
      });
    })
  }
}
