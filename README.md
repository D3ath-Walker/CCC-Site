# Technove CCC

A simple static site prototype for a Code Correction Championship (CCC).

## Features

- Event name display: `technove` with subtitle `Code Correction Championship (CCC)`.
- Participant registration form with name, registration number, semester, and course.
- Exam page showing a waiting message and a `Show Question` button.
- Developer-controlled activation via browser console: call `enableExam()` to enable the button.
- Once the button is clicked, a 5-minute countdown starts and the answer form is shown.
- The submit button disables when time expires.

## Run locally

Open `index.html` in a browser.

## Developer activation

In the browser console, run:

```js
window.enableExam();
```
"https://ccc-site.onrender.com"