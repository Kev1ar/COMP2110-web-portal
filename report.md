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

The Currency Exchange widget uses 170+ currencies from its own third party API to give users live & current exchange rates between different currencies. These exchnage rates actively update everytime the page is reloaded or a new currency is called by switching between the differet currency options from within one of the two drop down boxes within the widget. The code that is primarily used to create the conversion & update method for the currencies can be found here: https://exchangerate.host/#/

#### Upcoming Holidays

The public holiday widget uses nager.date’s API to fetch and display public holiday data for countries around the world. In the header, JavaScript’s Date API is generated to provide an updated date display. Under this date, a dynamic subtitle indicates to users whether it is a public holiday for the selected region. Users can use the dropdown menu to select a specific country which will automatically update the scroll view under it. This scroll view displays date’s and names of public holidays within the next 365 days.

Outside of all the date information the flag image is provided by a separate API, but uses the same countries as the first API. Australia is set as the default region.

Public Holiday API, nager.date - https://date.nager.at

Flag API, flagpedia.net - https://flagpedia.net/download/api

#### Random Facts

The Random Fact widget reads the date of the day via JavaScript and displays what happened on the same day in history. When user refrash the page, it will show a nre fact about that day. The random fact about the current date is from <http://numbersapi.com/>. For example: http://numbersapi.com/5/28/date. In this url, it contain many facts in May 28th.

Note: Due to the fact that the Numbers API uses HTTP instead of HTTPS, as it stands it is currently non-functional.

#### Tasks To-Do List

This widget is an online to-do list for comp2110 students to post and check off work tasks. It employs the comp2110-portal-server to store and fetch persisting task data. A maximum of four tasks are displayed at one time, with a checkbox-button pairing for task deletion and a user form for task creation. The functionality is achieved through three separate fetch methods, these are:

1. A GET request for retrieving task data from the server. To reduce overhead with the server, only the previous 15 tasks (in order of most recent) are fetched from the server.
2. A POST request to store new tasks prompted by the user input form.
3. A POST request to mark existing tasks from 'pending' to 'completed'.

In the current implementation there exists certain limitations and bugs due to the server having no delete feature.

- The lack of user-side deletion feature means old task data persists forever
- The 15 fetch limit was introduced to prevent the server from constantly fetching redudant data (e.g. 500 'completed' tasks)
- A 15 fetch limit means a uncompleted task will eventually be pushed out after 15 new tasks are cycled through the widget

COMP2110 Backend API - https://comp2110-portal-server.fly.dev/

---

## Challenges

The biggest hurdle the group faced was our projects effective communication and time management. Since not all group members were available at the university simultaneously, we relied on online communication as the obvious choice. However, this approach resulted in a lack of specificity and detailed responses, leading to a breakdown in communication regarding solutions for the overall assignment.

---

## Outcome and Reward

The end result of working on all tasks incrementally for the project, was an early completion of the functionality of the web page. This outcome provided the team with additional time to focus on the project's styling in the later half of the assignment.

- Acquiring practice and experience while working on individual components of the assignment.
- The ability to divide the workload effectively among team members.
- Observing how theoretical knowledge and classroom teachings translated into practical application within the project.

---

## Individual Reflection

### 47416084 Gian-Luca Battaglia LucaKBattaglia - Currency Converter Widget

This being my first group assignment within the university l can say I was very much eager to try & finish the assignment as early as possible, especially because of the assignment being based in 3 new & totally different coding languages (HTML, JavaScript & CSS). My initial reason for choosing to work on the currency conversion widget is because the idea itself is self-explanatory however the JavaScript would be complex allowing me to understand & become more proficient in the coding language as l progress through the widget, with minimal assistance. The coding itself for the widget was fairly straight forward as much of it related to the weeks work in terms of calling different API’s l found Week 7 to be incredibly helpful for the update feature where the widget would request live & current exchange rates from the third party API: https://exchangerate.host/#/. When working on the CSS for the widget l designed my widget to match the design of the web-portal page, this page would further change later drastically & if l had to pick something to approve upon l would change the CSS to a version that does not rely on the web-portal design / background due because due to late changes my CSS for the widget ends up looking out of place.

One of the issues we faced was reaching a group agreement on the assignments page layout, leading to a major CSS changes later throughout the assignment. The layout transitioned from the default state to a basic design layout, then to the first redesign created by me. Subsequently, to another version that other group members preferred, mainly a colour redesign, Eventually, having us settle on a fourth version together, toggling between the second & third version.

Overall l found working in a group interesting, however very difficult in comparison to working with myself due to the lack of communication especially because of GitHub causing issues if two or more members were to work in same location during the same commit time span, practically locking out other users from certain parts whilst others were working on it to avoid commit errors. Communication was also an issue amongst some members of the group as some would not reach out online in contrast to others who would leave a detailed summary of when they were committing & when they would start working on new commits.

