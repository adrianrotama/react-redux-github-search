# React + Redux GitHub search API project

Demo on https://react-redux-github-search.herokuapp.com/

A simple project that consume several github GET API, such as :

* `https://api.github.com/search/users?q=xxx&page=xx`: Get a list of user with key and page params 
* `https://api.github.com/users/(user_name)`: Get details information of selected user
* `https://api.github.com/users/(user_name)/repos`: Get List of Repositories of selected user
* `More Will coming on next commit!`

**Several Feature That this Project has**:

1. `Auto Search` Applied `debounce` auto search, currently set threshold to 800 millisecond.
2. `Infinite Scroll` Applied `throttle` infinite scroll in get user list & repos list.

**Framework/Library That this Project used**:
1. `React`
2. `Redux`
3. `Material-UI`
4. `axios`
5. `lodash`
6. `react-infinite`
7. `react-router`

**Several Command**:
1. `npm install` the first time you clone this repo
2. `npm start` anytime you want to start developing. This will watch your JS files and re-run webpack when there are changes
3. `npm build` Build into production ready code