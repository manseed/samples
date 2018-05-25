document.getElementById('myForm').addEventListener("submit",savebookmark);

   //saving the bookmark
   function savebookmark(e)
   {
	var site=document.getElementById('siteName').value;
	var siteurl=document.getElementById('siteUrl').value;
	if(!val(siteName,siteurl))
	{
		return false;
	}
	var bookmark={
		name:site,
		url:siteurl
	}
	
	//for local storage
	 if(localStorage.getItem('bookmarks')===null)
	 {
      var bookmarks=[];
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); 
	 }
	 else{
	 	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	 	bookmarks.push(bookmark);
	 	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	 }
	 //result updating
	 show();
	//prevent from submit
	document.getElementById("myForm").reset();
    e.preventDefault();
   }

   function del(url)
   {
   		var bookm=JSON.parse(localStorage.getItem('bookmarks'));
   		for(var i=0;i<bookm.length;i++)
   		{
   			if(bookm[i].url==url)
   			{
   				bookm.splice(i,1);
   			}
   		}
   		//reset
   		localStorage.setItem('bookmarks',JSON.stringify(bookm));
   		//display update
   		show();
   }


   function show()
   {
   	var bookm=JSON.parse(localStorage.getItem('bookmarks'));
   	
   	bm.innerHTML="";
   	for(var i=0;i<bookm.length;i++)
   	{
   		var name=bookm[i].name;
   		var url=bookm[i].url;
   		bm.innerHTML+= '<div class="card bg-success">'+
   		                '<h3><center>'+name+'</center><h3>'+
   		                '&nbsp<a class= "btn btn-dark" target="_blank" href="'+url+'">GO</a>'+
   		                '&nbsp &nbsp <a onclick="del(\''+url+'\')" class= "btn btn-danger"  href="#">DELETE</a>'
   		                '</div>'
   	}

   }
 function val(siteName,siteUrl)
 {
 	if(!siteName || !siteUrl)
	{
		alert("please fill");
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex))
    {
    	alert("enter valid url");
    	return false; 
    }
   return true; 
 }