/**
 * ITALOIL Theme JavaScript
 */

// Theme utility functions
const theme = {
  // Initialize all theme functions
  init() {
    this.initMobileMenu();
    this.initCartDrawer();
    this.initProductForm();
    this.initNewsletterForm();
  },

  // Mobile menu toggle
  initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    if (!menuToggle) return;

    menuToggle.addEventListener('click', function() {
      // Mobile menu functionality can be enhanced here
      console.log('Mobile menu toggled');
    });
  },

  // Cart drawer functionality
  initCartDrawer() {
    const cartIcon = document.getElementById('cart-icon');
    const cartDrawer = document.querySelector('.cart-drawer');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartClose = document.querySelector('.cart-drawer__close');

    if (!cartIcon || !cartDrawer) return;

    // Open cart drawer
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      cartDrawer.classList.add('active');
      if (cartOverlay) cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close cart drawer
    const closeCart = () => {
      cartDrawer.classList.remove('active');
      if (cartOverlay) cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (cartClose) {
      cartClose.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeCart);
    }
  },

  // Product form handling
  initProductForm() {
    const productForms = document.querySelectorAll('form[action*="/cart/add"]');
    
    productForms.forEach(form => {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Adding...';
        }

        try {
          const response = await fetch(window.routes.cart_add_url, {
            method: 'POST',
            body: formData
          });

          const data = await response.json();

          if (response.ok) {
            // Update cart count
            const cartCount = document.getElementById('cart-count');
            if (cartCount) {
              fetch('/cart.js')
                .then(res => res.json())
                .then(cart => {
                  cartCount.textContent = cart.item_count;
                });
            }

            // Show success message
            if (submitButton) {
              submitButton.textContent = 'Added!';
              setTimeout(() => {
                submitButton.textContent = 'Add to Cart';
                submitButton.disabled = false;
              }, 2000);
            }

            // Optional: Open cart drawer
            // const cartDrawer = document.querySelector('.cart-drawer');
            // if (cartDrawer) {
            //   cartDrawer.classList.add('active');
            // }
          } else {
            throw new Error(data.description || 'Error adding to cart');
          }
        } catch (error) {
          console.error('Error:', error);
          if (submitButton) {
            submitButton.textContent = 'Error - Try Again';
            submitButton.disabled = false;
          }
          alert(error.message || 'Error adding item to cart');
        }
      });
    });
  },

  // Newsletter form handling
  initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        // Basic validation is handled by browser
        // Additional handling can be added here
      });
    });
  }
};

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => theme.init());
} else {
  theme.init();
}

// Update cart count on page load
window.addEventListener('load', function() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    fetch('/cart.js')
      .then(res => res.json())
      .then(cart => {
        cartCount.textContent = cart.item_count;
      })
      .catch(err => console.error('Error fetching cart:', err));
  }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
  const target = e.target.closest('a[href^="#"]');
  if (target) {
    const href = target.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
});
