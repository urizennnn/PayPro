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



## Client Profile picture upload 

```
 POST :https://paypro-r94x.onrender.com/client/uploadImage


```

## Resend OTP
```
POST :https://paypro-r94x.onrender.com/user/resendOTP

{
    "Email":""
}
```