var openPhotoSwipe = function() {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    // build items array
    var items = [
        {
            src: 'img/a1.jpg'
        },
        {
            src: 'img/a2.jpg'
        }
    ];
    // define options (if needed)
    var options = {
			 // history & focus options are disabled on CodePen        
      	history: false,
      	focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
        
    };
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};
openPhotoSwipe();

document.getElementById('btn').onclick = openPhotoSwipe;