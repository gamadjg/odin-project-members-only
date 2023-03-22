# Members Only

![image](public/images/members-only.png)

## Live Preview

[Google Cloud Link](https://members-only-381404.wl.r.appspot.com/)

---

## Overview

Messageboard with multi-tierd authentication.

Tech Stack:

- Javascript
- NodeJS
- Express
- Bcrypt
- Passport
- MongoDB Atlas
- Google Cloud App Engine

## Features

- Bcrypt hashes passwords when signing up or logging in.
- Passport and Express-validator used for authentication and validation.
- Separate Mongodb collections for user accounts and messages.
- Standard and admin membership can be updated when providing a secret key.
- Anonymous users only able to read messages. All other posters are anonymous to them.
- Standard registered users can post and see names of other message creators.
- Admins have the ability to delete messages.
