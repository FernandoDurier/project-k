/*needed modules*/
var cloud_connection = require('../config/connection.json');
var default_doc = require('../config/default document.json');
var request = require('request');
var http = require('http');
var key = require('../config/key.json');
var db = require('ibm_db');
var fs = require('fs');
var Q = require('q');

/*global vars needed and their initialization*/


/*get writing*/
exports.getKnowledgeW = function(filter,valor,sdoc){
          var curl = cloud_connection[0].url;
          var filtro = filter;
          var det = filtro.trim();
          console.log(cloud_connection[0].knowledgeDocFilter);
          var searchindex = cloud_connection[0].knowledgeDocFilter;
          var knowledgeVector = [];
          if( det != ""){
              filtro = "?q=" + filter + ":" + valor + "&include_docs=true";
          }
          if(searchindex.trim()!=""){
            searchindex = "_design/" + searchindex + "/_search/" + searchindex;
          }


          var doc = searchindex + filtro;
            console.log("Acessando cloudant em: "+curl+"/"+doc +"\n");
            
          var http = require('http');
          var body = "";
          
          var iterator = function(profile){
              var iteratorDefer = Q.defer();
               for(var i=0;i<profile.length;i++){
                    knowledgeVector.push(profile[i].doc);
                    if(i+1 == profile.length){
                        iteratorDefer.resolve(true);
                    }
               }
               return iteratorDefer.promise;
          };

          var writer = function(sdoc,knowledgeVector){
            var fs = require('fs');
            var writerDefer = Q.defer();
            fs.writeFile(   "./jsons/" + sdoc + ".json", JSON.stringify(knowledgeVector), function(err) {
                if(err) {
                    return console.log(err);
                }
                
                console.log("The file was saved!");writerDefer.resolve(true);
                console.log("--------------------------------------------------------------------------------");
               
            });
            return writerDefer.promise;
          }

          var request = http.get(( curl + "/" + doc),function(response){
                                                                        response.on("data",
                                                                        function(chunk){
                                                                            body = body + chunk;
                                                                        }
                                                                        );
                                                                        response.on("end", function(){
                                                                                var profile = (JSON.parse(body).rows);
                                                                                console.log(profile);
                                                                                iterator(profile).then(writer(sdoc,knowledgeVector));

                                                                                var queryReturn = knowledgeVector;
                                                                                return queryReturn;          								  
                                                                                }
          							                                    );

          						                                    }
          					   );
}

/*get only*/

exports.getKnowledge = function(filter,valor){
          var curl = cloud_connection[0].url;
          var filtro = filter;
          var det = filtro.trim();
          console.log(cloud_connection[0].knowledgeDocFilter);
          var searchindex = cloud_connection[0].knowledgeDocFilter;
          
          if( det != ""){
              filtro = "?q=" + filter + ":" + valor + "&include_docs=true";
          }
          if(searchindex.trim()!=""){
            searchindex = "_design/" + searchindex + "/_search/" + searchindex;
          }


          var doc = searchindex + filtro;
            console.log("Acessando cloudant em: "+curl+doc +"\n");
            console.log("--------------------------------------------------------------------------------");

          var http = require('http');
          var body = "";
          var request = http.get(( curl + "/" + doc),function(response){
                                                                        response.on("data",
                                                                        function(chunk){
                                                                            body = body + chunk;
                                                                        }
                                                                        );
                                                                        response.on("end", function(){
                                                                                var profile = JSON.stringify(JSON.parse(body).rows);
                                                                                console.log(profile);
                                                                                }
          							                                    );

          						                                    }
          					   );
}

/*post*/


/*put*/


/*delete*/
