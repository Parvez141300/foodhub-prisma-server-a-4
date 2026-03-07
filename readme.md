#Project Name: FoodHub

#Features:

1. In this web app there are 3 role user like admin, provider, customer.
2. In the register form a user can select the role like provider or customer. User after register by email and password. User can then login.
3. A customer must be logged in then can add or remove from cart meal also can add or remove to wish list. After adding to cart user can procced to checkout to order meal.
4. After User order a meal then can see his order in dashboard. User can cancel a order if the order status is pending.
5. In the meal user can give rating and then comment on a meal for varifying that the food is good or bad.
6. A provider user can create meal or update the meal or delete it. Also he/she can check incomming orders. Can change the order status to pending, processing, delivered, cancelled.
7. Admin user can see all the user can manage the user by simply active or suspend a user.
   Admin can see all the order.
8. Every user like customer, provider, admin can manange their profile by giving their image, name, address information.
9. In ther server code can seed admin user.

#Packages Used:

1.  "@prisma/adapter-pg": "^7.3.0",
2.    "@prisma/client": "^7.3.0",
3.    "better-auth": "^1.4.18",
4.    "cors": "^2.8.6",
5.    "express": "^5.2.1",
6.    "pg": "^8.17.2"
7.    "typescript": "^5.9.3"
