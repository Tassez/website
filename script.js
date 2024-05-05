const lightboxEnabled = document.querySelectorAll('.lightbox-enabled');
const lightboxArray = Array.from(lightboxEnabled);

const lightboxContainer = document.querySelector('.lightbox-container');

const lightboxImage = document.querySelector('.lightbox-img');

const lightboxBtn = document.querySelectorAll('.lightbox-btn');
const lightboxBtnRight = document.querySelector('#right');
const lightboxBtnLeft = document.querySelector('#left');

let activeImage;

const showLightbox = () => {lightboxContainer.classList.add('active');}
const hideLightbox = () => {lightboxContainer.classList.remove('active');}

const setActiveImage = (image) => {
  lightboxImage.src = image.dataset.imagesrc;
  activeImage = lightboxArray.indexOf(image);
}

const transitionSlidesLeft = () => {
  lightboxBtnLeft.focus();
  activeImage == 0 ? setActiveImage(lightboxArray[lightboxArray.length - 1]) :
    setActiveImage(lightboxArray[activeImage-1])
  removeBtnAnimation();
}

const transitionSlidesRight = () => {
  lightboxBtnRight.focus();
  activeImage == (lightboxArray.length - 1) ? setActiveImage(lightboxArray[0]) :
    setActiveImage(lightboxArray[activeImage+1])
  removeBtnAnimation();
}

const transitionSlideHandler = (moveItem) => {
  moveItem.includes('left') ? transitionSlidesLeft() : transitionSlidesRight();
}

const removeBtnAnimation = () => {
  lightboxBtn.forEach(btn => {
    setTimeout(function(){btn.blur()}, 220);
  })
}



lightboxEnabled.forEach(image => {
  image.addEventListener('click', (e) => {
    showLightbox()
    setActiveImage(image)
  })
})

lightboxContainer.addEventListener('click', () => {
    hideLightbox()
})

lightboxBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    transitionSlideHandler(e.currentTarget.id);
  })
})


window.addEventListener('keydown', (e) => {
  if (!lightboxContainer.classList.contains('active')) return;
  if (e.key.includes('Left') || e.key.includes('Right')) {
    e.preventDefault();
    transitionSlideHandler(e.key.toLowerCase());
  }
})



let narrowScreen;
const collages = document.querySelectorAll('.containerCollage');

function addCollageSize(){
  collages.forEach(collage => {
    let ratios = 0;
    let columns = 0;
    let images = collage.getElementsByTagName('img');

    for (const image of images) {
      ratios += image.naturalWidth / image.naturalHeight;
      columns++;
    }

    for (const image of images) {
      image.setAttribute('style', 'height: calc(min(100vw, 1200px)/' + ratios + ')');
    }

    collage.setAttribute('style', 'grid-template-columns:' + ' auto'.repeat(columns));

    narrowScreen = false;
  })
}
 addCollageSize();
/*
function removeCollageSize(){
  collages.forEach(collage => {
    let images = collage.getElementsByTagName('img');
    
    for (const image of images) {
      image.removeAttribute('style', 'height');
    }

    collage.setAttribute('style', 'grid-template-columns:' + ' auto'.repeat(columns));

    narrowScreen = true;
  })
}

function updateCollageSize() {
  if (window.innerWidth > 700 &&  narrowScreen) {
    addCollageSize();
    
  } else if (window.innerWidth <= 700 && !narrowScreen) {
    removeCollageSize();
  }
};

function setupCollageSize() {
  if (window.innerWidth > 700) {
    addCollageSize();
    
  } else if (window.innerWidth <= 700) {
    removeCollageSize();
  }
};

setupCollageSize();

window.onresize = updateCollageSize;
*/
