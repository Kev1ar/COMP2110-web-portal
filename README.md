## Installation

The project has no external dependencies, it uses Lit via a CDN load directly into
the HTML page. Node is used only to run a local HTTP server.

```bash
npm install
```

Will install the `http-server` node module.

```bash
npm start
```

will run the server.

---

# COMP2110 Portal - Group 81

This respository is Group 81's COMP2110 portal implmentation for the front-end assignment ( of class 2023). The page contains widgets that students may find useful such as a weather forecast, currency convertor, etc. Infomation displayed by these widgets are primarily obtained through external APIs. The page also contains the assignment's starter code for login and authentication and functional a blog segment.

For more infomation about the assignment read the TASK-OUTLINE.md file for the original README.md.

> # Group Members:
>
> ## Gian-Luca Battaglia, 47416084
>
> - ### UserName: LucaKBattaglia
>
> ---
>
> ## Kevin La, 45229082
>
> - ### UserName: Kev1ar
>
> ---
>
> ## Earl Stephen, 45605335
>
> - ### UserName: Santos
>
> ---
>
> ## Xiaoxi (Zion) Su, 46340661
>
> - ### UserName: Zion-XiaoxiSu-OGLocGo

---

> # Components
>
> > # comp-2110-portal - Group
>
> - Overall theme can be toggle using button located in the header
> - Users can add blogs through Submit Blog, (requires user log-in)
> - The portal page is divided into two main sections:
>   - widgets
>   - blogs
>
> ---
>
> > # blog-block - Group
>
> - Main API used for blogs can be found here https://github.com/COMP2110-2023/comp2110-portal-server/#blog
> - upon loading the page 20 blogs are displayed
> - additional blogs can be loaded via the load more button at the bottom of the page

---

> # holiday-widget - Member: Kevin La
>
> - Updated date display using JavaScript Date object:
>   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
> - Country selection from list provided by external API. Default Country: AU Australia
> - Displays next five public holidays for the selected region and their dates
>   - API used: https://date.nager.at/
> - Displays flag of selected region
>   Flag API: https://flagpedia.net/download/api

---

> # weather-widget and blog-form - Member: Earl Stephen Santos
>
> ## Description and APIs
>
> - Main API used for the forecast information can be found here https://open-meteo.com/en/docs
>   - forecast for 5 days (inclusive of today) is displayed along with min and max temperatures
>   - icons used are detailed within the widget itself
>   - widget background also changes according to the API(day or night)
> - User location is requested using the JavaScript GeoLocation API https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
>
> - Main API used for the blog creation can be found here https://github.com/COMP2110-2023/comp2110-portal-server/#blog
>   - blogs cannot be created without the user being signed in
>   - blogs cannot be created with no title or content
>   - newly created blogs are temporarily added to the blog-block in order to display it with no need for the page to be refreshed
>
> ## Commit History
>
> ### 2023-04-20
>
> - Added base widget
> - Styled widget layout
> - Basic functionality for getting location in place but not connected to widget's display
>
> ### 2023-04-20 8.30pm
>
> - Removed clock (not really relevant)
> - Redid layout
> - Connected Functionality to Widget
> - Added some error handling
>
> ### 2023-04-26
>
> - updated auth.js to fix custom events bug
> - added link to documentation for weather api in the >WeatherWidget
> - added basic blog form (WIP)
>
> ### 2023-05-01
>
> - blog form now closes after submit
> - tweak to fix blog error when content field is empty (WIP)
>
> ### 2023-05-02
>
> - added loading screen for widget
>
> ### 2023-05-03
>
> - added basic layout for main portal page (group WIP)
> - widgets layout is now responsive
> - blog layout is no responsive
> - blog form button no longer disappears when form is open
> - blog form button added to header
> - blog posts currently displays No Content when no content is found
> - blog posts now have a minimum width
> - basic layout for the login form (group WIP)
> - weather widget refactored
> - weather widget removed unneccesary code
> - TODOs
>   - overall colours and theme
>   - blog post styling
>   - still missing one widget
>   - Task Widget (Optional)
>   - header responsiveness
>
> ### 2023-05-04
>
> - resized weather widget to match holiday widget size
> - weather widget styling changes between day or night
>
> ### 2023-05-08
>
> - added load more button to blogs section
> - creating a new blog now displays in list correctly without need for refresh
> - added a button to toggle between light mode and dark mode
> - TODOs
>   - blog form styling
>   - blog form open button needs styling
>   - header needs redoing
>   - login form needs redoing
>
> ### 2023-05-08 PT2
>
> - padded up the load more blogs button
> - styling added for the blog submit form
> - basic styling added for the submit blog button
> - alert messages for when trying to submit a blank blog
> - alert messages for when trying to submit a blog when user is not logged in
> - added placeholder for blogs with no title
> - TODOs
>   - blog form open button styling (WIP)
>   - header needs redoing
>   - login form needs redoing
>   - footer needs work (completely forgot)
>
> ### 2023-05-09
>
> - weather widget text color
> - added posted date to blog posts
> - added placeholder random fact widget
>
> ### 2023-05-12
>
> - weather widget comments
> - blog form comments
> - blog block comments
> - theme toggle button on hover background changes
> - main page footer styling added
> - ad-widget added to footer in main page

