# Routes are as follows

### Sign Up using req.body
```
POST :https://paypro-laxl.onrender.com/user/SignUp



{
    "Email ":"",
    "BName":"",
    "Password":"",
    "Type":"",
    "Country":"",
    "fName":"",
    "lName":""
}

```

### Verify Otp after signing up using params

```
POST:https://paypro-laxl.onrender.com/user/verifyEmail/:OTP/:Email


```


### Login User

```
POST : https://paypro-laxl.onrender.com/user/login
{
    "Email":"",
    "Password":""
}

```



### Logout User

```
DELETE: https://paypro-laxl.onrender.com/user/logout

```

### Forgot Password should be done in this order

## verify the user first
```
POST:https://paypro-laxl.onrender.com/user/forgotPassword

{
    "Email:""
}
```

## then verify the otp sent
```
POST:https://paypro-laxl.onrender.com/user/verifyOTP
{
    "Email":"",
    "otp":""
}
```
## then update password
```
POST:https://paypro-laxl.onrender.com/user/updatePassword
{
    "Email:"",
    "Password":""
}

```





## Resend OTP
```
POST :https://paypro-laxl.onrender.com/user/resendOTP

{
    "Email":""
}
```

# Client operations

## Create Profile Client
# Must be followed in this order

## Client Profile picture upload 

```
 POST :https://paypro-laxl.onrender.com/client/uploadImage
returns a string store the string somewhere it will be used for the next operation

```

### Client Details 
```
POST :https://paypro-laxl.onrender.com/client/createClient
{ fName, lName, Email, Address, Phone, file,owner }

```

### Create Invoice pay attention to the types as violation will cause an error

```
POST :https://paypro-laxl.onrender.com/client/createInvoice
{
    BusinessAddress:string,
    BusinessName:string,
    ServiceDescription:string,
    Quantity:number,
    UnitPrice:number,
    Amount:number,
    ClientName:string,
    Email:string,
    Phone:string,
    Date:string,
    DueDate:string
}
```

### Show Clients
```
GET:https://paypro-laxl.onrender.com/client/showClients
{
    "Owner":""
}
```

## Dashboard 
```
GET  :https://paypro-laxl.onrender.com/user/dashboard

{
    "Owner":"",
    "BusinessName":""
}
```

## Create a Payment
```
{
    POST:https://paypro-laxl.onrender.com/client/addpayment
    "BankName":"",
     "AccountNumber":"",
      "AccountName":"",
       "Url":"",
        "Email":""
}
```
## Update a Payment
```
{
    POST:https://paypro-laxl.onrender.com/client/updatepayment
    "BankName":"",
     "AccountNumber":"",
      "AccountName":"",
       "Url":"",
        "Email":""
}
```

## Use Bot
```
{
    GET::https://paypro-laxl.onrender.com/OpenAi/:prompt
}
```