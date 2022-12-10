const template = `
    <nav  class='app-top-header-content'>
        <div class="app-top-header-content-profile">
            <img src="/sample-images/profilepic.png" />
        </div>
        <button class='var--app-top-header-toggle-menu app-top-header-toggle-button'><i class="fa-solid fa-bars"></i></button>
        <div class="sub-menu-wrap" id="subMenu">
            <div class="sub-menu">
                <div class="user-info">
                    <img src="/sample-images/profilepic.png" />
                    <h3>Natasha</h3>
                </div>
                <hr />

                <a href="#" class="sub-menu-link">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>Search</p>
                    <span>></span>
                </a>
                <a href="/settings/" class="sub-menu-link">
                    <i class="fa-solid fa-gear"></i>
                    <p>Settings</p>
                    <span>></span>
                </a>
                <a href="#" class="sub-menu-link">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>Bought items</p>
                    <span>></span>
                </a>
                <a href="/" class="sub-menu-link">
                    <i class="fa-solid fa-house"></i>
                    <p>Main Page</p>
                    <span>></span>
                </a>
            </div>
        </div>
    </nav>
`;

export const AppTopHeaderBuilder = (parent, id) => {
    parent.innerHTML = template;
    parent.classList.add('app-top-header');

    const elements = {
        subMenu: parent.querySelector('#subMenu'),
        toggleMenu: parent.querySelector('.var--app-top-header-toggle-menu')
    };

    console.log(elements);
    elements.toggleMenu.onclick = () => {
        console.log('click');
        elements.subMenu.classList.toggle('open-menu');
    };

    return parent;
};
