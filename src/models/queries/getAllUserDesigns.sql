SELECT design.id              as id,
       user.id                as userId,
       user.username,
       user.name              as name,
       upload.url             as url,
       user_avatar_upload.url as avatarUrl,
       design.description,
       design.price,
       likeCount,
       commentCount
FROM designs as design
         LEFT JOIN (SELECT design_id, COUNT(*) AS likeCount FROM likes GROUP BY design_id) AS liketable
                   ON design.id = liketable.design_id
         LEFT JOIN (SELECT design_id, COUNT(*) AS commentCount FROM comments GROUP BY design_id) AS commenttable
                   ON design.id = commenttable.design_id
         JOIN user ON design.user_id = user.id AND user.id = ?
         LEFT JOIN design_file on design.id = design_file.design_id
         LEFT JOIN upload on upload.id = design_file.upload_id
         LEFT JOIN user_avatar on user.id = user_avatar.user_id
         LEFT JOIN upload user_avatar_upload on user_avatar.upload_id = user_avatar_upload.id
GROUP BY design.created_at
ORDER BY design.created_at DESC;
