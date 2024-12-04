<!DOCTYPE html>
<!--[if IE 8]><html  class="ie8"><![endif]-->
<!--[if lte IE 9]><html  class="ie9"><![endif]-->
<html>
    <head>
<!-- 
    <link rel="stylesheet" href="styles.css"> -->

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
        <link rel="dns-prefetch" href="//google-analytics.com">
         <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
       

<style>
@import url('https://fonts.googleapis.com/css2?family=Aleo:wght@200&family=Montserrat:wght@300&family=PT+Sans&family=Raleway:wght@100;400&family=Roboto:wght@300&display=swap');



* {

  margin: 0;
  padding: 0;
  font-family: "Roboto", "sans-serif";

}


:root {
	
    --bg-color: #F2F2F2;
    --text-color: #050505;
    --secondary-text-color: #606770;
    --container-bg-color: #FFFFFF;
    --divider-color: #E4E6EB;
    --button-bg-color: #1877F2;
    --button-hover-bg-color: #155cb0;
    --header-bg: var(--bg-color);
}

/* Dark Theme */
.darkmode {
    --bg-color: #18191A;
    --text-color: #E4E6EB;
    --secondary-text-color: #B0B3B8;
    --container-bg-color: #242526;
    --divider-color: #3A3B3C;
    --button-bg-color: #1877F2;
    --button-hover-bg-color: #155cb0;
    --header-bg: var(--container-bg-color);
}


.header {
  
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.3rem 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background-color: var(--container-bg-color);
  backdrop-filter: blur(50px);
  z-index: -1;
}


/* .header::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width:100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5),transparent);
  transition: 0.5s;
} */

.header:hover::after {
  left:100%
}

.logo {
  
  font-size: 2rem;
  color:#000;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 2px;
}




.navbar .nav__links {
  font-size: 1.15rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  margin-left:2.5rem;
}


#check {
  display:none;
}

.icons {
  position: absolute;
  cursor: pointer;
  right:5%;
  color: #fff;
  font-size: 2.8rem;
  display: none;

}

/* BREAKPOINTS */

@media(max-width:992px) {
  .header {
    padding:1.3rem 5%;

  }
}

@media(max-width:768px) {
  .icons {
    display: inline;
    color:var(--text-color);
    margin-right:70px;
    

  }

  #check:checked~.icons #menu-icon {
    display:none;
  }


  .icons #close-icon {
    display:none;
  }

  #check:checked~.icons #close-icon {
    display:block;
    color: var(--text-color);
  }


  .navbar {
    position: absolute;
    top:100%;
    left: 0;
    height: 0;
    width: 100%;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.1);
  background-color: var(--bg-color);
  
  transition: 0.3s ease;
  overflow: hidden;
  }

  #check:checked~.navbar{
    height: 10rem;
  }


  .navbar .nav__links {
    display: block;
    font-size: 1.1rem;
    margin: 1.5rem 0;
    text-align: center;
    transform: translateY(-50px);
    transition: 0.3s ease;
    opacity: 0;
  }

  #check:checked~.navbar .nav__links{
    
    transform: translateY(0);
    transition-delay: calc(.15s * var(--i));
    opacity:1;
  }

}


.header-logo img {
    display: block;
    height: 60px;
    cursor: pointer;
}

#theme-switch {
    height: 50px;
    width: 50px;
    padding: 0;
    border-radius: 50%;
    background-color: var(--divider-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    right: 20px;
    border: none;

}

#theme-switch svg {
    fill: var(--text-color);
}

#theme-switch svg:last-child {
    display: none;
}

.darkmode #theme-switch svg:first-child {
    display: none;
}

.darkmode #theme-switch svg:last-child {
    display: block;
}

</style>




</head>


<header class="header">

        <div class="header-logo">
			<a href="index.html"><img src="catchup/bLogo.png" id="headerLogo" /></a>
		</div>


    <input type="checkbox" id="check">

    <label for="check" class="icons">
        <i class='bx bx-menu' id="menu-icon"></i>
        <i class='bx bx-x' id="close-icon"></i>
    </label>

    <nav class="navbar">
        <a href="https://qytetari.com/" class="nav__links" style ="--i:0;">Main Menu</a>
        <a href="http://aritechks.com/partners" class="nav__links" style ="--i:1;">About us</a>
        <a href="http://aritechks.com/klientet" class="nav__links" style ="--i:2;">Log in</a>
    </nav>


    
		<div class="header-settings">
			<button id="theme-switch" onclick="document.body.classList.toggle('darkmode'); 
			if(document.body.classList.contains('darkmode')){
			  localStorage.setItem('mode','dark');
			  document.getElementById('headerLogo').src='catchup/wLogo.png'}
			else{
			  localStorage.setItem('mode','light');
			  document.getElementById('headerLogo').src='catchup/bLogo.png'}">

				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
					fill="#5f6368">
					<path
						d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
					fill="#5f6368">
					<path
						d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z" />
				</svg>

			</button>
		</div>

</header>