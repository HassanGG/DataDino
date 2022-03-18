INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('3b3d3341-f7aa-485f-94ac-2c36062af1f6', false, 5, 5432, -124123, 0.05, 'A bunch of numbers', 'Special Numbers', 1647263239000);
INSERT INTO data (id, data, dataset_id)
VALUES ('c3a7badc-e7a3-4127-946d-b2f219265652', '1213, 5432, -124123, 1532, 0', '3b3d3341-f7aa-485f-94ac-2c36062af1f6');
INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('0ebff3b0-0924-4c91-b1c5-29f4b29cc194', true, 5, 2342, -234, 0.02, 'more numbers', 'Just, you know, some numbers', 1710614691000);
INSERT INTO data (id, data, dataset_id)
VALUES ('2be44ae7-822c-41a0-b5f0-c24df7a56e8a', '2342, 234, 112, 0, -234', '0ebff3b0-0924-4c91-b1c5-29f4b29cc194');
INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('d99bca2f-ca4e-42b3-8e26-bc196386cc08', false, 7, 643, 6, 1.5, 'You\'re shoe\'s untied', 'Shoe sizes', 1547405091000);
INSERT INTO data (id, data, dataset_id)
VALUES ('c7d7af5d-d17e-47ee-bd09-28b46899d230', '12, 322, 123, 53, 6,436,643', 'd99bca2f-ca4e-42b3-8e26-bc196386cc08');
INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('035a4869-810b-46e6-ad74-e649643facd4', false, 7, 12124, -2342346, 1.5, 'descriptive description', 'Number of numbers per number', 1452710691000);
INSERT INTO data (id, data, dataset_id)
VALUES ('4a1573cb-ee7f-416c-8ec2-d5c4b8e735e6', '123, 12124, 6543, 4246, -234234, 532, 2212', '035a4869-810b-46e6-ad74-e649643facd4');
INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('ab2137ea-6a95-45a1-a538-0cb6568d7ff8', true, 4, 45395, 2, 1.5, 'This is indeed a description.', 'Data input is fun :\')', 1465839891000);
INSERT INTO data (id, data, dataset_id)
VALUES ('aca18541-6d73-4343-9b31-9017b3889e42', '45395, 354,2 ,324 ,560', 'ab2137ea-6a95-45a1-a538-0cb6568d7ff8');
INSERT INTO dataset (id, archived, datapoint_count, datapoint_max, datapoint_min, datapoint_price, description, name, uploaded_at)
VALUES ('74eaf345-32e4-4141-a8f2-b5c9b7fb3089', false, 5, 6432, -324, 1.5, 'Every night, I can feel my legs', 'Why are we here, just to suffer', 1592502471000);
INSERT INTO data (id, data, dataset_id)
VALUES ('cfc4f7c3-6be5-4657-85b1-a57a1fd0e20e', '324, 6432, 234, -324, 232', '74eaf345-32e4-4141-a8f2-b5c9b7fb3089');

INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('3f277e58-1f07-4831-ad40-a06d54912eec', 'John', 'john@jail.com', false, 'asdfkjflasldkj');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('35b14ea0-52a7-4b6b-8034-47c4034a8d7a', 1878247676000, 'Cancelled', 23.34, '3f277e58-1f07-4831-ad40-a06d54912eec');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('6a902430-68c8-4299-a533-72773405e921', 'Joe', 'Joe@jail.ie', false, 'asdlkfjasdlkj');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('9fabc886-c62f-4c3e-b893-9a676cafc022', 1430055627000, 'New', 5.6, '6a902430-68c8-4299-a533-72773405e921');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('8fca5348-170c-4b62-a239-2430ce54a8e6', 1881140574000, 'Delivered', 2.2, '6a902430-68c8-4299-a533-72773405e921');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('dc31adcb-1740-43fc-8fbe-ef859654fada', 'Janice', 'Janice@gmail.co.uk', false, '1234234dfajkld');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('fec3fad9-f605-4c44-bfdd-ac150fd8a5ed', 1765170888000, 'New', 100, 'dc31adcb-1740-43fc-8fbe-ef859654fada');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('8d6e207f-3634-484e-a7ae-0205bf0ceae2', 'Janthony', 'Janthony@jail.com', false, 'asdfkjflasldkj');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('46796392-1760-4fc6-aada-ec3b3c12d38e', 956778459000, 'New', 5.6, '8d6e207f-3634-484e-a7ae-0205bf0ceae2');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('24a203a9-d1f4-4eca-8d42-8150292c3d8e', 'Janiqua', 'Janiqua@jail.ie', false, 'asdlkfjasdlkj');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('65b7b641-698c-4851-918c-3e8a68becc64', 1372077794000, 'New', 7.9, '24a203a9-d1f4-4eca-8d42-8150292c3d8e');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('69d30c06-26b3-4cbd-b591-cef30374fadd', 1052563515000, 'Delivered', 2.2, '24a203a9-d1f4-4eca-8d42-8150292c3d8e');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('86eeb9f8-2aa3-4d1d-86bb-ffc05ce24653', 1273416060000, 'Cancelled', 23.34, '24a203a9-d1f4-4eca-8d42-8150292c3d8e');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('1c083586-d0d9-4ffd-aa4d-3b606bc66c14', 'Jane', 'Jane@gmail.co.uk', false, '1234234dfajkld');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('2cff0a99-b616-42d0-89b4-22c52702bd9a', 1647261814000, 'New', 5.6, '1c083586-d0d9-4ffd-aa4d-3b606bc66c14');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('8d816703-46e7-4fa8-a2b2-522ac958e1fb', 1129932935000, 'Delivered', 2.2, '1c083586-d0d9-4ffd-aa4d-3b606bc66c14');
INSERT INTO users (id, display_name, email, is_admin, password)
VALUES ('cbf7a3d4-e238-4f28-8b0c-b5306ad88d04', 'Jumanji', 'Jumanji@hotmail.com', false, 'adsfasdf');
INSERT INTO orders (id, purchased_at, state, total, user_id)
VALUES ('1696ab53-ec44-40d7-ba78-bb2f92dc3d3c', 1141303286000, 'Cancelled', 23.34, 'cbf7a3d4-e238-4f28-8b0c-b5306ad88d04');

INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('0b627ec3-70d1-4f30-ba43-e98f0545dcad', 3, '3b3d3341-f7aa-485f-94ac-2c36062af1f6', '35b14ea0-52a7-4b6b-8034-47c4034a8d7a');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('62095aaf-0e02-46a0-84a0-e75dd0580181', 2, '3b3d3341-f7aa-485f-94ac-2c36062af1f6', '9fabc886-c62f-4c3e-b893-9a676cafc022');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('6d1f42a1-dfd1-424f-8811-4ab994d12153', 1, '3b3d3341-f7aa-485f-94ac-2c36062af1f6', '8fca5348-170c-4b62-a239-2430ce54a8e6');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('2fe83f00-f12a-44bd-8e61-0ba501775b99', 4, '0ebff3b0-0924-4c91-b1c5-29f4b29cc194', 'fec3fad9-f605-4c44-bfdd-ac150fd8a5ed');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('20191857-dbbd-4dd5-8ef4-d1089a3151e3', 3, '0ebff3b0-0924-4c91-b1c5-29f4b29cc194', '46796392-1760-4fc6-aada-ec3b3c12d38e');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('96f5b292-ad0a-4e88-9a30-937092fb0656', 2, 'd99bca2f-ca4e-42b3-8e26-bc196386cc08', '65b7b641-698c-4851-918c-3e8a68becc64');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('c5fd1d12-727a-44e5-8781-99a24796c8e0', 4, 'd99bca2f-ca4e-42b3-8e26-bc196386cc08', '69d30c06-26b3-4cbd-b591-cef30374fadd');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('914f467e-27d6-432d-88c5-9858ecaff9a8', 3, '035a4869-810b-46e6-ad74-e649643facd4', '86eeb9f8-2aa3-4d1d-86bb-ffc05ce24653');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('9485f38e-5ed7-403e-9c0a-9814f1495c47', 2, '035a4869-810b-46e6-ad74-e649643facd4', '2cff0a99-b616-42d0-89b4-22c52702bd9a');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('46640c62-205a-49aa-ab71-f0d0ff826007', 1, 'ab2137ea-6a95-45a1-a538-0cb6568d7ff8', '8d816703-46e7-4fa8-a2b2-522ac958e1fb');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('1a452334-7f6f-4c57-a311-0b386a401e47', 2, 'd99bca2f-ca4e-42b3-8e26-bc196386cc08', '1696ab53-ec44-40d7-ba78-bb2f92dc3d3c');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('e4347232-9b2b-4c0a-a309-b9b3b99e73fd', 3, '74eaf345-32e4-4141-a8f2-b5c9b7fb3089', '1696ab53-ec44-40d7-ba78-bb2f92dc3d3c');
INSERT INTO order_item (order_item_id, datapoint_count, dataset_id, order_id)
VALUES ('703c78a0-099c-4e9e-a716-9af2b93f61c4', 4, '74eaf345-32e4-4141-a8f2-b5c9b7fb3089', '1696ab53-ec44-40d7-ba78-bb2f92dc3d3c');


