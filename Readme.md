# Plaundry

<br>

## Description
Plaundry is a laundry service sales website. 


## User Stories

- **List**: Visitor can see all items that he can get cleaned.
- **Search**: Visitor can search for items.
- **Filter**: Visitor can select a specific category of items.
- **Add to cart**: Visitor can choose item-quantity and add items to a cart.
- **Signup**: Visitor has to Sign Up/Log In to visit the cart. 
- **LogIn**: Visitor has to Sign Up/Log In to visit the cart. 
- **Cart**: User can edit cart, increase quantity, or delete items.
- **Delivery**: User can choose time and date for pick-up and delivery.
- **Pay**: User pays cart (Sprite).
- **Orderhistory**: User can see all past orders and order-status.
- **Log out**: User can log out.
- **Delete**: User can delete the profile.
- **Admin/New, edit and delete**: Admin-user who can make new laundry-items and edit and delete current items.
- **Admin/Delivery**: Admin-user who can see all orders and change their status.
- **Deliveryman**: delivery-man that can see orders and change status.
- **404**: User wants to see a nice 404-page.

## Backlog

- Make cart public-route, only when clicking 'order' or something ask for log-in/sign-up.
- Check when visiting page if the service is available in that area.
- Add map for location of user
- Add chatbot
- Add email-confirmation
- Review-page. Experiences and ratings of users. 
- Animated CSS

<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashPage           | public `<Route>`            | Instructions page                               |
| `/home`                   | Nav, categorybar, laundrylist, laundrycard     | public `<Route>`            | Home page                                        |
| `/sign-in`                   | Signin            | public `<Route>`            | Sign in page                                       |
| `/sign-up`                   | Signup             | public `<Route>`            | Sign up page                                        |
| `/cart`                   | Nav, categorybar, cartlist, cartcard     | private `<Route>`            | Cart page                                        |
| `/checkout`              | Nav, checkout           | private `<Route>`            | Checkout page                                        |
| `/admin/sign-in`                   | Signin         | public `<Route>`            | Admin sign in page                                        |
| `/admin`       | Adminnav, Addform,  adminlaundrylist, adminlaundrycard         | private `<Route>`            | Admin list page                                |          
| `/admin/delivery`                   | Adminnav, Orderlist, ordercard         | private `<Route>`            | Admin delivery page
| `/admin/delivery/:id/details`      | Adminnav, orderdetails         | private `<Route>`            | Delivery order details page          |                                   |


## Components

- Splashpage
- Nav
- Adminnav
- Categorybar
- Laundrylist
- Laundrycard
- Signup
- Signin
- Cartlist
- Cartcard
- Checkout
- Addform
- Adminlaundrylist
- Adminlaundrycard
- Orderlist
- Ordercard
- Orderdetails

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Backlog Service
  - backlog.filter(type, status) // for different types of media and if they are done or not
  - backlog.detail(id)
  - backlog.add(id)
  - backlog.delete(id)
  - backlog.update(id)
  
<br>

# Server / Backend

## Models

User Model
```javascript
user = {
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  address: {
    type: String,
    
  },
  postalCode: {
    type: String,
    
  }
  city: {
    type: String,
  
  },
  orderHistory: {
    type: Array,
    defaultValue: [(relation: order-ids)]
  },
}
```

Order Model
```javascript
order = {
  userId: (relation to user),
  order: [
    { 
    laundryId: objectId,
    quantity: Number
    }
  ],
  totalPrice {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: [to pick, picked-up, washing, to deliver, delivered],
    required: true,
  }
 }, 
  pickUp: {
    Date: {type: date, required: true},
    Time: {type: String, required: true}
  },
  delivery: {
    Date: {type: date, required: true},
    Time: {type: String, required: true}
  }
```

Laundry-item Model
```javascript
laundryItem = {
  category: {
    type: String,
    enum: [clothing, bedding, towels, business, 6kg],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  price: {
    type: Number,
    required: true
  }
}
```

Admin Model
```javascript
admin = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}
```

Delivery Model
```javascript
delivery = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  orderId: {
    type: orderId,
    ref: 'order'
  }
}
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/api/laundry`           | All laundryitems                | 200            | 404          | Gives all laundry items           |
| GET         | `/api/order/availability`           | Gets availability   | 200            | 404          | Adjusts calendar with availability           |
| POST        | `/api/order`                | Posts order in db      | 201            | 404          | Checks if fields not empty (422)                            |
| POST        | `/api/user/:id/edit`        | Edits user      | 201            | 404          | Checks if fields not empty (422)                            |
| POST        | `/api/signin`        | {email, password}      | 201            | 404          | Checks if fields not empty (422)                            |
| POST        | `/api/signup`        | {username, email, password}      | 201            | 404          | Checks if fields not empty (422)                            |
| POST        | `/api/admin/signup`        | {email, password}      | 201            | 404          | Checks if fields not empty (422)                            |
| POST        | `/api/laundry/create`        | Create new laundryitem      | 201            | 404          | Checks if fields not empty (422)                            |
| PUT        | `/api/laundry/:id/edit`        | Edit laundryitem      | 201            | 404          | Checks if fields not empty (422)                            |
| DELETE        | `/api/laundry/:id/delete`        | Delete laundryitem      | 201            | 404          |                    |
| GET        | `/api/orders`        | Get all orders      | 201            | 404          |                    |
| PUT        | `/api/order/:id/edit`        | Edit order      | 201            | 404          | Checks if fields not empty (422)                    |

<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/W14CF29f/plaundry) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/llanting/plaundry-client)

[Server repository Link](https://github.com/llanting/plaundry-server)

[Deployed App Link](https://dashboard.heroku.com/apps/plaundry)

### Slides

The url to your presentation slides

[Slides Link]()