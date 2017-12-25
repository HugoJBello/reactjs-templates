create database if not exists picam_app;

use picam_app;

drop table image;
create table if not exists image(
	date_taken DATE,
	path VARCHAR(500),
	filename VARCHAR(100));

insert into image values (sysdate(),"C:/Users/hugo/kitty-cat-kitten-pet-45201.jpeg","kitty-cat-kitten-pet-45201.jpeg");
insert into image values (sysdate(),"C:/Users/hugo/kitty-cat-kitten-pet-45201.jpeg","kitty-cat-kitten-pet-45201.jpeg");
insert into image values (sysdate(),"C:/Users/hugo/kitty-cat-kitten-pet-45201.jpeg","kitty-cat-kitten-pet-45201.jpeg");
insert into image values (sysdate(),"C:/Users/hugo/kitty-cat-kitten-pet-45201.jpeg","kitty-cat-kitten-pet-45201.jpeg");
insert into image values (sysdate(),"C:/Users/hugo/kitty-cat-kitten-pet-45201.jpeg","kitty-cat-kitten-pet-45201.jpeg");

select * from image
order by date_taken desc
LIMIT 5;
