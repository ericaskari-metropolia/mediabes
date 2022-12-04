import { enableFormDebug, isDevelopment, endpoints, formDataToJson, storage } from './shared/common.js';
import { LoadingIndicator } from './shared/loading-indicator/loading-indicator.js';
import { DesignCard } from './components/design-card';

window.addEventListener('load', async () => {
    const loading = LoadingIndicator.init();
    const elements = {
        loadingIndicator: document.getElementsByClassName('loading-indicator')[0],
        debug: document.getElementById('debug'),
        cardList: document.getElementById('card-list')
    };

    if (!storage.hasValidSession()) {
        location.href = '/login/';
    }

    elements.cardList.appendChild(
        DesignCard.factory({
            name: 'Eric Askari',
            username: 'ericaskari',
            imgSource: '/assets/sample-images/horse.jpg',
            imgProfileSource: 'https://randomuser.me/api/portraits/men/1.jpg',
            price: 1000,
            likeCount: 20,
            isLiked: true,
            onBuyClick: () => console.log('onBuyClick'),
            onHeartClick: () => console.log('onHeartClick'),
            onCommentClick: () => console.log('onCommentClick')
        })
    );

    elements.cardList.appendChild(
        DesignCard.factory({
            name: 'Sara',
            username: 'sara',
            imgSource: '/assets/sample-images/flowers.jpg',
            imgProfileSource: 'https://randomuser.me/api/portraits/women/2.jpg',
            price: 120,
            likeCount: '2',
            isLiked: false,
            onBuyClick: () => console.log('onBuyClick'),
            onHeartClick: () => console.log('onHeartClick'),
            onCommentClick: () => console.log('onCommentClick')
        })
    );
    elements.cardList.appendChild(
        DesignCard.factory({
            name: 'Sara',
            username: 'sara',
            imgSource: '/assets/sample-images/flowers.jpg',
            imgProfileSource: 'https://randomuser.me/api/portraits/women/2.jpg',
            price: 120,
            likeCount: '2',
            isLiked: false,
            onBuyClick: () => console.log('onBuyClick'),
            onHeartClick: () => console.log('onHeartClick'),
            onCommentClick: () => console.log('onCommentClick')
        })
    );
});
