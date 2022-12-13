const template = `
    <div class='app-bottom-header-content'>
        <a class='app-header-icon' href='/'><i class="fa-solid fa-home"></i></a>
        <a class='app-header-icon' href='/add-design/'><i class="fa-solid fa-add"></i></a>
        <a class='app-header-icon var--profile-link' href='/profile/'><i class="fa-solid fa-circle-user"></i></a>
    </div>
`;

export const AppBottomHeaderBuilder = (parent, id) => {
    parent.innerHTML = template;
    parent.classList.add('app-header');

    const elements = {
        profileLink: parent.querySelector('.var--profile-link')
    };

    elements.profileLink.setAttribute('href', `/profile/?id=${id}`);

    return parent;
};