---

### 45605335 Earl Stephen Santos - Weather Widget

As someone with little to no experience of working in a group, let alone one that involves mostly front-end development, I found the project to be an interesting and new experience. I mainly chose the weather widget as although its implementation was fairly simple technically, my lack of experience with front-end design and development makes its overall implementation a challenge. Getting information and calling APIs is fairly straightforward, but coming up with a design and then implementing it is a whole different story. Looking at other weather widget designs for inspiration, combined with a lot of trial and error with CSS, eventually led to the widget that we can see on the portal. If I were to pick something that did prove to be a challenge in regards to the widget, it would've mainly been the lack of understanding of CSS, which more than anything just required time to resolve.

I also ended up working on a few other parts of the project, the page layout and blog form specifically. At this point of the project, the widgets were mostly in functional, and such our main focus switched to the portal itself. The design process mainly involved a single group session exploring a few ideas and quick prototyping, at the end of which I was tasked with its implementation. Feedback afterwards was minimal so I assumed that the design was sufficient. The blog form's implmentation also underwent a similar process of group design, I implement, and then group feedback. No real challenges arised.

Personally I found that the group interacted less than expected, and more so felt like 4 individuals doing their own thing and then trying to mix it all together at the end. There was minimal discussions when it came to the actual overall solution, which in turn led to what I feel a barely cohesive page structure and design. Overall the vague and minimal communication made the project a lot more difficult as expected, almost to the point where I felt like it would've been easier for me to just work on the entire project individually.

---

### 46340661 Zion Xiaoxi Su - Random Fact Widget

This assignment was my first time developing a web front-end as part of a group. We were assigned tasks after dividing the group. After the rest of the group had chosen their tasks, I was assigned the task of creating a random fact component. After assigning the tasks, we then started to complete our parts. The rest of the group also completed the most basic code for the web page. Because of my lack of programming skills, I had to concentrate on completing my part. The widget fetches random facts in the format http://numbersapi.com///date. The program will first fetch the current day, then fill in the URL with the month and date separately, then receive the random facts sent from the URL, and finally populate the widget with the facts.

The problem I faced was that I could not confirm the format of the information obtained at the web site. At first, I populated the code and it did not return any value. I tried modifying the fench and it turned out that the URL I was trying to get the information from was wrong. The month and date are displayed as garbled. After trying to change the URL, I found that the type of information I needed to try to get was json, but the type I wanted to output was string. finally, I tried response.text() to convert the information to string.

Although we did work together on this assignment, it was more like a factory assembly line than the group work I used to understand. Each person goes and finishes their part and then uploads it. For this assignment, I think this type of collaboration is fine. There is sometimes a problem where I am pulling and making something and someone else has already uploaded it. I get a version conflict when I am uploading. This is when communication between group members is important. We solved this problem by communicating during the production process.

---

### 45229082 Kevin La - HolidayWidget

Despite the challenges and inconveniences of this group assignment, I personally found it quite enjoyable. The project simulates developing a GitHub project with a small team of developers and allows me to see the application of code that we learned throughout the unit. Both of these aspects provided me with insightful experience to what I need to work on as a software developer. In reflection of the experience, I would divide the challenges faced into the individual and group scopes.

Working on the widgets as an individual became a constant learning process, especially when trying to apply the fetch code with the external API’s. Initially, I struggled with understanding the fetch and API interaction, however glancing at Steph’s weather code, paired with some trial and error, got me accustomed to the usage. After completing the holiday-widget and moving towards the task-widget, I definitely started to gain speed in my coding. I remember Gian or Steph saying that we should complete the functional aspects first before doing the CSS for the website. Following this advice with my widget really sped up the work, by coding the functional design then the visual design, I didn’t have to delete code as I added new features.

Group work was definitely a struggle (I take a lot of responsibility) but helped me learn the most. For GitHub, I often had the habit of committing in large snippets. I realized this was inconvenient for my group members as they didn’t realize what areas of the website I was working on. By committing more frequently and pulling from the main repository more often, I could save time when trying to merge my work (avoid collisions). In terms of time management, I did most of my work at the start and end of the assignment. I think having a more consistent work schedule, especially in the middle of the assignment, would have levitated a lot of the CSS pressure towards the end.

Communication was probably the largest challenge with the assignment. Due to me not coming to class for select weeks and poor work balance with other units, I didn’t meet the members until the ending days of the assignment. By working more on the assignment during the middle of the timeline, we could have had more group meetings and talks. This would have amounted to a more cohesively visual end-product. Overall, I personally enjoyed my group members but did think Zion could have contributed earlier into the timeline.

---
