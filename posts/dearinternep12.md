---
title: Dear Intern ep12. End-of-Cycle Presentation.
description: Internship pt. 12.
date: 2025-08-14
scheduled: 2025-08-14
tags:
  - Intern
layout: layouts/post.njk
---

<h3>Last Internship Post:</h3>
<a href="{{ '/posts/dearinternep11/' | url }}">Dear Intern ep11. I DJed My Company's Anniversary Party.</a>

<h3>Main Plots Start Here</h3>

Good afternoon, ladies and gents. Welcome to my end-of-cycle intern presentation. Today, I am going to walk you through what I’ve done and what I’ve learned in the past 10 weeks.

<h3>Outline</h3>

Here is a general structure of my presentation — thank you, Gary, for providing the outline. I found it very helpful.

<h3>Self Introduction — “Self”</h3>

My name is Nancy Zhang. I am from Shanghai, China. I came to the US 3 years ago. I am majoring in CS and Music at Brandeis University, and minoring in Psychology. I also play some college tennis. I had a blast here, and I am grateful for everything that has happened, which led me here in Seurat today.

<h3>Self Introduction — SLICE</h3>

Now, please allow me to introduce our team. The name of our team is SLICE, which stands for…

It was not until week 2 that I realized the icon of our work chat is a “slice” of pizza. That was the first piece of humor I noticed embedded in professionalism, which I have found very delightful.

[Explanation of our internal software…] Sorry. NDA.

<h3>My Project 1 — Playwright</h3>

My main project here is the Playwright script for automated browser tests for front-end UI. How did it start? It was in week 2. I was given the task of manually testing and documenting the print results of all possible combinations of the parameters in an Excel sheet. This means that I need to run the printing job, screen record the result, store the record in a Google Drive, and paste the link onto the Excel sheet. The whole process is incredibly manual and cumbersome. Not to mention that it is very error-prone.

As a CS major, it came to my instinct that anything that requires repetitive, patternized work can, and should be modularized by code. In this case, I believe that the Excel sheets do not need to be necessary work.

I was offered the option to use Selenium, a classic testing framework that was slightly out of date. After some research, I realized that Selenium is heavily Java-based, lacks documentation, and requires handling timeouts manually. After some other research, I discovered Playwright — a Typescript-based testing library that auto-handles timeouts and is very user-friendly. It is a perfect fit for our software front-end testing requirement.

Now, before we move on to the details about Playwright, let’s clarify a few prereq terms.

1. Smoke Testing: It means testing the most basic features of an application. E.g., are buttons visible; are URL navigations working? etc.. It is like a quick health check when you go to a doctor’s appointment. Fun fact: the term smoke testing actually comes from hardware testing. A long time ago, when a hardware engineer powered on a piece of hardware, if there was smoke coming out from the hardware, then something was definitely wrong!
2. End-to-End Testing: E2E Testing targets the entire flow of the application. It usually simulates user behavior and creates an entire job flow, from the moment a user logs in until a job finishes.

Here is a demo of the browser automation achieved by my Playwright scripts. Everything is automated. Greatly time-saving and hands-freeing!

Now, a quick sum of my Playwright project:

Playwright is an open-source automation library developed by Microsoft to perform end-to-end testing of web applications. It provides a single API to automate browser tasks across modern browsers like Chromium, Firefox, and WebKit. In short terms, In short terms, it simulates user behavior, supports multiple browsers + languages, and handles timeouts automatically. Very handy!

Some quick facts: The whole test scripting process is heavily HTML-related. I needed to inspect layers of div elements to locate the tag I wanted. I also needed to make sure the tests are not flaky by using selectByRole or selectByText, which are relatively stable methods.

<h3>My Project 2 — Coding Tasks</h3>

My second project, or I would not even call it a complete project, is a compilation of coding tasks, including various UI, Frontend, and Backend works. I started my journey with, for real, not understanding anything. Anything!

It was loads of Googling, asking questions, watching crash courses… In the end, I managed to implement more than 15+ user stories and bug fixes. Some of my major tasks are:

- Making a user explorer, or call it a Role-Based Access Control system, if fancy, that allows handing out different access to the printing features based on a user’s role. I believe that this feature would be crucial for our future tenant clients to distribute and handle various levels of access in the organization.
- Adding new data fields to the front end to allow users to add a new [internal software details].
- Showing process bars.
- Add / edit operations at endpoints.
- Input validation.
- Data migration.

<h3>Now Let’s Talk About Impacts</h3>

My Playwright project is now live on Azure Pipelines! It has a decent pass rate and has caught two bugs in production: one was actually introduced by me, guilty as charged. I accidentally broke the URL navigation, and fortunately, my test caught the regression, and I fixed the bug. Shame on me, and kudos to me at the same time, I guess?

Another instance was a typo in UI code that was buried pretty deep. I say, 1 dollar to fix the bug in production, 100 to fix it after deployment. Catch a bug before a user does! If a test can catch bugs, then it is a good test.

As for my other general coding tasks, I was able to achieve [internal software details]. I believe that with my help with the UI and bug fixing, our senior SWEs can focus on more niche areas, significantly fast-forwarding the accomplishment of our MVP.

<h3>Work vs. Expectations</h3>

I would rate my Seurat internship experience 10/10. When Anton and I initially started communicating via email, I was told that I would be helping with the UI and doing Quality Assurance work. I was doing the exact same thing, and I have learned an incredible amount.

Technically, I was exposed to an overwhelming amount of tools. I learned about PostgreSQL, Playwright, JS, TS, Azure DevOps, Vue.js, Docker, Pinia, RESTful API, Node.js… The general principles of SWE: separation of concerns, modularity, reusability, cohesion… Yada yada…

While it is important to know the fundamentals (basic syntax, structure, commands), it is important to be flexible with frameworks and be able to read a brand new code space and implement changes by understanding surrounding code, realizing patterns, and noticing problems. I realized that an important skill of all SWEs is knowing how to copy and paste! Copy-pasting is easy. But knowing what and where to copy-paste is a skill! Implementations are easy! It was always the planning process that got me. 

But most importantly, I have realized that coding is just a means to an end. So does the mission of Seurat, right? We try to make machines that can print faster, cost less. The goal is to increase efficiency. Docker is a tool. ChatGPT is a tool. Claude is a tool. Cursor, CoPilot… All are tools. It does not matter if one can master as many tech stacks as possible. New libraries and frameworks are popping out every week. Everybody is cutting-edge. It really matters to be flexible and renew yourself with the latest settings of the world.

<h3>Future Plans</h3>

If I were offered the opportunity to return, I would like to touch upon more backend work. This is because, as I was doing one of my most difficult works, data migration, although challenging, I found myself deeply interested in the architectures happening behind the scenes. I will study OS and databases in my upcoming senior year, and if possible, bring my new skill set into Seurat.

<h3>Shout Out</h3>

Lastly, big shout-out to the SLICE team! Thank you, everyone, for being amazing mentors and leaders. Everyone has taught me so much and has been so patient with me. Couldn’t express my gratitude enough. I really appreciate everybody’s guidance. I have learned an incredible amount — totally different from what I have learned in school.

<h3>All Hands</h3>

Lastly, questions…??

Thank you so much!I typed the presentation down just to get it down. I got bored on the train so why not.

<h3>Next Up Internship Shenanigans:</h3>
<a href="{{ '/posts/dearinternep13/' | url }}">Dear Intern ep13. Thank You Seurat.</a>

