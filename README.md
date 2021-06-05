# Google Flight Scrap

### Prerequisites
1. Make sure node.js and npm installed in your machine
2. Install PostgreSQL and pgAdmin4
https://www.postgresql.org/download/
https://www.pgadmin.org/download/

### Instruction for run project
1. Check and make sure PostgreSQL running properly in your system -> open pgAdmin4 and set your master passeword

2. Fill free to update your database name and other database related configuration from .env file in the root 

3. Go to project directory and execute following commands
-> npm install
-> npm install -g sequelize-cli 
-> npm run db:create 
-> npm run db:migrate

It will auto create database and tables for you.
All set!!

4. Run following command for initial scrapping for all cities (it will task half to one hour for scrapping, so keep patient for this time)
-> npm run start:intial-scrapping

5. Now run project using following command from project directory.
-> npm run start:Server

### Description
This project scrapes flight data from google travel (https://www.google.co.in/travel/flights) site. We run a cron job every day (midnight), and scraps data of flights for all cities from google site. We have already pre-defined cities for scraping.

You can see the flights of origin and destination cities from the flight section and pricing graph for perticular route. It shows the flights for the next 330 days for the origin and destination. Also, you can see previously running cron jobs log from the dashboard section.

That's it!




