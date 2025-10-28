const dialog = document.querySelector('dialog');
const addButton = document.querySelector('.add-book');
const submitBtn = document.querySelector('.submit');

addButton.addEventListener('click', () => {
    dialog.showModal();
});

submitBtn.addEventListener('click', () => {
    dialog.close();
});