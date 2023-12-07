CREATE SEQUENCE username_alpha;

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_name VARCHAR(40) NOT NULL,
    room_data VARCHAR NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) DEFAULT 'user-' || nextval('username_alpha'),
    nickname VARCHAR(20) NULL,
    active_token VARCHAR(36) NOT NULL,
    room_id INT NULL,
    CONSTRAINT fk_room FOREIGN KEY(room_id) REFERENCES rooms(id)
);