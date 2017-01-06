
var knowDAO = require('./main/knowledge.js');
var Q = require('q');
//knowDAO.getKnowledgeW("tag","\"sql\"","All SQL Knowledge");

//var res = knowDAO.getKnowledgeW("_id","\"e63c93de6503c611f772c7b47701152e\"","e63c93de6503c611f772c7b47701152e");

//knowDAO.postKnowledge("Cloudant CRUD","NoSQL",["NoSQL","crud","cloudant","CRUD"],"https://docs.cloudant.com/document.html");

//knowDAO.putKnowledge("e63c93de6503c611f772c7b47701152e","2-39832b0000ea4800067e7db8be257537", "Node.js knowledge", "javascript", ["Node.js","javascript","js"], "posting test input modified" );

//knowDAO.deleteKnowledge("59d1f5a371245bdd3d80d5196a53e51c","1-d0a901794b8a621c17e14ddb0b40e981");


/*
var id_vect = [
    "ee2a71e82bc6b5e4faae714bb54297d1",
    "80840a51155997ddbf9d348733826d64",
    "a572c015538c30caf8c378a542250715"
];
var rev_vect = [
    "1-7addb6caef32d9bf1a386d26fd63c648",
    "1-7addb6caef32d9bf1a386d26fd63c648",
    "1-7addb6caef32d9bf1a386d26fd63c648"
];

for(var i = 0; i < 3; i++){
    knowDAO.putKnowledge(
        id_vect[i],
        rev_vect[i],
        "tipo"+i,
        "javascript", 
        ["Node.js","javascript","js"], 
        "posting test input modified"+i
     );
}
*/
var get = function(){
    var d = Q.defer();
    knowDAO.getKnowledgeW("tipo","teste","teste");
    d.resolve(true);
    return d.promise;
}
var update = function(){
    var vetor = require('./jsons/teste.json');
    for(var i=0;i<3;i++){
         knowDAO.putKnowledge(
        vetor[i]._id,
        vetor[i]._rev,
        "tipo",
        "javascript", 
        ["Node.js","javascript","js"], 
        "posting teste input modified"+i
     );
    }
};

//get();
update();
