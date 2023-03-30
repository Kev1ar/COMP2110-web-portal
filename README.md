# COMP2110 Portal - Starter

This is the starter repository for the COMP2110 Portal front end assignment 2023. You are
expected to customise this README file to describe your own project.  You may delete or modify
any or all of the current contents.

## Installation

The project has no external dependencies, it uses Lit via a CDN load directly into
the HTML page.   Node is used only to run a local HTTP server.

```bash
npm install
```

Will install the `http-server` node module.

```bash
npm start
```

will run the server.

## Backend Server

Your portal will make use of a server that we have implemented that is running on <https://comp2110-portal-server.fly.dev/>.   Documentation for the services it provides
is in [this Github repository](https://github.com/COMP2110-2023/comp2110-portal-server/).

## Starter Code

The code included here implements the basic framework for the application, including
an overall page structure and the blog, login and advertising components.  If you run
the application you will see the basic page with space for a number of _widgets_.  
You will fill these slots with your own widgets - one per team member. (A _widget_
is a name for an element of a graphical user interface, basically the same as a
component).

The module `config.js` exports a variable `BASE_URL` that contains the address
of the backend server. This is used for example in the blog-block component
to define the URL endpoint.  You may also want to use it if you make use of
other API endpoints from the server (eg. tasks).

The code contains implementations of the following components:

### `<comp2110-portal>`

This is a container for the whole portal application and currently contains 
some of the pre-defined widgets.  You can modify this as you see fit to achieve
your overall application layout and behaviour.

### `<widget-column>`

This component implements a container for widgets and can be used to define
the style information and layout for the group.  You can modify this if you
wish or replace it with something else.

### `<login-widget>`

This component implements a login form that will allow a user to authenticate to the
backend server.   If the user is logged in, the component displays their name and
a logout button rather than the form.  

Authentication is implemented in the `auth.js` module.  Once a user login succeeds,
the current user details are stored in the browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) so that
they persist over browser sessions.  In your code, you can use the function
`getUser()` from the `auth.js` module to find out if a user is logged in and get
their details.  

### `<blog-block>`

This component implements a blog using the backend API from the COMP2110 portal server.
You can modify this component if you wish to change the layout of posts or the overall look and feel.  

This component only supports reading posts although the backend API allows posting new blog
posts if you are logged in.  One possible extension of this component would be to allow
posting in some way.

### `<ad-widget>`

This component displays an advertisement from the backend portal server. You should not
modify it and it should appear somewhere in your page design.


## Possible Widgets to Implement

Your first task is for each team member to choose one widget from the following list
to implement as a Lit component, following the basic outline provided in
`src/components/widget-block.js`.

* Weather forecast with data from <https://api.open-meteo.com/v1/forecast>, e.g.
[this example](https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&current_weather=true).  Location can be fixed or derived from the Javascript 
[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

* Currency conversion with data from <https://exchangerate.host/> e.g. 
[USD to EUR](https://api.exchangerate.host/convert?from=USD&to=EUR).  Your widget should
allow the user to input an amount to be converted and possibly select the to/from
currencies.

* A widget showing a random fact about the current date from <http://numbersapi.com/>,
e.g. <http://numbersapi.com/3/22/date>.

* A widget showing the upcoming public holidays from <https://date.nager.at>, e.g.
[the 2023 Australian holidays](https://date.nager.at/api/v2/publicholidays/2023/AU).
Your widget could allow selection of the country who's holidays are being displayed.

* (Advanced) A TODO task widget using the API provided by the COMP2110 portal backend.
Should show tasks for the current logged in user, allow creation of new tasks and
changing the state of existing tasks (marking them as done).

* Your own design making use of data from an open API (e.g. see [this list](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/)).

