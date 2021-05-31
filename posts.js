const mysql = require('sync-mysql');

const connection = new mysql({
    host     : 'localhost',
    user     : 'root',
    password : 'mkb1129ok',
    database : 'db',
    dateStrings: 'date'
    });

module.exports = {
    list: function(user){
        var templete = "";
        var posts = connection.query('SELECT * FROM posts;');
        var i = 0;
        var img;

        function comment(postidx){
            var result = "";
            var j = 0;
            var comments = connection.query(`SELECT * FROM comments WHERE postidx=${postidx};`);
            while(j < comments.length){
                if(comments[j].author==user || user == "minr2kb"){
                    result=result+`<div style="display: flex; align-items: stretch; font-size: 0.95rem; margin-bottom:20px; width:100%;">
                                        <div style="margin-right:15px; font-weight: bolder;">${comments[j].author}</div>
                                        <div style="margin-right: auto; width:80%; word-wrap: break-word;">${comments[j].content}</div>
                                        <div class="reply_del_btn" onclick="deleteComment(${comments[j].commentidx},${postidx})">delete</div>
                                    </div>`
                }
                else{
                    result=result+`<div style="display: flex; align-items: stretch; font-size: 0.95rem; margin-bottom:20px; width:100%;">
                                        <div style="margin-right:15px; font-weight: bolder;">${comments[j].author}</div>
                                        <div style="margin-right: auto; width:85%; word-wrap: break-word;">${comments[j].content}</div>
                                    </div>`
                }
                j = j + 1;
            }
            return (result);
        }

        while(i < posts.length){
            var like = connection.query(`SELECT * FROM likes WHERE postidx=${posts[i].idx} AND likeduser ='${user}';`);
            if(like.length<1){
                img="/Source/heart_empty.png";
            }
            else{
                img="/Source/heart_full.png";
            }
            if(posts[i].author == user || user == "minr2kb"){
                templete = templete +
                `<div class="box_posts" id="${posts[i].idx}">
                    <div class="container_posts" onclick="extend(${posts[i].idx});">    
                        <div class="title_posts">${posts[i].title}</div>
                        <div style="display: flex; align-items: center; width: 23.3rem;">
                            <div style="margin-right:87px;" id="likecount${posts[i].idx}">${posts[i].likecnt}</div>
                            <div style="margin-right:70px;" id="commentcount${posts[i].idx}">${posts[i].commentcnt}</div>
                            <div class="author_posts">${posts[i].author}</div>
                            <div class="date_posts">${posts[i].date}</div>
                        </div>
                    </div>
                    <div style="margin:20px; font-size: 1rem;">
                        <div style="white-space:pre;">${posts[i].content}</div>
                        <div class="reply_container">
                            <input type="text" placeholder="Comment" id="comment${posts[i].idx}" onkeypress="enter3(${posts[i].idx}, '${user}')">
                            <div class="reply_btn" onclick="sendComment(${posts[i].idx}, '${user}');">reply</div>
                            <img src="${img}" style="width:22px;height:22px;margin:10px;margin-left:15px;" onclick="likes(${posts[i].idx}, '${user}');" id="like${posts[i].idx}"/>
                            <div class="edit_btn" onclick="post_edit(${posts[i].idx});" style="margin-left:auto; margin-right:10px;">Edit</div>
                            <form action="/portfolio/delete_process" id="deleteform${posts[i].idx}" method="post">
                                <input type="hidden" name="idx" value="${posts[i].idx}">
                                <div class="del_btn" onclick="post_delete(${posts[i].idx});" style="margin-left:10px;">Delete</div>
                            </form>
                            <form action="/portfolio/edit" id="editform${posts[i].idx}" method="post">
                                <input type="hidden" name="idx" value="${posts[i].idx}">
                            </form>
                        </div>
                        <div id="commentTab${posts[i].idx}">
                            ${comment(posts[i].idx)}
                        </div>
                    </div>
                </div>`
            }
            else if(user==""){
                templete = templete+`<div class="box_posts" id="${posts[i].idx}" >
                    <div class="container_posts" onclick="extend(${posts[i].idx});">    
                        <div class="title_posts">${posts[i].title}</div>
                        <div style="display: flex; align-items: center; width: 23.3rem;">
                            <div style="margin-right:87px;" id="likecount${posts[i].idx}">${posts[i].likecnt}</div>
                            <div style="margin-right:70px;" id="commentcount${posts[i].idx}">${posts[i].commentcnt}</div>
                            <div class="author_posts">${posts[i].author}</div>
                            <div class="date_posts">${posts[i].date}</div>
                        </div>
                    </div>
                    <div style="margin:20px; font-size: 1rem;">
                        <div style="white-space:pre;">${posts[i].content}</div>
                        <div class="reply_container">
                            <input type="text" placeholder="Comment" onclick="alert('Please sign-in first to leave comments')">
                            <div class="reply_btn" onclick="alert('Please sign-in first to leave comments')">reply</div>
                            <img src="/Source/heart_empty.png" style="width:22px;height:22px;margin:10px;margin-left:15px;" onclick="alert('Please sign-in first to like this post')"/>
                        </div>
                        <div id="commentTab${posts[i].idx}">
                            ${comment(posts[i].idx)}
                        </div>
                    </div>
                </div>`
            }
            else{
                templete = templete+`<div class="box_posts" id="${posts[i].idx}">
                    <div class="container_posts" onclick="extend(${posts[i].idx});">    
                        <div class="title_posts">${posts[i].title}</div>
                        <div style="display: flex; align-items: center; width: 23.3rem;">
                            <div style="margin-right:87px;" id="likecount${posts[i].idx}">${posts[i].likecnt}</div>
                            <div style="margin-right:70px;" id="commentcount${posts[i].idx}">${posts[i].commentcnt}</div>
                            <div class="author_posts">${posts[i].author}</div>
                            <div class="date_posts">${posts[i].date}</div>
                        </div>
                    </div>
                    <div style="margin:20px; font-size: 1rem;">
                        <div style="white-space:pre;">${posts[i].content}</div>
                        <div class="reply_container">
                            <input type="text" placeholder="Comment" id="comment${posts[i].idx}" onkeypress="enter3(${posts[i].idx}, '${user}')">
                            <div class="reply_btn" onclick="sendComment(${posts[i].idx}, '${user}');">reply</div>
                            <img src="${img}" style="width:22px;height:22px;margin:10px;margin-left:15px;" onclick="likes(${posts[i].idx}, '${user}');" id="like${posts[i].idx}"/>
                        </div>
                        <div id="commentTab${posts[i].idx}">
                            ${comment(posts[i].idx)}
                        </div>
                    </div>
                </div>`
            }
            i = i + 1;
        }
        return templete;
    },

    editor: function(idx){
        var post = connection.query(`SELECT * FROM posts where idx=${idx}`)[0];
        return(`<div class="postingbox_posts" style="margin-top: 150px;" data-aos="fade-up">
                    <form action="/portfolio/edit_process" method="post" id="editform">
                        <div class="container_posts" style="background: transparent;">    
                            <input placeholder="title" type="text" name="title" value="${post.title}"></input>
                        </div>
                        <div style="display: flex; align-items: left">
                            <textarea placeholder="content" name="content">${post.content}</textarea>
                        </div>
                        <input type="hidden" name="idx" value="${idx}">
                    </form>
                </div>
                <div class="more" style="margin-bottom: 100px;"data-aos="fade-up">
                    <div onclick="post_editor();" class="more_btn" style="margin-left:auto; margin-right:80px;">Update</a>
                </div>
                <script>
                    window.onbeforeunload = function() {
                        return "If you leave this page, unsaved files will be deleted. Will you continue?";
                    };
                </script>
                `)

    },

    post: function(title, content, user){
        console.log(title);
        console.log(content);
        console.log(user);
        var date = new Date().toISOString().slice(0, 10).replace('T', ' ');
        console.log(date);
        connection.query(`INSERT INTO db.posts (title, author, date, content) VALUES ("${title}","${user}","${date}","${content}");`); 
    },

    delete: function(idx){
        connection.query(`DELETE FROM posts WHERE idx=${idx};`);
    },

    edit: function(idx, title, content){
        connection.query(`UPDATE posts SET title="${title}", content="${content}" WHERE idx=${idx}`);
    },

    likes: function(idx, user, method){
        if(method=='up'){
            connection.query(`INSERT INTO db.likes (postidx, likeduser) VALUES (${idx}, "${user}")`);
            connection.query(`UPDATE posts SET likecnt = likecnt+1 WHERE idx=${idx};`);
            return('liked');
        }
        else{
            connection.query(`DELETE FROM likes WHERE postidx=${idx} AND likeduser="${user}";`);
            connection.query(`UPDATE posts SET likecnt = likecnt-1 WHERE idx=${idx};`);
            return('unliked');
        }
    },

    comments: function(postidx, author, content){
        connection.query(`INSERT INTO db.comments (postidx, author, content) VALUES (${postidx}, "${author}", "${content}");`);
        connection.query(`UPDATE posts SET commentcnt = commentcnt+1 WHERE idx=${postidx};`);
        var id = connection.query('SELECT LAST_INSERT_ID();')[0];
        return(id["LAST_INSERT_ID()"]);
    },

    comments_del: function(commentidx, postidx){
        connection.query(`UPDATE posts SET commentcnt = commentcnt-1 WHERE idx=${postidx};`);
        connection.query(`DELETE FROM comments WHERE commentidx=${commentidx};`);        
    }
}