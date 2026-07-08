---
title: How the Web Works
description: Understand what happens when you visit a website
order: 1
---

Before you write a single line of code, you need to understand what you're building and why. The web is just a system of computers talking to each other.

## Clients and Servers

The web works on a **client-server model**:

- **Client** — Your browser (Chrome, Firefox, Safari). It asks for stuff.
- **Server** — A remote computer that stores websites. It sends back what was asked for.

When you open your browser and type `https://example.com`, your browser (the client) sends a **request** across the internet to a server somewhere in the world. The server processes that request and sends back a **response** — usually an HTML page.

```
You (browser)  ──── REQUEST ────>  Server
               <─── RESPONSE ────
```

## What Happens When You Type a URL

Let's trace `https://www.google.com` step by step:

1. **URL parsing** — Your browser identifies the protocol (`https://`), domain (`www.google.com`), and path (`/`).
2. **DNS lookup** — The browser asks a DNS server: "Where does `google.com` live?" DNS translates the human-readable domain into an IP address like `142.250.80.68`.
3. **TCP connection** — Your browser opens a connection to that IP address on port 443 (HTTPS).
4. **TLS handshake** — If HTTPS, the browser and server agree on encryption so nobody can spy on the data.
5. **HTTP request** — The browser sends: "GET / HTTP/1.1 Host: google.com"
6. **Server processes** — Google's server receives the request, decides what to send back.
7. **HTTP response** — The server sends back: status code `200 OK` plus the HTML content.
8. **Browser renders** — Your browser reads the HTML, requests any extra files (CSS, images, JS), and paints the page.

## Understanding URLs

Every URL has the same structure:

```
https://www.example.com:443/path/to/page?name=value#section
└─────┘ └──────────────┘ └─┘ └──────────────└───────────└───────
protocol     domain       port      path       query     fragment
```

- **Protocol** — How to communicate (`http://` or `https://`). The `s` means encrypted.
- **Domain** — The website's human-readable name.
- **Port** — The door number on the server. 80 = HTTP, 443 = HTTPS. Usually hidden.
- **Path** — Which page or file on the server.
- **Query** — Extra data sent to the server (`?search=python&page=2`).
- **Fragment** — A specific section on the page (`#section2`). Never sent to the server.

## HTTP Requests and Responses

HTTP is the language browsers and servers speak.

### Request methods

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve a page or data | Loading google.com |
| `POST` | Submit data (form, login) | Signing up |
| `PUT` | Update existing data | Editing a profile |
| `DELETE` | Remove data | Deleting a post |

### Status codes

Every response comes with a status code. You've probably seen some of these:

| Code | Meaning | Example |
|------|---------|---------|
| `200` | OK — everything worked | Page loaded normally |
| `201` | Created — something was created | Form submitted |
| `301` | Moved permanently | Site changed URL |
| `404` | Not found | Typo in URL |
| `500` | Server error | Something broke on the server |

## Localhost vs Production

When you build a site, you run it on your own computer first:

- **localhost** — Your own machine. The address `127.0.0.1` or `localhost`. Only you can see it.
- **Production** — A real server on the internet. Anyone can access it.

You'll develop on `localhost` and **deploy** to production when you're ready to share it.

## Using DevTools

Every browser has Developer Tools. Right-click any page and select **Inspect** (or press F12). The **Network** tab shows every request the page makes:

1. Open DevTools → Network tab
2. Reload the page
3. You'll see every file the browser requested (HTML, CSS, JS, images)
4. Click any request to see headers, response, and timing

This is your most important tool as a web developer. Get comfortable with it now.

## Key Takeaways

- The web runs on a client-server model — browsers request, servers respond.
- URLs break down into protocol, domain, path, query, and fragment.
- HTTP uses methods (GET, POST) and status codes (200, 404, 500).
- DevTools → Network tab shows every request a page makes.

---

<script>
	import { MCQ, TF, Fill } from '$lib/components/quiz/index.js';
</script>

## Think About It

<MCQ
	id="web-q1"
	lesson="how-the-web-works"
	question="What does a DNS server do when you type a URL into your browser?"
	hint="Think about step 2 in the URL trace."
	options={[
		{ label: "A", text: "It stores the website's files" },
		{ label: "B", text: "It translates a domain name into an IP address" },
		{ label: "C", text: "It encrypts your connection" },
		{ label: "D", text: "It displays the webpage" }
	]}
	correct="B"
	explanation="DNS (Domain Name System) translates human-readable domain names like google.com into IP addresses like 142.250.80.68 that computers use to find each other."
/>

<TF
	id="web-q2"
	lesson="how-the-web-works"
	question="An HTTP 404 status code means the server encountered an internal error."
	hint="Review the status codes table."
	correct={false}
	explanation="404 means 'Not Found' — the requested page doesn't exist on the server. 500 is the internal server error."
/>

<Fill
	id="web-q3"
	lesson="how-the-web-works"
	question="The __________ tab in DevTools shows every request a page makes to the server."
	hint="It's one of the main tabs in the Inspector panel."
	correct="Network"
	explanation="The Network tab records all HTTP requests made by the page, including HTML, CSS, JS, images, and API calls."
/>
