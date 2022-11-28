export class LoadingIndicator {
    static init = () => {
        const body = document.getElementsByTagName('body')[0];
        const head = document.getElementsByTagName('head')[0];
        const div = document.createElement('div');
        div.innerHTML = "<img src='/loading.svg' />";
        div.classList.add('loading-indicator');
        div.setAttribute('visible', 'false');

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/loading-indicator/loading-indicator.css';

        head.appendChild(link);
        body.appendChild(div);
        return new LoadingIndicator();
    };

    show = async () => {
        const elements = document.getElementsByClassName('loading-indicator');
        if (elements.length > 0) {
            const el = elements[0];
            el.setAttribute('visible', 'true');
        }
        await this.wait(1000);
    };

    hide = () => {
        const elements = document.getElementsByClassName('loading-indicator');
        if (elements.length > 0) {
            const el = elements[0];
            el.setAttribute('visible', 'false');
        }
    };

    wait = async (time) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    };
}
