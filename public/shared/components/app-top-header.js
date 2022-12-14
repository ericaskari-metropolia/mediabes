const template = `
    <nav  class='app-top-header-content'>
        <a class='app-top-header-content-profile' href='/profile/'>
            <img class='var-top-header-profile-img' src='/profile.png' />
        </a>
        <button class='var--app-top-header-toggle-menu app-top-header-toggle-button'>
            <svg><use xlink:href="/solid.svg#bars"></use></svg>
        </button>
        <div class='app-top-header-sub-menu-wrap' id='subMenu'>
            <div class='app-top-header-sub-menu'>
                <a class='app-top-header-user-info' href='/profile/'>
                    <img class='var-top-header-menu-profile-img' src='/profile.png' />
                    <h3>Natasha</h3>
                </a>
                <hr />

                <a href='/search/' class='app-top-header-sub-menu-link'>
                    <i class='fa-solid fa-magnifying-glass'></i>
                    <p>Search</p>
                    <span>></span>
                </a>
                <a href='/settings/' class='app-top-header-sub-menu-link'>
                    <i class='fa-solid fa-gear'></i>
                    <p>Settings</p>
                    <span>></span>
                </a>
                <a href='#' class='app-top-header-sub-menu-link'>
                    <i class='fa-solid fa-cart-shopping'></i>
                    <p>Bought items</p>
                    <span>></span>
                </a>
                <a href='/' class='app-top-header-sub-menu-link'>
                    <i class='fa-solid fa-house'></i>
                    <p>Main Page</p>
                    <span>></span>
                </a>
            </div>
        </div>
    </nav>
`;

export const AppTopHeaderBuilder = (parent) => {
    parent.innerHTML = template;
    parent.classList.add('app-top-header');

    const updateTopHeaderAvatar = (url) => {
        elements.profileImage.setAttribute('src', url);
        elements.menuProfileImage.setAttribute('src', url);
    };

    const elements = {
        profileImage: parent.querySelector('.var-top-header-profile-img'),
        menuProfileImage: parent.querySelector('.var-top-header-menu-profile-img'),
        subMenu: parent.querySelector('#subMenu'),
        toggleMenu: parent.querySelector('.var--app-top-header-toggle-menu')
    };

    elements.toggleMenu.onclick = () => {
        console.log('click');
        elements.subMenu.classList.toggle('open-menu');
    };

    return {
        updateTopHeaderAvatar
    };
};
