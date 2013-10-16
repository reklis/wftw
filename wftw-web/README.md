HMN Web
=======

HMN Web contains all of the web site code for HMN. HMN Web is built on top of NodeJS and has been tested to run in both Windows and Linux environments.

The current version primarily serves static HTML and related CSS, JS, and image resources. In the near future we will incorporate proxying and routing to handle web service calls for registration, authentication, and user account management, as well as special secondary applications or functions such as email triggers and CRM captures.


Key Instructions
------------

To get HMN Web running locally, you need to install Node.js (http://nodejs.com) and get the latest from git, then run a simple script:

```
node server.js
```

That's it. 

If you are already running Apache or another server that is using Port 80, You may need to modify the port (currently set to 80) in server.js to something that won't conflict with your current environment.

To start as a service in the background, you first need to set up node to run as a service on your OS. The current approach in Ubuntu is to create a .conf file in /etc/init with start and stop handlers.


Production Environment
----------------------

We are currently in the process of setting up an auto-pull-and-deploy feature on the production server. When that is ready, it will automatically grab the latest PROD branch from git and deploy it at a set time.

The current service on Ubuntu server is called 'node-hmn'. To start or stop the service manually, use the following commands:

```
start node-hmn
stop node-hmn
```

The temporary URL is: http://ve.yyyjy5dg.vesrv.com


Architecture
------------

The architectural approach is simple. No complex frameworks or collaboration of special-purpose languages (e.g. python, php, java, etc.). JavaScript as the single programming language for both front and backend, and nodeJS is serving as both the 'app server' as well as the web server. This significantly limits the amount of RAM used while beating Apache's web serving capability.

* Operating System: Linux environment (currently Ubuntu)
* Server-side programming language: JavaScript
* App Server: NodeJS
* Web Server: NodeJS
* RAM requirement: 256 MB


Future
------

Staying with the theme of simplicity, JSON is the chosen method for data communication between services and data sources. Front-end can talk to back-end via JSON, back-end services can talk to each other using JSON, and documents are stored in the database and retrieved through JSON formats. No extra languages or libraries needed (e.g. SQL syntax, etc.)

* Database: MongoDB
