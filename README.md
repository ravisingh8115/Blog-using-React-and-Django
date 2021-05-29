# Blog_App

A fullstack Blogger app with frontend developed in "React" and backend made in "Django (Python)"

To run this on your local system: 
## Installation Steps

For Backend:
1. Open up your Terminal / Command Line
2. git clone the repository
3. Open cmd in the backend directory
4. make sure you have python3 installed
5. Install virtualenv by following the steps 
```
Mac
python3 -m pip install --user virtualenv
python3 -m venv env
source env/bin/activate

Windows
py -m pip install --user virtualenv
py -m venv env
.\env\Scripts\activate
```
6. Run 
```
python -m pip install -r requirements.txt
```
7. Now Run the Server using command
```
python manage.py runserver
```

For Frontend:
1. Open cmd in frontend directory and just run "npm install", this should start installing your dependencies
2. After everything is done, run "npm start".