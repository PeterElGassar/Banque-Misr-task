import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidebar') sidebar: ElementRef = new ElementRef<any>(null);
  @ViewChild('menuButton') menuButton: ElementRef = new ElementRef<any>(null);
  @ViewChild('closeButton') closeButton: ElementRef = new ElementRef<any>(null);


  constructor() {
    

  }

  ngOnInit(): void {

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
