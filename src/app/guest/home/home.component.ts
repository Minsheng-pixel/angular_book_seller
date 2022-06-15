import { Component, OnInit } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/models/book.model';
import { Purchase } from 'src/app/models/purchase.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  bookList:Array<Book>=[];
  faBook=faBook;
  errorMessage:string="";
  infoMessage:string="";

  constructor(private authenticationService:AuthenticationService,
    private bookService:BookService,
    private purchaseService:PurchaseService) { }

  ngOnInit(): void {
      this.bookService.getAllBook().subscribe({
        next:(data)=>{
          this.bookList=data;
        }
      })
  }
  purchase(item:Book){
    if(!this.authenticationService.currentUserValue?.id){
      this.errorMessage= "you should log in to buy a book";
    }

    const purchase= new Purchase(this.authenticationService.currentUserValue.id,item.id,item.price);

    this.purchaseService.savePurchase(purchase).subscribe({
      next:(data)=>{
        this.infoMessage="mission is completed";
      },
      error:(err)=>{
        this.errorMessage="unexpected message occured";
        console.log(err);
      }
    })
  }

}
