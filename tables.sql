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

CREATE TABLE payment
(
    id          INT NOT NULL AUTO_INCREMENT,
    card_number INT,
    user_id     INT,
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
    date        DATETIME,
    picture_src TEXT,
    price       FLOAT,
    description TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
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
    date        DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (design_id) REFERENCES designs (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE transaction
(
    id        INT NOT NULL AUTO_INCREMENT,
    design_id INT,
    user_id   INT,
    date      DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (design_id) REFERENCES designs (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO user
VALUES (1, 'test_user', 'This is test profile', 'qwerty', 'test@example.com', 'test');
INSERT INTO user
VALUES (2, 'test2_user', 'This is test2 profile', 'qwerty2', 'test2@example.com', 'test2');

INSERT INTO payment
VALUES (1, 4920, 1);
INSERT INTO payment
VALUES (2, 4928, 2);

INSERT INTO user_follow
VALUES (1, 1, 2);
INSERT INTO user_follow
VALUES (2, 2, 1);

INSERT INTO designs
VALUES (1, 1, '2022-11-21 10:12:11', 'URL', 34.5, 'This is my first design');
INSERT INTO designs
VALUES (2, 2, '2022-11-26 10:13:21', 'URL2', 45.0, 'This is my first design');

INSERT INTO likes
VALUES (2, 1);
INSERT INTO likes
VALUES (1, 2);

INSERT INTO comments
VALUES (1, 1, 2, 'Wow!', '2022-11-26 10:13:21');
INSERT INTO comments
VALUES (2, 2, 1, 'Amazing!', '2022-11-24 13:13:21');

INSERT INTO transaction
VALUES (1, 1, 2, '2022-11-24 13:13:21');
INSERT INTO transaction
VALUES (2, 2, 1, '2022-10-22 16:16:23');