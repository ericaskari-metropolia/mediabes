CREATE TABLE user
(
    id          INT NOT NULL AUTO_INCREMENT,
    username    VARCHAR(40) UNIQUE,
    description VARCHAR(40),
    password    TEXT NOT NULL,
    email       VARCHAR(40) UNIQUE,
    name        VARCHAR(40),
    PRIMARY KEY (id)
);


CREATE TABLE upload
(
    id          INT NOT NULL AUTO_INCREMENT,
    url         TEXT NOT NULL,
    blob_name   TEXT NOT NULL,
    blob_size   TEXT NOT NULL,
    encoding    TEXT NOT NULL,
    mime_type   TEXT NOT NULL,
    original_name   TEXT NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE deposit
(
    id          INT NOT NULL AUTO_INCREMENT,
    amount DECIMAL(15,2) NOT NULL,
    user_id     INT,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE user_follow
(
    id               INT NOT NULL AUTO_INCREMENT,
    user_id          INT,
    followed_user_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (followed_user_id) REFERENCES user (id)
);

CREATE TABLE designs
(
    id          INT NOT NULL AUTO_INCREMENT,
    user_id     INT,
    created_at  TIMESTAMP DEFAULT NOW(),
    price       DECIMAL(15,2),
    description TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);


CREATE TABLE user_avatar
(
    id          INT NOT NULL AUTO_INCREMENT,
    user_id     INT NOT NULL,
    upload_id   INT NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (upload_id) REFERENCES upload(id),
    FOREIGN KEY (user_id)   REFERENCES user(id)
);

CREATE TABLE design_file
(
    id          INT NOT NULL AUTO_INCREMENT,
    design_id   INT NOT NULL UNIQUE,
    upload_id   INT NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (design_id) REFERENCES designs(id),
    FOREIGN KEY (upload_id) REFERENCES upload(id)
);

CREATE TABLE likes
(
    user_id   INT,
    design_id INT,
    PRIMARY KEY (user_id, design_id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (design_id) REFERENCES designs (id)
);

create table comments
(
    id          INT NOT NULL AUTO_INCREMENT,
    design_id   INT,
    user_id     INT,
    description VARCHAR(40),
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (design_id) REFERENCES designs (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE purchase
(
    id        INT NOT NULL AUTO_INCREMENT,
    design_id INT,
    user_id   INT,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (design_id) REFERENCES designs (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO user (username, description, password, email, name)
VALUES
    ('test_user1', 'This is test profile','qwerty1', 'test@example.com', 'test1'),
    ('test_user2', 'This is test profile','qwerty2', 'test2@example.com', 'test2'),
    ('user3', 'test', 'asdfgh', 'test3@example.com', 'test3');

INSERT INTO deposit (amount, user_id)
VALUES (200, 1),
       (300, 2);

INSERT INTO user_follow (user_id, followed_user_id)
VALUES (1,2),
       (2,1),
       (3,1);

INSERT INTO designs (user_id, picture_src, price, description)
VALUES (1, 'URL4', 10, 'Dog'),
       (2, 'URL5', 2, 'My summer holiday'),
       (1, 'URL1', 34.5, 'This is my first design1'),
       (2, 'URL2', 45.0, 'This is my first design'),
       (1, 'URL3', 50, 'Nature'),
       (3, 'URL6', 4, 'London');

INSERT INTO comments (design_id, user_id, description)
VALUES (1, 1, 'Wow!'),
       (2, 1, 'Amazing!'),
       (3, 2, 'Cozy'),
       (4, 1, 'No way!'),
       (5, 2, 'Beautful!'),
       (5, 1, 'Thank you!');

INSERT INTO purchase (design_id, user_id)
VALUES (1,2),
       (2,1);

INSERT INTO likes (user_id, design_id)
VALUES (2, 1),
       (1, 2),
       (2, 3),
       (2, 4),
       (2, 5),
       (1,5);

-- to get all user designs with counted likes and comments
SELECT user.name, likecount, commentcount, designs.description, designs.price FROM designs
    LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id
    LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id
    JOIN user ON designs.user_id = user.id AND user.id = '$userId'
GROUP BY designs.id ORDER BY designs.created_at DESC;

-- to get the lastest designs for Recomendation page
SELECT user.name, likecount, commentcount, designs.description, designs.price FROM designs
    LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id
    LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id
    JOIN user ON designs.user_id = user.id
ORDER BY designs.created_at DESC;

-- to get designs for Feed page, where is showed all designs from followed users
SELECT designs.description,  user.name AS user_id, user.username, designs.price
FROM user_follow
         LEFT JOIN designs ON designs.user_id = '$userId' OR designs.user_id = user_follow.followed_user_id
         LEFT JOIN user ON designs.user_id = user.id
WHERE (user_follow.user_id = '$userId' OR user_follow.user_id = NULL);

-- to get One Design Card
SELECT designs.id, user.name, likecount, commentcount, designs.description, designs.price FROM designs
    LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id
    LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id
    JOIN user ON designs.user_id = user.id
GROUP BY (SELECT id FROM designs WHERE id = '$design id');

-- to save new design
INSERT INTO designs (user_id, price, description)
    VALUES ('$user_id', '$price', '$description');

-- to update Design Description by design id
UPDATE designs SET description = '$description' WHERE designs.id = '$designs.id';

-- to delete Design by id
DELETE FROM designs WHERE designs.id = '$designs.id';

-- count all designs, likes and comments on user page
SELECT user.name,
       COALESCE(designs.cnt, 0) designs,
       COALESCE(comments.cnt, 0) comments,
       COALESCE(likes.cnt, 0) likes
FROM user
         LEFT JOIN ( SELECT user_id, COUNT(*) cnt
                     FROM designs
                     GROUP BY user_id ) designs ON  user.id = designs.user_id
         LEFT JOIN ( SELECT user_id, COUNT(*) cnt
                     FROM comments
                     GROUP BY user_id ) comments ON  user.id = comments.user_id
         LEFT JOIN ( SELECT user_id, COUNT(*) cnt
                     FROM likes
                     GROUP BY user_id ) likes ON  user.id = likes.user_id;

-- to like a design
INSERT INTO likes (user_id, design_id)
VALUES ('$user_id', '$design_id');

-- to delete like
DELETE FROM likes WHERE user_id = '$user_id' AND design_id = '$design_id';

-- to show all users who liked a design
SELECT user.name FROM user, likes WHERE likes.design_id = '$design_id' AND user_id = user.id;

-- count all like by design id
SELECT COUNT(user_id) FROM likes WHERE design_id = '$design_id';

-- save new comment
INSERT INTO comments (user_id, design_id, description)
VALUES ('$user_id', '$design_id', '$description');

-- delete comment
DELETE FROM comments WHERE id = '$comment_id';

-- get all comments by design id sorted by date
SELECT user.name, comments.description FROM user, comments WHERE comments.design_id = '$design_id' AND user_id = user.id ORDER BY created_at DESC;

-- count all comments by design id
SELECT COUNT(id) FROM comments WHERE design_id = '$design_id';

-- to start follow user
INSERT INTO user_follow (user_id, followed_user_id)
VALUES ('$user_id', '$followed_user_id');

-- to unfollow user
DELETE FROM user_follow WHERE user_id = '$user_id' AND followed_user_id = '$followed_user_id';

-- to count all followers
SELECT COUNT(user_id) FROM user_follow WHERE followed_user_id = '$user_id';

-- to count all followed users
SELECT COUNT(user_id) FROM user_follow WHERE user_id = '$user_id';

-- to get all followers
SELECT user.name FROM user, user_follow WHERE followed_user_id = '$user_id' AND user.id = user_follow.user_id;

-- to get all followed users
SELECT user.name FROM user, user_follow WHERE user_id = '$user_id' AND user.id = user_follow.followed_user_id;

