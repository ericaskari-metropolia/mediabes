SELECT user.name, likecount, commentcount, designs.description, designs.price
FROM designs
         LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable
                   ON designs.id = liketable.design_id
         LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable
                   ON designs.id = commenttable.design_id
         JOIN user ON designs.user_id = user.id AND user.id = ?
GROUP BY designs.created_at
ORDER BY designs.created_at DESC;
