'use strict';

const MIME_TYPES = [`image/jpeg`, `image/gif`, `image/png`];

const readPhoto = (fileInput, preview, method) => {
  const file = fileInput.files[0];

  const isAllowed = MIME_TYPES.some((fileType) => file.type === fileType);

  if (isAllowed) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      switch (method) {
        case `image`:
          preview.src = reader.result;
          break;
        case `background`:
          preview.style.backgroundImage = `url(${reader.result})`;
          preview.style.backgroundSize = `cover`;
          break;
        default:
          throw new Error(`Выберите метод размещения изображения`);
      }
    });

    reader.readAsDataURL(file);
  } else {
    window.util.createRedErrorMessage(`Файл должен иметь расширение JPEG, JPG, GIF или PNG`);
  }
};

const avatarFileChooser = window.main.adForm.querySelector(`.ad-form-header__input`);
const avatarPreview = window.main.adForm.querySelector(`.ad-form-header__preview img`);
avatarFileChooser.addEventListener(`change`, () => {
  readPhoto(avatarFileChooser, avatarPreview, `image`);
});

const homePhotoFileChooser = window.main.adForm.querySelector(`.ad-form__input`);
const homePhotoPreview = window.main.adForm.querySelector(`.ad-form__photo`);
homePhotoFileChooser.addEventListener(`change`, () => {
  readPhoto(homePhotoFileChooser, homePhotoPreview, `background`);
});
