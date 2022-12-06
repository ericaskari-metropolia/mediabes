const template = document.createElement('template');
template.innerHTML = `
<style>
    .fa {
        width: 1rem;
        height: 1rem;
        fill: var(--text-color);
    }
    .icon-button {
        transition: all 0.2s;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        cursor: pointer;
        border: 1px solid var(--text-color);
        color: var(--text-color);
     }
    .icon-button:hover {
        background-color:var(--text-color);
    }
    .icon-button:hover > svg {
        fill: white;
    }
    
     
    
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
    
    .card-image-wrap {
        position: relative;
        justify-self: center;
        align-self: center;
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
    }
    
    /*https://spin.atomicobject.com/2015/07/14/css-responsive-square/*/
    .card-image-wrap:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    
    .card-image {
        object-fit: cover;
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    .card-panel-text {
        padding: 1rem 0;
        align-self: center;
        font-weight: lighter;
        font-size: 0.9rem;
    }
    .card-panel {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        color: var(--text-color);
    }
    .card-panel-buy,
    .card-panel-likes {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 0 1rem;
    }
    .card-panel-likes > div, 
    .card-panel-buy > div{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    
    }
    .card-panel-buy > button {
        transition: all 0.2s;
        border-radius: 10px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: transparent;
        border: 1px solid var(--text-color);
        color: var(--text-color);
        outline: none
    }

    
    .card-panel-buy > button:hover {
        background-color:var(--text-color);
        color: white;
    }
    
    .card-profile {
        padding: 0.5rem;
        border-radius: 1rem;
        display: flex;
        gap: 1rem;
    }
    .card-profile-image {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        border-radius: 50%;
    }
    .card-profile-info-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.2rem;
        padding: 0.2rem;
    }
    .card-profile-info-wrap > small:last-child {
        color: rgba(0, 0, 0, 0.5);
    }
</style>

<div class="card">
<script defer src="/fontawesome-free-6.2.1-web/js/all.js"></script>
    <div class="card-profile">
        <div>
            <img class="card-profile-image" id='img-profile-source' src="/sample-images/horse.jpg" alt="Profile picture" />
        </div>
        <div class="card-profile-info-wrap">
            <b id='name'>SomeOne</b>
            <small><b id='username'>@username</b></small>
        </div>
    </div>

    <div class="card-image-wrap">
        <img class="card-image" id='img-source' src="/sample-images/flowers.jpg" alt="Flowers" />
    </div>

    <div class="card-panel-text">
        <b>SomeOne</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis eligendi est
        non quasi quos voluptatem. Dolor harum pariatur suscipit.
    </div>

    <div class="card-panel">
        <div class="card-panel-likes">
            <div>
                <button class='icon-button' id='comment-button'>
                    <svg class='fa'><use xlink:href="/regular.svg#message"></use></svg>
                </button>
            </div>
            <div>
                <button class='icon-button' id='heart-button'>
                    <svg class='fa' ><use id='like-heart-icon' xlink:href="/regular.svg#heart"></use></svg>
                </button>
                <small><b id='like-heart-count'>1000</b></small>
            </div>
        </div>
        <div class="card-panel-buy">
            <div>
                <small><b id='price'>1000</b></small>
                <svg class='fa'><use xlink:href="/solid.svg#euro-sign"></use></svg>
            </div>
            <button id='buy-button'>
                <i class="fa-solid fa-cart-shopping"></i> <small><b>BUY</b></small>
            </button>
        </div>
    </div>

</div>
`;

/**
 * Simple object for attributes to convert from string to wanted format.
 */
const attrHelper = (cl, attrName, type = 'string') => ({
    setValue: (value) => {
        if (type === 'string') {
            cl.setAttribute(attrName, value);
        } else {
            cl.setAttribute(attrName, `${value}`);
        }
    },
    getValue: () => {
        if (type === 'boolean') {
            return cl.getAttribute(attrName) === 'true';
        }
        if (type === 'number') {
            return parseInt(cl.getAttribute(attrName));
        }
        return cl.getAttribute(attrName);
    }
});

/**
 * An object containing all the attributes used by component.
 */
const appAttrBuilder = (el) => ({
    onCommentClickListenerId: attrHelper(el, 'on-comment-click-listener-id', 'string'),
    onHeartClickListenerId: attrHelper(el, 'on-heart-click-listener-id', 'string'),
    onBuyClickListenerId: attrHelper(el, 'on-buy-click-listener-id', 'string'),
    price: attrHelper(el, 'price', 'number'),
    name: attrHelper(el, 'name', 'string'),
    username: attrHelper(el, 'username', 'string'),
    imgSource: attrHelper(el, 'img-source', 'string'),
    imgProfileSource: attrHelper(el, 'img-profile-source', 'string'),
    isLiked: attrHelper(el, 'is-liked', 'boolean'),
    likeCount: attrHelper(el, 'like-count', 'string')
});

