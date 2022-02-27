let editButton = document.querySelector('.profile__editButton');

function editProfile() {
  alert(document.querySelector('.elements__like').getAttribute('background-image'));
}

editButton.addEventListener('click', editProfile);
