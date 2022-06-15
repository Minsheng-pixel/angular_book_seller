import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bookList:Array<Book>=[];
  selectedbook:Book=new Book();
  errorMessage:string ="";
  @ViewChild(BookComponent) child:BookComponent | undefined;
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.getAllBook().subscribe({
      next:(data)=>{
        this.bookList = data;//reload the page of book list after a refresh
      }
    });
  }

  createBookRequest(){
    this.selectedbook = new Book();
    this.child?.showBookModal();
  }
  editBookRequest(item:Book){
    this.selectedbook = Object.assign({},item);//copy a new object
    this.child?.showBookModal();
  }

  saveBookWatcher(book:Book){
    let itemIndex =this.bookList.findIndex(item=>item.id===book.id)
    if(itemIndex !==-1){
      this.bookList[itemIndex]=book;
    }else{
      this.bookList.push(book);
    }
    //determine if it is update action or create action
  }
  deleteBook(item:Book, ind:number){
    this.bookService.deleteBook(item).subscribe({
      next:(data)=>{
        this.bookList.splice(ind,1);
      },
      error:(err)=>{
        this.errorMessage="unexpected error occurred.";
        console.log(err);
      }
    });
  }
}
