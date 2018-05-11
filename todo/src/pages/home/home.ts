import { Component } from '@angular/core';
//AlertController is for alertController and reorderArray is for reorder the items in the todo app
//navController is a push function that allow you to go one page to other and inside the navController function you pass the page which one you go to 
import { NavController,AlertController,reorderArray,ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
     public todos=[];
     public reorderIsEnabled=false;
     //Another way to move one page to desire page is 
     public archivedTodoPage=ArchivedTodosPage;
  constructor(private toastController:ToastController,private todoProvider:TodoProvider, public navCtrl: NavController, private alertController:AlertController) {
    this.todos=this.todoProvider.getTodo();
  }
  archiveTodo(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);
  }
  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }
  toggleReorder(){
  this.reorderIsEnabled=!this.reorderIsEnabled;
  }
  itmeReordered($event){
    reorderArray(this.todos,$event);
  }

  goBackToHomePage(dltItem){
    this.todoProvider.goBackToHomePage(dltItem);
  }

  openTodoAlert(){
    let addTodoAlert=this.alertController.create({
      title: "Add a Todo",
      message:"Enter Your Todo",
      inputs:[{
        type:"text",
        name:"addTodoInput",
      }],
      buttons:[
        {
          text: "Cancel"
        },  
        {
          text: "Add to Todo",
          handler:(inputData)=>{
            let todoText;
            todoText=inputData.addTodoInput;
            //this.todos.push(todoText); // this code is just use before Todoprovider
            this.todoProvider.addTodo(todoText);

            //best practice is to use ondidDismiss function for the display toast of ending the task
            addTodoAlert.onDidDismiss(()=>{
              let addTodoToast=this.toastController.create({
                message:"Your Todo is Added",
                duration:2000
              });
              addTodoToast.present();
            });                         
          }
        }  
      ]
    });
    
    addTodoAlert.present();
}
editTodo(todoIndex){
  let editTodoAlert=this.alertController.create({
    title:"Edit A Todo",
    message:"Edit Your Todo",
    inputs:[{
      type:"text",
      name:"editTodoInput",
      value: this.todos[todoIndex]
       }
    ],
    buttons:[{
      text:"Cancel"
    },{
      //edit button
      text:"Edit Todo",
      handler:(inputData)=>{
          let editText;
          editText=inputData.editTodoInput;
          this.todoProvider.editTodo(editText,todoIndex);

          editTodoAlert.onDidDismiss(()=>{
               let editTodoToast=this.toastController.create({
                 message:"Todo Is Edited",
                 duration:2000
               });
               editTodoToast.present();
          });

      }
    }]
  });
  editTodoAlert.present();

}

}
