const template = `
    <div class='app-header-content'>
        <a class='app-header-icon' href='/'><i class="fa-solid fa-home"></i></a>
        <a class='app-header-icon' href='/add-design/'><i class="fa-solid fa-add"></i></a>
        <a class='app-header-icon' href='/profile/'><i class="fa-solid fa-circle-user"></i></a>
    </div>
`;

export const AppHeaderBuilder = (parent) => {
    parent.innerHTML = template;
    parent.classList.add('app-header');

    const elements = {};

    return parent;
};
