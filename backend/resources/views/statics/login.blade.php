<!DOCTYPE html>
<html>
    <head>
        <title>JunoDoc</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet">
        <link rel="stylesheet" href="styles/font-awesome-4.6.3/css/font-awesome.min.css">
        <style>
            @import 'https://fonts.googleapis.com/css?family=Raleway';

            body{
                /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#b4df5b+0,b4df5b+100;Green+Semi+Flat */
                background: #b4df5b; /* Old browsers */
                background: -moz-linear-gradient(left,  #b4df5b 0%, #b4df5b 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(left,  #b4df5b 0%,#b4df5b 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to right,  #b4df5b 0%,#b4df5b 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b4df5b', endColorstr='#b4df5b',GradientType=1 ); /* IE6-9 */
            }

            body * {
                margin: 0;
                padding: 0;
            }

            #loginDialog{
                width: 350px;
                height: 500px;
                margin: 0 auto;
                background: white;
                box-shadow: 0px 0px 3px black;
                position: relative;
            }

            #loginDialogTitle{
                padding: 10px 15px;
                font-size: 2em;
                font-family: 'Lato', 'Verdana', 'sans-serif';
                border-bottom: 1px solid #E2E2E2;
            }

            #loginForm{
                padding: 20px;
            }

            #loginForm p{
                margin-top: 15px;
            }

            #loginForm label{
                font-size: 1.3em;
                color: #111111;
                font-family: 'Raleway', 'Verdana', 'sans-serif';
            }

            #loginForm p:first-of-type{
                margin-top: 0;
            }

            input[type=text],
            input[type=password]{
                border: 1px solid #2A9600;
                padding: 8px 10px;
                width: calc(100% - 18px);
                background: white;
                font-size: 1.1em;
            }

            #loginButtons{
                position: absolute;
                bottom: 15px;
                right: 15px;
            }

            #loginButtons .button{
                border-radius: 100%;
                height: 45px;
                width: 45px;
                background: #2A9600;
                color: white;
                line-height: 45px;
                text-align: center;
            }

            #registrationMessage{
                margin: 10px 0;
                font-style: italic;
                font-family: 'Verdana', 'sans-serif';
                font-size: 0.8em;
            }

            a { color: #2A9600; }
        </style>
    </head>
    <body>
        <div id="loginDialog">
            <div id="loginDialogTitle">JunoDoc - Login</div>
            <div id="loginForm">
                <p><label for="email">Email</label></p>
                <p><input type="text" name="email" id="email" required /></p>
                <p><label for="password">Password</label></p>
                <p><input type="password" name="password" id="password" required /></p>
                <div id="registrationMessage">
                    <p>Not registered yet? <a href="/register">Create a new account now!</a>
                </div>
            </div>
            <div id="loginButtons">
                <div class="button" title="Login"><i class="fa fa-sign-in" aria-hidden="true"></i></div>
            </div>
        </div>
    </body>
</html>
