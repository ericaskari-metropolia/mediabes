import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { endpoints, getQueryParam } from '../shared/common.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header.js';

window.addEventListener('load', async () => {
    const elements = {
        name: document.querySelector('.var--profile-name'),
        description: document.querySelector('.var--profile-description'),
        followerCount: document.querySelector('.var--follower-count'),
        followingCount: document.querySelector('.var--following-count'),
        accountBalance: document.querySelector('.var--account-balance'),
        showBalance: document.querySelector('.var--show-balance'),
        showEditProfile: document.querySelector('.var--show-edit-profile'),
        showAddBalance: document.querySelector('.var--show-add-balance')
    };

    const myUserProfile = await endpoints.getMyUserProfile();

    const queryParamUserId = getQueryParam('id');

    const parsedUserId = Number.isNaN(parseInt(queryParamUserId)) ? null : parseInt(queryParamUserId);

    const queryParamUserProfile =
        queryParamUserId === null || parsedUserId === myUserProfile?.body?.user?.id
            ? myUserProfile
            : await endpoints.getUserProfile(queryParamUserId);

    const { user, balance, followerUsers, followedUsers } = myUserProfile.body;

    AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
    AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);

    const {
        user: paramUser,
        followerUsers: paramUserFollowerUsers,
        followedUsers: paramUserFollowedUsers
    } = queryParamUserProfile.body;

    const isMyProfile = parsedUserId === null || user.id === parsedUserId;

    if (isMyProfile) {
        elements.showBalance.removeAttribute('hidden');
        elements.showEditProfile.removeAttribute('hidden');
        elements.showAddBalance.removeAttribute('hidden');
        elements.accountBalance.innerText = balance;
    }

    elements.name.innerText = paramUser.name;
    elements.description.innerText = paramUser.description ?? paramUser.username;
    elements.followerCount.innerText = paramUserFollowerUsers.length;
    elements.followingCount.innerText = paramUserFollowedUsers.length;
});
