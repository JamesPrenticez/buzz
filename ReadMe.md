# Django & React 
https://www.youtube.com/watch?v=c-QsfbznSXI
Authentication boilerplate

# Frontend

# Backend
## Running the App (after setup)
```bash
. env/Scripts/activate
```
```bash
python manage.py runserver
```

## Setup Python Enviroment
python -m venv env
pip install -r requirements.txt
. env/Scripts/activate
django-admin startproject backend
cd backend 
python manage.py startapp api

## Migrations
whenever you start a new Django project or you make any significant changes that invlove the data model you need to run **migrations**

```bash
  cd backend
  python manage.py makemigrations
  python manage.py migrate
```

## Django Admin
user: admin
pass: admin
```bash 
  python manage.py createsuperuser
```
