# Mesto (The Place)

##  A multi-user photo sharing React/Node/Express/MongoDB web app

## Front end

Deployment
- [https://mesto.418co.de](https://mesto.418co.de/)
- Custom domain, GCP debian VM with Nginx, Dynamic DNS, Let's Encrypt SSL certificate

JavaScript
- user registration and authentication with password and email and confirm popup, jwt authentication, ProtectedRoute HOC
- refactor [sprints 4-9](https://github.com/418code/mesto/) objective JavaScript web app with React during [sprints 10-11](https://github.com/418code/mesto-react)
- React: CRA, functional components, state/history/effect/context hooks, controlled components, refs, routes, redirects
- Api objects for async calls to server
- api use to create, delete, like a card, load cards, load and edit profile info and avatar, register, sign-in, and check jwt token
- editable profile information with interactive popups
- place card addition with a popup
- place card delete confirm popup to remove only the current user's cards
- enlarge photo from place card in a popup
- place card like functionality with number of likes shown
- custom form validation
- close popup with a click on overlay and with the Esc key

CSS
- responsive layout with flexbox/grid and media queries
- buttons changing opacity with transition mix-in
- smooth popup fade in and out
- card photo flip on hover
- custom fonts imported
- [BEM](http://getbem.com/introduction/) - Block Element Modifier naming CSS style system
- normalize.css
- [W3C validation](https://jigsaw.w3.org/css-validator/)

HTML
- semantic tags
- emmet abbreviations
- [W3C validation](https://validator.w3.org/)

Figma
- [Sprint 4 Figma design](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
- [Sprint 5 Figma design](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)
- [Sprint 9 Figma design](https://www.figma.com/file/hhhIavVTeuilfPPZ6sbifl/JavaScript.-Sprint-9?node-id=0%3A1)
- [Sprint 12 Figma design](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/Sprint-14-RU?node-id=0%3A1)
- implement 320px and 1280px designs

## Back end

[https://api.mesto.418co.de](https://api.mesto.418co.de/)\
[Github](https://github.com/418code/express-mesto)


- Node, Express: middlewares, routers, controllers, REST api, error handling
- MongoDB, Mongoose: schemas, models, CRUD operations, refs
- Security: bcrypt password hashing, Celebrate/Joi + MongoDB validation with regex matching, JWT token, rate limiter
- Google Compute Platform: debian VM, Nginx, PM2 with auto reload, Let's Encrypt SSL certificate, dynamic DNS, custom domain
