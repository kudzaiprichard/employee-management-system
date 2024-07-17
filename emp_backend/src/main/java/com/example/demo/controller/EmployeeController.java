package com.example.demo.controller;

import com.example.demo.services.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Employee;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class EmployeeController {
	private final EmployeeService employeeService;
	
	//get all data
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/employees")
	public List <Employee> getAllEmployees(){

		return this.employeeService.fetchAll();
	}
	
	//create 
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		System.out.println(employee.getFirstname());
		return employeeService.create(employee);
	}
	
	
	// get data by id 
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getByID(@PathVariable Long id) {
		return ResponseEntity.ok(this.employeeService.findById(id));
	}
	
	
	//update data 
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping ("/employees/{id}")
	public ResponseEntity<Employee> updateEmployeeByID(@PathVariable Long id, @RequestBody Employee employeeDetails){
		return ResponseEntity.ok(this.employeeService.updateById(id, employeeDetails));
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/employees/{id}")
	public ResponseEntity <Map<String, Boolean> >deleteEmployee(@PathVariable Long id){
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted", this.employeeService.delete(id));
		return ResponseEntity.ok(response);
	}
	
}