const template = `
    <div class='app-bottom-header-content'>
        <a class='app-header-icon' href='/'>
            <svg><use xlink:href="/solid.svg#house"></use></svg>
        </a>
        <a class='app-header-icon' href='/add-design/'>
            <svg><use xlink:href="/solid.svg#plus"></use></svg>
        </a>
        <a class='app-header-icon var--profile-link' href='/profile/'>
            <svg><use xlink:href="/solid.svg#circle-user"></use></svg>
        </a>
    </div>
`;

export const AppBottomHeaderBuilder = (parent) => {
    parent.innerHTML = template;
    parent.classList.add('app-bottom-header');

    const elements = {
        profileLink: parent.querySelector('.var--profile-link')
    };

    const setBottomHeaderUserId = (id) => {
        elements.profileLink.setAttribute('href', `/profile/?id=${id}`);
    };
    return { setBottomHeaderUserId };
};
