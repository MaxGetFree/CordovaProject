
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("addContact").addEventListener("click",addContact);
    document.getElementById("Search").addEventListener("keyup",function(){findContact(document.getElementById("Search").value)});
});

document.addEventListener("deviceready",function(){findContact("")},false);



//document.getElementById("Search").addEventListener("input",function(){findContact(document.getElementById("Search").value)});


function addContact(){

    var contact = navigator.contacts.create({"displayName": document.getElementById("Contact").value});
    var phoneNumbers = [1];
    phoneNumbers[0] = new ContactField('home',document.getElementById("Telephone").value);
    contact.phoneNumbers=phoneNumbers;
    contact.save(contactSuccess, contactError);
    
    
    function contactSuccess(){
        
        findContact("");
        document.getElementById("Contact").value = "";
        document.getElementById("Telephone").value = "";
        document.getElementById("Search").value = "";
    }
    
    function contactError(){
        alert("Contact failed");
        document.getElementById("Contact").value = "";
        document.getElementById("Telephone").value = "";
        document.getElementById("Search").value = "";
    }
}

function findContact(filt){
    var options = new ContactFindOptions();
    
    options.filter = filt;
    
    
    options.multiple = true;
    var fields = ["displayName"];
    navigator.contacts.find(fields,contactFindSucces,contactFindError, options);
                            
    function contactFindSucces(contacts){
      
        var html = '';
        console.log(contacts);
        for(var i = 0; i<contacts.length; i++){
            contacts[i].note = i;
            html+= '<tr><td width="60%">' + contacts[i].displayName +'</td><td width="30%">' + contacts[i].phoneNumbers[0].value + '</td><td><button class="btn btn btn-danger remove" id="' + contacts[i].id + '" >X</button></td>';
        }
    
        document.getElementById('list').innerHTML = html;
        var buttons = document.getElementsByClassName('btn btn btn-danger remove');
        for(var i=0; i<buttons.length; i++){
            
            buttons[i].addEventListener("click", deleteContact);
        };    
    }
    
    function contactFindError(){
        alert("Failed to find contact: ");
    }
}

function deleteContact() { 
    var idC = this.getAttribute('id');
  
    var options = new ContactFindOptions();
    options.filter = idC;
    options.multiple = false;
    var fields = ["id"];
    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts) {

        var contact = contacts[0];
        contact.remove(contactRemoveSuccess, contactRemoveError);

        function contactRemoveSuccess(contact) {
            findContact("");
        }

        function contactRemoveError(message) {
            alert('Failed because: ' + message);
        }
    }

    function contactfindError(message) {
        alert('Failed because: ' + message);
    }
	
}



