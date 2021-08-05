import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { TodoInterface } from './todoInterface';

/*interface TodoInterface {
  title: string;
  description: string;
  endDate: string;
  status: string;
  _id: number;
}*/

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }
//Future Learning Reference: https://www.dotnetcurry.com/angularjs/1438/http-client-angular
  getTodos()
  {
    const url="/api/getTodos";
    return this.http.get<TodoInterface[]>(url);
  }

  getTodo(id:any)
  {
    const url="/api/getTodo/"+id;
    return this.http.get<TodoInterface[]>(url);
  }

  deleteTodo(id:any)
  {
    const url="/api/deleteTodo/"+id;
    return this.http.delete<TodoInterface[]>(url);
  }

  updateTodo(updatedTodo:TodoInterface,id:any)
  {
    const url="/api/updateTodo/"+id;
    return this.http.patch(url,updatedTodo);
  }

  addTodo(todo:TodoInterface)
  {
    const url="/api/addTodo";
    return this.http.post(url,todo);
  }


}
