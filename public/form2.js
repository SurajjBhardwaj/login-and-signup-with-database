function show() {
    var sh = document.getElementById('password'); 
    if(sh.type=== 'password'){

      sh.type = 'text';

    }else{
      sh.type='password';
    }
}