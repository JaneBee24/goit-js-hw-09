import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { images } from "./gallery-items.js";

const galleryContainer = document.querySelector('.gallery');

function createGalleryMarkup(images) {
    return images.map(({ preview, original, description }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${original}">
                <img 
                    class="gallery-image" 
                    src="${preview}" 
                    alt="${description}" 
                />
            </a>
        </li>
    `).join('');
}

galleryContainer.innerHTML = createGalleryMarkup(images);

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
