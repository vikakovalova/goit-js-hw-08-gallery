const galleryItems = [
{
    preview:
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
},
{
    preview:
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
},
{
    preview:
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
},
{
    preview:
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
},
{
    preview:
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
},
{
    preview:
    'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
},
{
    preview:
    'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
},
{
    preview:
    'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
},
{
    preview:
    'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
    'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
},
];
// _________________________________________________________
// 1

const galleryRef = document.querySelector('.js-gallery');
const inModalGallery = document.querySelector('.lightbox__content');
galleryRef.addEventListener('click', onGalleryItemClick);
const modalRef = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]');
closeBtnRef.addEventListener('click', onModalClose);
const overlayRef = document.querySelector('.lightbox__overlay');
overlayRef.addEventListener('click', onOverlayClick);

const imagesMarkup = createImagesMarkup(galleryItems);
    
function createImagesMarkup(items) {
    return items.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    />
    </a>
    </li>
    `
    }).join('');
};

galleryRef.insertAdjacentHTML('afterbegin', imagesMarkup);


// __________________________________________________________________
// 2

function onGalleryItemClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    originalSizeImageMarkup(event);
    modalOpen();
    onImageSrcAttrChange(event);
}

function originalSizeImageMarkup(event) {
    return event.target.dataset.source;
}
// __________________________________
// 3

function modalOpen() {
    window.addEventListener('keydown', onEscapeKeyPress);
    modalRef.classList.add('is-open');
}
// ____________________________________
// 4.
function onImageSrcAttrChange(event) {
    modalImage.src = event.target.dataset.source;
    modalImage.alt = event.target.alt;

}
// _________________________________
// 5. 
function onModalClose() {
    modalRef.classList.remove('is-open');
    modalImage.src = '';
    window.removeEventListener('keydown', onEscapeKeyPress);
};

// _________________________________
// 6. 
function onOverlayClick(event) {
    if (event.currentTarget === event.target) {
        onModalClose();
    }
};
// _________________________________
// 7. 

function onEscapeKeyPress(event) {
    if (event.code === "Escape") {
        onModalClose();
    }
}

// _______________________________
// 8.

let originalImagesSrcSet = [];
galleryItems.forEach(item => {
    originalImagesSrcSet.push(item.original);
});

document.addEventListener('keydown', event => {
    const currentIndex = originalImagesSrcSet.indexOf(modalImage.src);
    if (event.code === 'ArrowRight') {
        onRightClick(currentIndex);
    };
    if (event.code === 'ArrowLeft') {
        onLeftClick(currentIndex);
    }
});

function onRightClick(currentIndex) {
    let nextIndex = currentIndex + 1;
    if (nextIndex === originalImagesSrcSet.length) {
        nextIndex = 0;
    }
    modalImage.src = originalImagesSrcSet[nextIndex];
}

function onLeftClick(currentIndex) {
    let nextIndex = currentIndex - 1;
    if (nextIndex === -1) {
        nextIndex = originalImagesSrcSet.length - 1;
    }
    modalImage.src = originalImagesSrcSet[nextIndex];
}