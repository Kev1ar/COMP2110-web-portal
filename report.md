# Project Part-3: Deployment and Final Reports (Group)

## Deployment

This implementation of the COMP2110-Portal utilizes Cloudflare Pages for its deployment. The deployed portal can be accessed using the following URL https://comp2110-portal-group-81.pages.dev/

Deploying to Cloudflare Pages involved the following:

### Installing wrangler in the project

    npm install wrangler

### Authenticate with Cloudflare

Create an account with Cloudflare, then login using

    npx wrangler login

This opens a Web Browser, prompting you to authenticate and give permission to wrangler to use your Cloudflare account

### Create the Project and Publish

A project is needed for the portal to be deployed to, with the <PROJECT_NAME> being the domain

    npx wrangler pages create <PROJECT_NAME>

To publish the portal use

    npx wrangler pages publish .

(Note: the . refers to the current directory, which in this case is the portal project directory)

### Publishing Updates

In order to publish updates the following command can be used

    npx wrangler pages publish .

---

## Portal Implementation

The COMP2110 Portal is a web based tool which allows end-users to create blogs and view blogs created by other users. The page also features a handful of widgets utilizing third party APIs, whose functionalities vary from displaying information or acting as a tool for the user. Certain features on the page may require a valid user to be logged in, in order for the feature to be used.

### Main Portal Backend

The main functionalities of the portal utilizes a backend server that is running on https://comp2110-portal-server.fly.dev/.

This backend services handles user authentication, blog creation and retrieval, tasks management, as well as an advertisement widget.

Documentation for its services can be found here https://github.com/COMP2110-2023/comp2110-portal-server/

### Blogs

The main feature of the portal are the blogs. Blogs created by other viewers can be viewed by any visitor, but the creation of a blog requires the user to login to the portal and be authenticated. The login form can be located at the top of the page in the header. A blog consists of a Title and Content. Upon submission, a timestamp of the blog’s creation and the author (user) is added and displayed on the portal for visitors/other users to see. Blogs can be created by clicking on the floating button located towards the bottom right corner of the page.

Blog’s data persistence and life cycle is handled by the backend server mentioned above.

### Widgets

#### Weather

The weather widget utilizes a third party forecast API to show the user the current weather forecast, as well as future weather forecast. It requires only location permissions, as it utilizes the JavaScript Geolocation API (documentation here https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) to access the user’s current location, after which the forecast API is then called. Further information and documentation on the forecast API can be found here https://open-meteo.com/en/docs

#### Currency Exchange

#### Upcoming Holidays

#### Random Facts

#### Tasks

---

## Challenges

---

## Outcome and Reward

---

## Individual Reflection

---

### 45605335 Earl Stephen Santos - Weather Widget

As someone with little to no experience of working in a group, let alone one that involves mostly front-end development, I found the project to be an interesting and new experience. I mainly chose the weather widget as although its implementation was fairly simple technically, my lack of experience with front-end design and development makes its overall implementation a challenge. Getting information and calling APIs is fairly straightforward, but coming up with a design and then implementing it is a whole different story. Looking at other weather widget designs for inspiration, combined with a lot of trial and error with CSS, eventually led to the widget that we can see on the portal. If I were to pick something that did prove to be a challenge in regards to the widget, it would've mainly been the lack of understanding of CSS, which more than anything just required time to resolve.

I also ended up working on a few other parts of the project, the page layout and blog form specifically. At this point of the project, the widgets were mostly in functional, and such our main focus switched to the portal itself. The design process mainly involved a single group session exploring a few ideas and quick prototyping, at the end of which I was tasked with its implementation. Feedback afterwards was minimal so I assumed that the design was sufficient. The blog form's implmentation also underwent a similar process of group design, I implement, and then group feedback. No real challenges arised.

Personally I found that the group interacted less than expected, and more so felt like 4 individuals doing their own thing and then trying to mix it all together at the end. There was minimal discussions when it came to the actual overall solution, which in turn led to what I feel a barely cohesive page structure and design. Overall the vague and minimal communication made the project a lot more difficult as expected, almost to the point where I felt like it would've been easier for me to just work on the entire project individually.

---

## Notes (We'll remove this before submission):

## Part 3 of our project, basically two parts to it

- Deploying the WebApp
- Writing a report

Writing a Report

3000 word limit
Some sections we do as a group, others are individual that we then combine together.
We are to add it as report.md in our repository that we've been working on. Afterwards I think we need to submit the .md file on iLearn.

> # The main parts of it are as follows,
>
> ## Deployment Details (Group)
>
> ## what?
>
> Webpage Creation through 'Cloudflare Pages', via nxp commands on Cloudflare wrangler command line tool 'Wrangler'
>
> ## how?
>
> 1. Installed npm WRANGLER into "WEB-DEVELOPMENT-project-group-81" & ssantos(Earl) created account with cloudflare online
> 2. LOGGED in via nxp using cloudflare account & inputing project name for authentiaction
> 3. After authenication cloudflare uses new name to create URL (https://comp2110-portal-group-81.pages.dev/) & launch webpage

> # What we implemented (Group)
>
> - explaining the main portal functionalities and widgets

> # What did the group find challenging?(Group/Individual)
>
> - if you found something challenging just add it here

> # What was rewarding for the group/individual? (Group/Individual)
>
> - if you found something interesting/rewarding add it here

> # Individual reflection (~~375 words each)
>
> - which widget did you choose and why?
> - what was most challenging part of the project for you?
