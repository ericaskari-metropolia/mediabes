SELECT designs.description, user.name AS user_id, user.username, designs.price
FROM user_follow
         LEFT JOIN designs ON designs.user_id = ? OR designs.user_id = user_follow.followed_user_id
         LEFT JOIN user ON designs.user_id = user.id
WHERE (user_follow.user_id = ? OR user_follow.user_id = NULL);
