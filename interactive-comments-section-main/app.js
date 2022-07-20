const dataJson = [
    {
        currentUser: {
            image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
        },
        comments: [
            {
                id: 1,
                content: 
                "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
                createdAt: "1 month ago",
                score: 12,
                user: {
                    image: {
                        png: "./images/avatars/image-amyrobson.png",
                        webp: "./images/avatars/image-amyrobson.webp",
                    },
                    username: "amyrobson",
                },
                replies: [],
            },
            {
                id: 2,
                content: 
                "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
                createdAt: "2 weeks ago",
                score: 5,
                user: {
                    image: {
                        png: "./images/avatars/image-maxblagun.png",
                        webp: "./images/avatars/image-maxblagun.webp",
                    },
                    username: "maxblagun",
                },
                replies: [
                    {
                        id: 3,
                content: 
                "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                createdAt: "1 week ago",
                score: 4,
                replyingTo: "maxblagun",
                user: {
                    image: {
                        png: "./images/avatars/image-ramsesmiron.png",
                        webp: "./images/avatars/image-ramsesmiron.webp",
                    },
                    username: "ramsesmiron",
                    },
                },
                {
                    id: 4,
                    content: 
                    "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    createdAt: "2 days ago",
                    score: 2,
                    replyingTo: "ramsesmiron",
                    user: {
                        image: {
                            png: "./images/avatars/image-juliusomo.png",
                            webp: "./images/avatars/image-juliusomo.webp",
                        },
                        username: "juliusomo",
                        },
                },
                ],
            },
        ],
    },
];

const container = document.querySelector(".container");

//function to deliver both main comment, replies and user replies
function comment(data, className = "", deleteButton = "", youIcon = "") {
    let commentHtml = `
    <div class="comment ${className}">
    <div class="stars">
      <img class="star_plus" src="./images/icon-plus.svg" alt="">
      <span class="stars_number">${data.score}</span>
      <img class="star_minus" src="./images/icon-minus.svg" alt="">
    </div>
    <div class="details">
      <div class="details_upper">
        <div class="details_image">
          <img src="${data.user.image.png}" alt="${data.user.username}">
              <span>${data.user.username}</span>
              ${youIcon}
              <span class="detail_image_time">${data.createdAt}</span>
        </div>
        <div class="details_edit">
          ${deleteButton}
          <img class="details_edit_reply" src="./images/icon-reply.svg" alt="">
          <span class="details_edit_reply">Reply</span>
        </div>
      </div>
      <div class="details_down">
        <p class="details_text">
          ${data.content}
        </p>
      </div>
    </div>
  </div>
    ` ;        
        return commentHtml;        
}

dataJson.map((d) => {
    d.comments.forEach((i) => {
        let sectionEl  = document.createElement("section");
        sectionEl.innerHTML = comment(i);

        if(i.replies.length) {
            i.replies.map((m) => {
                if(m.user.username === "juliusomo") {
                    let deleteButton = `
                    <img class="details_edit_delete" src="./images/icon-delete.svg" alt="">
                    <span class="details_edit_delete">Delete</span>`;
                    let youIcon = `<p>You</p>`;
                    let userReplyHtml = comment(
                        m,
                        "reply your_reply",
                        deleteButton,
                        youIcon
                    );
                    sectionEl.innerHTML += userReplyHtml;
                    return userReplyHtml; 
                }
                let replyHtml = comment(m, "reply");
                sectionEl.innerHTML += replyHtml;
            });
        }
        container.appendChild(sectionEl);
    });
});

