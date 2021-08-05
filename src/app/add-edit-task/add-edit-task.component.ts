import { Component} from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { TodoInterface } from '../todoInterface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent {

  minDate = new Date();                                   //minimum CalendarDate
  todo: any[]=[];                                         //any due to strict typescript

  addTaskForm = new FormGroup(    //Form for taking Values    
    {
      title: new FormControl('', [Validators.required, Validators.pattern(new RegExp("\\S"))]),             //pattern validator to check if string is empty
      description: new FormControl('', [Validators.required, Validators.pattern(new RegExp("\\S"))]),       //pattern validator to check if string is empty
      endDate: new FormControl('', Validators.required),
      status: new FormControl('Todo', Validators.required)
    }
  );

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private todoService: TodoService, private snackBar: MatSnackBar) {
    this.editCheck();   //Check if user want  to Edit Todo! 
  }

  submitTask() {
    if (this.addTaskForm.valid) {             //if form is valid    

      let formValues = this.addTaskForm.getRawValue();    //getting formvalues in form of object

      if (this.activatedRoute.snapshot.params.id) {      //Edit Task     //if id is passed then execute this code
        
        let formattedDate = this.formatDate(formValues['endDate']);
        formValues['endDate'] = formattedDate;
        this.updateTodo(formValues, this.activatedRoute.snapshot.params.id);        //specific todo is updated
        this.router.navigate(['/dashboard']);

      }
      else {                                    //Add new task
        let formattedDate = this.formatDate(formValues['endDate']);
        formValues['endDate'] = formattedDate;
        this.addTodo(formValues);
        this.router.navigate(['/dashboard']);
      }
    }
  }

  addTodo(todo: TodoInterface) {                                    //Service for adding a todo
    this.todoService.addTodo(todo).subscribe((data) => { 
      this.openSnackBar("Todo Added Successfully!");
    });
    
  }

  updateTodo(todo: TodoInterface, id: any) {                        //Service for updating a todo
    this.todoService.updateTodo(todo, id).subscribe((data) => { 
      this.openSnackBar("Todo Updated Successfully!");
    })
  }

  formatDate(date: any) {      //for formating the date in yyyy/mm/dd format
    let dd: any;
    let mm: any;
    let newDate = new Date(date);
    let yyyy = newDate.getFullYear();

    mm = newDate.getMonth() + 1;
    dd = newDate.getDate();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    return "" + yyyy + "-" + mm + "-" + dd;
  }

  editCheck() {                                               //check if user requested to Edit the todo

    if (this.activatedRoute.snapshot.params.id) {
      let id = this.activatedRoute.snapshot.params.id;
      this.todoService.getTodo(id).subscribe((data) => {      //get Todo    //Service for getting a todo
        this.todo = data;

        this.addTaskForm.patchValue({                         //fill data
          title: this.todo[0].title,
          description: this.todo[0].description,
          endDate: this.todo[0].endDate,
          status: this.todo[0].status
        })
      });
    }
  }

  cancelButton() {        //cancel the form
    this.router.navigate(['/dashboard']);
  }

  //General SnackBar
  openSnackBar(message: string) {
    this.snackBar.open(message, "",{
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

}
