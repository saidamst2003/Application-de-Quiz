import { Component, ElementRef, HostListener, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  
  constructor(
    private router: Router, 
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    // Monitor route changes to update active state
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.setActiveLink();
        this.updateHoriSelector();
      });
    });
  }
  
  ngAfterViewInit(): void {
    // Initialize after view is loaded
    setTimeout(() => {
      this.updateHoriSelector();
      this.setupClickListeners();
    });
    
    // Handle navbar toggle for mobile
    const navbarToggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
    const navbarCollapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
      this.renderer.listen(navbarToggler, 'click', () => {
        // Toggle navbar collapse
        const isVisible = navbarCollapse.style.display === 'block';
        this.renderer.setStyle(navbarCollapse, 'display', isVisible ? 'none' : 'block');
        
        setTimeout(() => {
          this.updateHoriSelector();
        });
      });
    }
  }
  
  @HostListener('window:resize')
  onResize(): void {
    // Handle resize events
    setTimeout(() => {
      this.updateHoriSelector();
    }, 500);
  }
  
  updateHoriSelector(): void {
    const navbarSupportedContent = this.elementRef.nativeElement.querySelector('#navbarSupportedContent');
    if (!navbarSupportedContent) return;
    
    const activeItem = navbarSupportedContent.querySelector('.active');
    if (!activeItem) return;
    
    const horiSelector = this.elementRef.nativeElement.querySelector('.hori-selector');
    if (!horiSelector) return;
    
    const activeRect = activeItem.getBoundingClientRect();
    const navRect = navbarSupportedContent.getBoundingClientRect();
    
    // Calculate the position relative to the navbar
    const top = activeItem.offsetTop;
    const left = activeItem.offsetLeft;
    const height = activeRect.height;
    const width = activeRect.width;
    
    this.renderer.setStyle(horiSelector, 'top', `${top}px`);
    this.renderer.setStyle(horiSelector, 'left', `${left}px`);
    this.renderer.setStyle(horiSelector, 'height', `${height}px`);
    this.renderer.setStyle(horiSelector, 'width', `${width}px`);
  }
  
  setActiveLink(): void {
    // Get current URL path
    let path: string = this.router.url.split('/').pop() || '';
    
    // Account for home page with empty path
    if (path === '') {
      path = 'home'; // Adjust based on your route configuration
    }
    
    const navbarSupportedContent = this.elementRef.nativeElement.querySelector('#navbarSupportedContent');
    if (!navbarSupportedContent) return;
    
    // Remove active class from all items
    const items = navbarSupportedContent.querySelectorAll('ul li');
    items.forEach((item: Element) => {
      this.renderer.removeClass(item, 'active');
    });
    
    // Find and activate the correct link
    const target = navbarSupportedContent.querySelector(`ul li a[href="/${path}"]`);
    if (target) {
      const parentLi = target.parentElement;
      if (parentLi) {
        this.renderer.addClass(parentLi, 'active');
      }
    }
  }
  
  setupClickListeners(): void {
    const navbarSupportedContent = this.elementRef.nativeElement.querySelector('#navbarSupportedContent');
    if (!navbarSupportedContent) return;
    
    const liItems = navbarSupportedContent.querySelectorAll('ul li');
    
    liItems.forEach((li: Element) => {
      this.renderer.listen(li, 'click', (event) => {
        // Remove active class from all items
        liItems.forEach((item: Element) => {
          this.renderer.removeClass(item, 'active');
        });
        
        // Add active class to clicked item
        this.renderer.addClass(li, 'active');
        
        // Update horizontal selector position
        const rect = li.getBoundingClientRect();
        const navRect = navbarSupportedContent.getBoundingClientRect();
        
        const horiSelector = this.elementRef.nativeElement.querySelector('.hori-selector');
    
      });
    });
  }
}