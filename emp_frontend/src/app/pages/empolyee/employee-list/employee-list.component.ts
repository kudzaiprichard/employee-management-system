import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  searchTerm: string = ''; // Unified search term
  dropdownOpen = false; // To control dropdown visibility
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type

  constructor(private employeeService: EmployeeService,
              private alertService: AlertService,
              private router: Router) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
    this.getEmployees();
  }

  goToEmployee(): void {
    if (this.searchTerm) {
      this.employeeService.getEmployeesList().subscribe(
        (employees: Employee[]) => {
          let employee: Employee | undefined;

          // Check if the search term contains '@', implying it might be an email
          if (this.searchTerm.includes('@')) {
            employee = employees.find(emp => emp.email === this.searchTerm);
          } else {
            // Attempt to convert search term to a number for ID comparison
            const id = Number(this.searchTerm);
            if (!isNaN(id)) {
              employee = employees.find(emp => emp.id === id);
            }
          }

          if (employee) {
            console.log('Searching:', this.searchTerm);
            this.router.navigate(['details-employee', employee.id]);
            this.alertMessage = 'Employee found.';
            this.alertType = 'info'; // or 'success'
          } else {
            this.alertMessage = 'Employee not found.';
            this.alertType = 'warning';
            console.error('Employee not found.');
          }
        },
        error => {
          console.error('Error fetching employees:', error);
          this.alertMessage = 'Error fetching employee data.';
          this.alertType = 'danger';
        }
      );
    }
  }

  getEmployees(): void {
    this.employeeService.getEmployeesList().subscribe({
      next: (data: Employee[]) => this.employees = data,
      error: (err) => {
        console.error('Error fetching employees', err);
        this.alertMessage = 'Error fetching employees.';
        this.alertType = 'danger';
      }
    });
  }

  updateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
    this.alertMessage = 'Employee updated successfully.';
    this.alertType = 'success';
  }

  deleteEmployee(id: number): void {
    if (confirm(`Are you sure you want to delete Employee ID: ${id}?`)) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          console.log(`Deleted employee ID: ${id}`);
          this.getEmployees();
          this.alertMessage = 'Employee deleted successfully.';
          this.alertType = 'success';
        },
        error: (err) => {
          console.error('Error deleting employee', err);
          this.alertMessage = 'Error deleting employee.';
          this.alertType = 'danger';
        }
      });
    }
  }

  detailsOfEmployee(id: number): void {
    this.router.navigate(['details-employee', id]);
  }
}
