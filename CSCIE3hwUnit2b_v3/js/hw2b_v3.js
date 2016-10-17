/* hw2b.js */
"use strict";

// First we do a self-invoking function that contains everything - there will be nothing
//  exposed to the global scope.
(function(){
  

    var button = document.getElementById("doit");
    button.onclick = function(){
        /*  This function will run when the user clicks on the
         *  Save button.  We're going to do several things when this function
         *  runs:
         *  1) Get the values from the form. We have done this part for you
         *  2) Create a new data object that contains the information from the form. This could be
         *     a constructor funtion that takes each of the values as its arguments, or a simple
         *     JSON object (an object literal, more or less).  
         *  3) Write this data object to the page. You'll do this by calling writeRowToPage() and
         *     passing your data object as a parameter.  We have provided a sample of this
         *     function for you, though you may have to modify/complete it so that it works
         *     with your data structure.
         *  4) Store your data to localStorage.  Remember that localStorage stores only
         *     strings, so you'll need to stringify your object. Remember, too, that when you
         *     write to localStorage, you can't add to or modify what's already there - you can only
         *     replace it completely, so you'll need a strategy to manage your accumulating data. See the
         *     Project 2B document for more information. 
         *
         *     */
        
        //Step #1 - we get values from the form
        var name = document.getElementById("name").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;

        // Step #2 - you will create a new data object

            var person = new AddrBookEntry(name, address, email);
            var array = [];
            function AddrBookEntry(n, a, e){
                this.name = n;
                this.addr=a;
                this.email=e;
               
        
               }




        // Step #3 - call on writeRowtoPage() to write your new data object to the page
          writeRowToPage(person, output);

        // Step#4 - Store your object in localStorage (preserving data
        //          that's already in there from prior submissions!) 
        array.push(person);
        // console.log(array);

       window.localStorage.setItem('persondata', JSON.stringify(array));
        
    }

 

    function writeRowToPage(dataObject, element) {
        var s = "<div class=\"info\">";

        s+='<div class="nameDiv">';
        if (dataObject.name !== 'undefined') {
            s+=dataObject.name;
        }
        s+= '</div><div class="addrDiv">';
        if (dataObject.addr !== 'undefined') {
            s+=dataObject.addr;
        }
        s+= '</div><div class="emailDiv">';
        if (dataObject.email !== 'undefined') {
            s+=dataObject.email;
        }
        s+= '</div></div>';
    
        element.innerHTML += s;
    }

    
    /* Step #5, Finally, write a function or other code that will, upon page load,
     * look in localStorage for any existing data, create data objects from it, and
     * write those data objects to the page using writeRowToPage().  This way
     * any time the user revisits this page, they'll see what was previously entered (provided
     * that they use the same browser on the same computer!)
     * */
  window.onload = function(){


        var contacts = JSON.parse(window.localStorage.getItem('persondata'));
        if (contacts){
            for (var i = 0; i<contacts.length; i++){
                writeRowToPage(d[i], output);
            }
        }

         console.log(contacts);

            // var person = new AddrBookEntry(d.name, d.address, d.email);
            // var array = [];
 //            function AddrBookEntry(n, a, e){
 //                this.name = n;
 //                this.addr=a;
 //                this.email=e;
               
        
 //               }

 // writeRowToPage(d, output);


     }


})();
