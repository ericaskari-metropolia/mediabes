const template = `
    <div class='app-loading-indicator-content'>
        <img src='/loading.svg' />
    </div>
`;

export const AppLoadingIndicatorBuilder = (parent) => {
    parent.classList.add('app-loading-indicator');

    const showLoading = () => {
        parent.innerHTML = template;
    };

    const hideLoading = () => {
        parent.innerHTML = '';
    };
    return { showLoading, hideLoading };
};
