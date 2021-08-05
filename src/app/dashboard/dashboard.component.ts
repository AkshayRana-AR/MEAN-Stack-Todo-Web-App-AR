import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { TodoService } from '../todo.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  displayedColumns: string[] = ['title', 'description', 'endDate', 'status', 'edit', 'delete'];         //displaying columns 
  dataSource: any[] = [];                                         //for storing todos         //any due to strict typescript

  constructor(private router: Router, private dialog: MatDialog, private todoService: TodoService,private snackBar: MatSnackBar) {
    this.getTodos();                                         //Get all todos when app is initialized
  }

  getTodos() {                                              //Service for getting todos
    this.todoService.getTodos().subscribe((data) => { this.dataSource = data; })
  }

  deleteTodo(id: any) {                                     //Service for deleting a todo
    this.todoService.deleteTodo(id).subscribe((data) => { 
      this.openSnackBar("Todo Deleted Successfully!");
     })
  }

  editTask(todoId: number) {                                //edit a todo
    this.router.navigate(['/addTask/' + todoId]);
  }

  deleteTask(todoId: number) {                              //delete a Todo

    let clickedTodo = this.dataSource.find(x => x._id == todoId)  //getting which todo is clicked in form of object
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {    //open the confirm dialog
      data: {
        dialogTitle: 'Confirm Remove Todo',
        dialogMessage: "Are you sure, you want to delete a Todo with " + "Title: " + clickedTodo.title + " ?"
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {                                //Deletion Confirmed
        this.deleteTodo(todoId);
        this.getTodos();                                    //for refreshing list of todos
        //this.router.navigate(['']);
      }
    });
  }

  //General SnackBar
  openSnackBar(message: string) {
    this.snackBar.open(message,'',{
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }
}
