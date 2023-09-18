## About Project

Built with:

- [React JS](https://react.dev)
- [Laravel](https://laravel.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind UI Components](https://tailwindui.com)
- [Hero Icons](https://heroicons.com/)
- [Headless React](https://headlessui.com/)

## Functionality
- Sign Up
- Sign In
- Surveys CRUD
- Survey Questions CRUD

## Application
- Pagination
- Dashboard
![Dashboard](<public/project/Screenshot (49).png>)
- Surveys
![Surveys](<public/project/Screenshot (50).png>)
- Create Survey
![Surveys](<public/project/Screenshot (51).png>)
- Update Survey
![Surveys](<public/project/Screenshot (52).png>)
- Answer Survey
![Surveys](<public/project/Screenshot (53).png>)


## Installation
- Clone the repository
```bash
git clone https://github.com/njugunamwangi/laravel-survey.git
```
- On the root of the directory, copy and paste .env.example onto .env and configure the database accordingly
- Install composer dependancies bu running composer install
 ```bash
composer install
```
- Install npm dependacies
```bash
npm install
```
- Navigate to the react folder 
```bash
cd react 
```
-  In the react folder, copy and paste .env.example onto .env
- Install npm dependacies
```bash
npm install
```

- Navigate back to the root directory of the folder then migrate the database
```bash
php artisan migrate
```
- Generate laravel application key using (on the root directory)
```bash
php artisan key:generate
```
- Run laravel application using (root directory)
```bash
php artisan serve
```
- Run react application using (react directory)
```bash
npm run dev
```

Navigate to http://localhost:3000 for the react app. Enjoy

## License

[MIT](https://choosealicense.com/licenses/mit/)
