# CHROME-EXTENSION

*COMPANY*: CODETECH IT SOLUTIONS

*NAME*: NEKKALA VARUN

*INTERN ID*: CT1MTDN1041

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTOSH

The Chrome Extension for Time Tracking and Productivity Analytics is a browser-based tool designed to monitor and analyze the time a user spends on various websites throughout their day. The main goal of this application is to help users become more conscious of how they use their time online and to promote better productivity habits. Once the extension is installed and activated in the Chrome browser, it begins to track user activity silently in the background. It monitors which tab is active, identifies the domain of the current website, and calculates the amount of time spent on that site. When the user switches tabs, minimizes the browser, or changes focus to a different window, the extension stops the timer for the previously active tab and records the duration spent. This process continues automatically, logging time data for each domain visited.

To make the data meaningful, the extension classifies websites into three categories: productive, unproductive, and neutral. Productive websites include platforms like GitHub, Stack Overflow, LeetCode, and other educational or work-related resources. Unproductive websites consist of popular social media and entertainment platforms such as YouTube, Facebook, Instagram, and Twitter. Any website not explicitly listed in either category is considered neutral. The classification helps the extension analyze how much of the user’s time is being spent on useful versus distracting websites. All time data is stored using Chrome's local storage API, allowing the extension to work without requiring internet access or backend support initially.

The extension features a simple and intuitive popup dashboard that users can access by clicking the extension icon on the Chrome toolbar. This popup displays a summary of the user’s browsing behavior, including total time tracked, productive time, and unproductive time. Additionally, it visualizes this data through a colorful donut chart using Chart.js, giving users a clear breakdown of their productivity. This immediate visual feedback encourages users to reflect on their browsing habits and make conscious adjustments to improve focus and efficiency.

For extended functionality, the project also includes a Node.js and Express.js-based backend server. While optional, the backend allows for storing user data permanently, enabling features like user authentication, long-term analytics, and generating weekly productivity reports. The backend provides endpoints to save time logs and retrieve data per user, which can be integrated later into a more comprehensive dashboard or reporting system. This makes the extension scalable and suitable for both individual use and team-based productivity monitoring in workplaces or educational institutions.

In summary, this Chrome extension is a lightweight, user-friendly tool that helps individuals track their digital behavior, classify website usage, and analyze productivity in real time. It offers both local and backend-supported storage options, making it flexible for different usage scenarios. By turning browsing habits into visual, trackable metrics, the extension promotes greater awareness and control over how users spend their time online, ultimately leading to improved time management and productivity.

#OUTPUT

![Image](https://github.com/user-attachments/assets/f53bc51c-a8ee-4f80-b475-15fb7bee4b25)
