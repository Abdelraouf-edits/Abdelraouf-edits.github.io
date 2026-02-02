// Force replace Streamable watermark with personal branding
// This targets iframes and overlays custom branding
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    photoUrl: 'https://pbs.twimg.com/profile_images/1849849732967919616/jqc-61ls_400x400.jpg',
    title: 'Abdelraouf Alidrissi',
    pageUrl: 'https://x.com/abdelrauof_',
    handle: '@abdelrauof_'
  };

  // Function to hide watermark inside iframes using CSS injection
  function injectWatermarkHidingCSS() {
    const style = document.createElement('style');
    style.id = 'streamable-watermark-hider';
    style.textContent = `
      /* Hide Streamable watermark in all iframes */
      iframe[src*="streamable.com"] {
        position: relative;
      }
      
      /* Cover area where watermark appears */
      .streamable-cover-overlay {
        position: absolute !important;
        top: 16px !important;
        left: 16px !important;
        width: 200px !important;
        height: 60px !important;
        background: rgba(16, 16, 16, 0.95) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 8px !important;
        z-index: 999999 !important;
        pointer-events: none !important;
      }
    `;
    
    if (!document.getElementById('streamable-watermark-hider')) {
      document.head.appendChild(style);
    }
  }

  // Function to add custom branding overlay on Streamable iframes
  function addCustomBrandingToIframes() {
    const iframes = document.querySelectorAll('iframe[src*="streamable.com"]');
    
    iframes.forEach((iframe) => {
      // Check if already processed
      if (iframe.dataset.brandingAdded === 'true') {
        return;
      }
      
      console.log('Found Streamable iframe, adding custom branding and auto-pause...');
      
      const parent = iframe.parentElement;
      if (!parent) return;
      
      // Make parent position relative if not already
      const parentPosition = window.getComputedStyle(parent).position;
      if (parentPosition === 'static') {
        parent.style.position = 'relative';
      }

      // Add Intersection Observer to pause video when scrolled away
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              // Video is out of view, pause it by reloading iframe without autoplay
              const currentSrc = iframe.src;
              if (currentSrc.includes('autoplay=1')) {
                // Remove autoplay to pause
                iframe.src = currentSrc.replace('autoplay=1', 'autoplay=0');
                console.log('🛑 Video paused - scrolled out of view');
              }
            }
          });
        },
        { 
          threshold: 0.5, // Trigger when 50% of video is out of view
          rootMargin: '-50px' // Add some buffer
        }
      );

      observer.observe(parent);
      
      // Create custom branding overlay
      const brandingOverlay = document.createElement('div');
      brandingOverlay.className = 'custom-streamable-branding';
      brandingOverlay.style.cssText = `
        position: absolute !important;
        top: 16px !important;
        left: 16px !important;
        z-index: 999999 !important;
        pointer-events: none !important;
        opacity: 0 !important;
        transition: opacity 0.3s ease !important;
      `;

      // Create branding container
      const brandingContainer = document.createElement('div');
      brandingContainer.style.cssText = `
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        padding: 8px 16px !important;
        background: rgba(16, 16, 16, 0.95) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 8px !important;
        pointer-events: auto !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
      `;

      // Create profile photo
      const photoLink = document.createElement('a');
      photoLink.href = CONFIG.pageUrl;
      photoLink.target = '_blank';
      photoLink.rel = 'noopener noreferrer';
      photoLink.style.cssText = `
        display: block !important;
        text-decoration: none !important;
      `;

      const photo = document.createElement('img');
      photo.src = CONFIG.photoUrl;
      photo.alt = CONFIG.title;
      photo.style.cssText = `
        width: 32px !important;
        height: 32px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
        border: 2px solid #E3DBCC !important;
        transition: transform 0.2s ease !important;
        display: block !important;
      `;

      photoLink.appendChild(photo);

      // Create text container
      const textContainer = document.createElement('div');
      textContainer.style.cssText = `
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
      `;

      // Create title
      const titleLink = document.createElement('a');
      titleLink.href = CONFIG.pageUrl;
      titleLink.target = '_blank';
      titleLink.rel = 'noopener noreferrer';
      titleLink.textContent = CONFIG.title;
      titleLink.style.cssText = `
        font-size: 13px !important;
        font-weight: 600 !important;
        color: #FDFCF8 !important;
        line-height: 1.2 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        text-decoration: none !important;
        transition: color 0.2s ease !important;
      `;

      titleLink.addEventListener('mouseenter', () => {
        titleLink.style.color = '#E3DBCC !important';
      });
      titleLink.addEventListener('mouseleave', () => {
        titleLink.style.color = '#FDFCF8 !important';
      });

      // Create handle
      const handleLink = document.createElement('a');
      handleLink.href = CONFIG.pageUrl;
      handleLink.target = '_blank';
      handleLink.rel = 'noopener noreferrer';
      handleLink.textContent = CONFIG.handle;
      handleLink.style.cssText = `
        font-size: 11px !important;
        color: #E3DBCC !important;
        line-height: 1.2 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        text-decoration: none !important;
        transition: color 0.2s ease !important;
      `;

      handleLink.addEventListener('mouseenter', () => {
        handleLink.style.color = '#FDFCF8 !important';
        photo.style.transform = 'scale(1.1) !important';
      });
      handleLink.addEventListener('mouseleave', () => {
        handleLink.style.color = '#E3DBCC !important';
        photo.style.transform = 'scale(1) !important';
      });

      // Assemble everything
      textContainer.appendChild(titleLink);
      textContainer.appendChild(handleLink);
      brandingContainer.appendChild(photoLink);
      brandingContainer.appendChild(textContainer);
      brandingOverlay.appendChild(brandingContainer);

      // Insert overlay
      parent.appendChild(brandingOverlay);

      // Add hover effect to parent
      parent.addEventListener('mouseenter', () => {
        brandingOverlay.style.opacity = '1 !important';
      });

      parent.addEventListener('mouseleave', () => {
        brandingOverlay.style.opacity = '0 !important';
      });

      // Mark as processed
      iframe.dataset.brandingAdded = 'true';
      
      console.log('✅ Custom branding added successfully!');
    });
  }

  // Initialize
  function init() {
    console.log('🚀 Streamable watermark replacer loaded');
    
    // Inject CSS to hide watermark
    injectWatermarkHidingCSS();
    
    // Add custom branding
    addCustomBrandingToIframes();

    // Watch for new iframes being added
    const observer = new MutationObserver((mutations) => {
      let shouldRecheck = false;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'IFRAME' || 
              (node instanceof HTMLElement && node.querySelector('iframe[src*="streamable.com"]'))) {
            shouldRecheck = true;
          }
        });
      });
      
      if (shouldRecheck) {
        setTimeout(addCustomBrandingToIframes, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Recheck periodically for the first 10 seconds
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      addCustomBrandingToIframes();
      
      if (attempts >= 20) { // 10 seconds (20 * 500ms)
        clearInterval(interval);
      }
    }, 500);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also try on window load
  window.addEventListener('load', () => {
    setTimeout(addCustomBrandingToIframes, 1000);
  });
})();

