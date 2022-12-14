import { endpoints, getQueryParam, storage } from '../shared/common.js';
import { AppLoadingIndicatorBuilder } from '../shared/components/app-loading-indicator.js';
import { HomeDesignCardBuilder } from '../shared/components/home-design-card.js';
import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header.js';
import { OneDesignCardBuilder } from '../shared/components/one-design-card.js';
import { ModalBuilder } from '../shared/components/app-modal.js';

window.addEventListener('load', async () => {
    //  Page Html element references
    const elements = {
        designCard: document.getElementById('design-card')
    };

    //  Modal Component
    const { showPurchaseConfirmation } = ModalBuilder(document.getElementById('app-modals'));
    //  Page Loading Indicator
    const { hideLoading, showLoading } = AppLoadingIndicatorBuilder(document.getElementById('app-loading-indicator'));
    //  Top Header Component
    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'));
    //  Bottom Header Component
    const { setBottomHeaderUserId } = AppBottomHeaderBuilder(document.getElementById('app-bottom-header'));

    showLoading();

    const { body, response, error } = await endpoints.getMyUserProfile();
    const { user, userAvatar } = body;

    setBottomHeaderUserId(user.id);

    if (userAvatar) {
        updateTopHeaderAvatar(userAvatar.url);
    }

    const queryParamUserId = getQueryParam('id');

    if (!queryParamUserId) {
        elements.designCard.innerHTML = `Design not found.`;
    }
    {
        const { body, response, error } = await endpoints.getDesignDetails(queryParamUserId);
        const { item } = body ?? {};

        const { id, avatarUrl, description, username, name, price, url, userId } = item;
        const { body: getDesignLikeCountBody } = await endpoints.getDesignLikeCount(id);
        const { likeCount, isLiked } = getDesignLikeCountBody;
        const card = OneDesignCardBuilder({
            name,
            description,
            imgSource: url,
            username,
            price: price,
            imgProfileSource: avatarUrl,
            isLiked: isLiked,
            likeCount,
            showBuyButton: userId !== user.id,
            onBuyClick: async () => {
                console.log('onBuyClick');
                const confirmation = await showPurchaseConfirmation(name, price);
                console.log(confirmation);
            },
            onHeartClick: async () => {
                const { body } = await endpoints.likeDesign(id);
                const { isLiked, likeCount } = body;
                return { isLiked, likeCount };
            },
            onCommentClick: () => {
                console.log('onCommentClick');
            }
        });

        elements.designCard.replaceChildren(card);
    }

    hideLoading();

    if (!storage.hasValidSession()) {
        location.href = '/login/';
    }
});
