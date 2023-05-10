# COMP2110 Portal - Group 81

This respository is Group 81's COMP2110 portal implmentation for the front-end assignment ( of class 2023). The page contains widgets that students may find useful such as a weather forcast, currency convertor, etc. Infomation displayed by these widgets are primarily obtained through external APIs. The page also contains the assignment's starter code for login and authentication and functional a blog segment.

Group Members:

- Gian-Luuca Battaglia
- Kevin La 45229082
- Earl Stephen Santos
- Xiaoxi (Zion) Su

## Components

# blog-block - Group

todo

-

# holiday-widget - Member: Kevin La

- Updated date display using JavaScript Date object:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- Country selection from list provided by external API. Default Country: AU Australia
- Displays next five public holidays for the selected region and their dates
  API used: https://date.nager.at/
- Displays flag of selected region
  Flag API: https://flagpedia.net/download/api

---

# weather-widget - Member: Earl Stephen Santos

## 2023-04-20

- Added base widget
- Styled widget layout
- Basic functionality for getting location in place but not connected to widget's display

## 2023-04-20 8.30pm

- Removed clock (not really relevant)
- Redid layout
- Connected Functionality to Widget
- Added some error handling

## 2023-04-26

- updated auth.js to fix custom events bug
- added link to documentation for weather api in the WeatherWidget
- added basic blog form (WIP)

## 2023-05-01

- blog form now closes after submit
- tweak to fix blog error when content field is empty (WIP)

## 2023-05-02

- added loading screen for widget

## 2023-05-03

- added basic layout for main portal page (group WIP)
- widgets layout is now responsive
- blog layout is no responsive
- blog form button no longer disappears when form is open
- blog form button added to header
- blog posts currently displays No Content when no content is found
- blog posts now have a minimum width
- basic layout for the login form (group WIP)
- weather widget refactored
- weather widget removed unneccesary code
- TODOs
  - overall colours and theme
  - blog post styling
  - still missing one widget
  - Task Widget (Optional)
  - header responsiveness

## 2023-05-04

- resized weather widget to match holiday widget size
- weather widget styling changes between day or night

## 2023-05-08

- added load more button to blogs section
- creating a new blog now displays in list correctly without need for refresh
- added a button to toggle between light mode and dark mode
- TODOs
  - blog form styling
  - blog form open button needs styling
  - header needs redoing
  - login form needs redoing

## 2023-05-08 PT2

- padded up the load more blogs button
- styling added for the blog submit form
- basic styling added for the submit blog button
- alert messages for when trying to submit a blank blog
- alert messages for when trying to submit a blog when user is not logged in
- added placeholder for blogs with no title
- TODOs
  - blog form open button styling (WIP)
  - header needs redoing
  - login form needs redoing
  - footer needs work (completely forgot)

## 2023-05-09

- weather widget text color
- added posted date to blog posts
- added placeholder random fact widget

---
