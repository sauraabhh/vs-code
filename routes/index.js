var express = require('express');
var router = express.Router();
const fs = require('fs');
const folder = "Files";

router.get('/', function(req, res, next) {
  // fs.readdir("./files", function(err, data){
  //   res.send(data);
  // })
  fs.readdir( `./${folder}`, {withFileTypes: true}, function(err, files){
    res.render('index' , {folder , files});
  })
  // res.render('index', { title: 'Express' });
});

router.get('/formcreate',function(req,res){
  fs.writeFile(`./${folder}/${req.query.filecreateinput}`,"",function(err){
    if (err) throw err;
    console.log("done");
    res.redirect("/")
  })
})

router.get('/foldercreate',function(req,res,next){
  fs.mkdir(`./${folder}/${req.query.foldercreateinput}`,function(err){
    if (err) throw err;
    console.log("folder saved ");
    res.redirect("/")
  })
})

//mkdir , no use of " "

router.get('/delete/file/:filename',function(req,res){
  fs.unlink(`./${folder}/${req.params.filename}`,function(err){
    res.redirect("/")
  })
})

router.get('/delete/folder/:filename',function(req,res){
  fs.rmdir(`./${folder}/${req.params.filename}`,function(err){
    res.redirect("/")
  })
})

router.get('/file/:filename',function(req,res){
  fs.readdir(`./${folder}`,{withFileTypes:true},function(err,files){
    fs.readFile(`./${folder}/${req.params.filename}`,"utf-8",function(err,data){
      res.render('fileopened',{folder,files,filename:req.params.filename,filedata : data});
    })
  })
})

router.post(`/filesave/:filename`,function(req,res){
  fs.writeFile(`./${folder}/${req.params.filename}`,req.body.filedata,function(err){
    res.redirect("back");
  })
})

// router.post(`/change/:filename`,function(req,res){
//      yaha pe route fs.rename
// })


router.post('/changename/:filename',function(req,res){
  fs.rename(`./${folder}/${req.params.filename}`,`./${folder}/${req.body.newname}`,function(err){
    res.redirect('back');
  })
})



module.exports = router;