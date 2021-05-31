const posts = require("./posts.js");

module.exports = {

    HTML:function(content, user, status, idx){
        var userTab;
        if(user == ""){
            userTab = '<a class="login" href="/portfolio/page/signin">Sign In</a>';
        }
        else{
            userTab = `<a class="nav_right" href="/portfolio/logout" style="margin-right: 5px;">
                <img src="/Source/profile.png" style="width: 1.5rem;
                height: 1.5rem;
                object-fit: cover;
                margin-right: -45px;
                margin-left: 30px;"/>
                <div class="nav_item"><b>${user}</b></div>
                </a>`;
        }

        function page(content){
            if(content === 'home'){
                var script = `<div class="main">
                                <div class="title" data-aos="fade-up">Welcome</div>
                                <div class="subtitle" data-aos="fade-up">This is Kyungbae's Portfolio</div>
                                <div class="text" style="word-wrap: break-word;" data-aos="fade-up">
                                    <p>Hello, I'm Kyungbae Min and this is my first web dev project.</p> 
                                    <p>The front-end is coded with front-end languages, and the local server is built with Express framework of Node.js and MySQL database.</p>
                                    <p>As a reactive web application, fetch Ajax and session are applied on this website.</p>
                                </div>
                            </div>
                            <div class="more" data-aos="fade-up">
                                <a class="more_btn" href="/portfolio/page/about">More</a>
                            </div>`;
                if(status === 'welcome'){
                    return script + `<script>alert('Welcome ${user}!');</script>`;
                } 
                else{
                    return script;
                }
            }
            else if(content === 'about'){
                return `<div class="intro">
                            <img src="/Source/me.jpg" data-aos="fade-up" />
                            <div class="intro_text" data-aos="fade-left">
                                <div class="name">Kyungbae Min</div>
                                <div class="bd">Nov 29, 2000</div>
                                <div class="info_sub">Stonybrook University</div>
                                <div class="info_text">- Applied Mathematics and Statistics major (BS)</div>
                                <div class="info_text">- Computer Science minor (BS)</div>
                                <!-- <div class="info_sub">Academic Status</div>
                                <div class="info_text">- Junior(5th semester)</div>
                                <div class="info_text">- Credit 89/120</div>
                                <div class="info_text">- cum GPA 3.99/4.0</div> -->
                                <div class="info_sub">Field of Interest</div>
                                <div class="info_text">- Web/App development</div>
                                <div class="info_text">- Computational Mathematics</div>
                                <div class="info_text">- Music</div>
                                <div class="info_sub">Contact</div>
                                <div class="info_text">- Phone: 010-4554-1664</div>
                                <div class="info_text">- Kakao ID: minr2kb</div>
                                <div class="info_text">- Gmail: kbmin1129@gmail.com</div>
                                <div class="info_text">- SBU mail: kyungbae.min@stonybrook.edu</div>
                            </div>
                        </div>
                        <style>
                            img{
                                width: 300px;
                                height: 400px;
                                object-fit: cover;
                                border-radius: 10px;
                                opacity: 0.6;
                            }
                        </style>`;
            }
            else if(content === 'posts'){
                var list = posts.list(user);
                var script = `<div class="boxes_posts" style="height: 4rem; overflow: visible;" data-aos="fade-up">
                                <div class="categories" style="margin-bottom:10px">
                                    <div style="margin-left:50px;margin-right: auto;">Title</div>
                                    <div style="margin-right: 40px;">Likes</div>
                                    <div style="margin-right: 30px;">Comments</div>
                                    <div style="margin-right: 60px;">Author</div>
                                    <div style="margin-right: 45px;">Date</div>
                                    
                                </div>
                            </div>
                            <div class="boxes_posts" style="margin-top:0; margin-bottom:30px;" data-aos="fade-up">
                                ${list}
                            </div>
                            <div class="more">
                                <a href="../create" class="more_btn" style="margin-left:auto; margin-right:80px;">Create</a>
                            </div>`;
                if(status === 'needlogin'){
                    return script + "<script>alert('Please sign-in first to create a new thread');</script>";
                }
                else{
                    return script;
                }
            }
            else if(content === 'projects'){
                return `<div class="boxes" data-aos="fade-up">
                            <div class="box_project" href="#">
                                <div class="box_title">ALPHA</div>
                                <p>Comin' Soon!</p>
                            </div>
                            <div class="box_project" href="#">
                                <div class="box_title">BETA</div>
                                <p>Comin' Soon!</p>
                            </div>
                            <div class="box_project" href="#">
                                <div class="box_title">GAMMA</div>
                                <p>Comin' Soon!</p>
                            </div>
                        </div>`;
            }
            else if(content === 'sns'){
                return `<div class="boxes">
                            <a class="box" href="https://www.instagram.com/minr2_kb/" target="_blank" data-aos="fade-up" ata-aos-duration="3000">
                                <div class="box_title">@minr2_kb</div>
                                <img src="/Source/insta.png"/>
                            </a>
                            <a class="box" href="https://www.instagram.com/minr2_kb_pro/" target="_blank" data-aos="fade-up" ata-aos-duration="3000">
                                <div class="box_title">@minr2_kb_pro</div>
                                <img src="/Source/insta.png"/>
                            </a>
                            <!--<a class="box" href="https://www.instagram.com/stari_nstar/" target="_blank" data-aos="fade-up" ata-aos-duration="3000">
                                <div class="box_title">@stari_nstar</div>
                                <img src="/Source/insta.png"/>
                            </a>-->
                            <a class="box" href="https://soundcloud.app.goo.gl/Nf6Qt" target="_blank" data-aos="fade-up" ata-aos-duration="3000">
                                <div class="box_title">@KBMIN</div>
                                <img src="/Source/soundcloud.png"/>
                            </a>
                            <!-- <a class="box" href="http://qr.kakao.com/talk/U3_NbAnJSQxilthAkQ1e0gugBSc-" target="_blank" data-aos="fade-up" ata-aos-duration="3000">
                                <div class="box_title">@minr2kb</div>
                                <img src="/Source/kakao.png"/>
                            </a>
                            <a class="box" href="kbmin1129@gmail.com" target="_blank" data-aos="fade-up" ata-aos-duration="3000">
                                <div class="box_title">kbmin1129@gmail.com</div>
                                <img src="/Source/gmail.png"/>
                            </a>
                            <a class="box" href="kyungbae.min@stonybrook.edu" target="_blank" data-aos="fade-up" ata-aos-duration="3000">
                                <div class="box_title">kyungbae.min@stonybrook.edu</div>
                                <img src="/Source/stonybrook.png"/>
                            </a> -->
                        </div>
                        <style>
                            .box img{
                                width: 100px;
                                height: 100px;
                                object-fit: cover;
                                margin-left: 75px;
                                margin-top: 75px;
                                border-radius: 35px;
                            }
                        </style>`;
            }
            else if(content === 'signin'){
                var script = `<div class="login_main">
                                <div class="input" data-aos= "zoom-in" ata-aos-duration="3000">
                                    <form action="/portfolio/login_process" method="post" id="loginform">
                                        <div class="login_btn_container">	
                                            <input placeholder="Username" onkeypress="enter()" type="text" name="id" id = "id"></input>
                                        </div>
                                        <div class="login_btn_container">	
                                            <input placeholder="Password" onkeypress="enter()" type="password" name="pw" id = "pw"></input>                    
                                        </div>
                                        <div class="login_btn_container">
                                            <div class="login_btn" onclick="check();" id="login">Sign In</div>
                                        </div>
                                        <div class="stay">
                                            <a class="signup" href="/portfolio/page/signup">Sign Up</a>
                                        </div>
                                    </form>
                                </div>
                            </div>`;
                if(status === 'wrong'){
                    return script + "<script>alert('Wrong Information!');</script>";
                }
                else{
                    return script;
                }
            }
            else if(content === 'signup'){
                var script = `<div class="login_main">
                                <div class="input_signup" data-aos= "zoom-out" ata-aos-duration="3000">
                                    <form action="/portfolio/signup_process" method="post" id="signupform">
                                        <div class="signup_btn_container">	
                                            <input placeholder="Username" onkeypress="enter2()" type="text" name = "id" id="id"></input>
                                        </div>
                                        <div class="signup_btn_container">	
                                            <input placeholder="Password" onkeypress="enter2()" type="password" name = "pw" id="pw"></input>
                                        </div>
                                        <div class="signup_btn_container">	
                                            <input placeholder="Password Check" onkeypress="enter2()" type="password" id="repw"></input>
                                        </div>
                                        <div class="signup_btn_container">
                                            <div class="signup_btn" onclick="register();">Sign Up</div>
                                        </div>
                                    </form>
                                </div>
                            </div>`;
                if(status === 'taken'){
                    return script + "<script>alert('The username is already taken');</script>";
                }
                else{
                    return script;
                }
            }
            else if(content === "create"){
                return(
                `<div  class="postingbox_posts" style="margin-top: 150px;" data-aos="fade-up">
                    <form action="/portfolio/create_process" method="post" id="postform">
                        <div class="container_posts" style="background: transparent;">    
                            <input placeholder="title" type="text" name="title"></input>
                        </div>
                        <div style="display: flex; align-items: left">
                            <textarea placeholder="content" name="content"></textarea>
                        </div>
                    </form>
                </div>
                <div class="more" style="margin-bottom: 100px;"data-aos="fade-up">
                    <div onclick="post_submit();" class="more_btn" style="margin-left:auto; margin-right:80px;">Post</a>
                </div>
                <script>
                    window.onbeforeunload = function() {
                        return "If you leave this page, unsaved files will be deleted. Will you continue?";
                    };
                </script>
                `);
            }
            else if(content === "edit"){
                return posts.editor(idx);
            }
        }

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta http-equiv="X-XSS-Protection" content="1"/>
            <title>KBMIN</title>
        <link rel="stylesheet" href="/style.css" type="text/css"/>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
        <link rel="icon" href="./favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon"/>
        </head>
        <body>
        <div class="nav">
            <a class="site_name" href="/portfolio">Kyungbae's Portfolio</a>
            <div class="nav_right">
            <a class="nav_item" href="/portfolio">Home</a>
            <a class="nav_item" href="/portfolio/page/about">About</a>
            <a class="nav_item" href="/portfolio/page/posts">Posts</a>
            <!--<a class="nav_item" href="/portfolio/page/projects">Projects</a>-->
            <a class="nav_item" href="/portfolio/page/sns">SNS</a>
            ${userTab}
            </div>
        </div>
        ${page(content)}
        <script src="/script.js"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script>
            AOS.init();
        </script>
        </body>
        </html>`;
    },

    ServerHome: function(){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>KBMIN's Local Server</title>
        </head>
        <body>
            <h1>KBMIN's Local Server</h1>
            <a href='/portfolio'>Portfolio</a>
        </body>
        </html>`;
    }
}