# Car Washing System API
A simple car washing system API with user booking and service management built with Typescipt, Express, MongoDB, Mongoose, Zod etc. Deployed API link: [Car Washing System API](https://car-washing-system-lyart.vercel.app/)

## Technologies
Typescipt, Express, MongoDB, Mongoose, Zod, Vercel for deployment

## Features
1. Authentication: User & Admin signup, login
2. Authorization: some endpoints are only accessed by admin, some are only for users and the rest are public
3. Create, get, update, delete service
4. Create slots and get available slots with query option
5. Create new booking, get all bookings, get user's own bookings. While creating new booking transaction and rollback is applied so that new booking creation and slot update happens atomically.
6. Corner cases and Error handling

## Models
### User Model

*   `name`: Full name of the user.
*   `email`: Email address used for communication and login.
*   `password`: Securely hashed password for authentication.
*   `phone`: Contact phone number for notifications and updates.
*   `role`**:** The role of the user, which can be one of the following: `admin`, `user`.
*   `address`: Complete physical address for service delivery or correspondence.

### Service Model

*   `name`: Title of the service.
*   `description`: Brief description of what the service entails.
*   `price`: Cost of the service in the local currency.
*   `duration`**:** Duration of the service in minutes.
*   `isDeleted`: Indicates whether the service is marked as deleted (false means it is not deleted).

### Slot Model

*   `service`: Reference to the specific service being booked.
*   `date`: Date of the booking.
*   `startTime`: Start time of the slot.
*   `endTime`: Approximate end time of the slot.
*   `isBooked`: Status of the slot (available, booked, canceled).

### Booking Model

*   `customer`: Reference to the user who made the booking.
*   `service`: Reference to the booked service.
*   `slot`: Reference to the booking slot.
*   `vehicleType`: Type of the vehicle (enum: `car`, `truck`, `SUV`, `van`, `motorcycle`, `bus`, `electricVehicle`, `hybridVehicle`, `bicycle`, `tractor`).
*   `vehicleBrand`: Brand or manufacturer of the vehicle.
*   `vehicleModel`: Model or variant of the vehicle.
*   `manufacturingYear`: Manufacturing year of the vehicle.
*   `registrationPlate`: Unique registration number assigned to the vehicle.


## API endpoints
