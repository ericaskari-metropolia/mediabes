import { endpoints, storage } from './shared/common.js';
import { LoadingIndicator } from './shared/loading-indicator/loading-indicator.js';
import { HomeDesignCardBuilder } from './shared/components/home-design-card.js';
import { AppBottomHeaderBuilder } from './shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from './shared/components/app-top-header.js';

window.addEventListener('load', async () => {
    const elements = {
        loadingIndicator: document.getElementsByClassName('loading-indicator')[0],
        debug: document.getElementById('debug'),
        cardList: document.getElementById('card-list')
    };

    const loading = LoadingIndicator.init(true);

    const { body, response, error } = await endpoints.getMyUserProfile();
    if (error || !body) {
        console.log(error);
        return;
    }
    const { user, userAvatar } = body;

    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
    AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);

    if (userAvatar) {
        updateTopHeaderAvatar(userAvatar.url);
    }

    {
        const { body, response, error } = await endpoints.getAllDesigns();
        const { items = [] } = body ?? {};

        for (let card of items) {
            const { id, avatarUrl, description, username, name, price, url } = card;
            const { body } = await endpoints.getDesignLikeCount(id);
            const { likeCount, isLiked } = body;
            document.getElementById('card-list').appendChild(
                HomeDesignCardBuilder({
                    name,
                    description,
                    imgSource: url,
                    username,
                    price: price,
                    imgProfileSource: avatarUrl,
                    isLiked: isLiked,
                    likeCount,
                    onBuyClick: () => {
                        console.log('onBuyClick');
                    },
                    onHeartClick: async () => {
                        const { body } = await endpoints.likeDesign(id);
                        const { isLiked, likeCount } = body;
                        return { isLiked, likeCount };
                    },
                    onCommentClick: () => {
                        console.log('onCommentClick');
                    }
                })
            );
        }
    }
    await loading.hide();

    if (!storage.hasValidSession()) {
        location.href = '/login/';
    }
});
