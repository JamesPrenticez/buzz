[https://stackoverflow.com/questions/27726066/jwt-refresh-token-flow]

JWT has two problems:

1. lousy standardization

2. it is hard to revoke (when used for authentication)

The first can be solved by using your own JWT implementation: put in JSON whatever you want, encrypt it with AES - voila - use it for authentication (also for authorization if needed: put roles inside JSON).

Super minimalistic JWT {"id" : "<id>"}

The second problem requires clarification. With regular sessions which are stored on the server side, there is no revocation problem: the session can be invalidated by the server anytime. But regular sessions have problems with scalability and performance, hence JWT.

A common solution to the revocation problem is to use a refresh-token.

Here is how it can be done:

1. The refresh token can be the exactly same JWT as the access-token: custom JSON encrypted and base64 encoded. The result string can be just duplicated. If the access-token contains a lot of data (for example roles), the refresh token may be different as it needs only the user id. Both access and refresh tokens don't have any expiry hardcoded inside.

2. They are both stored in https_only cookies but the expiration time for the access-token cookie is 2 min and for the refresh-token cookie is 30 min.

3. Refresh-token stored in DB (User table) and can be easily revoked/invalidated by deleting from DB.

4. Server looks for access-token in request: if presents and valid (can be decrypted) - OK process request;

5. if the access-token does not present (cookie expired), the server looks for a refresh-token: if presents - validate by comparing it to one stored in DB and generate a new access-token (based on information from the refresh-token and DB) and process the request.

6. If the refresh-token is not there, then the server looks for one of the following: username-password pair, third-party identity provider token (Google, Facebook, etc.), third-party identity management system token (Cognito, Okta, JumpCloud). If any are found: process the request and generate new access and refresh tokens.

7. If nothing is found, then the server sends an authentication error and forces the client to relogin the user.
