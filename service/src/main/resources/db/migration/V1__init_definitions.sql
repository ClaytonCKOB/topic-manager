CREATE TABLE meeting_status (
    meeting_status_id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL
);

CREATE TABLE user_account (
	user_account_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
	username VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
	role INT NOT NULL,
	active BOOLEAN DEFAULT TRUE,
	created_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE user_account_invite (
    user_account_invite_id VARCHAR PRIMARY KEY,
    sender_id  INT NOT NULL REFERENCES user_account(user_account_id),
    email VARCHAR NOT NULL UNIQUE,
    role INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE meeting (
    meeting_id SERIAL PRIMARY KEY,
    meeting_status_id INT NOT NULL REFERENCES meeting_status(meeting_status_id),
    title VARCHAR NOT NULL,
    description VARCHAR,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

CREATE TABLE meeting_topic (
    meeting_topic_id SERIAL PRIMARY KEY,
    meeting_id INT NOT NULL REFERENCES meeting(meeting_id) ON DELETE CASCADE,
    parent_meeting_topic_id INT REFERENCES meeting_topic(meeting_topic_id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    description VARCHAR
);

CREATE TABLE topic_vote (
    topic_vote_id SERIAL PRIMARY KEY,
    meeting_topic_id INT NOT NULL REFERENCES meeting_topic(meeting_topic_id) ON DELETE CASCADE,
    user_account_id INT NOT NULL REFERENCES user_account(user_account_id) ON DELETE CASCADE,
    status INT NOT NULL,
    comment VARCHAR,
    updated_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE meeting_topic_file (
    meeting_topic_file_id SERIAL PRIMARY KEY,
    meeting_topic_id INT NOT NULL REFERENCES meeting_topic(meeting_topic_id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_data BYTEA NOT NULL,
    uploaded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE meeting_participant (
    user_account_id INT NOT NULL REFERENCES user_account(user_account_id) ON DELETE CASCADE,
    meeting_id INT NOT NULL REFERENCES meeting(meeting_id) ON DELETE CASCADE,
    role INT NOT NULL,
    PRIMARY KEY (user_account_id, meeting_id)
);


INSERT INTO meeting_status (meeting_status_id, description) VALUES (1, 'Criado'), (2, 'Em andamento'), (3, 'Finalizado');
