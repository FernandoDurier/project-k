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
exports.postKnowledge = function(tipo,linguagem,tags,description){
        
        var json = {tipo:null,linguagem:null,tags:null,description:null};
        
        json.tipo = tipo;
        json.linguagem = linguagem;
        json.tags = tags;
        json.description = description;
        console.log("Key data: "+ key.Key +", "+key.Password);
        var txt = json;

        request({
        url:   cloud_connection[0].url,//URL to hit
        qs: {from: 'tp fernando', time: +new Date()}, //Query string data
        method: 'POST',
        //Lets post the following key/values as form
        json: txt
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } 
        else {
            console.log(response.statusCode, body);
        }
    });
}
/*put*/
exports.putKnowledge = function(id,rev,tipo,linguagem,tags,description){
        
        var json = default_doc;
        json._id = id;
        json._rev = rev;
        json.tipo = tipo;
        json.linguagem = linguagem;
        json.tags = tags;
        json.description = description;

        var txt = json;

        request({
        url: cloud_connection[0].url+"/"+id,//API URL to hit,
        qs: {from: 'tp fernando', time: +new Date()}, //Query string data
        method: 'PUT',

        //Lets post the following key/values as form
        json: txt
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } 
        else {
            console.log(response.statusCode, body);
        }
    });
}

/*delete*/
exports.deleteKnowledge = function(id,rev){

        request({
        url: cloud_connection[0].url+"/"+id+"?rev="+rev,//URL to hit
        qs: {from: 'tp fernando', time: +new Date()}, //Query string data
        method: 'DELETE',
        //Lets post the following key/values as form
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } 
        else {
            console.log(response.statusCode, body);
        }
    });
}