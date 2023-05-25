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

---

## Challenges

---

## Outcome and Reward

---

## Individual Reflection

---

### 45605335 Earl Stephen Santos - Weather Widget

As someone with little to no experience of working in a group, let alone one that involves mostly front-end development, I found the project to be an interesting and new experience. I mainly chose the weather widget as although its implementation was fairly simple technically, my lack of experience with front-end design and development makes its overall implementation a challenge. Getting information and calling APIs is fairly straightforward, but coming up with a design and then implementing it is a whole different story. Looking at other weather widget designs for inspiration, combined with a lot of trial and error with CSS, eventually led to the widget that we can see on the portal. If I were to pick something that did prove to be a challenge in regards to the widget, it would've mainly been the lack of understanding of CSS, which more than anything just required time to resolve.

I also ended up working on a few other parts of the project, the page layout and blog form specifically. At this point of the project, the widgets were mostly in functional, and such our main focus switched to the portal itself. We had discussions about what the layout should be, after which I was tasked with implementing it. Throughout the process I was constantly asking for feedback, which was met with quick responses. This again led to a fairly smooth process. The blog form's implmentation also underwent a similar process of group design, I implement, and then group feedback. No real challenges arised.

In terms of the overall group project, for me the main concern originally would've been communication. Initially there was little communication about the project, but once it got time to actually working, everyone was active and prompt with responses when asked any questions. Selecting the parts that we would be working as well was pretty straightforward, with no really demanding anything. Everyone worked on their assigned parts and the entire process was smooth. Any decisions that would impact the whole project - such as the main style and layout of the portal - was made as a group decision, and any disagreements were resolved with ease.

Overall my main worries when it comes to group projects proved not to be of any real concerns. The main challenges if any were mostly technical, which were easy enough to resolve.

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
