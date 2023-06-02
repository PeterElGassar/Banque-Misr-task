import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,OnChanges{
  @ViewChild('sidebar') sidebar: ElementRef = new ElementRef<any>(null);
  @ViewChild('menuButton') menuButton: ElementRef = new ElementRef<any>(null);
  @ViewChild('closeButton') closeButton: ElementRef = new ElementRef<any>(null);

  @Input() fromCurrency: string='EUR';
  @Input() toCurrency: string="USD";
  @Input() amount: number=1;

  constructor() {
    

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    // Handle changes to the 'data' input property
    if (changes) {
      console.log('Data has changed:', changes);
      // Perform any additional actions or logic based on the change
    }
  }



  openMenu() {
    this.sidebar.nativeElement.style.display = "flex";
    this.sidebar.nativeElement.style.animation = "";
    this.sidebar.nativeElement.style.animation = "sidebarIn 1s 0s forwards";
  }
  
   closeMenu() {
    this.sidebar.nativeElement.style.animation = "";
    this.sidebar.nativeElement.style.animation = "sidebarOut 1s 0s forwards";
    setTimeout(close, 1200);
  }
  
   close() {
    this.sidebar.nativeElement.style.display = "none";
  }
  
}