---

> # exchange-widget and CSS - Member: Gian-Luca Battaglia
>
> > ## GitName: LucaKBattaglia
>
> # Description and APIs
>
> - First API used to gain currency rates can be found here: https://api.exchangerate.host/latest
>   - Over 50+ globally recognised currencies are contained within this API
>   - Currencies are updated frequently inline with active global index & currency trackers
> - Second API is used to convert given rates at: https://api.exchangerate.host/convert?from=USD&to=EUR
>   - Uses the updated rates from the first API to have accurate relative data
>   - Can convert any of the 50+ currencies from as little as 0 or 0.1 to a near infinte number
>   - Contains error prevention to prevent the use of negative numbers (result will always = 1)
>
> ---
>
> ## Error Prevention & CSS Overview
>
> > - Error Prevention
>
> - Added my own error prevention method as well to stop users from entering numbers lower than zero in Commit: Exchange-widget [Bug fixes & css updates]
>
> > - Internal CSS - Overview
>
> - The internal CSS used in the comp2110-portal.js and exchange-widget.js can be found here:
>   https://www.w3schools.com/css/css_background.asp > https://www.w3schools.com/css/css_howto.asp
>   - CSS layout does not extend to index.html
>   - Two versions of CSS are implmented for user comfort dark & light modes (lightmode created by santos)
>   - Blog & comp2110 host alterations are updated throughout various commits below:
>
> ---
>
> # Commit History
>
> ## Adding & Importing ExchangeWidget
>
> ### 2023-04-30
>
> - Added exchange-widget.js
> - Imported exchange-widget into comp2110-portal
> - Completed task "Possible Widgets to Implement"
>
> ## CurrencyExchange Update - Linking API & Properties
>
> ### 2023-04-30
>
> - Added new Web-Components/Properties
> - Linked the API: https://api.exchangerate.host/latest
> - Initialized new Properties & updated variables leftover from widget-block.
>
> ## ExchangeWidget - Working Currency Converter
>
> ### 2023-05-01
>
> - Linked API:
>   https://api.exchangerate.host/convert?from=USD&to=EUR
> - Updated constructor & propertes/components
> - Added new functions:
>   - ConnectedCallBack
>   - CurrencyConverter (2nd API in here)
> - First working version of Currency Converter Widget
>
> ## CSS changes (Exchange-widget adjustments)
>
> ### 2023-05-06
>
> - Widget Update: internal CSS from Line14 - Line91
> - blog-block css shape & colour alterations
>   - blog-block: blogpost colour & radius Update
> - comp2110 first css changes (colour / formating)
>   - comp2110: layout update (margin, alignment)
>   - comp2110: header Update(background-color)
>
> ## Exchange-widget [Bug fixes & css updates]
>
> ### 2023-05-08
>
> - New CSS Widget layout / Format
> - CSS widget colour scheme changed to match the comp2110 colour scheme
> - Added Error prevention / Bug fixes:
>   - Line180: Doesn't allow negatives as valid input
>   - Line183: Displays zero & null inputs as zero in results label & can accept tofixed(2) values
>
> ## CSS Exchange-widget Fix
>
> ### 2023-05-09
>
> - Moved widget location in comp2110
> - Fixed previous CSS layout - partially
> - Updated the constructors initialization
> - Presented currenct verison for progression check
>   - Was pushed early due to in class check
>
> ## Exchange-widget Final-Commit & [Readme]
>
> ### 2023-05-12
>
> - Additions to previous CSS fixes
>   - now using absolute & relative positioning
> - Added in comments for code maintain-ability
> - Labeled CSS with comment headers in exchange
> - Added to READMEDRAFT Line 167 - Line 260
>
> ## Exchange-widget Final-Commit & [Readme]
>
> ### 2023-05-12
>
> - Additions to previous CSS fixes
>   - now using absolute & relative positioning
> - Added in comments for code maintain-ability
> - Labeled CSS with comment headers in exchange
> - Added to READMEDRAFT Line 167 - Line 260
>
> ## README.md Update
>
> ### 2023-05-14
>
> - Minor display updates to READMEDRAFT.md
> - Moving Content from READMEDRAFT.md to README.md
>
> ---
