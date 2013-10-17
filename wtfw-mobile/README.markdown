system dependencies
-------------------

grunt-cli
compass
optional: nodemon


development
-----------

./watch.sh &
./start.sh &


folder layout
-------------

- styles are in sass/style.scss compiled by grunt+compass into css and css-min directories
- dependencies are concatinated and minified by grunt into js/deps and js/deps.min
- custom page script is concatinated and minified by grunt into js/page and js/page.min
- client side templating is done with handlebars, precompiled by grunt


see Gruntfile and package.json for more details