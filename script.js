function check(){
    let id = document.getElementById("id").value;
    let pw = document.getElementById("pw").value;
    if(id.length < 1){
        alert("Enter the username");
    }
    else{
        if(pw.length < 1){
            alert("Enter the password");
        }
        else{
            document.getElementById("loginform").submit();
        }
    }
}

function register(){
    let id = document.getElementById("id").value;
    let pw = document.getElementById("pw").value;
    let repw = document.getElementById("repw").value;

    if(id.length < 1){
        alert("Enter the username");
    }
    else{
        if(pw.length < 1){
            alert("Enter the password");
        }
        else{
            if(pw.length < 4){
                alert("Password should be longer than 4 characters");
            }
            else{
                if(pw != repw){
                    alert("Re-entered password is wrong");
                }
                else{
                    document.getElementById("signupform").submit();
                }
            }
        }
    }
}

function post_submit(){
    var check = confirm("Are you sure you want to post this thread?");
    window.onbeforeunload = null;
    if(check==true){
        document.getElementById("postform").submit();
        alert("Posted!");
    }
}

function post_delete(idx){
    var check = confirm("Are you sure you want to delete this post?");
    if(check==true){
        document.getElementById(`deleteform${idx}`).submit();
        alert("Deleted!");
    }
}

function post_edit(idx){
    document.getElementById(`editform${idx}`).submit();
}

function post_editor(){
    var check = confirm("Are you sure you want to update this thread?");
    window.onbeforeunload = null;
    if(check==true){
        document.getElementById(`editform`).submit();
        alert("Updated!");
    }
}

function enter() {
    if (window.event.keyCode == 13) {
        check();
    }
}

function enter2() {
    if (window.event.keyCode == 13) {
        register();
    }
}

function enter3(idx,user){
    if (window.event.keyCode == 13) {
        sendComment(idx, user);
    }
}

function extend(id){
    document.getElementById(id).classList.toggle("box_posts_active"); 
}

function likes(idx, user){
    var method;
    if(document.getElementById(`like${idx}`).src.endsWith("/Source/heart_full.png")){
        document.getElementById(`likecount${idx}`).innerHTML = Number(document.getElementById(`likecount${idx}`).innerHTML) - 1;
        document.getElementById(`like${idx}`).src = "/Source/heart_empty.png";
        method = 'down';
    }
    else{
        document.getElementById(`likecount${idx}`).innerHTML = Number(document.getElementById(`likecount${idx}`).innerHTML) + 1;
        document.getElementById(`like${idx}`).src = "/Source/heart_full.png";
        method = 'up';
    }

    window.fetch('/portfolio/likes',{
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type':'application/json',
                    'Accept': 'application/json, text/plain, */*'},
        body: JSON.stringify({index: idx, user:`${user}`, method:`${method}`})
        }).then((response) => {
        response.text().then((data) => {console.log(data)});
    });
}

function sendComment(idx, user){
    var content = document.getElementById(`comment${idx}`).value;

    window.fetch('/portfolio/comment',{
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({postidx: idx, author:`${user}`, content:`${content}`})
        }).then((response) => {
        response.text().then((data) => {
            document.getElementById(`commentTab${idx}`).innerHTML = 
            `<div style="display: flex; align-items: stretch; font-size: 0.95rem; margin-bottom:20px; width:100%;">
                <div style="margin-right:15px; font-weight: bolder;">${user}</div>
                <div style="margin-right: auto; width:80%; word-wrap: break-word;">${content}</div>
                <div class="reply_del_btn" onclick="deleteComment(${Number(data)}, ${idx})">delete</div>
            </div>` + document.getElementById(`commentTab${idx}`).innerHTML;
            document.getElementById(`commentcount${idx}`).innerHTML = Number(document.getElementById(`commentcount${idx}`).innerHTML) + 1;
            document.getElementById(`comment${idx}`).value = null;
        });
    });
}

function deleteComment(cmtidx, postidx){
    var check = confirm("Are you sure you want to delete this comment?");
    if(check==true){
        window.fetch('/portfolio/comment_del',{
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type':'application/json',
                        'Accept': 'application/json, text/plain, */*'},
            body: JSON.stringify({commentidx:cmtidx, postidx:postidx})
            }).then((response) => {
            response.text().then((data) => {
                alert("Deleted!");
                window.location.href = `/portfolio/page/posts/`;
            });
        });
    }
}