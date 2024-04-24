```bash
  npx ts-node ./utils/hashPassword.ts
```

[https://sitr.us/2011/08/26/cookies-are-bad-for-you.html]
[https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf]

# MITM = Man-in-the-middle 
  HTTPS used to encrypt any traffic between server and client
  set the "secure" flag on any cookies this flag prevents the browser from transmitting cookies over an unencrypted connection.

# XSS = Cross-site scripting 
  pushing malicious JavaScript code into a web application
  Session hijacking via XSS can be prevented by setting an "httpOnly" flag on cookies that are used for authentication.
  The browser will not allow JavaScript code to read or write any cookie that is flagged with "httpOnly"; but those cookies will still be transmitted in request headers.

# CSRF = Cross site request forgery
  The biggest problem with CSRF is that cookies provide absolutely no defense against this type of attack
  The most basic precaution that you can take is to make sure that your application never performs any side-effects in response to GET requests.

  To protect against cross-domain POST requests a commonly used option is to use an anti-forgery token that must be submitted with every POST, PUT, or DELETE request. 

  JSON responses can be protected by pre-pending the JSON response with some code that makes the response non-executable. For example, you could place a JavaScript loop at the beginning of the response that never terminates.

  Or you could put in a statement that throws an exception

  Putting the whole JSON response inside of a comment block also works.

  Cross-Origin Resource Sharing (CORS)

# HttpOnly cookies
 [https://stackoverflow.com/questions/55129348/express-how-to-read-httponly-cookie-in-request-to-api]
