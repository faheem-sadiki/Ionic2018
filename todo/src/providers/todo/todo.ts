import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  private todos= [];
  //Create a array to hold the todo items after deletion desire item from todos array
  public archiveTodos=[];
  public recoverArray=[];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }
  archiveTodo(todoIndex){
   let todoToBeArchive=this.todos[todoIndex];
   this.todos.splice(todoIndex,1);
   this.archiveTodos.push(todoToBeArchive);
  }
  goBackToHomePage(dltItem){
   let recoverdata=this.archiveTodos[dltItem];
   this.archiveTodos.splice(dltItem,1);
   this.recoverArray.push(recoverdata);
  }
  
  getTodo(){
    return this.todos;
  }
  addTodo(todo){
   this.todos.push(todo);
  }
  getArchivedTodo(){
    return this.archiveTodos;
  }
  editTodo(todo,todoIndex){
    this.todos[todoIndex]=todo;
  }

}
