var customer = require('../data/models/customer');



module.exports = function(app){
app.options('http://borakpetr.cz/livebookingcom/app/templates/concierge.html',function(req,res){
        var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end("hello world \n");
});


app.options('/livebooking/customers/:firstName', function(req, res){
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end("hello world \n");
});

app.options('/livebooking/customers', function(req, res){
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();

});

app.get('/livebooking/customers', function(req, res){
    customer.find(function(err,customers){
      var customersarr = [];
      console.log("item saved");
      var headers = {};
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Content-type"] = "application/JSON";
      res.writeHead(200, headers);
      res.end(JSON.stringify(customers));
      
    });
});

app.options('/livebooking/customers/update/:id', function(req, res){
console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
});

app.post('/livebooking/customers/update/:id', function(req, res){
 console.log("item saved");
 var headers = {};
 headers["Access-Control-Allow-Origin"] = "*";
 headers["Content-type"] = "application/JSON";
 res.writeHead(200, headers);
 res.end(JSON.stringify({saved:"yes"}));
                  
 var id = req.params.id;
 var seated = req.body.seated;
 customer.update({_id:id},{state:seated},function(err){
  console.log("item updated");
 });
});
app.post('/livebooking/customers/:firstName', function(req, res){
  var dateformat = (req.body.date).split("/");
  var newdateformat = [];
  
  var x = 0;
  for(var i=(dateformat.length-1);i>=0;i--){
   
   newdateformat[x] = dateformat[i];
   x++
  }
  
  var dateitem = new Date(newdateformat);

                                    
   var ain = {};
   customer.findOne({"firstName":req.body.firstName},function(err,found){
    if(found){
     ain.firstName = true;
    }
    
      customer.findOne({"lastName":req.body.lastName},function(err,found){
        if(found){
         ain.lastName = true;                                   
        }

        customer.findOne({"date":dateitem},function(err,found){
          if(found){
           ain.date = true;                                   
          }
          
          customer.findOne({"noc":req.body.noc},function(err,found){
            if(found){
             ain.noc = true;                                   
            }
            
            customer.findOne({"phoneNumber":req.body.phone},function(err,found){
              if(found){
               ain.phone = true;                                   
              }
              
              customer.findOne({"email":req.body.email},function(err,found){
                if(found){
                 ain.email = true;                                   
                }

                
                console.log(req.body);
                
                var customeritem = new customer({firstName: req.body.firstName, lastName:req.body.lastName, date:dateitem,noc:req.body.noc, phoneNumber: req.body.phone, email: req.body.email});
                
                customeritem.save(function(err){
                 if(err){
                 console.log("error"+err);
                 }else{
                  console.log("item saved");
                  var headers = {};
                  headers["Access-Control-Allow-Origin"] = "*";
                  headers["Content-type"] = "application/JSON";
                  res.writeHead(200, headers);
                  res.end(JSON.stringify({saved:"yes"}));
                    }
                  }); 

               
                    
            });                     
          });                   
        });                  
      });     
     });
   });
});
}
