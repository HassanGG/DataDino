INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('3b3d3341-f7aa-485f-94ac-2c36062af1f6', false, 20000, 2103, 100, 0.05, 'A bunch of numbers', 'Special Numbers', 1647263239);
INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('0ebff3b0-0924-4c91-b1c5-29f4b29cc194', false, 1450, 100, 50,  0.02, 'more numbers', 'big numbers :)', 1647263239);
INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('d99bca2f-ca4e-42b3-8e26-bc196386cc08', false, 10000, 10000, 5000, 1.5, 'asdfasdfasdf', 'namee1', 1647263239);

INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('3f277e58-1f07-4831-ad40-a06d54912eec', 'John', 'john@jmail.com', false, '123');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('6a902430-68c8-4299-a533-72773405e921', 'John', 'jhn@jmail.com', false, '123');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('dc31adcb-1740-43fc-8fbe-ef859654fada', 'John', 'john@jail.com', false, '123');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('9013ccbe-0ad9-41a4-8619-cae04b85cb68', 'Admin', 'admin@admin.com', true, '123');

INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('35b14ea0-52a7-4b6b-8034-47c4034a8d7a', 1647261814, 'Cancelled', 23, '3f277e58-1f07-4831-ad40-a06d54912eec');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('77766b66-8fa6-4c65-b372-c87513e49532', 1647261814, 'New', 5.6,'dc31adcb-1740-43fc-8fbe-ef859654fada' );
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('8fca5348-170c-4b62-a239-2430ce54a8e6', 1647261814, 'Delivered', 2.2, '3f277e58-1f07-4831-ad40-a06d54912eec');

INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('0b627ec3-70d1-4f30-ba43-e98f0545dcad', 5, '3b3d3341-f7aa-485f-94ac-2c36062af1f6', '35b14ea0-52a7-4b6b-8034-47c4034a8d7a');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('62095aaf-0e02-46a0-84a0-e75dd0580181', 6, '0ebff3b0-0924-4c91-b1c5-29f4b29cc194', '77766b66-8fa6-4c65-b372-c87513e49532');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('6d1f42a1-dfd1-424f-8811-4ab994d12153', 7, 'd99bca2f-ca4e-42b3-8e26-bc196386cc08', '8fca5348-170c-4b62-a239-2430ce54a8e6');