export class DesignCard extends HTMLElement {
    /**
     * An object containing all the element references used by component.
     */
    elements = {
        commentButton: () => this.shadowRoot.querySelector('#comment-button'),
        heartButton: () => this.shadowRoot.querySelector('#heart-button'),
        buyButton: () => this.shadowRoot.querySelector('#buy-button'),
        price: () => this.shadowRoot.querySelector('#price'),
        name: () => this.shadowRoot.querySelector('#name'),
        username: () => this.shadowRoot.querySelector('#username'),
        imgSource: () => this.shadowRoot.querySelector('#img-source'),
        imgProfileSource: () => this.shadowRoot.querySelector('#img-profile-source'),
        likeHeartIconSvg: () => this.shadowRoot.querySelector('#like-heart-icon'),
        likeHeartCount: () => this.shadowRoot.querySelector('#like-heart-count')
    };

    /**
     * An object containing all the attributes used by component.
     */
    appAttributes = appAttrBuilder(this);

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        this.elements.commentButton().addEventListener('click', () => {
            window?.appClickListeners?.[this.appAttributes.onCommentClickListenerId.getValue()](this);
        });
        this.elements.heartButton().addEventListener('click', () => {
            window?.appClickListeners?.[this.appAttributes.onHeartClickListenerId.getValue()](this);
        });
        this.elements.buyButton().addEventListener('click', () => {
            window?.appClickListeners?.[this.appAttributes.onBuyClickListenerId.getValue()](this);
        });
        this.elements.imgSource().addEventListener('dblclick', () => {
            window?.appClickListeners?.[this.appAttributes.onHeartClickListenerId.getValue()](this);
        });

        this.elements.price().innerText = this.appAttributes.price.getValue();
        this.elements.name().innerText = this.appAttributes.name.getValue();
        this.elements.username().innerText = this.appAttributes.username.getValue();
        this.elements.imgSource().setAttribute('src', this.appAttributes.imgSource.getValue());
        this.elements.imgProfileSource().setAttribute('src', this.appAttributes.imgProfileSource.getValue());

        this.refreshHeartIconStatus();
        this.elements.likeHeartCount().innerText = this.appAttributes.likeCount.getValue();
    }

    // noinspection JSUnusedGlobalSymbols
    disconnectedCallback() {
        this.elements.commentButton().removeAllListeners();
        this.elements.heartButton().removeAllListeners();
        this.elements.buyButton().removeAllListeners();
    }

    refreshHeartIconStatus(attrValue = this.appAttributes.isLiked.getValue()) {
        this.elements
            .likeHeartIconSvg()
            .setAttribute('xlink:href', attrValue ? '/solid.svg#heart' : '/regular.svg#heart');
    }

    static factory(
        {
            name,
            username,
            imgProfileSource,
            imgSource,
            price,
            likeCount,
            isLiked,
            onBuyClick,
            onHeartClick,
            onCommentClick
        } = {
            name: '-',
            username: '-',
            imgProfileSource: '-',
            imgSource: '-',
            price: 0,
            likeCount: 0,
            isLiked: false,
            onBuyClick: (designCard) => {},
            onHeartClick: (designCard) => {},
            onCommentClick: (designCard) => {}
        }
    ) {
        const el = document.createElement(`app-design-card`);
        const attributes = appAttrBuilder(el);

        window.appClickListeners = window.appClickListeners ?? {};

        {
            //  ID generator
            const [onBuyClickListenerId, onHeartClickListenerId, onCommentClickListenerId] = new Array(3)
                .fill(Date.now())
                .map((x, i) => `${x}-${i}`);

            window.appClickListeners[onBuyClickListenerId] = onBuyClick;
            attributes.onBuyClickListenerId.setValue(onBuyClickListenerId);

            window.appClickListeners[onHeartClickListenerId] = onHeartClick;
            attributes.onHeartClickListenerId.setValue(onHeartClickListenerId);

            window.appClickListeners[onCommentClickListenerId] = onCommentClick;
            attributes.onCommentClickListenerId.setValue(onCommentClickListenerId);
        }

        attributes.name.setValue(name);
        attributes.username.setValue(username);
        attributes.imgSource.setValue(imgSource);
        attributes.imgProfileSource.setValue(imgProfileSource);
        attributes.isLiked.setValue(isLiked);
        attributes.price.setValue(price);
        attributes.likeCount.setValue(likeCount);

        return el;
    }
}
window.customElements.define('app-design-card', DesignCard);
