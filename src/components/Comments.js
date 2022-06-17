import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'


function Comments(props) {

  const context = useContext(noteContext)

  const { Delete_rep, Reply, Dislike, Like, DeleteComment, Addcomment, getallcommets, allcommets, Getuser, userdetail } = context;

  const [comment, setComment] = useState("")

  useEffect(() => {
    getallcommets();
    Getuser();
  }, [])


  // console.log(comment)
  const addcomment = () => {
    Addcomment(comment);
    // console.log("posting.....")
    props.show_Alert("Comment Posted Sucessfully...", "success")
    setComment("")
  }
  // console.log(".................",allcommets)
  // console.log(".................",userdetail)


  /// Logic for Displaying  login users Coments first or at top of comments section................

  let unsortedcommets = []
  let sortedcommets = []

  // let Sortedcomm = []

  // console.log(allcommets)
  for (let i = 0; i < allcommets.length; i++) {
    if (allcommets[i].user === userdetail.id) {
      // console.log(allcommets[i].name)
      sortedcommets.push(allcommets[i])

      // console.log(sortedcommets)
    }
    else {
      unsortedcommets.push(allcommets[i])
    }
  }

  // [ sortedcommets[0],sortedcommets[sortedcommets.length - 1] ] = [sortedcommets[sortedcommets.length - 1],sortedcommets[0]]


  // console.log(sortedcommets)
  // console.log(unsortedcommets)

  let userfirstallcommets

  userfirstallcommets = [...sortedcommets, ...unsortedcommets]

  // like dislkie funtionaality............................

  const Handlelike = (id) => {
    Like(id)
    // let likes = document.querySelectorAll('.like');

    // let dislike = document.getElementById(`dislike${id}`)

    // dislike.classList.remove('fa-solid')
    // dislike.classList.add('fa-regular')

    // likes.forEach(like => {
    //   like.addEventListener('click',(e)=>{

    //     like.classList.add('fa-solid')
    //     like.classList.remove('fa-regular')
    //   })

    // });
  }
  const Handledislike = (id) => {
    Dislike(id);


    // let dislikes = document.querySelectorAll('.dislike');

    // let like = document.getElementById(`like${id}`)

    // like.classList.remove('fa-solid')
    // like.classList.add('fa-regular')

    // dislikes.forEach(dislike => {
    //   dislike.addEventListener('click',(e)=>{

    //     dislike.classList.add('fa-solid')
    //     dislike.classList.remove('fa-regular')
    //   })

    // });
  }

  let likes = document.querySelectorAll('.like');

  // console.log(like)

  likes.forEach(like => {
    // console.log(like.classList)
    like.addEventListener('click', () => {
      if (!like.classList.contains('red')) {
        like.classList.add('animate_like');
      }
    })

  });

  let rep;
  const HandleReplyclick = (id, elm) => {

    // console.log(elm)

    if (elm.ReplyArr.length > 0) {

      let repbox = document.getElementById(`repbox${id}`);

      repbox.classList.remove('showrepl')

    }

    rep = document.getElementById(`rep${id}`);
    rep.classList.toggle('reply')

    let reply_inpt = document.getElementById(`reply_inpt${id}`);
    reply_inpt.focus();
  }

  const [reply, setReply] = useState("") ////////////////// reply usestate hook...................

  const Sendreply = (comm_id) => {
    setReply("")
    Reply(comm_id, reply)
    let inputbox1 = document.querySelectorAll('.inputbox1');
    inputbox1.forEach(box => {
      box.classList.remove('reply')
    })
  }
  // console.log(userdetail)

  // console.log(sortedcommets[sortedcommets.length - 1])
  // console.log(userdetail.id)

  // let likearr = userfirstallcommets[3].likeArr;

  // console.log(likearr)

  // userfirstallcommets.map((elm, index) => {
  //     return console.log(elm.likeArr.length > 0)

  // });

  const Showrepbox = (id) => {
    rep = document.getElementById(`rep${id}`);
    rep.classList.remove('reply')

    // console.log(id)

    let repbox = document.getElementById(`repbox${id}`);
    let laoder = document.getElementById(`load${id}`);
    console.log(laoder)

    
    
    if(!repbox.classList.contains('showrepl')){
        laoder.classList.remove('hidden')
        laoder.classList.add('inline-block')
        
        setTimeout(() => {
          repbox.classList.toggle('showrepl')
          laoder.classList.add('hidden')
          laoder.classList.remove('inline-block')
        }, 500);

      }
      else{
        repbox.classList.remove('showrepl')
      }


  }

  let ID, REP, REP_id;
  const Handle_delete_rep = (reply, id,rep_id) => {

    ID = id;
    REP = reply;
    REP_id = rep_id;

    let con_box = document.getElementById("conf_box");
    con_box.classList.add('show1');


  }

  const handle_del_click = () => {
    Delete_rep(REP, ID,REP_id);
    let con_box = document.getElementById("conf_box");
    con_box.classList.remove('show1');
  }

  const handle_cross_click = () => {
    let con_box = document.getElementById("conf_box");
    con_box.classList.remove('show1');
  }

  return (
    <>
      <div id='conf_box' className="comfirmbox">
        <div className="confirm1">
          <span style={{ "color": "#0074cd" }}>CONFIRM: </span> Are you sure to Erase this reply.
        </div>
        <i onClick={handle_del_click} className="fa-solid con fa-check mx-2"></i><span className='mx-2'>Yes</span>
        <i onClick={handle_cross_click} className="fa-solid con fa-xmark"></i><span className='mx-2'>Cancel</span>

      </div>
      <div className="Blogpost">
        <div className="div1">
            <h2 className='text-center'>Cloud Notes</h2>
            <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla distinctio delectus maxime tenetur impedit quibusdam, alias repellendus adipisci suscipit dicta esse deleniti ullam quasi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo ad accusantium perferendis, voluptatum provident maiores illum ratione autem enim, consequuntur quaerat at. culpa amet voluptatum! Optio odit distinctio Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio error dolorem temporibus ipsum adipisci, nam vitae saepe distinctio sint ex repellendus quae voluptatibus, suscipit atque, reprehenderit recusandae aliquam? Perferendis in modi, saepe necessitatibus libero voluptas culpa nulla ullam reiciendis, exercitationem consectetur. Dignissimos eum, quibusdam commodi debitis voluptas obcaecati ullam minus saepe alias officiis reprehenderit. Tempora! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nostrum nam dolorem vero quaerat debitis, repudiandae illum animi eum obcaecati quis consequatur provident! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea voluptatibus recusandae ullam? Soluta sed voluptate ipsam obcaecati sequi maxime recusandae, iusto ipsum ex in debitis neque quam, tenetur autem veniam asperiores, maiores temporibus! excepturi, enim error harum alias?</p>

            <p>Author: <span>Pratham Shinde</span> </p>
            <p>Published At: <span> Mon 6 2022 </span></p>
        </div>
        <div className="div2">
        <h4 style={{
          "color": "darkcyan",
          "fontfamily": "sans-serif"
        }}>Comments on this blog  <span className='sm' style={{ "color": "rgb(83 83 83)", "fontsize": "initial" }}> [ {allcommets.length} ]</span> </h4>
        <div className="commentbox">
          <div className="allcomm">

            {userfirstallcommets.map((elm, index) => {
              return (
                <div style={{ "borderBottom": "1px solid rgba(0,0,0,.25)" }} key={index}>
                  <small className='sup'>
                    <span className='supspan'>
                      <img className='userlogo' src="https://i7.pngguru.com/preview/831/88/865/user-profile-computer-icons-user-interface-mystique.jpg" alt="user"  /> {elm.name}
                      <i id={`like${index}`} onClick={() => Handlelike(elm._id)} className={`like ${elm.likeArr.includes(userdetail.id) ? "fa-solid red" : "fa-regular"} fa-thumbs-up`}>
                      </i><span className='count'> {elm.likeArr.length} </span>
                      <i id={`dislike${index}`} className={`${elm.DislikeArr.includes(userdetail.id) ? "fa-solid" : "fa-regular"}       fa-thumbs-down dislike`} onClick={() => Handledislike(elm._id)}>
                      </i>
                      <span className='count'> {elm.DislikeArr.length}</span>
                    </span>

                    {userdetail.Name === elm.name ?
                      <span>
                        <i onClick={() => { DeleteComment(elm._id, props.show_Alert) }} className="fa-solid fa-trash-can"></i>
                        <i className="mx-2 fa-solid fa-pen-to-square"></i>
                      </span> :
                      <span className='rep_dots' onClick={() => { HandleReplyclick(index, elm) }} >
                        Reply
                        <i className="mx-1 fa-solid fa-comment-dots"></i>
                      </span>}

                  </small>
                  <p className='comment_para'>{elm.comment}</p>

                  {/*Write here reply box....................................................... */}

                  <div className="inputbox inputbox1" id={`rep${index}`}>

                    <span className='write'>Write Here:</span>

                    <input className='rep_inpt' value={reply} onChange={(e) => { setReply(e.target.value) }} type="text" name="reply" id={`reply_inpt${index}`} />

                    <span>
                      <button disabled={reply.length <= 2 ? true : false} className='send_btn'>
                        <i className="fa-solid fa-share" onClick={() => { Sendreply(elm._id) }}></i>
                      </button>
                    </span>

                  </div>

                  {/*Show all reply box....................................................... */}


                  {elm.ReplyArr.length > 0 && <div className="showreply">
                    <p onClick={() => { Showrepbox(index) }} style={{ "fontSize": ".8em", "fontWeight": "bold", "color": "blue", "cursor": "pointer", "display": "flex", "alignItems": "center" }}>

                      <i style={{ "fontSize": ".5em" }} className="mx-1 fa-solid fa-circle"></i>
                      <span>
                        {elm.ReplyArr.length} {elm.ReplyArr.length > 1 ? "Replies" : "Reply"}
                        <span className='hidden' id={`load${index}`} > <img className='mx-1' style={{"width":"1.5rem"}} src="https://www.lifung.com/wp-content/themes/lifung/dist/images/ajax-loader.gif" alt="" /> </span>
                      </span>

                    </p>
                    <div id={`repbox${index}`} className="repbox">

                      {elm.ReplyArr.map((rep, index1) => {

                        return (

                          <div key={index1} className='repldetail'>
                            <span>
                              <img className='mx-2 userlogo' src="https://pl-partners.vn/wp-content/uploads/2021/06/ca-nhan-01.png" alt="Logo" /> {rep.user}.
                              {rep.user === userdetail.Name ? <i onClick={() => { Handle_delete_rep(rep.reply, elm._id,rep.rep_id) }} className="mx-2 fa-solid fa-trash"></i> : ""}
                            </span>
                            <span>{rep.reply}</span>

                          </div>

                        )
                      })}
                    </div>

                  </div>}

                </div>

              )
            })}
          </div>
        </div>
        <div className="addcomm">
          <label htmlFor="Comment">Post your comment</label>
          <div className="inputbox">
            <input value={comment} onChange={(e) => { setComment(e.target.value) }} type="text" id='Comment' />
            <button disabled={comment.length > 2 ? false : true} onClick={() => { addcomment() }} className='post_btn'>
              Post
              <i className="mx- 2 fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Comments
