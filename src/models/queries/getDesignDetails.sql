SELECT designs.*, user.*, count(likes.user_id) as likeCount, count(comments.user_id) as commentCount
FROM designs
         left join likes on designs.id = likes.design_id
         left join comments on designs.id = comments.design_id
         left join user on user.id = designs.user_id
WHERE designs.id = ?
group by designs.id;