//deliver last section for adding comment
function addingComment(className = "", replyOrSend) {
    const sendComment = `
    <div class="${className} comment your_comment">
      <img src="./images/avatars/image-juliusomo.png" alt="">
      <textarea placeholder="Add Comment ..." cols="55" rows="6" class="comment_text"></textarea>
      <button id="send">${replyOrSend}</button>
    </div>
    `;
    return sendComment;
}
 //add last main comment reply box
 addingReply("send_comment", "", container, "Send");

 //click event on hitting reply
 document.addEventListener("click", (e) => {
    if(e.target.className === "details_edit_reply") {
        e.path.find((item) => {
            if(item.classList.contains("comment")) {
                let classes = [];
                let yourReplyExample = document.querySelector(".your_reply");
                let parentSection = item.parentElement;
                let sectionChildren = Array.from(parentSection.children);
                sectionChildren.forEach((d) => {
                    Array.from(d.classList).map((c) => {
                        classes.push(c.trim());
                    });
                });
                if (classes.includes("send_reply")) {
                    return "This one already has a reply box";
                }
                addingReply("send_reply", "", parentSection, "Reply")

                //trigger the add reply button event
                let reply_box = document.querySelector(".send_reply");
                let replyButton = document.querySelector(".send_reply #send");
                replyButton.addEventListener("click", (e) => {
                    let value = e.target.previousElementSibling.value;
                    if(!value) {
                        return;
                    }
                    //clone html element
                    let your_reply = yourReplyExample.cloneNode(true);
                    cloneHtml(your_reply, value);
                    parentSection.insertBefore(your_reply, reply_box);
                    e.target.previousElementSibling.value = "";
                });

                return sectionChildren;                
            }
        });
    }
 });

 function addingReply(class1, class2, section, replyOrSend) {
    let sectionEl = document.createElement("section");
    sectionEl.classList.add(class1);
    sectionEl.innerHTML = addingComment(class2, replyOrSend);
    section.appendChild(sectionEl);
 }

 //add main comment reply when sent
 //check if there is a value in the textarea
 document.querySelector(".send_comment #send").addEventListener("click", (e) => {
    let value = e.target.previousElementSibling.value;
    if(!value) {
        return;
    }

    let commentExample = document.querySelector(".comment:nth-of-type(3)");
    let sectionEl = document.createElement("section");

      //cloning html element
    let your_comment = commentExample.cloneNode(true);
    cloneHtml(your_comment, value);
    your_comment.classList.remove("reply");
    your_comment.classList.remove("your_reply");
    sectionEl.appendChild(your_comment);
    container.appendChild(sectionEl);
    e.target.previousElementSibling.value = "";

 });

 function cloneHtml(your_comment, value) {
    your_comment.querySelector(".details_text").textContent = value;
    your_comment.querySelector(".stars_number").textContent = "0";
    your_comment
        .querySelector(".details_image img")
        .setAttribute("src", `${dataJson[0].currentUser.image.png}`)
    return your_comment;

 }

 //score button
 document.addEventListener("click", (e) => {
    let className = e.target.className;
    let parent = e.target.parentElement.parentElement;

    if(className === "star_plus") {
        e.target.nextElementSibling.innerHTML++;
        checkOrder(parent);
    }
    if(className === "star_minus") {
        if(e.target.previousElementSibling.innerHTML > 0) {
            e.target.previousElementSibling.innerHTML--;
            checkOrder(parent);
        }
    }
 })

 function checkOrder(e) {
    let sectionScore = [];
    let sectionClicked = [];
    let allSections = Array.from(
        document.querySelectorAll("section:not(:last-child)")
        );        
    allSections.forEach((i) => {
        sectionScore.push({
            score: i.querySelector(".stars_number").innerHTML,
            section: i,
        });
    });
    const parentClasses = Array.from(e.classList);
    //making an object with replies
    if(parentClasses.includes("reply")) {
        return
    }

    sectionClicked.push({
        score: e.parentElement.querySelector(".stars_number").innerHTML,
        section: e.parentElement,
    });

    sectionScore.filter((d) => {
        if(d.section === sectionClicked[0].section) {
            checkOrderSub(sectionScore, d);
        }
    });
 }

 function checkOrderSub(obj, d) {
    let scoreArray = [];
    obj.forEach((o) => {
        scoreArray.push(o.score)
    })

    if(d.score >= Math.max(...scoreArray)) {
        d.section.style.order--;
    }
 }

 
