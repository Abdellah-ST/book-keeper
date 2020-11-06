const modal=document.getElementById('modal');
const modalShow=document.getElementById('show-modal');
const modalClose=document.getElementById('close-modal');
const bookmarkForm=document.getElementById('bookmark-form');
const websiteNameEl=document.getElementById('website-name');
const websiteUrlEl=document.getElementById('website-url');
const bookmarksContainer=document.getElementById('bookmarks-container');

let bookmarks=[];

// show mosal focus on input

function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// modal eventlisteners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click',e=>{
  modal.classList.remove('show-modal');
})
window.addEventListener('click',e=>{
  e.target===modal ? modal.classList.remove('show-modal'):false;
});

// validate form
function validate(nameValue,urlValue) {
  const expression=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    const regex=new RegExp(expression);
    if(!nameValue||!urlValue){
    alert("please enter data");
    return false;
  }
    else if(!urlValue.match(regex)){
      alert("non valid expression");
      return false;
    }
    return true;
}
// build bookmarks

function buildBookmarks() {
  bookmarksContainer.textContent='';
  bookmarks.forEach((bookmark) => {
    const {name, url}=bookmark;
    // items
    const item=document.createElement('div');
    item.classList.add('item');
    // close icon
    const closeIcon=document.createElement('i');
    closeIcon.classList.add('fas','fa-times');
    closeIcon.setAttribute('title','delete bookmark');
    closeIcon.setAttribute('onclick',`deleteBookmark(${url})`);
    // favicon
    const linkInfo=document.createElement('div');
    linkInfo.classList.add('name');
    const favIcon=document.createElement('img');
    favIcon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    const link=document.createElement('a');
    link.setAttribute('href',`${url}`);
    link.setAttribute('target','_blank');
    link.textContent=name;
    // append to bookmark
    linkInfo.append(favIcon,link);
    item.append(closeIcon,linkInfo);
    bookmarksContainer.appendChild(item);
  });

}

// fetch from sS
function fetchBookmarks() {
  // get bookmarks
  if(localStorage.getItem('bookmarks')){
    bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  }else {
    // create a array
    bookmarks=[
    {
      name:"google",
      url:"https://google.com",
    }
  ];
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

 //delete bookmark
 function deleteBookmark(url) {
   bookmarks.forEach((bookmark, i) => {
     if(bookmark.url===url){
       bookmarks.splice(i,1);
     }
   });
   // ipdaate
   localStorage.setItem(bookmarks,JSON.stringify(bookmarks));
   fetchBookmarks();
 }

function storeBookmark(e){
  e.preventDefault();
  const nameValue=websiteNameEl.value;
  let urlValue=websiteUrlEl.value;
  if(!urlValue.includes('https://'))
  urlValue=`https://${urlValue}`;
  if(!validate(nameValue,urlValue)){
    return false;
  }
  const bookmark={
    name:nameValue,
    url:urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// event listener
bookmarkForm.addEventListener('submit',storeBookmark)
fetchBookmarks();
