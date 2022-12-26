import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './interface/employee';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  employees!: Employee[]
  editEmployee?: Employee
  deleteEmployee?: Employee

  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.onGetEmployees()
  }

  public onGetEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (responce: Employee[]) => {
        this.employees = responce
        console.log("Responce: ", this.employees);
        
      },
      (error: HttpErrorResponse) => alert(error.message),
      () => console.log("Done!")
    )
  }

  public onOpenModal(employee?: Employee | undefined, modal?: string): void {
    const container = document.getElementById("main-container")
    const button = document.createElement("button")
    button.type = "button"
    button.style.display = "none"
    button.setAttribute("data-toggle", "modal")

    if (modal === "add") {
      button.setAttribute("data-target", "#addEmployeeModal")
    }

    if (modal === "edit") {
      this.editEmployee = employee
      button.setAttribute("data-target", "#updateEmployeeModal")
    }

    if (modal === "delete") {
      this.deleteEmployee = employee
      button.setAttribute("data-target", "#deleteEmployeeModal")
    }

    container?.appendChild(button)
    button.click()
  }

  public onAddEmloyee(addForm: NgForm):void {
    document.getElementById("add-employee-form")?.click()
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log("add response >>", response);
        this.onGetEmployees()
        addForm.reset()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      },
      () => console.log("Done")
      
    )
  }

  public onUpdateEmloyee(employee: Employee): void {
    document.getElementById("add-employee-form")?.click()
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log("add response >>", response);
        this.onGetEmployees()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      },
      () => console.log("Done")
      
    )
  }

  public searchEmployee(key: string): void{
    const results: Employee[] = []
    for (const employee of this.employees){
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee)
      }
    }
    this.employees = results
    if (results.length == 0 || !key) {
      this.onGetEmployees()
    }
  }

  public onDeleteEmloyee(id: number | undefined): void {
    this.employeeService.deleteEmployee(id!).subscribe(
      (response: void) => {
        console.log("add response >>", response);
        this.onGetEmployees()
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
        alert(error.message)
      },
      () => console.log("Done")
      
    )
  }
  
}
