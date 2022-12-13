SELECT design.id              as id,
       user.username,
       user.name              as name,
       upload.url             as url,
       user_avatar_upload.url as avatarUrl,
       design.description,
       design.price
FROM designs as design
         LEFT JOIN design_file on design.id = design_file.design_id
         LEFT JOIN upload on upload.id = design_file.upload_id
         LEFT JOIN user on design.user_id = user.id
         LEFT JOIN user_avatar on user.id = user_avatar.user_id
         LEFT JOIN upload user_avatar_upload on user_avatar.upload_id = user_avatar_upload.id
group by design.created_at
order by design.created_at desc

