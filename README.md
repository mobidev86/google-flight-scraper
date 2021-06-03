# Google Flight Scrap

### Prerequisites
1. Install PostgreSQL and pgAdmin4
https://www.postgresql.org/download/
https://www.pgadmin.org/download/

2. Check and make sure PostgreSQL running properly in your system -> open pgAdmin4 and set your master passeword

3. Fill free to update your database name and other database related configuration from .env file in the root 

4. Go to project directory and execute following commands
-> npm install
-> npm install -g sequelize-cli 
-> npm run db:create 
-> npx sequelize-cli db:migrate

It will auto create database and tables for you.
All set!!

Now run project using following command from project directory
-> npm run dev

### Description
This project scrapes flight data google travel (https://www.google.co.in/travel/flights) site. We run a cron job every hour, randomly pick a city of origin and destination and scraps its flight data from google site. We have already pre-defined cities for scraping.

You can see the flight of origin <-> and destination cities from the flight section. It shows the flights for the next 330 days for the origin and destination. Also, you can see previously running cron jobs log from the dashboard section.

That's it!




