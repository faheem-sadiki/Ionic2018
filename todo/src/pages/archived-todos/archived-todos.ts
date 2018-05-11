import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoProvider } from "../../providers/todo/todo";
import{HomePage} from '../home/home';
/**
 * Generated class for the ArchivedTodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-archived-todos',
  templateUrl: 'archived-todos.html',
})
export class ArchivedTodosPage {
  public homePage=HomePage;
  //this is array to get the vaules deleted to store in this array the purpose of this to show values in archive page
  public archivedDeletedItems=[];
  constructor(private todoProvider:TodoProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.archivedDeletedItems=this.todoProvider.getArchivedTodo();
  }
  //Clear all Archive list data
  public Clear(): void {
  this.archivedDeletedItems.splice(null);
}
//add back to home page list data that we want not to delete
goBackToHomePage(dltItem){
  this.todoProvider.goBackToHomePage(dltItem);
}
}