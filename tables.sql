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

CREATE TABLE deposit
(
    id          INT NOT NULL AUTO_INCREMENT,
    amount DECIMAL(15,2) NOT NULL,
    user_id     INT,
    date DATETIME DEFAULT NOW(),
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
    created_at DATETIME DEFAULT NOW(),
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
    created_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (design_id) REFERENCES designs (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE purchase
(
    id        INT NOT NULL AUTO_INCREMENT,
    design_id INT,
    user_id   INT,
    created_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (design_id) REFERENCES designs (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO user (username, description, password, email, name)
VALUES
    ('test_user1', 'This is test profile','qwerty1', 'test@example.com', 'test1'),
    ('test_user2', 'This is test profile','qwerty2', 'test2@example.com', 'test2');

INSERT INTO deposit (amount, user_id)
VALUES (200, 1),
       (300, 2);

INSERT INTO user_follow (user_id, followed_user_id)
VALUES (1,2),
       (2,1);

INSERT INTO designs (user_id, picture_src, price, description)
VALUES (1, 'URL1', 34.5, 'This is my first design'),
       (2, 'URL2', 45.0, 'This is my first design');

INSERT INTO likes (user_id, design_id)
VALUES (2, 1),
       (1, 2);

INSERT INTO comments (design_id, user_id, description)
VALUES (1, 1, 'Wow!'),
       (2, 1, 'Amazing!');

INSERT INTO purchase (design_id, user_id)
VALUES (1,2),
       (2,1);
