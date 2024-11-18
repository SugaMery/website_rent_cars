import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Title, Meta } from '@angular/platform-browser'; // Import Title and Meta services
import { isPlatformBrowser } from '@angular/common';

declare var $: any;
declare var Swiper: any;
declare var WOW: any;

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  blog: any; // Object to hold blog data

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private titleService: Title, // Inject Title service
    private metaService: Meta ,
    @Inject(PLATFORM_ID) private platformId: any  // Inject Meta service
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScripts(); // Call to load scripts in the browser
    } 
    // Subscribe to route parameters and fetch blog details based on the blogId
    this.route.queryParams.subscribe(params => {
      const blogId = this.route.snapshot.paramMap.get('id');
     // console.log("iddd", blogId);
      if (blogId) {
        this.fetchBlogDetail(blogId);
      }
    });
  }

  loadScripts(): void {
    const scripts = [
      '/assets/js/jquery-3.7.1.min.js',
      '/assets/js/jquery-ui.js',
      '/assets/js/bootstrap.min.js',
      '/assets/js/validator.min.js',
      
      '/assets/js/swiper-bundle.min.js',
      '/assets/js/jquery.waypoints.min.js',
      '/assets/js/jquery.counterup.min.js',
      '/assets/js/jquery.magnific-popup.min.js',
      '/assets/js/SmoothScroll.js',
      '/assets/js/parallaxie.js',
      '/assets/js/gsap.min.js',
      '/assets/js/SplitText.js',
      '/assets/js/ScrollTrigger.min.js',
      '/assets/js/jquery.mb.YTPlayer.min.js',
      '/assets/js/wow.js',
      '/assets/js/function.js'
    ];

    this.loadScriptArray(scripts);
  }

  loadScriptArray(scripts: string[]): void {
    let loadedScripts = 0;
    scripts.forEach(scriptSrc => {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.onload = () => {
        console.log(`Script loaded successfully: ${scriptSrc}`);
        loadedScripts++;
        if (loadedScripts === scripts.length) {
          this.initializePlugins();  // Initialize plugins after all scripts have been loaded
        }
      };
      script.onerror = (error) => {
        console.error(`Error loading script: ${scriptSrc}`, error);
      };
      // Ensure DOM manipulation only happens in the browser
      if (isPlatformBrowser(this.platformId)) {
        document.body.appendChild(script);
      }
    });
  }
  initializePlugins(): void {
    if (typeof $.fn.slicknav === 'function') {
      $('#menu').slicknav();  // Initialize slicknav on a menu with id "menu"
     // console.log('SlickNav initialized');
    }

    if (typeof Swiper === 'function') {
      new Swiper('.swiper-container', {
        autoplay: true,
        navigation: true,
        pagination: { clickable: true },
      });
      //console.log('Swiper initialized');
    }

    if (typeof WOW === 'function') {
      new WOW().init();
     // console.log('WOW.js initialized');
    }
  }

  fetchBlogDetail(blogId: string): void {
    this.blogService.getBlogById(Number(blogId)).subscribe(data => {
     // console.log("dattaaaaa", data);
      this.blog = data;

      // Update the page title and meta description dynamically
      this.updateMetaTags();
    });
  }

  // Update the title and meta description for SEO
  updateMetaTags(): void {
    if (this.blog) {
      // Update the page title
      this.titleService.setTitle(this.blog.title);

      // Update meta description
      this.metaService.updateTag({ name: 'description', content: this.blog.metaDescription });
      
      // Optionally, you can update other meta tags, such as keywords or social media meta tags.
    }
  }
}
