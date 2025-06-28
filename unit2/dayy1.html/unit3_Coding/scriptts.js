const firebaseURL = 'https://your-project-id.firebaseio.com/feedback.json';
document.getElementById('feedbackForm').addEventListener('submit',function(e){
  e.preventDefault();
    
  const username = document.getElementById('username').value;
  const message = document.getElementById('messsage').value;

  const feedback = {username,message};

  fetch(firebaseURL,{
   method:'POST',
   body:JSON.stringify(feedback) 
  })
  .then(res =>{
    if(!res.ok)
        throw new Error('network response was not ok');
        document.getElementById('status');
        document.getElementById('feedbackform').reset();  
  })
  .catch(err =>{
    document.getElementById('status');
    console.error(err);
  });
  
});