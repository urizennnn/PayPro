# Routes are as follows

### Sign Up using req.body
```
POST :https://paypro-r94x.onrender.com/user/SignUp



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
POST:https://paypro-r94x.onrender.com/user/verifyEmail/:OTP/:Email


```


### Login User

```
POST : https://paypro-r94x.onrender.com/user/login
{
    "Email":"",
    "Password":""
}

```



### Logout User

```
DELETE: https://paypro-r94x.onrender.com/user/logout

```

### Forgot Password should be done in this order

## verify the user first
```
POST:https://paypro-r94x.onrender.com/user/forgotPassword

{
    "Email:""
}
```

## then verify the otp sent
```
POST:https://paypro-r94x.onrender.com/user/verifyOTP
{
    "Email":"",
    "otp":""
}
```
## then update password
```
POST:https://paypro-r94x.onrender.com/user/updatePassword
{
    "Email:"",
    "Password":""
}

```





## Resend OTP
```
POST :https://paypro-r94x.onrender.com/user/resendOTP

{
    "Email":""
}
```

# Client operations

## Create Profile Client
# Must be followed in this order

## Client Profile picture upload 

```
 POST :https://paypro-r94x.onrender.com/client/uploadImage
returns a string store the string somewhere it will be used for the next operation

```

### Client Details 
```

```

### Create Invoice pay attention to the types as violation will cause an error

```
POST :https://paypro-r94x.onrender.com/client/createInvoice
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

