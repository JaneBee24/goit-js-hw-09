import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const images = [
    { preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg', original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg', description: 'Hokkaido Flower' },
    { preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg', original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg', description: 'Container Haulage Freight' },
    { preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg', original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg', description: 'Aerial Beach View' }
];

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = images.map(({ preview, original, description }) => `
    <li class="gallery-item">
        <a class="gallery-link" href="${original}">
            <img class="gallery-image" src="${preview}" alt="${description}" />
        </a>
    </li>
`).join('');

galleryContainer.innerHTML = galleryMarkup;

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    enableKeyboard: true
});

// 2-form.js
const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';
let formData = { email: '', message: '' };

const savedData = localStorage.getItem(storageKey);
if (savedData) {
    formData = JSON.parse(savedData);
    form.email.value = formData.email;
    form.message.value = formData.message;
}

form.addEventListener('input', (event) => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(storageKey, JSON.stringify(formData));
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }
    console.log(formData);
    localStorage.removeItem(storageKey);
    formData = { email: '', message: '' };
    form.reset();
});
