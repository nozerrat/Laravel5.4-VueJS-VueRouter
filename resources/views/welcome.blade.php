<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
   <base href="{{ url('') }}">
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta name="csrf-token" content="{{ csrf_token() }}">

   <link href="{{ mix('css/app.css') }}" rel="stylesheet">
   <link href="{{ asset('css/all.css') }}" rel="stylesheet">
    
   <title>{{ config('app.name', 'Laravel') }}</title>
   
   <script src="{{ mix('js/app.js') }}"></script>
</head>
<body>
</body>
</html>
