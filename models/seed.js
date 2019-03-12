// use the following code to add messages to db


INSERT INTO messages (
    from_username, 
    to_username, 
    body,
    sent_at,
    read_at)
VALUES ('username', 
    'username2', 
    'hi',
    current_timestamp,
    current_timestamp);


INSERT INTO messages (
    from_username, 
    to_username, 
    body,
    sent_at,
    read_at)
VALUES ('username', 
    'username2', 
    'hi again',
    current_timestamp,
    current_timestamp);


INSERT INTO messages (
    from_username, 
    to_username, 
    body,
    sent_at,
    read_at)
VALUES ('username2', 
    'username', 
    'hi back',
    current_timestamp,
    current_timestamp);


INSERT INTO messages (
        from_username, 
        to_username, 
        body,
        sent_at,
        read_at)
VALUES ('username2', 
        'username', 
        'hi again back',
        current_timestamp,
        current_timestamp);