// Prevent right-click context menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// Prevent dragging images and all draggable elements
document.addEventListener('dragstart', function(e) {
  // Prevent dragging images
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
  // Prevent dragging any element with draggable attribute
  if (e.target.draggable) {
    e.preventDefault();
    return false;
  }
});

// Add draggable="false" to all images when DOM loads and when new images are added
function disableImageDragging() {
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    images[i].setAttribute('draggable', 'false');
    images[i].style.userSelect = 'none';
    images[i].style.webkitUserDrag = 'none';
    images[i].style.webkitUserSelect = 'none';
    images[i].style.mozUserSelect = 'none';
    images[i].style.msUserSelect = 'none';
    // Prevent mouse down for dragging
    images[i].addEventListener('mousedown', function(e) {
      e.preventDefault();
      return false;
    });
  }
}

// Run on page load
window.addEventListener('load', disableImageDragging);
// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', disableImageDragging);
} else {
  disableImageDragging();
}

// Watch for dynamically added images
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach(function(node) {
        if (node.tagName === 'IMG') {
          node.setAttribute('draggable', 'false');
          node.style.userSelect = 'none';
          node.style.webkitUserDrag = 'none';
        }
        if (node.getElementsByTagName) {
          const images = node.getElementsByTagName('img');
          for (let i = 0; i < images.length; i++) {
            images[i].setAttribute('draggable', 'false');
            images[i].style.userSelect = 'none';
            images[i].style.webkitUserDrag = 'none';
          }
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Prevent drag and drop
document.addEventListener('drop', function(e) {
  e.preventDefault();
  return false;
});

document.addEventListener('dragover', function(e) {
  e.preventDefault();
  return false;
});

// Optional: Prevent common keyboard shortcuts for opening dev tools
document.addEventListener('keydown', function(e) {
  // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
    (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
    (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
    (e.ctrlKey && e.keyCode === 85) // Ctrl+U
  ) {
    e.preventDefault();
    return false;
  }
});
