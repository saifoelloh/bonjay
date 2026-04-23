---
id: xss-prevention
priority: CRITICAL
tags: [security, xss, frontend, rendering]
---

# Rule: Escape All User Input Before Rendering to HTML

## Context
Cross-Site Scripting (XSS) occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing attackers to execute scripts in the victim's browser.

## Modern Frontend Frameworks
React, Angular, and Vue automatically escape variables by default:
```jsx
// Safe in React: HTML tags will be rendered as strings, not executed
<div>{userInput}</div> 
```

## Bad ❌
Bypassing framework protections or using raw HTML interpolation:
```jsx
// React
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Vue
<div v-html="userInput"></div>

// Vanilla JS
element.innerHTML = userInput;
```

## Good ✅
If you absolutely must render HTML (e.g. from a Markdown editor), you MUST sanitize it first using a library like DOMPurify:
```jsx
import DOMPurify from 'dompurify';

const cleanHTML = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
```
