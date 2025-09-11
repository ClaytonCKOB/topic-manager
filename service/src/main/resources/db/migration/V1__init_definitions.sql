CREATE TABLE meeting_status (
    meeting_status_id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL
);

CREATE TABLE user_account (
	user_account_id SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
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
    title VARCHAR NOT NULL,
    description VARCHAR
);

CREATE TABLE meeting_participant (
    user_account_id INT NOT NULL REFERENCES user_account(user_account_id) ON DELETE CASCADE,
    meeting_id INT NOT NULL REFERENCES meeting(meeting_id) ON DELETE CASCADE,
    PRIMARY KEY (user_account_id, meeting_id)
);

CREATE TABLE meeting_vote (
	meeting_vote_id SERIAL PRIMARY KEY,
	meeting_id INT NOT NULL REFERENCES meeting(meeting_id) ON DELETE CASCADE,
	meeting_topic_id INT NOT NULL REFERENCES meeting_topic(meeting_topic_id) ON DELETE CASCADE,
	user_account_id INT NOT NULL REFERENCES user_account(user_account_id) ON DELETE CASCADE,
	updated_date TIMESTAMP NOT NULL DEFAULT NOW()
);


INSERT INTO meeting_status (meeting_status_id, description) VALUES (1, 'Criado'), (2, 'Em andamento'), (3, 'Finalizado');
